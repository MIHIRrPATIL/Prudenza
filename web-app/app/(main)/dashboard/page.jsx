import CreateDrawer from '@/components/CreateDrawer'
import { Card, CardContent } from '@/components/ui/card'
import { auth, currentUser } from '@clerk/nextjs/server';
import React from 'react'

const Dashboard = () => {
  const {userId} = currentUser () ;
  if (!userId) {
    return <div className="text-white">Please login to see your dashboard</div>
  }
  
  return (
    <div>
      <p className="text-white text-2xl">Dashboard</p>
        
    </div>
  )
}

export default Dashboard
