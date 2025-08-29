import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { NavLink } from 'react-router-dom'
import Swal from 'sweetalert2'

export default function ManageCategories() {
  const {register, handleSubmit, formState}=useForm()
  let [categories, setCategories]=useState(null)
  let [isNewcategoryAdded, setIsNewcategoryAdded]=useState(false)
  const collectFormData = async (formData)=>{
    setIsNewcategoryAdded(false)
    let response = await fetch("http://localhost:8080/api/v1/vendors/manage-categories",
      {
        method:"post",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(formData)
      })
          let responseObject=await response.json()
          console.log(responseObject);
          if(responseObject.data ===true)
          {
            // setUserAlredyExists(true)
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
                  title: "Category Alredy Exists"
                });
          }
          else
          {
            setIsNewcategoryAdded(true)
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
                  title: "Category Added"
                });
               
                //navigateTo("/dashboard/manage-categories")
  
          }
          
        
    }

  const fetchAllCategories = async() =>
  {
    console.log("isNewcategoryAdded" , isNewcategoryAdded)
    let response=await fetch("http://localhost:8080/api/v1/vendors/manage-categories")
    let responseObject=await response.json()
    setCategories(responseObject.data)
     
  }
  useEffect(()=>{fetchAllCategories()}, [isNewcategoryAdded])
  return (
    <div>
      <h1 className='text-center mb-3'>Manage Categories</h1>
      <div className='d-flex justify-content-center'>
        <form className='w-25' onSubmit={handleSubmit(collectFormData)}>
            <div className="mb-3">
              <input type="text" className="form-control" placeholder='Category Name' 
              {...register("name", {required:true, minLength:5, maxLength:10})}/>
              <div className="form-text text-danger">
                    {formState.errors.name?.type === "required" && 'category Name is required'}
                    {formState.errors.name?.type === "minLength" && 'category Name must have min 5 characters'}
                    {formState.errors.name?.type === "maxLength" && 'category Name should not exceed 10 characters'}       
              </div>
            </div>
            <button type="submit" className="btn btn-primary w-100">Submit</button>
        </form>
      </div>
      <div className='mt-3 d-flex justify-content-center'> 
          <table className="table w-50 table-hover table-bordered text-center ">
            <thead>
              <tr>
                <th scope='col'>ID</th>
                <th scope='col'>CATEGORY NAME</th>
                <th colSpan={3} scope='col'>ACTION</th>
              </tr>
            </thead>
            <tbody className='table-group-divider'>
              {
                categories && categories.map(category => {
                  return <tr key={category.id}>
                <th>{category.id}</th>
                <td>{category.name}</td>
                <td> <NavLink className='btn btn-primary'>Add Product</NavLink> </td>
                <td><NavLink className='btn btn-warning'>Update</NavLink></td>
                <td><NavLink className='btn btn-danger'>Delete</NavLink></td>
              </tr>
                })
              }
            </tbody>
          </table>
      </div>
    </div>
  ) 
}
