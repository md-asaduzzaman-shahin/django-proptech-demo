import { useEffect, useState } from 'react';
import { fetchProperties } from '../api'; // Notice the ".." to go up one folder
import PropertyCard from '../components/PropertyCard';
import AddProperty from '../components/AddProperty';
import { LayoutDashboard, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const [properties, setProperties] = useState([]);

  const loadProperties = async () => {
    try {
      const res = await fetchProperties();
      setProperties(res.data);
    } catch (err) {
      console.error("Failed to fetch properties:", err);
    }
  };

  useEffect(() => {
    loadProperties();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans text-gray-900">
      <div className="max-w-5xl mx-auto">
        <header className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 flex items-center">
              <LayoutDashboard className="mr-3 text-blue-600" size={32} />
              Proptech AI Dashboard
            </h1>
            <p className="text-gray-500 mt-1">Real-time commercial property management</p>
          </div>
          
          {/* This Logout button sends them back to the Landing Page */}
          <Link to="/" className="flex items-center text-sm font-medium text-gray-500 hover:text-red-600 transition">
             <LogOut size={16} className="mr-1"/> Sign Out
          </Link>
        </header>

        {/* The Form */}
        <AddProperty onAdd={loadProperties} />

        {/* The List */}
        <h2 className="text-xl font-bold mb-4 text-gray-800">Current Listings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map(prop => (
            <PropertyCard key={prop.id} property={prop} />
          ))}
        </div>
      </div>
    </div>
  );
}