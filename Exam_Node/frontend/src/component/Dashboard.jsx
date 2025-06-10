import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbarcode from './Navbarcode';

function Dashboard() {
  const navigate=useNavigate();
  useEffect(()=>{
    if(!localStorage.getItem("token"))
    {
      navigate("/");
    }
    else{
      fetchAdmin()
    }
  },[])

  const fetchAdmin=async()=>{
    let token=localStorage.getItem("token")
    await axios.get("http://localhost:2005/allAdmin",{
      headers:{
        Authorization:token
      }
    }).then((res)=>{
      console.log(res);
    })
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbarcode></Navbarcode>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>        
      </div>
    </div>
  );
}

export default Dashboard;
