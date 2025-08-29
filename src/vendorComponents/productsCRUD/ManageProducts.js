import React, { useContext, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { LoginContext } from '../../context/LoginContext'

export default function ManageProducts() {
  let [products, setProducts] = useState(null)
  let {userId}=useContext(LoginContext)
  let [isProductDeleted, setIsProductDeleted] = useState(false)
  const fetchAllProducts = async()=>
  {
    setIsProductDeleted(false)
    let response=await fetch(`http://localhost:8080/api/v1/products/${userId}`,{method:"post"})
    let responseObject=await response.json()
    setProducts(responseObject.data)
  }

  const deleteProduct = async(productId)=>
  {
    let response=await fetch(`http://localhost:8080/api/v1/products/${productId}`,{method:"delete"})
    let responseObject=await response.json()
    if(responseObject.data)
    {
      setIsProductDeleted(true)
    }
  }

  useEffect(()=>{fetchAllProducts()}, [isProductDeleted])
  
  return (
    <div>
      <h1 className='text-center text-primary'>Manage Your Products</h1>
      <div className='mt-3 d-flex justify-content-center'> 
                <table className="table w-75 table-hover table-bordered text-center ">
                  <thead>
                  <tr>
                      <th scope='col'>ID</th>
                      <th scope='col'>IMAGE</th>
                      <th scope='col'>NAME</th>
                      <th scope='col'>PRICE</th>
                      <th scope='col'>QUANTITY</th>
                      <th scope='col'>CATEGORY</th>
                      <th colSpan={2} scope='col'>ACTION</th>
                    </tr>  
                  </thead>
                  <tbody className='table-group-divider'>
                     {
                      products && products.map(product =>{
                        return <tr key={product.id}>
                                <td>{product.id}</td>
                                <td><img src={`http://localhost:8080/images/${product.imageName}`} alt="" height={50+"px"} width={50+"px"}/></td>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{product.quantity}</td>
                                <td>{product.category.name}</td>
                                <td><NavLink className='btn btn-warning' to={`/dashboard/update-product/${product.id}`}>Update</NavLink></td>
                                <td><button className='btn btn-danger' onClick={()=>{deleteProduct(product.id)}} >Delete</button></td>
                              </tr>
                      })
                     }
                  </tbody>
                </table>
            </div>
    </div>
  ) 
}
