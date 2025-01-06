import './App.css';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import { BrowserRouter as Router , Routes, Route } from "react-router-dom";
import Signup from './pages/signup';
import PrivateComponent from './components/PrivateComponent';
import Login from './pages/login';
import AddProduct from './pages/addproduct';
import Product from './pages/products';
import Update from './pages/update';

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>

        <Route element={<PrivateComponent/>}>

          <Route path='/' element={<Product />} />
          <Route path='/add-product' element={<AddProduct />} />
          <Route path='/update/:id' element={<Update />} />
          <Route path='/logout' element={<h1>Hello</h1>} />
          <Route path='/profile' element={<h1>Hello</h1>} />

        </Route>

        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
