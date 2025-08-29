import React, { useContext } from 'react'
import { LoginContext } from '../context/LoginContext'
import { NavLink, useNavigate } from 'react-router-dom'

export default function VendorNavbar() {
  let {isLogin,setIsLogin,setUserId} =  useContext(LoginContext)
  let navigateTo=useNavigate()
    return (
      <div>
          <nav className="navbar navbar-expand-lg bg-body-tertiary">
              <div className="container-fluid">
                  <NavLink className="navbar-brand" to={'/dashboard'}><i className="bi bi-cart3"></i> Try & Buy</NavLink>
                  <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                  </button>
                  <div className="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                      <li className="nav-item">
                          <NavLink className="nav-link active" aria-current="page" to={'/dashboard/add-product'}>Add Product</NavLink>
                      </li> 
                      <li className="nav-item">
                          <NavLink className="nav-link active" aria-current="page" to={'/dashboard/manage-categories'}>Manage Categories</NavLink>
                      </li>
   
                  </ul>
                  <div>
                     <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                      <li className="nav-item">
                              <NavLink className="nav-link active" aria-current="page" onClick={()=>
                                  {
                                      setIsLogin(false)
                                      setUserId(null)
                                      navigateTo("/")
                                      }}>Logout</NavLink>
                      </li>
                           
                    </ul> 
                  </div>
                  </div>
              </div>
          </nav>
      </div>
    )
}
