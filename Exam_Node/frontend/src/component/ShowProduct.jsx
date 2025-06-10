// 

import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ShowProduct() {
  const [product, setProduct] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    await axios.get("http://localhost:2005/product/viewproduct")
      .then((res) => {
        setProduct(res.data.data);
      });
  };

  const deleteProduct = async (id) => {
    await axios.delete(`http://localhost:2005/product/deleteproduct?id=${id}`);
    const filterData = product.filter((el) => el._id !== id);
    setProduct(filterData);
  };

  const editProduct = (id) => {
    navigate(`/editproduct/${id}`);
  };

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <h1 className="text-3xl font-bold text-center mb-6">All Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {product.map((el, i) => (
          <div key={i} className="bg-gray-900 rounded-xl shadow-lg p-5 space-y-3 hover:shadow-2xl transition duration-300">
            <img src={el.image} alt="" className='h-[100px] w-[100px]' />
            <h2 className="text-xl font-semibold text-blue-400">{el.name}</h2>
            <p className="text-gray-400">Category: {el.cat}</p>
            <p className="text-green-400">Price: ₹{el.price}</p>
            <div className="flex justify-between mt-4">
              <button
                onClick={() => editProduct(el._id)}
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white"
              >
                Edit
              </button>
              <button
                onClick={() => deleteProduct(el._id)}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-white"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShowProduct;
