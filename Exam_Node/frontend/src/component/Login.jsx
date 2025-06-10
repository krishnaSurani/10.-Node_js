// import axios from 'axios';
// import { useState } from 'react'
// import Swal from 'sweetalert2';
// import { Link, useNavigate } from 'react-router-dom'

// function Login() {
//   const [email,setEmail]=useState("")
//   const [password,setPassword]=useState("");
//   const navigate=useNavigate();
//   const handleLogin=async()=>{
//     await axios.post("http://localhost:2005/login",{email,password})
//     .then((res)=>{
//       console.log(res.data);
//        Swal.fire({
//               title: res.data.msg,
//               icon: "success",
//             });
//              if(res.data.code == 1804)
//              {
//               navigate("/register");
//              }
//              else if(res.data.code==1612)
//              {
//               navigate("/dashboard");
//              }
//              else{
//               navigate("/");
//               setPassword("")
//              }
//     })
//   }
//   return (
//     <div>
//         <h2>Login</h2>
//         <input type="text" placeholder='enter your email'
//          onChange={(e)=>{
//           return setEmail(e.target.value)
//         }} value={email} name="email" id="email" />
//         <input type="text" placeholder='enter your password'
//           onChange={(e)=>{
//             return setPassword(e.target.value)
//           }}
//         value={password} name="password" id="password" />
//         <button onClick={handleLogin}>Log in</button>
//         <Link to="/register"><p>Register here</p></Link>
//     </div>
//   )
// }

// export default Login


import axios from 'axios';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    await axios.post("http://localhost:2005/login", { email, password })
      .then((res) => {
        // console.log(res.data);
        Swal.fire({
          title: res.data.msg,
          icon: "success",
        });
        if (res.data.code === 1804) {
          navigate("/register");
        } else if (res.data.code === 1612) {
          navigate("/dashboard");
          localStorage.setItem("token",res.data.token);
        } else {
          navigate("/");
          setPassword("");
        }
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-900 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-center">Login</h2>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Enter your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Enter your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={handleLogin}
          className="w-full py-2 mt-4 font-semibold rounded-lg bg-blue-600 hover:bg-blue-700 transition duration-200"
        >
          Log in
        </button>

        <p className="text-center mt-4">
          Don’t have an account?{' '}
          <Link to="/register" className="text-blue-400 hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
