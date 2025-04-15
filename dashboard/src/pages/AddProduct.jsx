import React, { useState } from 'react';
import Navbar from "./Navbar";
import { Box, TextField, Button } from '@mui/material';
import "./AddProduct.css";

function AddProduct() {
    const [product, setProduct] = useState({
        name: '',
        price: '',
        description: '',
        category: '',
        stock: '',
        imageUrl: ''
    });

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('http://localhost:5000/api/products', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product)
        });

        if (response.ok) {
            alert("Product added!");
            setProduct({ name: '', price: '', description: '', category: '', stock: '', imageUrl: '' });
        } else {
            alert("Failed to add product.");
        }
    };

    return (
        <div className="AddProduct-content">
            <Navbar />
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    width: '1200px',
                    margin: '0 auto',
                    padding: 2,
                    backgroundColor: 'white',
                    boxShadow: 2,
                    borderRadius: 2
                }}
                noValidate
                autoComplete="off"
            >
                <TextField
                    id="name"
                    name="name"
                    label="Name"
                    variant="outlined"
                    value={product.name}
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    id="price"
                    name="price"
                    label="Price"
                    variant="outlined"
                    type="number"
                    value={product.price}
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    id="description"
                    name="description"
                    label="Description"
                    variant="outlined"
                    value={product.description}
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    id="category"
                    name="category"
                    label="Category"
                    variant="outlined"
                    value={product.category}
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    id="stock"
                    name="stock"
                    label="Stock"
                    variant="outlined"
                    type="number"
                    value={product.stock}
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    id="imageUrl"
                    name="imageUrl"
                    label="Image URL"
                    variant="outlined"
                    value={product.imageUrl}
                    onChange={handleChange}
                    fullWidth
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{ marginTop: 2 }}
                >
                    Add Product
                </Button>
            </Box>
        </div>
    );
}

export default AddProduct;
