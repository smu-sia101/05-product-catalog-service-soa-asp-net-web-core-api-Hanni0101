import React, { useEffect, useState } from 'react';
import Navbar from "./Navbar";
import "./ProductList.css";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TextField, Modal, Box, Button, Typography, TablePagination } from '@mui/material';

function ProductList() {
    const [products, setProducts] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(6);

    const fetchProducts = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/products');
            const data = await res.json();
            setProducts(data);
        } catch (error) {
            console.error("Failed to fetch products:", error);
        }
    };

    const deleteProduct = async (id) => {
        if (window.confirm("Delete this product?")) {
            await fetch(`http://localhost:5000/api/products/${id}`, {
                method: 'DELETE'
            });
            fetchProducts(); 
        }
    };

    const handleOpen = (product) => {
        setSelectedProduct({ ...product });
        setOpen(true);
    };

    const handleClose = () => {
        setSelectedProduct(null);
        setOpen(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSelectedProduct(prev => ({ ...prev, [name]: value }));
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleUpdate = async () => {
        try {
            await fetch(`http://localhost:5000/api/products/${selectedProduct._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(selectedProduct)
            });
            fetchProducts();
            handleClose();
        } catch (error) {
            console.error("Failed to update product:", error);
        }
    };

    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '1px solid #ccc',
        boxShadow: 24,
        p: 4,
        borderRadius: 2,
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className="ProductList-content">
            <Navbar />
            <div className="ProductList-Table">
                <TableContainer component={Paper} sx={{ mb: 2 }}>
                    <Table sx={{ minWidth: 650, tableLayout: 'fixed' }} aria-label="product table">
                        <TableHead>
                            <TableRow className="table-header">
                                <TableCell width="80px">Image</TableCell>
                                <TableCell width="150px">Name</TableCell>
                                <TableCell width="250px">Description</TableCell>
                                <TableCell width="120px">Category</TableCell>
                                <TableCell width="100px" align="right">Price (₱)</TableCell>
                                <TableCell width="80px" align="right">Stock</TableCell>
                                <TableCell width="100px" align="center">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {products
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((product) => (
                                <TableRow 
                                    key={product._id}
                                    sx={{ '&:hover': { backgroundColor: '#f5f5f5' } }}
                                >
                                    <TableCell>
                                        <img
                                            src={product.imageUrl}
                                            alt={product.name}
                                            className="product-image"
                                            style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <div className="name-cell truncated-text" data-full-text={product.name}>
                                            {product.name}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="description-cell truncated-text" data-full-text={product.description}>
                                            {product.description}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="category-cell truncated-text" data-full-text={product.category}>
                                            {product.category}
                                        </div>
                                    </TableCell>
                                    <TableCell align="right" sx={{ fontWeight: 500 }}>
                                        ₱{product.price.toLocaleString()}
                                    </TableCell>
                                    <TableCell 
                                        align="right"
                                        sx={{ 
                                            color: product.stock < 10 ? 'error.main' : 'inherit',
                                            fontWeight: product.stock < 10 ? 'bold' : 'normal'
                                        }}
                                    >
                                        {product.stock}
                                    </TableCell>
                                    <TableCell align="center">
                                        <EditIcon
                                            style={{ cursor: 'pointer', marginRight: '10px', color: '#1976d2' }}
                                            onClick={() => handleOpen(product)}
                                        />
                                        <DeleteIcon
                                            style={{ cursor: 'pointer', color: '#d32f2f' }}
                                            onClick={() => deleteProduct(product._id)}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                
                <TablePagination
                    component="div"
                    count={products.length}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    rowsPerPageOptions={[5, 10, 25]}
                />
            </div>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="edit-product-modal"
            >
                <Box sx={modalStyle}>
                    <Typography variant="h6" sx={{ mb: 2, color: '#1976d2' }}>Edit Product</Typography>
                    {selectedProduct && (
                        <>
                            <TextField
                                fullWidth
                                label="Name"
                                name="name"
                                value={selectedProduct.name}
                                onChange={handleInputChange}
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                fullWidth
                                label="Description"
                                name="description"
                                value={selectedProduct.description}
                                onChange={handleInputChange}
                                sx={{ mb: 2 }}
                                multiline
                                rows={2}
                            />
                            <TextField
                                fullWidth
                                label="Category"
                                name="category"
                                value={selectedProduct.category}
                                onChange={handleInputChange}
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                fullWidth
                                label="Price"
                                name="price"
                                type="number"
                                value={selectedProduct.price}
                                onChange={handleInputChange}
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                fullWidth
                                label="Stock"
                                name="stock"
                                type="number"
                                value={selectedProduct.stock}
                                onChange={handleInputChange}
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                fullWidth
                                label="Image URL"
                                name="imageUrl"
                                value={selectedProduct.imageUrl}
                                onChange={handleInputChange}
                                sx={{ mb: 3 }}
                            />
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                                <Button 
                                    onClick={handleClose}
                                    variant="outlined"
                                    color="inherit"
                                >
                                    Cancel
                                </Button>
                                <Button 
                                    variant="contained" 
                                    onClick={handleUpdate}
                                    color="primary"
                                >
                                    Save Changes
                                </Button>
                            </Box>
                        </>
                    )}
                </Box>
            </Modal>
        </div>
    );
}

export default ProductList;
