import React from 'react'

export default function SortProducts(props) {
  const handleChange = (event) =>
  {
    props.onSortProductsByPrice(event.target.value)
  }
  return (
    <div>
      <select className="form-select" onChange={handleChange}>
            <option selected disabled>Sort Product By Price</option>
            <option value="desc">High to Low</option>
            <option value="asc">Low to High</option>
          </select>
    </div>
  )
}
