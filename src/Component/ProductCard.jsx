import React from "react";
import Header from "./Header";

const ProductCard = ({ product }) => {
    const handleAddToCart = () => {
        console.log(`Added ${product.name} to cart`);
    };

    return (
        <div>
            <Header />
            <div className="border rounded-lg p-4 bg-white shadow-md">
                <h3 className="text-xl font-bold">{product.name}</h3>
                <p className="text-gray-700">Price: ${product.price}</p>
                <p className={`text-${product.stock > 0 ? "green" : "red"}-500`}>
                    {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
                </p>
                <button
                    className="mt-4 bg-blue-500 text-white p-2 rounded"
                    onClick={handleAddToCart}
                    disabled={product.stock === 0}
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
