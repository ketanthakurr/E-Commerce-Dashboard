import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
const Products = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProduct();
    }, [])

    const getProduct = async() => {
        let result = await fetch('http://localhost:5000/products');
        result = await result.json();
        setProducts(result);
    }
    
    const deleteProduct = async (id) => {
        let result = await fetch(`http://localhost:5000/product/${id}` ,{
            method: "DELETE",
        });
        result = await result.json();
        if(result){
            getProduct();
        }
    }

    const handleSearch = async (e) => {
        console.log(e.target.value);
        let key = e.target.value;
        if(key){
            let result = await fetch(`http://localhost:5000/search/${key}`);
            result = await result.json();
            if(result){
                setProducts(result)
            }   
        }
        else{
            getProduct();
        }

    }

    console.warn(products)

  return (
    <div className='w-full text-white text-center mt-20 mb-10'>
        <h3 className='m-4 text-white text-2xl font-semibold'>Products</h3>

        <input type="text" placeholder='Search product' className='w-1/3 p-3 text-black px-5 m-12 rounded-lg' onChange={handleSearch} />

        <ul className=' m-auto flex justify-center w-2/3'>
            <li className=' w-2/3 border-2'>S.no</li>
            <li className=' w-2/3 border-2'>Name</li>
            <li className=' w-2/3 border-2'>Price</li> 
            <li className=' w-2/3 border-2'>Category</li>
            <li className=' w-2/3 border-2'>Company</li>
            <li className=' w-2/3 border-2'>Operation</li>
        </ul>
        {
            products.length > 0 ? products.map((item,index) =>
                <ul className=' m-auto flex justify-center w-2/3' key={item._id}>
                    <li className='w-2/3 text-white border-2 p-5'>{index + 1}</li>
                    <li className='w-2/3 text-white border-2 p-5'>{item.name}</li>
                    <li className='w-2/3 text-white border-2 p-5'>{item.price}</li> 
                    <li className='w-2/3 text-white border-2 p-5'>{item.category}</li>
                    <li className='w-2/3 text-white border-2 p-5'>{item.company}</li>
                    <li className='w-2/3 text-white border-2 p-5 '>
                    <button className='bg-red-500 p-2 rounded-md text-sm m-1' onClick={() => deleteProduct(item._id)}>Delete</button> 
                    <Link to={"/update/"+item._id} className='bg-blue-500 p-2 rounded-md text-sm m-1'>Update</Link>
                    </li>
                </ul>
            ) :

            <h1 className='p-4 text-xl font-semibold'>No product found</h1>
        }
    </div>
  )
}

export default Products