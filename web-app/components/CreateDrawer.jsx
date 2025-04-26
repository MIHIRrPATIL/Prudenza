"use client";

import React, { useState, useEffect } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Check, DollarSign, CreditCard, IndianRupee } from "lucide-react";
import { CreateAccount } from "@/actions/dashboard";
import { toast, Toaster } from "sonner";
import useFetch from "@/hooks/use-fetch";
import { useAuth } from "@clerk/nextjs";

// Zod schema
const accountSchema = z.object({
  name: z.string().min(1, "Name is required"),
  type: z.enum(["Savings", "Current"]),
  balance: z.string().min(1, "Initial Balance is required"),
  details : z.string().optional(),
  isDefault: z.boolean().default(false),
});

const CreateDrawer = ({ children, onAccountCreate }) => {
  const [open, setOpen] = useState(false);
  const [animateForm, setAnimateForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { isLoaded, userId, sessionId } = useAuth();
  

  useEffect(() => {
    console.log("Auth state:", { isLoaded, userId, sessionId });
  }, [isLoaded, userId, sessionId]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      name: "",
      type: "Savings",
      balance: "",
      isDefault: false,
      details: "",
    },
  });

  const { data: newAccount, fn: createAccountFn, error, loading: CreateAccountLoading } = useFetch(CreateAccount);
  
  useEffect(() => {
    if (open) {
      setTimeout(() => setAnimateForm(true), 300);
    } else {
      setAnimateForm(false);
      if (submitted) {
        setTimeout(() => {
          reset();
          setSubmitted(false);
        }, 500);
      }
    }
  }, [open, reset, submitted]);

  useEffect(() => {
    console.log("Data effect triggered - newAccount:", newAccount, "loading:", CreateAccountLoading);
    
    if (!CreateAccountLoading && newAccount && newAccount.success === true) {
      console.log("Account created successfully:", newAccount);
      toast.success("Account created successfully");
      reset();
      setOpen(false);
    } else if (!CreateAccountLoading && newAccount && newAccount.success === false) {
      console.log("Account creation failed:", newAccount.error);
      toast.error(newAccount.error || "Failed to create account");
    }
  }, [CreateAccountLoading, newAccount, reset]);

  useEffect(() => {
    console.log("Error effect triggered - error:", error, "loading:", CreateAccountLoading);
    
    if (error && !CreateAccountLoading) {
      console.error("Error detected:", error);
      toast.error(error?.message || "Something went wrong");
    }
  }, [error, CreateAccountLoading]);

  const onSubmit = async (data) => {
    console.log("Form submitted with data:", data);
    setIsSubmitting(true);
    
    try {
      console.log("Calling createAccountFn");
      await createAccountFn(data);
      console.log("createAccountFn completed");
    } catch (err) {
      console.error("Error in createAccountFn:", err);
    } finally {
      console.log("Setting form state after submission");
      setIsSubmitting(false);
      setSubmitted(true);
    }
  };

  const accountType = watch("type");
  const isDefault = watch("isDefault");

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className="bg-black/70 text-white border-t border-white/10">
        <div className="mx-auto w-full max-w-md">
          <DrawerHeader>
            <DrawerTitle className="text-2xl font-bold text-white flex items-center">
              <CreditCard className="mr-2 w-5 h-5" />
              Add a new Account
            </DrawerTitle>
            <DrawerDescription className="text-white/70">
              Add detailed information about your new account
            </DrawerDescription>
          </DrawerHeader>

          <div
            className={`px-4 transition-all duration-500 transform ${
              animateForm
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            {!submitted ? (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Account Name */}
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-white"
                  >
                    Account Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="name"
                      {...register("name")}
                      placeholder="Enter account name .....eg SBI Savings"
                      className="w-full px-4 py-2 bg-black border border-white/20 rounded-lg focus:ring-2 focus:ring-white/30 focus:border-white/50 focus:outline-none transition-all placeholder:text-white/30 text-white"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1 animate-fadeIn">
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Account Type */}
                <div className="space-y-2">
                  <label
                    htmlFor="type"
                    className="block text-sm font-medium text-white"
                  >
                    Account Type
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        setValue("type", "Savings", { shouldValidate: true })
                      }
                      className={`flex items-center justify-center px-4 py-2 rounded-lg border transition-all ${
                        accountType === "Savings"
                          ? "border-white bg-white/10 text-white"
                          : "border-white/20 text-white/60 hover:bg-white/5"
                      }`}
                    >
                      {accountType === "Savings" && (
                        <Check className="w-4 h-4 mr-2" />
                      )}
                      Savings
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setValue("type", "Current", { shouldValidate: true })
                      }
                      className={`flex items-center justify-center px-4 py-2 rounded-lg border transition-all ${
                        accountType === "Current"
                          ? "border-white bg-white/10 text-white"
                          : "border-white/20 text-white/60 hover:bg-white/5"
                      }`}
                    >
                      {accountType === "Current" && (
                        <Check className="w-4 h-4 mr-2" />
                      )}
                      Current
                    </button>
                  </div>
                </div>

                {/* Initial Balance */}
                <div className="space-y-2">
                  <label
                    htmlFor="balance"
                    className="block text-sm font-medium text-white"
                  >
                    Initial Balance
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <IndianRupee className="h-5 w-5 text-white/50" />
                    </div>
                    <input
                      type="text"
                      id="balance"
                      {...register("balance")}
                      placeholder="0.00"
                      className="w-full pl-10 pr-4 py-2 bg-black border border-white/20 rounded-lg focus:ring-2 focus:ring-white/30 focus:border-white/50 focus:outline-none transition-all placeholder:text-white/30 text-white"
                    />
                    {errors.balance && (
                      <p className="text-red-500 text-sm mt-1 animate-fadeIn">
                        {errors.balance.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-2">
                  <label
                    htmlFor="Details"
                    className="block text-sm font-medium text-white"
                  >
                    Details
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="name"
                      {...register("details")}
                      placeholder="Enter account details .....eg master card 1376"
                      className="w-full px-4 py-2 bg-black border border-white/20 rounded-lg focus:ring-2 focus:ring-white/30 focus:border-white/50 focus:outline-none transition-all placeholder:text-white/30 text-white"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1 animate-fadeIn">
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                </div> 

                {/* Default Account Toggle */}
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() =>
                      setValue("isDefault", !isDefault, {
                        shouldValidate: true,
                      })
                    }
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      isDefault ? "bg-white" : "bg-white/20"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full transition-transform ${
                        isDefault
                          ? "translate-x-6 bg-black"
                          : "translate-x-1 bg-white"
                      }`}
                    />
                  </button>
                  <span className="text-sm text-white">
                    Set as default account
                  </span>
                </div>

                <DrawerFooter className="px-0 pt-2 pb-4">
                  <Button
                    type="submit"
                    disabled={isSubmitting || CreateAccountLoading}
                    className={`w-full bg-white text-black hover:bg-white/90 transition-all font-medium ${
                      isSubmitting || CreateAccountLoading ? "animate-pulse" : ""
                    }`}
                  >
                    {isSubmitting || CreateAccountLoading ? (
                      <div className="flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin mr-2"></div>
                        Processing...
                      </div>
                    ) : (
                      "Create Account"
                    )}
                  </Button>
                  <DrawerClose asChild>
                    <Button
                      variant="outline"
                      className="w-full border-white/20 text-black hover:bg-white/10 hover:text-white"
                    >
                      Cancel
                    </Button>
                  </DrawerClose>
                </DrawerFooter>
              </form>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 animate-fadeIn">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-4">
                  <Check className="w-8 h-8 text-white animate-scaleIn" />
                </div>
                <h3 className="text-xl font-bold text-white">
                  Account Created!
                </h3>
                <p className="text-white/70 text-center mt-2">
                  Your new account has been successfully added
                </p>
              </div>
            )}
          </div>
        </div>

        <style jsx global>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
          .animate-fadeIn {
            animation: fadeIn 0.5s ease-out;
          }

          @keyframes scaleIn {
            0% {
              transform: scale(0);
            }
            70% {
              transform: scale(1.1);
            }
            100% {
              transform: scale(1);
            }
          }
          .animate-scaleIn {
            animation: scaleIn 0.5s ease-out;
          }
        `}</style>
      </DrawerContent>
    </Drawer>
  );
};

export default CreateDrawer;