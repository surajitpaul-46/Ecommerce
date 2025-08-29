import React from 'react'
import VendorNavbar from './VendorNavbar'
import { Outlet } from 'react-router-dom'

export default function Dashboard() {
  return (
    <div>
        <VendorNavbar/>
        <Outlet/>  
    </div>
  )
}
