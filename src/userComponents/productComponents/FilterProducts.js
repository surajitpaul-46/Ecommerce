import React, { useEffect, useState } from 'react'

export default function FilterProducts(props) {
    let [categories, setCategories]  = useState(null)
    const getAllCategries = async()=>
    {
        let response = await fetch("http://localhost:8080/api/v1/vendors/manage-categories")
        let responseObject=await response.json()
        console.log(responseObject);
        setCategories(responseObject.data)
    } 
    const handleChange = (event) =>{
        console.log(event.target.value);
        
            props.onFilterProductByCategory(event.target.value)
    }
    useEffect(()=>{getAllCategries()},[])
  return (
    <div>
        <select className="form-select" onChange={handleChange}>
            <option selected disabled>Click to select Category</option>
            <option value="all">All</option>
            {
              categories && categories.map(category =>{
                return <option value={category.name} key={category.id}>{category.name}</option>
              })
            } 
          </select>
    </div>
  )
} 
