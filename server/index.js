const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const ProductController = require('./controller/ProductController');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/ProductCatalog', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.get('/api/products', ProductController.getAllProducts);
app.get('/api/products/:id', ProductController.getProductById);
app.post('/api/products', ProductController.createProduct);
app.put('/api/products/:id', ProductController.updateProduct);
app.delete('/api/products/:id', ProductController.deleteProduct);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
