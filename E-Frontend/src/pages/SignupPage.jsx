import { useState } from "react";
import { Link} from "react-router-dom";
import API from "../api/Api";
import { useNavigate } from "react-router-dom";


const SignupPage =() =>{
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword ] = useState('');
    const [error,setError] = useState('');
    const [loading,setLoading] = useState(false);
const navigate = useNavigate();

    const handleSubmit = async (e) =>{
        e.preventDefault();
        setLoading(true);

          try{
            await API.post('/auth/signup',{name,email,password})
            navigate('/login');

          }catch(err){
            setError(err.response?.data?.msg || 'Signup failed. Please check your input fields or try again later');
          }
        };

    return(
         <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-md w-full max-w-md p-8">

        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold italic text-gray-800">
            Cara ✦
          </h1>
          <p className="text-gray-400 text-sm mt-2">
            Create your account and start shopping!
          </p>
        </div>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">
            {error}
          </div>
        )}




        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          {/* Name */}
          <div>
            <label className="text-sm font-medium text-gray-600 mb-1 block">
              Full Name
            </label>
            <input
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-teal-500 transition"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-600 mb-1 block">
              Email Address
            </label>
            <input
              type="email"
              placeholder="@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-teal-500 transition"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium text-gray-600 mb-1 block">
              Password
            </label>
            <input
              type="password"
              placeholder="*****"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-teal-500 transition"
              required
            />
          </div>

          {/* Submit */}
          
          <button
            type="submit"
            disabled={loading}
            className="bg-teal-600 text-white py-3 rounded-xl font-semibold hover:bg-teal-700 transition mt-2 disabled:opacity-50">
            {loading ? "Creating account..." : "Create Account"}
          </button>

        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-gray-400">or</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Login Link */}
        <p className="text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link to="/login" className="text-teal-600 font-semibold hover:underline">
            Login
          </Link>
        </p>

      </div>
    </div>

    )
}
export default SignupPage;

