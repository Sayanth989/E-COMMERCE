import { useState } from "react";
import { Link,Outlet, useLocation } from "react-router-dom";
 
const AdminLayout = ()=>{
    const [sidebarOpen,setSidebarOpen]= useState(true);
      const location = useLocation;

      const menuItems = [
    { path: "/admin", icon: "📊", label: "Dashboard" },
    // { path: "/admin/products", icon: "👕", label: "Products" },
     { path: "/addproduct", icon: "👕", label: "Products" },
    { path: "/admin/products/add", icon: "➕", label: "Add Product" },
    { path: "/admin/orders", icon: "📦", label: "Orders" },
    { path: "/admin/users", icon: "👥 ", label: "Users" },
      ]


    return(
         <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <div className={`${sidebarOpen ? "w-64" : "w-16"} bg-gray-900 text-white transition-all duration-300 flex flex-col`}>

        {/* Logo */}
        <div className="p-4 flex items-center justify-between border-b border-gray-700">
          {sidebarOpen && (
            <h1 className="text-xl font-bold italic">Cara ✦</h1>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-400 hover:text-white">
            {sidebarOpen ? "◀" : "▶"}
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 p-4 flex flex-col gap-2">
          {menuItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2 rounded-xl transition
                ${location.pathname === item.path
                  ? "bg-teal-600 text-white"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
                }`}>
              <span className="text-xl">{item.icon}</span>
              {sidebarOpen && (
                <span className="text-sm font-medium">{item.label}</span>
              )}
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-gray-700">
          <Link
            to="/"
            className="flex items-center gap-3 px-3 py-2 rounded-xl text-gray-400 hover:bg-gray-800 hover:text-white transition">
            <span>🚪</span>
            {sidebarOpen && <span className="text-sm">Back to Store</span>}
          </Link>
        </div>

      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">

        {/* Top Bar */}
        <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-700">
            Admin Panel
          </h2>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500">Welcome, Admin!</span>
            <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
              A
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>

      </div>
    </div>

    )

}

export default AdminLayout