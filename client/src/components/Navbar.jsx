import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Navbar() {
    const auth = localStorage.getItem('user');
    const navigate = useNavigate();
    const logoutFunction = () =>{
        localStorage.clear();
        navigate('/');
    }
    
    return (
    
        <div className="flex fixed w-full top-0 bg-blue-300 justify-between center shadow-md">
            <img src="https://nmgprod.s3.amazonaws.com/media/files/77/79/777972aa95a5599e872d727616925b9d/cover_image_1698325190.jpeg" className="h-12 w-12 m-1 mx-12 rounded-full" alt=""/>
            {
                auth ? 
                <>
                    <ul className="flex p-4 gap-x-6">
                        <li>
                            <Link to="/" className="text-white px-3" >Products</Link>
                        </li>
                        <li>
                            <Link to="/add-product" className="text-white px-3" >Add Product</Link>
                        </li>
                        <li>
                            <Link to="/update" className="text-white px-3" >Update Product</Link>
                        </li>
                        <li>
                            <Link to="/profile" className="text-white px-3" >Profile</Link>
                        </li>
                    </ul>
                        <Link to="/signup" className="text-white px-3 p-4" onClick={logoutFunction}><span className="text-red-500 font-semibold ">Logout</span>  {JSON.parse(auth).name} </Link>

                </> :
                    <ul className="flex justify-end w-full gap-x-6 mr-">
                        <Link to="/signup" className="text-white px-3 p-4" >Signup</Link>
                        <Link to="/login" className="text-white px-3 p-4" >Login</Link>
                    </ul>
            }
        </div>
    );
}

export default Navbar;
