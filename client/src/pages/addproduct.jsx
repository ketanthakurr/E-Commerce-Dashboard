import { useState , useEffect} from "react";

function AddProduct () {

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");
    const [error, setError] = useState(false);

    const addProduct = async () => {
        // console.log(name, price, category, company);
        if(!name || !price || !category || !company){
            setError(true);
            return false;
        }
        const userId = JSON.parse(localStorage.getItem("user"))._id;
        // const id = (userId._id);
        let result = await fetch(("http://localhost:5000/add-product"),{
            method: "POST",
            body: JSON.stringify({name, price, category, userId,company}),
            headers: {
                "Content-Type" : "application/json"
            }
        });
        result = await result.json();
        console.log(result);

        setName("");
        setPrice("");
        setCategory("");
        setCompany("");
        setError(false);
        alert("New product added")
    }

    return(
        <div className="w-full">
            <h1 className="text-center text-2xl font-semibold my-8 text-white w-full">Add product</h1>
            <div className="flex m-auto flex-col w-1/3">
                <input type="text" className="p-2 m-1 rounded-md" placeholder="Product name" value={name} onChange={(e) => {setName(e.target.value)}}/>
                {error && !name && <p className="text-sm px-2 mb-3 text-red-500">Enter valid name</p>}
                <input type="text" className="p-2 m-1 rounded-md" placeholder="Price" value={price} onChange={(e) => {setPrice(e.target.value)}}/>
                {error && !price && <p className="text-sm px-2 mb-3 text-red-500">Enter valid price</p>}
                <input type="text" className="p-2 m-1 rounded-md" placeholder="Category" value={category} onChange={(e) => {setCategory(e.target.value)}}/>
                {error && !category && <p className="text-sm px-2 mb-3 text-red-500">Enter valid category</p>}
                <input type="text" className="p-2 m-1 rounded-md" placeholder="Brand" value={company} onChange={(e) => {setCompany(e.target.value)}}/>
                {error && !company && <p className="text-sm px-2 mb-3 text-red-500">Enter valid company</p>}
                <button className="p-2 m-1 bg-blue-500 rounded-md" onClick={addProduct}>Submit</button>
            </div>

        </div>
    )
}

export default AddProduct;