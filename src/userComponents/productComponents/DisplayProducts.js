import React, { useContext, useState } from 'react'
import { LoginContext } from '../../context/LoginContext'
import { MemoryRouter, NavLink, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import ReactDOM from 'react-dom/client';


export default function DisplayProducts(props) {
  let products = props.productsValue
  let {userId,isLogin}=useContext(LoginContext)
  
  let navigateTo=useNavigate()
  let description = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi tempore rerum repellendus unde facere velit itaque rem, est aut odio non autem sit veritatis aperiam alias a tempora deserunt quas. Necessitatibus optio quasi consequuntur pariatur amet neque ea, incidunt, voluptatem totam doloremque dignissimos facilis harum. Adipisci, itaque exercitationem? Eius, molestias?"
  const addToCart = async(productId)=>
    {
      let data ={
        "user":{"id":userId},
        "product":{"id":productId},
        "quantity":1
      }
      if(isLogin)
      {
        //add to cart logic
        console.log(data);
        let response = await fetch("http://localhost:8080/api/v1/cart",
          {
              method:"post",
              headers:{"Content-Type":"application/json"},
              body:JSON.stringify(data)
          })
        let responseObject=await response.json()
        console.log(responseObject.data);
        if(responseObject.data)
        {
          //alert to show product added in the cart
           const Toast = Swal.mixin({
                          toast: true,
                          position: "top-end",
                          showConfirmButton: false,
                          timer: 3000,
                          timerProgressBar: true,
                          didOpen: (toast) => {
                            toast.onmouseenter = Swal.stopTimer;
                            toast.onmouseleave = Swal.resumeTimer;
                          }
                        });
                        Toast.fire({
                          icon: "success",
                          title: responseObject.message
                        });
                        props.onFetchCartItemsForPerticularUser(userId)
        }
        else if(responseObject.data === null)
        {
          //alert to show unable to add product in the cart
           const Toast = Swal.mixin({
                          toast: true,
                          position: "top-end",
                          showConfirmButton: false,
                          timer: 3000,
                          timerProgressBar: true,
                          didOpen: (toast) => {
                            toast.onmouseenter = Swal.stopTimer;
                            toast.onmouseleave = Swal.resumeTimer;
                          }
                        });
                        Toast.fire({
                          icon: "warning",
                          title: responseObject.message
                        });
        }
        else{
           const Toast = Swal.mixin({
                          toast: true,
                          position: "top-end",
                          showConfirmButton: false,
                          timer: 3000,
                          timerProgressBar: true,
                          didOpen: (toast) => {
                            toast.onmouseenter = Swal.stopTimer;
                            toast.onmouseleave = Swal.resumeTimer;
                          }
                        });
                        Toast.fire({
                          icon: "warning",
                          title: responseObject.message
                        });
        }

 
        

         
      }
      else
      {
        //sweet alert to login
        const Toast = Swal.mixin({
                        toast: true,
                        position: "top-end",
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                          toast.onmouseenter = Swal.stopTimer;
                          toast.onmouseleave = Swal.resumeTimer;
                        }
                      });
                      Toast.fire({
                        icon: "warning",
                        title: "Login required to add item",
                        footer: '<div id="custom-footer"></div>', // Placeholder container
                        didOpen: () => {
                          const footerEl = document.getElementById('custom-footer');
                          if (footerEl) {
                            const root = ReactDOM.createRoot(footerEl);
                            root.render(
                              <MemoryRouter>
                                <NavLink onClick={()=>{navigateTo("/login")}}>Click here to Login</NavLink>
                              </MemoryRouter>
                            );
                          }
                        }
                      });
      }

    }
  
  return (
    <div className='container'>
      <div className='row gy-3'>
        {
          products && products.map(product =>{
            return (
              <div className='col-3' key={product.id}>
                  <div className="card" style={{width:16+"rem"}}>
                      <img src={`http://localhost:8080/images/${product.imageName}`} className="card-img-top w-75 mx-auto d-block" alt="..."/>
                      <div className="card-body">
                        <h5 className="card-title text-capitalize text-center">{product.name}</h5>
                        <p className="card-text mb-0">{description.slice(0,50)}...</p>
                        <div className='d-flex justify-content-between'>
                          <p className="card-text">&#8377;{product.price}</p>
                          <p className="card-text mark">{product.category.name}</p>                     
                        </div>
                        <p className="card-text">Quantity left: {product.quantity}</p>
                        <div className='d-flex justify-content-between'>
                          <NavLink  className="btn btn-primary">View More</NavLink>
                          <button  className="btn btn-warning" onClick={()=>{addToCart(product.id)}}>Add to cart </button>
                        </div>
                      </div>
                  </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}
