import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function Form() {
  const navigate=useNavigate()
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [cat, setCat] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = async () => {
    await axios.post("http://localhost:2005/product/addProduct", { image,name, cat, price })
      .then((res) => {
        Swal.fire({
          title: res.data.msg,
          icon: "success",
        });
        setImage("");
        setName("");
        setCat("");
        setPrice("");
      });
      navigate("/showproduct")
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="w-full max-w-md p-8 bg-gray-900 rounded-2xl shadow-lg space-y-6">
        <h2 className="text-3xl font-bold text-center">Add Product</h2>

        <input
          type="text"
          placeholder="Product Image"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          placeholder="Product Category"
          value={cat}
          onChange={(e) => setCat(e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="number"
          placeholder="Product Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={handleSubmit}
          className="w-full py-2 mt-2 font-semibold rounded-lg bg-blue-600 hover:bg-blue-700 transition duration-200"
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default Form;
