import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import React, { useEffect } from 'react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { FiArrowLeft, FiCheck, FiWifi, FiCoffee, FiDroplet, FiTv, FiSun } from 'react-icons/fi';
import { FaSwimmingPool, FaConciergeBell, FaParking, FaUtensils } from 'react-icons/fa';
import ReservaForm from '../components/ReservaForm';
import SuggestedRoomsCarousel from '../components/SuggestedRoomsCarousel';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react'; 
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import SeccionResenas from '../components/SeccionResenas';


const RoomDetail = ({ room, onBack, rooms = [], onSelectRoom }) => {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const images = [
    room.image,
    'https://images.homify.com/v1533696547/p/photo/image/2669961/..011-RESIDENCIAL.jpg',
    'https://images.homify.com/v1533696547/p/photo/image/2669961/..011-RESIDENCIAL.jpg',
    'https://images.homify.com/v1533696547/p/photo/image/2669961/..011-RESIDENCIAL.jpg',
  ];


   const navigate = useNavigate();

   const handleBack = () => {
    navigate('/'); // O a la ruta que tengas para el listado de habitaciones
  };

useEffect(() => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}, [room?.id]); // se ejecuta cada vez que cambia la habitación

  const amenities = [
    { icon: <FiWifi className="text-indigo-600" />, text: 'Wi-Fi de alta velocidad' },
    { icon: <FiCoffee className="text-indigo-600" />, text: 'Desayuno gourmet incluido' },
    { icon: <FaSwimmingPool className="text-indigo-600" />, text: 'Acceso a piscina' },
    { icon: <FiDroplet className="text-indigo-600" />, text: 'Artículos de baño premium' },
    { icon: <FiTv className="text-indigo-600" />, text: 'TV pantalla plana 55"' },
    { icon: <FaConciergeBell className="text-indigo-600" />, text: 'Servicio de conserjería 24/7' },
    { icon: <FaParking className="text-indigo-600" />, text: 'Estacionamiento privado' },
    { icon: <FaUtensils className="text-indigo-600" />, text: 'Restaurante gourmet' },
    { icon: <FiSun className="text-indigo-600" />, text: 'Vista panorámica' },
  ];

    const handleReservar = async (reserva) => {
    try {
      const docRef = await addDoc(collection(db, 'reservas'), {
        ...reserva,
        habitacion: room.name,
        precio: room.price,
        imagen: room.image,
        creada: new Date()
      });

      navigate(`/reserva/${docRef.id}`); 
    } catch (error) {
      console.error('Error al guardar la reserva:', error);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back button */}
<button 
  onClick={handleBack} 
  className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors mb-8"
>
  <FiArrowLeft className="mr-2" />
  <span className="font-medium">Volver a habitaciones</span>
</button>


        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image gallery */}
<div className="rounded-2xl overflow-hidden shadow-xl max-h-[500px]">
  <Swiper
    modules={[Navigation, Pagination, Autoplay]}
    navigation
    pagination={{ clickable: true }}
    autoplay={{ delay: 5000 }}
    loop={true}
    className="w-full"
  >
    {images.map((img, index) => (
      <SwiperSlide key={index}>
        <img
          src={img}
          alt={`Vista de la habitación ${index + 1}`}
          className="w-full h-[400px] object-cover"
        />
      </SwiperSlide>
    ))}
  </Swiper>
</div>


          {/* Room details */}
          <div className="flex flex-col">
            <div className="flex-grow">
              <div className="mb-6">
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">{room.name}</h1>
                <div className="flex items-center text-gray-600 mb-4">
                  <span className="bg-indigo-100 text-indigo-800 text-xs font-semibold px-2.5 py-0.5 rounded mr-3">
                    {room.size || '45 m²'}
                  </span>
                  <span>Máximo 2 personas</span>
                </div>
              </div>

              <p className="text-lg text-gray-700 leading-relaxed mb-8">{room.description}</p>

              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Comodidades</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {amenities.map((item, index) => (
                    <div key={index} className="flex items-center">
                      <span className="mr-2">{item.icon}</span>
                      <span className="text-gray-700">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6 mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Políticas</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <FiCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span>Check-in: 3:00 PM | Check-out: 12:00 PM</span>
                  </li>
                  <li className="flex items-start">
                    <FiCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span>Cancelación gratuita hasta 48 horas antes</span>
                  </li>
                  <li className="flex items-start">
                    <FiCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span>No se permiten mascotas</span>
                  </li>
                  <li className="flex items-start">
                    <FiCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span>Prohibido fumar</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Price and booking */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <p className="text-2xl font-bold text-indigo-700">
                    ${room.price.toLocaleString('es-CO')} COP
                  </p>
                  <p className="text-gray-600">por noche (impuestos incluidos)</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Disponibilidad</p>
                  <p className="font-medium text-green-600">Habitaciones disponibles</p>
                </div>
              </div>

           <button
            onClick={() => setMostrarFormulario(true)}
            className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-lg"
          >
            Reservar ahora
          </button>

             {mostrarFormulario && (
              <div className="mt-12">
                <ReservaForm room={room} onReservar={handleReservar} />
              </div>
            )}


              <p className="text-center text-sm text-gray-500 mt-4">
                Sin cargos por reservación - Paga directamente en el hotel
              </p>
            </div>
            
          </div>
        </div>
      </div>
      <SuggestedRoomsCarousel rooms={rooms} onSelect={onSelectRoom} />
      <SeccionResenas habitacionId={room.id} />
    </div>
  );
};

export default RoomDetail;