import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import RoomDetail from './pages/RoomDetail';
import ReservaDetail from './pages/ReservaDetalle';
import HistorialReservas from './components/HistorialReservas';
const rooms = [
  {
    id: 1,
    name: 'Habitación Deluxe',
    price: 320000,
    image: 'https://images.homify.com/v1452164048/p/photo/image/1227856/3.jpg',
    description: 'Espaciosa y luminosa, con vista al mar, cama king size, decoración moderna y todas las comodidades necesarias para una estadía inolvidable.',
    amenities: ['Vista al mar', 'Cama king size', 'Minibar', 'WiFi premium', 'TV 55"'],
    size: '45 m²'
  },
  {
    id: 2,
    name: 'Suite Ejecutiva',
    price: 480000,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdM8J8rj1IOvPGc7UdTbpB3Oa2AockwYpbpg&s',
    description: 'Pensada para ejecutivos: incluye sala de estar, jacuzzi privado, minibar y escritorio de trabajo ergonómico.',
    amenities: ['Jacuzzi privado', 'Sala de estar', 'Escritorio ejecutivo', 'Servicio de conserjería', 'Desayuno incluido'],
    size: '65 m²'
  },
  {
    id: 3,
    name: 'Habitación Estándar',
    price: 190000,
    image: 'https://www.hola.com/horizon/square/fa5a228c1608-habitaciones-hoteles-9t-t.jpg?im=Resize=(640),type=downsize',
    description: 'Cómoda y funcional, perfecta para estancias breves. Dispone de cama doble, baño privado y WiFi de alta velocidad.',
    amenities: ['Cama doble', 'Baño privado', 'WiFi alta velocidad', 'TV 32"', 'Aire acondicionado'],
    size: '28 m²'
  },
  {
    id: 4,
    name: 'Suite Presidencial',
    price: 850000,
    image: 'https://www.ahstatic.com/photos/b2n3_ho_00_p_1024x768.jpg',
    description: 'Lujosa suite con sala comedor, cocina integrada, vista panorámica y jacuzzi. Ideal para viajeros exigentes.',
    amenities: ['Jacuzzi', 'Vista panorámica', 'Cocina equipada', 'Sala comedor', 'TV 65"'],
    size: '90 m²'
  },
  {
    id: 5,
    name: 'Loft Panorámico',
    price: 540000,
    image: 'https://planner5d.com/blog/content/images/2023/11/Babylos-Aqua5-2.jpg',
    description: 'Moderno loft en el último piso con ventanales de piso a techo, baño en mármol y zona de estar elegante.',
    amenities: ['Ventanales amplios', 'Baño de lujo', 'Zona lounge', 'WiFi premium', 'Cafetera Nespresso'],
    size: '70 m²'
  },
  {
    id: 6,
    name: 'Habitación Familiar',
    price: 380000,
    image: 'https://images.contentstack.io/v3/assets/bltb428ce5d46f8efd8/bltcb75410b7ba627e7/6492190680e98f376224b7dd/image1.png?crop=100.0p,100.0p,x0.0p,y0.0p&width=720&height=405&auto=webp',
    description: 'Perfecta para familias: incluye dos camas matrimoniales, cuna bajo pedido y área de juegos para niños.',
    amenities: ['Dos camas dobles', 'Área niños', 'TV cable', 'Nevera', 'Cuna opcional'],
    size: '55 m²'
  },
  {
    id: 7,
    name: 'Mini Suite Romántica',
    price: 410000,
    image: 'https://a0.muscache.com/im/pictures/hosting/Hosting-1042764402589855426/original/7b417632-459a-417f-9941-69cc39224471.jpeg?im_w=720',
    description: 'Ambiente íntimo con iluminación tenue, bañera privada y decoración temática. Ideal para parejas.',
    amenities: ['Bañera privada', 'Iluminación ambiental', 'Decoración romántica', 'Bebida de bienvenida', 'WiFi'],
    size: '40 m²'
  },
  {
    id: 8,
    name: 'Habitación Eco Confort',
    price: 220000,
    image: 'https://a0.muscache.com/im/pictures/81dca5d6-5a86-49bc-8eca-4a8610a07d27.jpg',
    description: 'Diseñada con materiales sostenibles, ventilación natural y tecnología ecoeficiente.',
    amenities: ['Ventilación natural', 'Energía solar', 'Ducha ecológica', 'Decoración orgánica', 'WiFi'],
    size: '35 m²'
  },
   {
    id: 9,
    name: 'Habitación Mezquita Maicao La Guajira',
    price: 580000,
    image: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Vista_parcial_de_La_Mezquita_en_Maicao_-_panoramio.jpg',
    description: 'Esta es la Mezquita mas grande de america latina una experiencia sin igual.',
    amenities: ['Ventilación natural', 'Comida arabe 100%', 'Cultura arabe y wuyu', 'Decoración Arabe', 'WiFi'],
    size: '35 m²'
  }
];

function App() {
  
  const [selectedRoom, setSelectedRoom] = useState(null);

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home rooms={rooms} onSelectRoom={(room) => setSelectedRoom(room)} />} />
            <Route
              path="/habitacion"
              element={
                selectedRoom && (
                  <RoomDetail
                    room={selectedRoom}
                    rooms={rooms.filter(r => r.id !== selectedRoom.id)}
                    onBack={() => setSelectedRoom(null)}
                    onSelectRoom={(room) => setSelectedRoom(room)}
                  />
                )
              }
            />
            <Route path="/reserva/:id" element={<ReservaDetail />} />
            <Route path="/historial" element={<HistorialReservas />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
