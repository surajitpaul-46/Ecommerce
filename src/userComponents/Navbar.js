import React, { useContext, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { LoginContext } from '../context/LoginContext'

export default function Navbar() {
   let {isLogin,setIsLogin,setUserId} =  useContext(LoginContext)
  return (
    <div>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to={'/'}><i className="bi bi-cart3"></i>Ecommerce</NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <NavLink className="nav-link active" aria-current="page" to={'/'}>Products</NavLink>
                    </li> 
                    {/* <li className="nav-item">
                        <NavLink className="nav-link active position-relative btn" aria-current="page" to={'/'}>Cart</NavLink>
                    </li> */}
                    <li className="nav-item">
                        <NavLink className="nav-link active" aria-current="page" to={'/'}>Orders</NavLink>
                    </li> 
                </ul>
                <div className='me-2'>
                   <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    {
                        !isLogin && <>
                            <li className="nav-item">
                                <NavLink className="nav-link active" aria-current="page" to={'/register'}>Register</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link active" aria-current="page" to={'/login'}>Login</NavLink>
                            </li>
                          </>
                    }
                    {
                        isLogin && <>
                        <li className="nav-item">
                            <NavLink className="nav-link active" aria-current="page" onClick={()=>
                                {
                                    setIsLogin(false)
                                    setUserId(null)}}>Logout
                            </NavLink>
                            
                        </li>
                        {/* <button type="button" class="btn btn-primary position-relative">
                            <i class="bi bi-cart3"></i>
                            <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                {cartQuantity}
                                <span class="visually-hidden">unread messages</span>
                            </span>
                        </button> */}
                        </>  
                    }      
                    </ul> 
                </div>
                </div>
            </div>
        </nav>
    </div>
  )
}
