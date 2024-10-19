import React, { useEffect, useState } from 'react';
import Header from './Header';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch products from localStorage
        const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
        setProducts(storedProducts);
    }, []);

    const addToCart = (product) => {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.push(product);
        localStorage.setItem("cart", JSON.stringify(cart));
        alert(`${product.name} added to cart`);
        navigate('/cart');
    };

    return (
        <div className="min-h-screen">
            <Header />
            <div className="container mx-auto px-20">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-10">
                    {products.map((product) => (
                        <div 
                            key={product.id} 
                            className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105">
                            <div className="p-4">
                                <h3 className="text-lg font-semibold">{product.name}</h3>
                                <p className="mt-2 text-gray-700">Price: ${product.price}</p>
                                <p className="mt-2 text-gray-700">Stock: {product.stock} in stock</p>
                            </div>
                            <div className="p-4 bg-gray-100">
                                <button 
                                    className="w-full bg-cyan-800 text-white px-4 py-2 rounded transition-colors hover:bg-cyan-900"
                                    onClick={() => addToCart(product)}
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
