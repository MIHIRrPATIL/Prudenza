"use server";

import { db } from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { clerkClient } from "@/lib/clerk"; // Import from our centralized clerk client

export async function CreateAccount(data) {
  console.log("CreateAccount called with data:", data);

  const serializeTransaction = (obj) => {
    return {
      ...obj,
      balance: obj.balance?.toNumber?.() ?? obj.balance,
    };
  };

  try {
    console.log("Getting auth userId");
    // const { userId } = auth(); // Removed await since auth() is synchronous in v5
    const authResult = auth();
    const userResult = await currentUser () ;
    console.log("Auth result:", authResult);  
    console.log("Current user result:", userResult); 
    const userId = authResult.userId || userResult?.id;
    
    console.log("Final userId:", userId);


    console.log("Auth userId:", userId);

      
    if (!userId) {
      console.error("User not authenticated");
      return { success: false, error: "Authentication required" };
    }

    console.log("Finding user in database");
    let user = await db.user.findUnique({
      where: {
        clerkUserId: userId,
      },
    
    });

    // Create user if they exist in Clerk but not in our DB
    if (!user) {
      console.log("User not found in database, creating user record");

      try {
        const clerkUser = await clerkClient.users.getUser(userId);

        const primaryEmail = clerkUser.emailAddresses.find(
          (email) => email.id === clerkUser.primaryEmailAddressId
        )?.emailAddress;

        if (!primaryEmail) {
          throw new Error("User must have a primary email address");
        }

        user = await db.user.create({
          data: {
            clerkUserId: userId,
            email: primaryEmail,
            name:
              `${clerkUser.firstName || ""} ${
                clerkUser.lastName || ""
              }`.trim() || null,
            imageUrl: clerkUser.imageUrl || null,
          },
        });
      } catch (fetchError) {
        console.error("Error fetching user from Clerk:", fetchError);
        throw new Error(
          "Failed to retrieve user information: " + fetchError.message
        );
      }
    }

    console.log("Parsing balance:", data.balance);
    const balanceFloat = parseFloat(data.balance);
    if (isNaN(balanceFloat)) {
      console.error("Invalid balance value");
      throw new Error("Invalid balance");
    }

    console.log("Finding existing accounts");
    const existingAccounts = await db.account.findMany({
      where: {
        userId: user.id,
      },
    });
    console.log("Existing accounts count:", existingAccounts.length);

    const shouldBeDefault =
      existingAccounts.length === 0 ? true : data.isDefault;
    console.log("Should be default account:", shouldBeDefault);

    if (shouldBeDefault) {
      console.log("Updating any existing default accounts");
      await db.account.updateMany({
        where: {
          userId: user.id,
          isDefault: true,
        },
        data: {
          isDefault: false,
        },
      });
    }

    // Convert form values to match Prisma enum
    const accountType = data.type === "Savings" ? "SAVINGS" : "CURRENT";

    console.log("Creating account with data:", {
      name: data.name,
      type: accountType,
      balance: balanceFloat,
      userId: user.id,
      isDefault: shouldBeDefault,
    });

    const account = await db.account.create({
      data: {
        name: data.name,
        type: accountType,
        balance: balanceFloat,
        userId: user.id,
        isDefault: shouldBeDefault,
        details: data.details || null,
      },
    });

    console.log("Account created successfully:", account);
    const serializedAccount = serializeTransaction(account);
    revalidatePath("/dashboard");
    return { success: true, serializedAccount };
  } catch (error) {
    console.error("Error creating account:", {
      message: error.message,
      stack: error.stack,
      error,
    });
    return { success: false, error: error.message };
  }
}

export async function GetAccounts() {
  try {
    const { userId } = auth(); // Synchronous in v5

    if (!userId) {
      throw new Error("User not authenticated");
    }

    let user = await db.user.findUnique({
      where: {
        clerkUserId: userId,
      },
    });

    if (!user) {
      const clerkUser = await clerkClient.users.getUser(userId);

      const primaryEmail = clerkUser.emailAddresses.find(
        (email) => email.id === clerkUser.primaryEmailAddressId
      )?.emailAddress;

      if (!primaryEmail) {
        throw new Error("User must have a primary email address");
      }

      user = await db.user.create({
        data: {
          clerkUserId: userId,
          email: primaryEmail,
          name:
            `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim() ||
            null,
          imageUrl: clerkUser.imageUrl || null,
        },
      });
    }

    const accounts = await db.account.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        isDefault: "desc",
      },
    });

    return {
      success: true,
      accounts: accounts.map((account) => ({
        ...account,
        balance: account.balance.toString(),
      })),
    };
  } catch (error) {
    console.error("Error fetching accounts:", {
      message: error.message,
      stack: error.stack,
      error,
    });
    return { success: false, error: error.message };
  }
}

export async function UpdateAccount(accountId, data) {
  try {
    const { userId } = auth(); // Synchronous in v5

    if (!userId) {
      throw new Error("User not authenticated");
    }

    const user = await db.user.findUnique({
      where: {
        clerkUserId: userId,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    // Verify the account belongs to this user
    const account = await db.account.findUnique({
      where: {
        id: accountId,
        userId: user.id,
      },
    });

    if (!account) {
      throw new Error("Account not found or access denied");
    }

    // Parse balance if provided
    let balanceFloat = undefined;
    if (data.balance !== undefined) {
      balanceFloat = parseFloat(data.balance);
      if (isNaN(balanceFloat)) {
        throw new Error("Invalid balance");
      }
    }

    // Handle default account status change
    if (data.isDefault) {
      await db.account.updateMany({
        where: {
          userId: user.id,
          isDefault: true,
        },
        data: {
          isDefault: false,
        },
      });
    }

    // Convert account type if provided
    let accountType = undefined;
    if (data.type !== undefined) {
      accountType = data.type === "Savings" ? "SAVINGS" : "CURRENT";
    }

    // Update the account
    const updatedAccount = await db.account.update({
      where: {
        id: accountId,
      },
      data: {
        name: data.name !== undefined ? data.name : undefined,
        type: accountType,
        balance: balanceFloat !== undefined ? balanceFloat : undefined,
        isDefault: data.isDefault !== undefined ? data.isDefault : undefined,
      },
    });

    revalidatePath("/dashboard");
    return {
      success: true,
      account: {
        ...updatedAccount,
        balance: updatedAccount.balance.toString(),
      },
    };
  } catch (error) {
    console.error("Error updating account:", {
      message: error.message,
      stack: error.stack,
      error,
    });
    return { success: false, error: error.message };
  }
}

export async function DeleteAccount(accountId) {
  try {
    const { userId } = auth(); // Synchronous in v5

    if (!userId) {
      throw new Error("User not authenticated");
    }

    const user = await db.user.findUnique({
      where: {
        clerkUserId: userId,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    // Verify the account belongs to this user
    const account = await db.account.findUnique({
      where: {
        id: accountId,
        userId: user.id,
      },
    });

    if (!account) {
      throw new Error("Account not found or access denied");
    }

    // Delete the account
    await db.account.delete({
      where: {
        id: accountId,
      },
    });

    // If it was a default account, set another account as default
    if (account.isDefault) {
      const anotherAccount = await db.account.findFirst({
        where: {
          userId: user.id,
        },
      });

      if (anotherAccount) {
        await db.account.update({
          where: {
            id: anotherAccount.id,
          },
          data: {
            isDefault: true,
          },
        });
      }
    }

    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Error deleting account:", {
      message: error.message,
      stack: error.stack,
      error,
    });
    return { success: false, error: error.message };
  }
}
