import { useEffect, useState } from 'react';
import { LayoutDashboard, LogOut, Home, MapPin, Building, Ruler, Sparkles, Loader } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

// --- API LOGIC ---
const API_URL = 'https://django-proptech-demo.onrender.com/api/properties/';

const fetchProperties = () => axios.get(API_URL);
const createProperty = (data) => axios.post(API_URL, data);

// --- COMPONENTS ---

function PropertyCard({ property, index }) {
  return (
    <div className="relative bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition border border-gray-100 group">
      <div className="absolute top-3 left-3 bg-white/90 backdrop-blur text-gray-900 font-bold w-8 h-8 flex items-center justify-center rounded-full shadow-sm z-10 border border-gray-200">
        #{index}
      </div>
      <div className="h-32 bg-blue-600 flex items-center justify-center text-white relative">
        <Building size={48} className="group-hover:scale-110 transition-transform duration-300"/>
        <div className="absolute inset-0 bg-black/10 mix-blend-overlay"></div>
      </div>
      <div className="p-5">
        <div className="flex justify-between items-start">
          <div>
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wide">
              {property.property_type}
            </span>
            <h3 className="mt-1 text-lg font-bold text-gray-900 leading-tight">
              {property.title}
            </h3>
          </div>
          {property.annual_rent && (
            <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded">
              ${Number(property.annual_rent).toLocaleString()}/yr
            </span>
          )}
        </div>
        <div className="flex items-center text-gray-500 text-sm mt-3 mb-3">
          <MapPin size={16} className="mr-1" />
          {property.suburb}, {property.state}
          <span className="mx-2">•</span>
          <Ruler size={16} className="mr-1" />
          {property.size_sqm} m²
        </div>
        <div className="p-3 bg-gray-50 rounded-lg text-sm text-gray-600 italic border-l-4 border-blue-400">
           "{property.description || "AI Description processing..."}"
        </div>
      </div>
    </div>
  );
}

function AddProperty({ onAdd }) {
  const [formData, setFormData] = useState({
    title: '', address: '', suburb: '', state: 'NSW', postcode: '',
    property_type: 'office', size_sqm: '', annual_rent: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createProperty(formData);
      onAdd();
      setFormData({
        title: '', address: '', suburb: '', state: 'NSW', postcode: '',
        property_type: 'office', size_sqm: '', annual_rent: ''
      }); 
      alert("Property Added! AI is writing the description now...");
    } catch (err) {
      console.error(err);
      alert("Error adding property");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 mb-8">
      <h2 className="text-xl font-bold mb-6 flex items-center text-gray-800">
        <Building className="mr-2 text-blue-600"/> Add New Listing
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input name="title" placeholder="Property Title" value={formData.title} onChange={handleChange} required className="border p-2 rounded" />
        <select name="property_type" value={formData.property_type} onChange={handleChange} className="border p-2 rounded">
          <option value="office">Office</option>
          <option value="retail">Retail</option>
          <option value="industrial">Industrial</option>
        </select>
        <input name="address" placeholder="Address" value={formData.address} onChange={handleChange} required className="border p-2 rounded" />
        <div className="flex gap-2">
            <input name="suburb" placeholder="Suburb" value={formData.suburb} onChange={handleChange} required className="border p-2 rounded w-full" />
            <input name="postcode" placeholder="Postcode" value={formData.postcode} onChange={handleChange} required className="border p-2 rounded w-24" />
        </div>
        <input type="number" name="size_sqm" placeholder="Size (sqm)" value={formData.size_sqm} onChange={handleChange} required className="border p-2 rounded" />
        <input type="number" name="annual_rent" placeholder="Annual Rent ($)" value={formData.annual_rent} onChange={handleChange} className="border p-2 rounded" />
      </div>
      <div className="mt-6">
        <button 
          type="submit" 
          disabled={loading}
          className="w-full flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-bold hover:opacity-90 transition disabled:opacity-70"
        >
          {loading ? (
            <> <Loader className="animate-spin mr-2" /> Generating AI Description... </>
          ) : (
            <> <Sparkles className="mr-2" /> Generate Listing with AI </>
          )}
        </button>
        <p className="text-xs text-center text-gray-400 mt-2 font-medium">
          * Powered by Google Gemini 2.5 Flash
        </p>
      </div>
    </form>
  );
}

// --- MAIN DASHBOARD PAGE ---

export default function Dashboard() {
  const [properties, setProperties] = useState([]);
  const navigate = useNavigate();

  const loadProperties = async () => {
    try {
      const res = await fetchProperties();
      setProperties(res.data);
    } catch (err) {
      console.error("Failed to fetch properties:", err);
    }
  };

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('proptech_auth');
    if (!isLoggedIn) {
      navigate('/'); 
    } else {
      loadProperties();
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('proptech_auth');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans text-gray-900">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Section */}
        <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 flex items-center">
              <LayoutDashboard className="mr-3 text-blue-600" size={32} />
              Proptech AI Dashboard
            </h1>
            <p className="text-gray-500 mt-1 ml-11">Real-time commercial property management</p>
          </div>
          
          {/* Navigation Controls */}
          <div className="flex items-center gap-3 self-start md:self-auto">
            
            {/* BUTTON FIX: using inline-flex and explicit colors */}
            <Link 
              to="/" 
              className="inline-flex items-center justify-center text-sm font-bold text-white bg-blue-600 border border-blue-700 px-5 py-2.5 rounded-lg hover:bg-blue-700 transition shadow-md"
            >
               <Home size={18} className="mr-2"/> Home
            </Link>

            <button 
              onClick={handleLogout}
              className="inline-flex items-center justify-center text-sm font-bold text-white bg-red-500 border border-red-600 px-5 py-2.5 rounded-lg hover:bg-red-600 transition shadow-md"
            >
               <LogOut size={18} className="mr-2"/> Sign Out
            </button>
          </div>
        </header>

        <AddProperty onAdd={loadProperties} />

        <div className="flex items-center justify-between mb-6 mt-10 border-b border-gray-200 pb-4">
          <h2 className="text-xl font-bold text-gray-800">Current Portfolio</h2>
          <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            Total Assets: {properties.length}
          </span>
        </div>
        
        {properties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((prop, index) => (
              <PropertyCard key={prop.id} property={prop} index={index + 1} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-xl border-2 border-dashed border-gray-200">
            <p className="text-gray-400">No properties found. Add one above to start.</p>
          </div>
        )}

      </div>
    </div>
  );
}