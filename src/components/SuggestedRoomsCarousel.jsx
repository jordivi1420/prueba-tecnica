// src/components/SuggestedRoomsCarousel.jsx
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { motion } from 'framer-motion';
import { FiStar, FiMapPin } from 'react-icons/fi';

const SuggestedRoomsCarousel = ({ rooms, onSelect }) => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Otras suites exclusivas
          </h2>
          <div className="w-20 h-1 bg-indigo-600 mx-auto mb-4" />
          <p className="text-gray-600 max-w-2xl mx-auto">
            Descubre nuestras opciones de alojamiento diseñadas para brindarte
            la máxima comodidad, lujo y estilo.
          </p>
        </motion.div>

        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1.3 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 3.5 }
          }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop={true}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          className="relative w-full"
        >
          {rooms.map((room) => (
            <SwiperSlide key={room.id} className="min-w-0">
              <motion.div
                whileHover={{ y: -4 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all h-full flex flex-col"
              >
                {/* Imagen de la habitación */}
                <div className="relative">
                  <img
                    src={room.image}
                    alt={room.name}
                    className="w-full h-64 object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  <div className="absolute top-4 right-4 bg-white/90 px-2 py-1 rounded-full flex items-center shadow">
                    <FiStar className="text-yellow-500 mr-1" />
                    <span className="text-sm font-medium">4.8</span>
                  </div>
                </div>

                {/* Información de la habitación */}
                <div className="p-5 flex flex-col justify-between flex-1">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-bold text-gray-900 leading-tight">
                        {room.name}
                      </h3>
                      <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2 py-1 rounded">
                        {room.size || '45 m²'}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-500 text-sm mb-2">
                      <FiMapPin className="mr-1" size={14} />
                      <span>Vista al mar</span>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                      {room.description}
                    </p>
                  </div>

                  {/* Precio + botón */}
                  <div className="pt-4 border-t border-gray-200 flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-500">Desde</p>
                      <p className="text-xl font-bold text-indigo-700">
                        ${room.price.toLocaleString('es-CO')}{' '}
                        <span className="text-sm font-medium">COP/noche</span>
                      </p>
                    </div>
                    <motion.button
                      onClick={() => onSelect(room)}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Ver detalles
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}

          {/* Flechas personalizadas */}
          <div className="swiper-button-prev hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-md hover:bg-gray-100 absolute top-1/2 -left-5 z-10 cursor-pointer" />
          <div className="swiper-button-next hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-md hover:bg-gray-100 absolute top-1/2 -right-5 z-10 cursor-pointer" />
        </Swiper>
      </div>
    </section>
  );
};

export default SuggestedRoomsCarousel;
