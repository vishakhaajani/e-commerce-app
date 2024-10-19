import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {

  return (
    <header className="bg-cyan-900 text-white py-4 px-20">
      <nav className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">My E-Commerce App</h1>
        <ul className="flex space-x-4">
          <li>
            <NavLink 
              to="/home" 
              className={({ isActive }) => (isActive ? "text-yellow-500" : "text-white")}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/cart" 
              className={({ isActive }) => (isActive ? "text-yellow-500" : "text-white")}
            >
              Shopping Cart
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/orderhistory" 
              className={({ isActive }) => (isActive ? "text-yellow-500" : "text-white")}
            >
              Order History
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/admin" 
              className={({ isActive }) => (isActive ? "text-yellow-500" : "text-white")}
            >
              Admin Panel
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
