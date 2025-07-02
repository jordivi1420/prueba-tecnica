// src/components/RoomCard.jsx
import { FiStar, FiMapPin, FiWifi, FiCoffee, FiDroplet } from 'react-icons/fi';
import { motion } from 'framer-motion';

const RoomCard = ({ room, onReserve }) => {
  const amenities = [
    { icon: <FiWifi className="text-indigo-600" />, text: 'WiFi' },
    { icon: <FiCoffee className="text-indigo-600" />, text: 'Desayuno' },
    { icon: <FiDroplet className="text-indigo-600" />, text: 'Aire acond.' },
  ];

  return (
    <motion.div 
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
      whileHover={{ y: -5 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Image with overlay */}
      <div className="relative">
        <img 
          src={room.image} 
          alt={room.name} 
          className="w-full h-60 object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        <div className="absolute top-3 right-3 bg-white/90 px-2 py-1 rounded-full flex items-center">
          <FiStar className="text-yellow-500 mr-1" />
          <span className="text-sm font-medium">4.9</span>
        </div>
      </div>

      {/* Room details */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-gray-900">{room.name}</h3>
          <span className="bg-indigo-100 text-indigo-800 text-xs font-semibold px-2 py-1 rounded">
            {room.size || '45 m²'}
          </span>
        </div>

        <div className="flex items-center text-gray-600 text-sm mb-3">
          <FiMapPin className="mr-1" size={14} />
          <span>Vista al mar</span>
        </div>

        <p className="text-gray-600 mb-4 line-clamp-2">{room.description}</p>

        {/* Amenities */}
        <div className="flex flex-wrap gap-2 mb-4">
          {amenities.map((amenity, index) => (
            <div key={index} className="flex items-center bg-gray-50 px-2 py-1 rounded-full text-xs">
              {amenity.icon}
              <span className="ml-1">{amenity.text}</span>
            </div>
          ))}
        </div>

        {/* Price and CTA */}
        <div className="flex justify-between items-center pt-3 border-t border-gray-100">
          <div>
            <p className="text-sm text-gray-500">Desde</p>
            <p className="text-xl font-bold text-indigo-700">
              ${room.price.toLocaleString('es-CO')} <span className="text-sm font-normal">COP/noche</span>
            </p>
          </div>
          <motion.button
            onClick={() => onReserve(room)} // ✅ pasa el `room`
            className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white px-5 py-2 rounded-lg hover:from-indigo-700 hover:to-indigo-800 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Ver detalles
          </motion.button>

        </div>
      </div>
    </motion.div>
  );
};

export default RoomCard;