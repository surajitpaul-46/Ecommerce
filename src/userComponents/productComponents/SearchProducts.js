import React from 'react'
import { useForm } from 'react-hook-form'

export default function SearchProducts(props) {
   const {register, handleSubmit, formState}=useForm()
   const collectFormData = async (data)=>{
    console.log(data);
    props.onSearchProductByName(data.name)
    
   }
  return (
    <div>
      <form  className="d-flex align-items-start gap-2" onSubmit={handleSubmit(collectFormData)}>
          <div className='d-flex flex-column'>
            <input type="text" className="form-control" placeholder='Product Name' 
            {...register("name", {required:true, minLength:3, maxLength:15})}/>
            <div className="form-text text-danger">
                  {formState.errors.name?.type === "required" && 'Product Name is required'}
                  {formState.errors.name?.type === "minLength" && 'Product Name must have min 3 characters'}
                  {formState.errors.name?.type === "maxLength" && 'Product Name should not exceed 10 characters'}       
            </div>
          </div>
        <button type="submit" className="btn btn-primary">Search</button>
        </form>
    </div>
  )
}
