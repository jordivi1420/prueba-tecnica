// src/pages/Home.jsx
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import RoomCard from '../components/RoomCard';

const Home = ({ rooms, onSelectRoom }) => {
  const navigate = useNavigate();

  const handleViewDetails = (room) => {
    onSelectRoom(room);       // ✅ guarda la habitación seleccionada
    navigate('/habitacion');  // ✅ navega a los detalles
  };


  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section id="rooms" className="py-16 px-4 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold tracking-wider text-indigo-600 uppercase mb-2">Alojamiento exclusivo</p>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Nuestras Habitaciones y Suites</h2>
          <div className="w-24 h-1 bg-indigo-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Cada espacio ha sido diseñado meticulosamente para ofrecer confort, elegancia y todas las comodidades para una experiencia memorable.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
         {rooms.map((room) => (
        <motion.div key={room.id} variants={itemVariants}>
          <RoomCard
            room={room}
            onReserve={() => handleViewDetails(room)} // ✅ FIX aquí
          />
        </motion.div>
      ))}

        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-600 mb-6">¿Necesitas algo especial para tu estadía?</p>
          <button className="px-8 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition duration-300 shadow-lg hover:shadow-xl">
            Contactar al conserje
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Home;