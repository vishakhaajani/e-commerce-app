import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({ name: '', price: '', stock: '' }); 
    const [editProduct, setEditProduct] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("http://localhost:5000/product");
                setProducts(response.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchProducts();
    }, []);

    const handleDelete = async (productId) => {
        try {
            await axios.delete(`http://localhost:5000/product/${productId}`);
            setProducts(products.filter((product) => product.id !== productId));
            alert("Product delete successfully!")
        } catch (err) {
            console.error(err);
        }
    };

    const handleAddProduct = async (e) => {
        e.preventDefault();
        if (!newProduct.name || !newProduct.price || !newProduct.stock) {
            alert('Please fill in all fields');
            return;
        }
        try {
            const response = await axios.post("http://localhost:5000/product", newProduct);
            setProducts([...products, response.data]);
            alert("Product add successfully!")
            navigate('/home');
            setNewProduct({ name: '', price: '', stock: '' }); 
        } catch (err) {
            console.error(err);
        }
    };

    const handleUpdateProduct = async (e) => {
        e.preventDefault();
        if (!editProduct.name || !editProduct.price || !editProduct.stock) {
            alert('Please fill in all fields');
            return;
        }
        try {
            const response = await axios.put(`http://localhost:5000/product/${editProduct.id}`, editProduct);
            setProducts(products.map(product => (product.id === editProduct.id ? response.data : product)));
            alert("Product update Successfully!");
            setEditProduct(null);
            setNewProduct({ name: '', price: '', stock: '' });
        } catch (err) {
            console.error("Error updating product:", err);
        }
    };

    return (
        <div>
            <Header />
            <div className="container mx-auto">
                <h2 className="text-2xl text-center font-bold my-5">{editProduct ? 'Update Product' : 'Add New Product'}</h2>

                <div className='w-1/2 mx-auto p-10 shadow-2xl mb-10'>
                    <form onSubmit={editProduct ? handleUpdateProduct : handleAddProduct} className="w-full">
                        <div className="mb-4">
                            <input
                                type="text"
                                placeholder="Product Name"
                                className="border p-2 rounded w-full"
                                value={editProduct ? editProduct.name : newProduct.name}
                                onChange={(e) => editProduct ? setEditProduct({ ...editProduct, name: e.target.value }) : setNewProduct({ ...newProduct, name: e.target.value })}
                            />
                        </div>
                        <div className="mb-4">
                            <input
                                type="number"
                                placeholder="Product Price"
                                className="border p-2 rounded w-full"
                                value={editProduct ? editProduct.price : newProduct.price}
                                onChange={(e) => editProduct ? setEditProduct({ ...editProduct, price: e.target.value }) : setNewProduct({ ...newProduct, price: e.target.value })}
                            />
                        </div>
                        <div className="mb-4">
                            <input
                                type="number"
                                placeholder="Product Stock"
                                className="border p-2 rounded w-full"
                                value={editProduct ? editProduct.stock : newProduct.stock}
                                onChange={(e) => editProduct ? setEditProduct({ ...editProduct, stock: e.target.value }) : setNewProduct({ ...newProduct, stock: e.target.value })}
                            />
                        </div>
                        <button type="submit" className={`text-white bg-cyan-800 hover:bg-cyan-900 px-4 py-2 rounded`}>
                            {editProduct ? 'Update Product' : 'Add Product'}
                        </button>
                    </form>
                </div>

                <h3 className="text-xl font-bold mb-6">Manage Products</h3>
                <table className="min-w-full border border-gray-300 mb-10">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-300 px-4 py-2">Product Name</th>
                            <th className="border border-gray-300 px-4 py-2">Price</th>
                            <th className="border border-gray-300 px-4 py-2">Stock</th>
                            <th className="border border-gray-300 px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id}>
                                <td className="border border-gray-300 px-4 py-2">{product.name}</td>
                                <td className="border border-gray-300 px-4 py-2">${product.price}</td>
                                {
                                    product.stock < 5
                                     ? (<td className="border border-gray-300 px-4 py-2 text-red-700">{product.stock} in stock (Low stock need Restocking)</td>) 
                                     : (<td className="border border-gray-300 px-4 py-2">{product.stock} in stock</td>)
                                }
                                <td className="border border-gray-300 px-4 py-2 w-60 text-center">
                                    <button
                                        onClick={() => setEditProduct(product)}
                                        className="bg-yellow-500 text-white px-4 py-2 rounded mr-2">Update</button>
                                    <button onClick={() => handleDelete(product.id)} className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminPanel;
