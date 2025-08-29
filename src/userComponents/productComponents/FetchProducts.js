import React, { useContext, useEffect, useState } from 'react'
import DisplayProducts from './DisplayProducts'
import SearchProducts from './SearchProducts'
import SortProducts from './SortProducts'
import FilterProducts from './FilterProducts'
import { LoginContext } from '../../context/LoginContext'

export default function FetchProducts() {
  let [products, setProducts]  = useState(null)
  let [filteredProducts, setFilteredProducts] = useState(null)
  let [cartQuantity, setCartQuantity] = useState(0)
  let {userId}=useContext(LoginContext)
  const fetchProducts = async() =>{
    let response = await fetch("http://localhost:8080/api/v1/products")
    let responseObject  = await response.json()
    setProducts(responseObject.data)
    setFilteredProducts(responseObject.data)
  }
  useEffect(()=>{fetchProducts()},[])

  const filterProductByCategory = (categoryName)=>
    {
        console.log(categoryName);
        if (categoryName === 'all')
        {
          setFilteredProducts(products)
        }
        else
          {
            let newProducts = [...products]
            let newFilteredProducts = newProducts.filter(product => {
              return product.category.name === categoryName
            })
            setFilteredProducts(newFilteredProducts)
        }
    }

    const sortProductsByPrice = (sortBy) =>
      {
        console.log(sortBy);
        let newProducts = [...filteredProducts]
        if(sortBy==='asc')
        {
          console.log(sortBy);
          
            let newFilteredProducts = newProducts.sort((p1,p2) => p1.price-p2.price)
            setFilteredProducts(newFilteredProducts)
        }
        else
        {
          console.log(sortBy);
          let newFilteredProducts = newProducts.sort((p1,p2) => p2.price-p1.price)
          setFilteredProducts(newFilteredProducts)
        }

      }

  const searchProductByName = (productName) =>{
    console.log(productName);
    
    let newProducts = [...filteredProducts]
    console.log(newProducts);
    
    let newFilteredProducts = newProducts.filter(product => 
            {
              return  product.name.toLowerCase().includes(productName.trim().toLowerCase())
            })
    console.log(newFilteredProducts);
    
    setFilteredProducts(newFilteredProducts)
  }
   
  console.log(userId);
  
  const fetchCartItemsForPerticularUser = async(userId)=>
  {
      if(userId===null)
      {
          setCartQuantity(0)
      }
      else
      {
          let response=await fetch(`http://localhost:8080/api/v1/cart/${userId}`)
          let responseObject=await response.json()
          console.log(responseObject.data);
          
          setCartQuantity(responseObject.data?.length)

      }
  }

  useEffect(()=>{fetchCartItemsForPerticularUser(userId)},[userId])

  return (
    <div>
      <div className='d-flex p-3 justify-content-evenly'>
        <FilterProducts onFilterProductByCategory={filterProductByCategory}/>
        <SearchProducts onSearchProductByName = {searchProductByName}/>
        <SortProducts onSortProductsByPrice = {sortProductsByPrice}/>
        <button type="button" class="btn btn-primary position-relative">
            <i class="bi bi-cart3"></i>
              <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {cartQuantity}
                <span class="visually-hidden">unread messages</span>
              </span>
        </button>
      </div>
      <DisplayProducts productsValue={filteredProducts}/>
    </div>
  )
}


{/* <DisplayProducts productsValue={filteredProducts} onFetchCartItemsForPerticularUser={fetchCartItemsForPerticularUser}/> */}