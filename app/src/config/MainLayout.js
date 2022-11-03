import Navbar from 'components/Navbar'
import React from 'react'
import { Outlet } from 'react-router-dom'
import style from "../styles/GlobalStyle.css"

function MainLayout({userdatas}) {
  return (
    <div className='MainLayout'>
        <Navbar userdatas={userdatas} />
        <Outlet />
    </div>
  )
}

export default MainLayout