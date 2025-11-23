import { MapPin, Building, Ruler } from 'lucide-react';

export default function PropertyCard({ property }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition border border-gray-100">
      <div className="h-32 bg-blue-600 flex items-center justify-center text-white">
        <Building size={48} />
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
           {/* If description is empty, show a placeholder */}
           "{property.description || "AI Description processing..."}"
        </div>
      </div>
    </div>
  );
}