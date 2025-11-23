import { MapPin, Building, Ruler } from 'lucide-react';

// FEATURE 2: Added 'index' to the arguments
export default function PropertyCard({ property, index }) {
  return (
    <div className="relative bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition border border-gray-100 group">
      
      {/* FEATURE 2: The Number Badge */}
      <div className="absolute top-3 left-3 bg-white/90 backdrop-blur text-gray-900 font-bold w-8 h-8 flex items-center justify-center rounded-full shadow-sm z-10 border border-gray-200">
        #{index}
      </div>

      <div className="h-32 bg-blue-600 flex items-center justify-center text-white relative">
        <Building size={48} className="group-hover:scale-110 transition-transform duration-300"/>
        {/* Decorative pattern */}
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