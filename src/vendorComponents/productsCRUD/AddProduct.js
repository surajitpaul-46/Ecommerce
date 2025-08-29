import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { LoginContext } from '../../context/LoginContext'

export default function AddProduct() {
  const {register, handleSubmit, formState}=useForm()
  let [categories, setCategories]  = useState(null)
  let {userId} =  useContext(LoginContext)
  
  let navigateTO=useNavigate()
  if(userId==null)
  {
    navigateTO("/")
  }
  const collectFormData = async (data)=>{
    const formData = new FormData();
    formData.append('product', JSON.stringify({
      name: data.name,
      price: data.price,
      quantity : data.quantity,
      user: { id: userId },
      category: { id: data.categoryId }
    }));
    formData.append('file', data.file[0]);
       let response = await fetch("http://localhost:8080/api/v1/products",
          {
              method:"post",
              body:formData
          })
        let responseObject=await response.json()
        console.log(responseObject);
 
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
                title: "Product added successfully"
              });
              navigateTO("/dashboard")

        
        
      
  }

  const getAllCategries = async()=>{
    let response = await fetch("http://localhost:8080/api/v1/vendors/manage-categories")
        let responseObject=await response.json()
        console.log(responseObject);
        setCategories(responseObject.data)

  }



  useEffect(()=>{getAllCategries()},[])
  return (

    <div className='d-flex justify-content-center'>
      <form className='w-25' onSubmit={handleSubmit(collectFormData)} encType="multipart/form-data">
        <h1 className='text-center mb-3'>Register</h1>
        {/* name  */}
        <div className="mb-3">
          <input type="text" className="form-control" placeholder='Product Name' 
          {...register("name", {required:true, minLength:3, maxLength:25})}/>
          <div className="form-text text-danger">
                {formState.errors.name?.type === "required" && 'Product Name is required'}
                {formState.errors.name?.type === "minLength" && 'Product Name must have min 3 characters'}
                {formState.errors.name?.type === "maxLength" && 'Product Name should not exceed 25 characters'}       
          </div>
        </div>
        
        {/* price  */}
        <div className="mb-3">
          <input type="number" className="form-control" placeholder='Product Price' 
          {...register("price", {required:true,min:10, max:1000})}/>
          <div className="form-text text-danger">
                {formState.errors.price?.type === "required" && 'Product Price is required'}
                {formState.errors.price?.type === "min" && 'Min product price should be 10'}
                 {formState.errors.price?.type === "min" && 'Min product price should be 1000'}
          </div>
        </div>

        {/* quantity  */}
        <div className="mb-3">
          <input type="number" className="form-control" placeholder='Product Quantity' 
          {...register("quantity", {required:true, min:10, max:1000})}/>
          <div className="form-text text-danger">
                {formState.errors.quantity?.type === "required" && 'Product Quantity is required'}
                {formState.errors.quantity?.type === "min" && 'Min product Quantity should be 10'}
                 {formState.errors.quantity?.type === "min" && 'Min product Quantity should be 1000'} 
          </div>
        </div>

        {/* categories  */}
        <div className="mb-3">
          <select className="form-select" {...register("categoryId", {required:true})}>
            <option value="">Click to select Category</option>
            {
              categories && categories.map(category =>{
                return <option value={category.id} key={category.id}>{category.name}</option>
              })
            } 
          </select>
          <div className="form-text text-danger">
                {formState.errors.categoryId?.type === "required" && 'Product Category is required'}
          </div>
        </div>

        {/* file */}
        <div className="mb-3">
          <input type="file" className="form-control" placeholder='Product Image' 
          {...register("file", {required:true})}/>
          <div className="form-text text-danger">
                {formState.errors.file?.type === "required" && 'Product Image is required'} 
          </div>
        </div>
        <button type="submit" className="btn btn-primary w-100">Submit</button>
      </form>
    </div>
  ) 
}
