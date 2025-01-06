import React, { useEffect } from 'react'
import { useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Update() {
        const navigate = useNavigate();
        const [name, setName] = useState("");
        const [price, setPrice] = useState("");
        const [category, setCategory] = useState("");
        const [company, setCompany] = useState("");
        const params = useParams();

        useEffect(() => {
            console.log(params);
            getProducts();
        }, [])

        const getProducts = async () => {
            console.log(params)
            let result = await fetch(`http://localhost:5000/product/${params.id}`)
            result = await result.json();
            setName(result.name)
            setPrice(result.price)
            setCategory(result.category)
            setCompany(result.company)
        } 

        const updateProduct = async () => {
            let result = await fetch(`http://localhost:5000/product/${params.id}`, {
                method: "PUT",
                body: JSON.stringify({name,price,company,category}),
                headers: {
                    "Content-Type" : "application/json"
                }
            });
            result = await result.json();
            navigate('/')
        }
    
  return (
    <div className="w-full">
    <h1 className="text-center text-2xl font-semibold my-8 text-white w-full">Add product</h1>
    <div className="flex m-auto flex-col w-1/3">
        <input type="text" className="p-2 m-1 rounded-md" placeholder="Product name" value={name} onChange={(e) => {setName(e.target.value)}}/>
        <input type="text" className="p-2 m-1 rounded-md" placeholder="Price" value={price} onChange={(e) => {setPrice(e.target.value)}}/>
        <input type="text" className="p-2 m-1 rounded-md" placeholder="Category" value={category} onChange={(e) => {setCategory(e.target.value)}}/>
        <input type="text" className="p-2 m-1 rounded-md" placeholder="Brand" value={company} onChange={(e) => {setCompany(e.target.value)}}/>
        <button className="p-2 m-1 bg-blue-500 rounded-md" onClick={updateProduct}>Submit</button>
    </div>

</div>
  )
}

export default Update