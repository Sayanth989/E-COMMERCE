
import { useState } from "react";
import { Form, Navigate } from "react-router-dom";
import API from "../api/Api";
import  {useNavigate } from "react-router-dom";




const AdminAddProduct = ()=>{
  const  navigate = useNavigate();

    const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    image: null
  });
 const [error, setError] = useState('');

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    setForm({ ...form, image: file });
    setPreview(URL.createObjectURL(file));
  };



const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError("");

  try {
    // use FormData because we have image file
    const formData = new FormData();
    console.log(formData)
    formData.append('name', form.name);
    formData.append('description', form.description);
    formData.append('price', form.price);
    formData.append('stock', form.stock);
    formData.append('category', form.category);
    if (form.image) {
      formData.append('image', form.image);
    }
    console.log(form.image)

    await API.post('/products', formData, {
     
    });

    navigate('/admin/products'); // go back to products list
  } catch (err) {
    setError(err.response?.data?.msg || 'Failed to add product');

  } finally {
    setLoading(false);
  }
};

return(

     <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Add New Product</h1>

//i just added the line for show the error thats it
       {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">
            {error}
          </div>
        )}
        //




      <div className="bg-white rounded-2xl shadow-sm p-6 max-w-2xl">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

          {/* Name */}
          <div>
            <label className="text-sm font-medium text-gray-600 mb-1 block">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="eg. Nike T-Shirt"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-teal-500"
              required
            />
          </div>


          <div>
            <label className="text-sm font-medium text-gray-600 mb-1 block">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Product description..."
              rows={3}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-teal-500 resize-none"
            />
          </div>

          {/* Price + Stock */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-600 mb-1 block">
                Price ($)
              </label>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                placeholder="99"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-teal-500"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600 mb-1 block">
                Stock
              </label>
              <input
                type="number"
                name="stock"
                value={form.stock}
                onChange={handleChange}
                placeholder="50"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-teal-500"
                required
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="text-sm font-medium text-gray-600 mb-1 block">
              Category
            </label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-teal-500"
              required>
              <option value="">Select category</option>
              <option value="tshirts">T-Shirts</option>
              <option value="shirts">Shirts</option>
              <option value="pants">Pants</option>
             
           
          
            </select>
          </div>

          {/* Image Upload */}
          <div>
            <label className="text-sm font-medium text-gray-600 mb-1 block">
              Product Image
            </label>
            <div className="relative border-2 border-dashed border-gray-200 rounded-xl p-6 text-center">
              {preview ? (
                <div className="relative">
                  <img
                    src={preview}
                    alt="preview"
                    className="w-40 h-40 object-cover rounded-xl mx-auto"
                  />
                  <button
                    type="button"
                    onClick={() => { setPreview(null); setForm({ ...form, image: null }); }}
                    className="absolute top-0 right-1/3 bg-red-500 text-white rounded-full w-6 h-6 text-xs">
                    ✕
                  </button>
                </div>
              ) : (
                <div className="relative border-2 border-dashed border-gray-200 rounded-xl p-6 text-center">

                  <p className="text-4xl mb-2">📸</p>
                  <p className="text-sm text-gray-400">Click to upload image</p>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImage}
                className= "absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="bg-teal-600 text-white py-3 rounded-xl font-semibold hover:bg-teal-700 transition">
            Add Product
          </button>

        </form>
      </div>
    </div>
    


)
}
export default AdminAddProduct;