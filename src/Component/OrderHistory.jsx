import React, { useEffect, useState } from 'react';
import Header from './Header';

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = () => {
            const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
            setOrders(savedOrders);
        };
        fetchOrders();
    }, []);

    return (
        <div>
            <Header />
            <div className="container mx-auto">
                <h2 className="text-2xl font-bold my-6 text-center">Order History</h2>
                {orders.length === 0 ? (
                    <p className="text-center">No orders found.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {orders.map((order) => (
                            <div key={order.id} className="bg-white border rounded-lg shadow-lg p-4 transition-transform scale-100 transform hover:shadow-xl">
                                <h3 className="text-lg font-semibold">Order ID: {order.id}</h3>
                                <p className="text-gray-600">Date: {order.date}</p>
                                <p className="text-gray-800 font-bold">Total: ${order.total}</p>
                                <h4 className="text-md font-semibold mt-4">Items:</h4>
                                <ul className="list-disc pl-5">
                                    {order.items.map((item, index) => (
                                        <li key={index} className="text-gray-700">{item.name} - ${item.price}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrderHistory;
