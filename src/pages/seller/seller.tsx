import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './seller.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

interface Product {
  _id?: string;
  title: string;
  description: string;
  price: number;
  category: string;
}

const AdminProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState<Product>({
    title: '',
    description: '',
    price: 0,
    category: '',
  });
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [updatingProduct, setUpdatingProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/v1/products');
      setProducts(response.data.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleCreateProduct = async () => {
    
    try {
      if (!newProduct.title || !newProduct.description || isNaN(newProduct.price ) ||!newProduct.category)
       {        console.error('All fields are required.');
        return;
      }
  
      await axios.post('http://localhost:8000/api/v1/products', {
        title: newProduct.title,
        description: newProduct.description,
        price: newProduct.price,
        category: newProduct.category,

      });

      setNewProduct({
        title: '',
        description: '',
        price: 0,
        category: ''
      });
      fetchProducts();
      setIsCreating(false);
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };
  

  const handleDeleteProduct = async (id: string) => {
    try {
      await axios.delete(`http://localhost:8000/api/v1/products/${id}`);
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleUpdateProduct = (product: Product) => {
    setUpdatingProduct(product);
  };

  const handleSaveUpdateProduct = async () => {
    try {
      if (updatingProduct) {
        await axios.put(`http://localhost:8000/api/v1/products/${updatingProduct._id}`, updatingProduct);
        fetchProducts();
        setUpdatingProduct(null);
      }
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <div className="container">
      <h2>Manage Products</h2>
      <div>
        <FontAwesomeIcon icon={faPlus} className="icon" onClick={() => setIsCreating(true)}/>
         Create New Product
      </div>
      <div>
        {isCreating ? (
          <div className="form-group">
            <h3>Add New Product</h3>
            <input
              className="input-field"
              type="text"
              placeholder="Title"
              value={newProduct.title}
              onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
            />
             <input
              className="input-field"
              type="text"
              placeholder="Category"
              value={newProduct.category}
              onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
            />
            <textarea
              className="input-field"
              placeholder="Description"
              value={newProduct.description}
              onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
            ></textarea>
            <input
              className="input-field"
              type="number"
              placeholder="Price"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: parseInt(e.target.value) })}
            />
            <button className="button" onClick={handleCreateProduct}>Create Product</button>
            <button className="button cancel-button" onClick={() => setIsCreating(false)}>Cancel</button>
          </div>
        ) : (   
         <br />
        )}
      </div>
        {updatingProduct ? (
          <div className="form-group">
            <h3>Edit Product</h3>
            <input
              className="input-field"
              type="text"
              placeholder="Title"
              value={updatingProduct.title}
              onChange={(e) => setUpdatingProduct({ ...updatingProduct, title: e.target.value })}
            />
               <input
              className="input-field"
              type="text"
              placeholder="Category"
              value={updatingProduct.category}
              onChange={(e) => setUpdatingProduct({ ...updatingProduct, category: e.target.value })}
            />
            <textarea
              className="input-field"
              placeholder="Description"
              value={updatingProduct.description}
              onChange={(e) => setUpdatingProduct({ ...updatingProduct, description: e.target.value })}
            ></textarea>
            <input
              className="input-field"
              type="number"
              placeholder="Price"
              value={updatingProduct.price}
              onChange={(e) => setUpdatingProduct({ ...updatingProduct, price: parseInt(e.target.value) })}
            />
            <button className="button" onClick={handleSaveUpdateProduct}>
              save
            </button>
            <button className="button cancel-button" onClick={() => setUpdatingProduct(null)}>
              cancel
            </button>
          </div>
        ) : (
          <h3>List of Products</h3>
        )}
        <div className="list-wrapper">
          <ul className="list">
            {products.map((product) => (
              <li key={product._id} className="list-item">
                <span>{product.title}</span>
                <div>
                    <FontAwesomeIcon icon={faTrash} className="icon" onClick={() => product._id && handleDeleteProduct(product._id)}/>
                    <FontAwesomeIcon icon={faPen} className="icon" onClick={() => product._id && handleUpdateProduct(product)}/>
                </div>
              </li>
            ))}
          </ul>
        </div>
    </div>
  );
};

export default AdminProducts;
