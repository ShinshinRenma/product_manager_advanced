import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import {Link, useParams, useNavigate} from 'react-router-dom';
const Form = (props) => {

    const [title, setTitle] = useState("");
    const [price, setPrice] = useState(0.00);
    const [description, setDescription] = useState("");
    const {id} = useParams();
    const [product, setProduct] = useState([])
    const navigate = useNavigate();
    useEffect( () =>{
        axios.get(`http://localhost:8000/api/products/${id}`)
            .then(res => {
                setTitle(res.data.product.title);
                setPrice(res.data.product.price);
                setDescription(res.data.product.description);
                setProduct(res.data.product);
                console.log(res.data.product)
            })
            .catch(err => {
                console.log("Something went wrong with axios call:", err)
            })
    }, [])

    const submitHandler = (e) => {
        e.preventDefault();
        const updatedProduct = {
            title, price, description
        }
        axios.put(`http://localhost:8000/api/products/${id}`, updatedProduct, )
            .then(res => {
                console.log(res.data);
                navigate("/");
            })
            .catch(err => {
                console.log("Something went wrong: ", err)
            })
    }

  return (
    <div>
        <h1>Product Manager</h1>
        <h2>Update Product</h2>
        <form onSubmit={ submitHandler }>
          <div>
            <label>Title: </label> 
            <input name="title" type="text" onChange={ (e) => setTitle(e.target.value) } value={title}/>
            <label>Price: $</label> 
            <input name="price" type="number" step={0.01} onChange={ (e) => setPrice(e.target.value) } value={price}/>
            <label>Description: $</label> 
            <textarea name="description" onChange={ (e) => setDescription(e.target.value) } value={description}/>
          </div>
          <input type="submit" value="Update" />
        </form>
    </div>
  )
}

export default Form