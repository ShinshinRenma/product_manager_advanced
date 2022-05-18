import React from 'react'
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react';

const Display = (props) => {

    const {id} = useParams();
    const [productData, setProductData] = useState({});
    const navigate = useNavigate();
    
    useEffect(()=>{
        axios.get(`http://localhost:8000/api/products/${id}`)
            .then(response => {
                console.log(response.data);
                setProductData(response.data.product);
                console.log(productData.data);
            }).catch(err=>{
                console.log(err);
            })
    },[])

    const navigatetoEditForm = (productId) => {
        navigate(`/edit/${productId}`)
    }

    const deleteProduct = (productId) => {
        axios.delete(`http://localhost:8000/api/products/${productId}`)
            .then(response => {
                console.log(response.data);
            }).catch(err => {
                console.log(err);
            })
        navigate("/");
    }

  return (
        <div>
            <h2>{productData.title}<button onClick={(e) => navigatetoEditForm(productData._id)}>Edit</button><button onClick={(e) => deleteProduct(productData._id)}>Delete</button></h2>
            <h6>${productData.price}</h6>
            <h6>{productData.description}</h6>
        </div>
    
  )
}

export default Display