import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom';
const Form = (props) => {

    const [title, setTitle] = useState("");
    const [price, setPrice] = useState(0.00);
    const [description, setDescription] = useState("");
    const navigate = useNavigate();

    const [products, setProducts] = useState([])
    useEffect( () =>{
        axios.get("http://localhost:8000/api/products")
            .then(res => {
                setProducts(res.data);
            })
            .catch(err => {
                console.log("Something went wrong with axios call:", err)
            })
    }, [])

    const submitHandler = (e) => {
        e.preventDefault();
        const newProduct = {
            title, price, description
        }
        axios.post("http://localhost:8000/api/products", newProduct)
            .then(res => {
                console.log(res.data);
            })
            .catch(err => {
                console.log("Something went wrong: ", err)
            })
    }

    const navigatetoEditForm = (productId) => {
        navigate(`/edit/${productId}`)
    }

    const deleteProduct = (productId) =>{
        axios.delete(`http://localhost:8000/api/products/${productId}`)
            .then(response => {
                console.log(response.data);
                setProducts(products.filter(product => product._id !== productId));
            }).catch(err => {
                console.log(err);
            })
        
    }

  return (
    <div>
        <h1>Product Manager</h1>
        <h2>Create a New Product</h2>
        <form onSubmit={ submitHandler }>
          <div>
            <label>Title: </label> 
            <input name="title" type="text" onChange={ (e) => setTitle(e.target.value) } value={title}/>
            <label>Price: $</label> 
            <input name="price" type="number" step={0.01} onChange={ (e) => setPrice(e.target.value) } value={price}/>
            <label>Description: $</label> 
            <textarea name="description" onChange={ (e) => setDescription(e.target.value) } value={description}/>
          </div>
          <input type="submit" value="Create" />
        </form>
        <h2>All Products</h2>
            {
                products.map((product, idx) =>{
                    return (
                        <div key={idx}>
                            <Link to={`/${product._id}`} key={product._id}>{product.title}</Link><br></br>
                            <button onClick={(e) => navigatetoEditForm(product._id)}>Edit</button><button onClick={(e) => deleteProduct(product._id)}>Delete</button>
                        </div>
                    )
                })
            }        
    </div>
  )
}

export default Form