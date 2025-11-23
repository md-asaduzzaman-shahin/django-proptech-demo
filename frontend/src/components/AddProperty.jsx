import { useState } from 'react';
import { createProperty } from '../api';
import { Sparkles, Loader, Building, MapPin } from 'lucide-react';

export default function AddProperty({ onAdd }) {
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
    
    // NOTE: We do NOT send a description. This forces the Backend to use AI.
    try {
      await createProperty(formData);
      onAdd(); // Tell the dashboard to refresh
      setFormData({ // Reset form
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