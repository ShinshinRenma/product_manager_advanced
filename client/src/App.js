import './App.css';
import React, {useEffect, useState} from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Form from './components/Form';
import Display from './components/Display';
import EditForm from './components/EditForm'; 


function App() {
    
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

    return (

        <div className="App">
            <Routes>
                <Route path="/" element={<Form />}/>
                <Route path="/:id" element={<Display />}/>
                <Route path="/edit/:id" element={<EditForm />}/>   
            </Routes> 
        </div>
        
  );
}

export default App;
