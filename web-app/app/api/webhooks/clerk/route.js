import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { db } from '@/lib/prisma'

export async function POST(req) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET
  if (!WEBHOOK_SECRET) {
    return new Response('Webhook secret not configured', { status: 500 })
  }

  const headerPayload = headers()
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Missing svix headers', { status: 400 })
  }

  const payload = await req.json()
  const body = JSON.stringify(payload)

  const wh = new Webhook(WEBHOOK_SECRET)

  let evt
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    })
  } catch (err) {
    console.error('Error verifying webhook:', err)
    return new Response('Error verifying webhook', { status: 400 })
  }

  const eventType = evt.type
  console.log(`Processing webhook event: ${eventType}`)

  try {
    switch (eventType) {
      case 'user.created':
        await handleUserCreated(evt.data)
        break
      case 'user.updated':
        await handleUserUpdated(evt.data)
        break
      case 'user.deleted':
        await handleUserDeleted(evt.data.id)
        break
      default:
        console.log(`Unhandled event type: ${eventType}`)
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 })
  } catch (error) {
    console.error('Error processing webhook:', {
      eventType,
      error: error.message,
      stack: error.stack,
    })
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message,
        eventType 
      }),
      { status: 500 }
    )
  }
}

async function handleUserCreated(userData) {
  const { id, email_addresses, first_name, last_name, image_url } = userData

  const primaryEmail = email_addresses?.find(
    email => email.id === userData.primary_email_address_id
  )?.email_address

  if (!primaryEmail) {
    throw new Error('Primary email not found for user')
  }

  const existingUser = await db.user.findUnique({
    where: { clerkUserId: id },
  })

  if (existingUser) {
    console.log(`User ${id} already exists in database`)
    return
  }

  await db.user.create({
    data: {
      clerkUserId: id,
      email: primaryEmail,
      name: [first_name, last_name].filter(Boolean).join(' ').trim() || null,
      imageUrl: image_url,
    },
  })

  console.log(`Created user ${id} in database`)
}

async function handleUserUpdated(userData) {
  const { id, email_addresses, first_name, last_name, image_url } = userData

  const primaryEmail = email_addresses?.find(
    email => email.id === userData.primary_email_address_id
  )?.email_address

  if (!primaryEmail) {
    throw new Error('Primary email not found for user')
  }

  const existingUser = await db.user.findUnique({
    where: { clerkUserId: id },
  })

  if (!existingUser) {
    console.log(`User ${id} not found in database, creating instead`)
    return handleUserCreated(userData)
  }

  await db.user.update({
    where: { clerkUserId: id },
    data: {
      email: primaryEmail,
      name: [first_name, last_name].filter(Boolean).join(' ').trim() || null,
      imageUrl: image_url,
    },
  })

  console.log(`Updated user ${id} in database`)
}

async function handleUserDeleted(clerkUserId) {
  // First check if user exists to avoid unnecessary errors
  const existingUser = await db.user.findUnique({
    where: { clerkUserId },
    include: {
      accounts: {
        select: { id: true },
      },
      transactions: {
        select: { id: true },
      },
    },
  })

  if (!existingUser) {
    console.log(`User ${clerkUserId} not found in database`)
    return
  }

  // Check if user has any accounts or transactions
  if (existingUser.accounts.length > 0 || existingUser.transactions.length > 0) {
    console.log(`User ${clerkUserId} has associated data, performing cascading delete`)
  }

  await db.user.delete({
    where: { clerkUserId },
  })

  console.log(`Deleted user ${clerkUserId} from database`)
}