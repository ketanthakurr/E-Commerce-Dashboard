import { useEffect, useState } from "react";
import { Navigate, useNavigate } from 'react-router-dom'
function Signup() {
    const[name, setName] = useState("");
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const navigate = useNavigate();
    

    useEffect (() => {
        const auth = localStorage.getItem('user');
        if(auth){
            navigate('/');
        }

    },[])

    const collectForm = async () => {
        console.log(name, email, password);
        let result = await fetch('http://localhost:5000/register',{
            method: 'POST',
            body: JSON.stringify({name, email, password}),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        result = await result.json();
        console.warn(result);
        localStorage.setItem("user", JSON.stringify(result));
        navigate('/');
        
    }

    return (
        <div className="flex flex-col w-60 m-auto">
            <h1 className="text-white py-2 font-bold text-2xl">Register</h1>
            <input
                type="text"
                placeholder="Name"
                className="p-1 m-1"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Email"
                className="p-1 m-1"
                value={email}
                onChange={(e) => setEmail(e.target.value)}

            />
            <input
                type="text"
                placeholder="Password"
                className="p-1 m-1"
                value={password}
                onChange={(e) => setPassword(e.target.value)}

            />

            <button className="
            bg-blue-500 w-24 p-1 m-1 font-semibold text-white"
            onClick={collectForm}>Sign up</button>
        </div>
    )
}

export default Signup;