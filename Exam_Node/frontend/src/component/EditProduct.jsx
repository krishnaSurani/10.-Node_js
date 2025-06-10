import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

function EditProduct() {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [cat, setCat] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:2005/product/viewproduct`).then((res) => {
      const product = res.data.data.find((el) => el._id === id);
      if (product) {
        setImage(product.image);
        setName(product.name);
        setCat(product.cat);
        setPrice(product.price);
      }
    });
  }, [id]);

  

  const handleUpdate = async () => {
    await axios
      .put(`http://localhost:2005/product/updateproduct?id=${id}`, {
        image,
        name,
        cat,
        price,
      })
      .then((res) => {
        Swal.fire({
          title: res.data.msg,
          icon: "success",
        });
        navigate("/showproduct");
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="bg-gray-900 p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6">Edit Product</h2>

        <div className="space-y-4">
           <input
            type="text"
            placeholder="Product Image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Product Category"
            value={cat}
            onChange={(e) => setCat(e.target.value)}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Product Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={handleUpdate}
            className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-200"
          >
            Update Product
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditProduct;
