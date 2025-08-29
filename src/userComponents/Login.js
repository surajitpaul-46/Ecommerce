import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2'
import { LoginContext } from '../context/LoginContext'
import { useNavigate } from 'react-router-dom'
export default function Login() {
  const {register, handleSubmit, formState}=useForm()
  let {setIsLogin,setUserId} =  useContext(LoginContext)
  let navigateTo=useNavigate()
    const collectFormData = async (formData)=>
    {
        console.log(formData);
        let response = await fetch("http://localhost:8080/api/v1/users/login",
          {
              method:"post",
              headers:{"Content-Type":"application/json"},
              body:JSON.stringify(formData)
          })
        let responseObject=await response.json()
        console.log(responseObject);
        if(responseObject.data===null)
        {
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
                          icon: "success",
                          title: responseObject.message
                        });
                        setIsLogin(true)
                        setUserId(responseObject.data.id)
                        if(responseObject.data.userType==='user')
                        {
                            navigateTo("/")
                        }
                        else
                        {
                          navigateTo("/dashboard")
                        }
                        

        }
        
    }
  return (
    <div className='d-flex justify-content-center'>
      <form className='w-25' onSubmit={handleSubmit(collectFormData)}>
        <h1 className='text-center mb-3'>Login</h1>

        {/* email  */}
        <div className="mb-3">
          <input type="email" className="form-control" placeholder='Your Email' 
          {...register("email", {required:true,pattern:/^[^\s@]+@[^\s@]+\.[^\s@]+$/})}/>
          <div className="form-text text-danger">
                {formState.errors.email?.type === "required" && 'Email is required'}
                {formState.errors.email?.type === "pattern" && 'Enter valid email'}
          </div>
        </div>

        {/* password  */}
        <div className="mb-3">
          <input type="password" className="form-control" placeholder='Your Password' 
          {...register("password", {required:true, minLength:3, maxLength:10})}/>
          <div className="form-text text-danger">
                {formState.errors.password?.type === "required" && 'Password is required'}
                {formState.errors.password?.type === "minLength" && 'Password must have min 3 characters'}
                {formState.errors.password?.type === "maxLength" && 'Password should not exceed 10 characters'}       
          </div>
        </div>

        <button type="submit" className="btn btn-primary w-100">Submit</button>
      </form>
    </div>
  )
}
