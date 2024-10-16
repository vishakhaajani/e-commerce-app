import React, { useState, useEffect } from 'react';
import Header from './Header';
import { useNavigate } from 'react-router-dom';

const ShoppingCart = () => {
    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        setCartItems(cart);
    }, []);

    const handleRemove = (productId) => {

        const removeItem = cartItems.find(item => item.id === productId)

        const updatedCart = cartItems.filter(item => item.id !== productId);
        setCartItems(updatedCart);
        alert(`${removeItem.name} remove from cart!`)
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

     let totalPrice = 0;
     cartItems.forEach(item => {
         totalPrice += parseFloat(item.price); 
     });
     
     const formattedTotalPrice = totalPrice.toFixed(2);

    const handlePlaceOrder = () => {
        if (cartItems.length === 0) {
            alert('Your cart is empty.');
            return;
        }

        const orderDetails = {
            id: new Date().getTime(),
            date: new Date().toLocaleString(),
            total: totalPrice,
            items: cartItems,
        };

        const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
        existingOrders.push(orderDetails);
        localStorage.setItem("orders", JSON.stringify(existingOrders));

        alert('Order placed successfully!');
        localStorage.removeItem("cart");
        setCartItems([]);
        navigate('/orderhistory');
    };

    return (
        <div>
            <Header />
            <div className="container mx-auto">
                <h2 className="text-2xl font-bold my-6 text-center">Shopping Cart</h2>
                {cartItems.length === 0 ? (
                    <p className="text-center">Your cart is empty.</p>
                ) : (
                    <table className="w-1/2 mx-auto border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-300 px-4 py-2">Product Name</th>
                                <th className="border border-gray-300 px-4 py-2">Price</th>
                                <th className="border border-gray-300 px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map((item) => (
                                <tr key={item.id}>
                                    <td className="border border-gray-300 px-4 py-2">{item.name}</td>
                                    <td className="border border-gray-300 px-4 py-2">${item.price}</td>
                                    <td className="border border-gray-300 px-4 py-2 w-52 text-center">
                                        <button 
                                            onClick={() => handleRemove(item.id)} 
                                            className="bg-red-500 text-white px-4 py-2 rounded">
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            <tr className="bg-gray-100 font-bold ">
                                <td className="border border-gray-300 px-4 py-3 text-right">Total:</td>
                                <td className="border border-gray-300 px-4 py-3">${totalPrice}</td>
                                <td className="border border-gray-300 px-4 py-3 text-center">
                                    <div>
                                        <button 
                                            onClick={handlePlaceOrder} 
                                            className="bg-cyan-800 hover:bg-cyan-900 text-white px-6 py-2 rounded">
                                            Place Order
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default ShoppingCart;
