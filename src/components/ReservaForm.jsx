// src/components/ReservaForm.jsx
import { useState } from 'react';
import { FiCalendar, FiUser, FiMail } from 'react-icons/fi';
import { db } from '../firebaseConfig';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

const ReservaForm = ({ room, onReservar }) => {
  const [form, setForm] = useState({
    nombre: '',
    correo: '',
    fechaEntrada: '',
    fechaSalida: '',
    huespedes: 1,
  });
  const [loading, setLoading] = useState(false);


  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    await addDoc(collection(db, 'reservas'), {
      ...form,
      fechaCreacion: Timestamp.now(),
      habitacion: {
        id: room.id,
        nombre: room.name,
        precio: room.price,
      },
    });

    onReservar(form);
    
    setTimeout(() => {
      alert('✅ ¡Reserva guardada exitosamente!');
      setLoading(false);
    }, 600); // Espera breve para UX
  } catch (error) {
    console.error('Error guardando reserva:', error);
    alert('❌ Error al guardar la reserva.');
    setLoading(false);
  }
};


  return (
    <div className="bg-white shadow-md rounded-xl p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Reservar: {room.name}</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nombre completo</label>
          <div className="flex items-center border border-gray-300 rounded-lg px-3">
            <FiUser className="text-gray-400 mr-2" />
            <input
              type="text"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              className="w-full py-2 focus:outline-none"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Correo electrónico</label>
          <div className="flex items-center border border-gray-300 rounded-lg px-3">
            <FiMail className="text-gray-400 mr-2" />
            <input
              type="email"
              name="correo"
              value={form.correo}
              onChange={handleChange}
              className="w-full py-2 focus:outline-none"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Fecha entrada</label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3">
              <FiCalendar className="text-gray-400 mr-2" />
              <input
                type="date"
                name="fechaEntrada"
                value={form.fechaEntrada}
                onChange={handleChange}
                className="w-full py-2 focus:outline-none"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Fecha salida</label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3">
              <FiCalendar className="text-gray-400 mr-2" />
              <input
                type="date"
                name="fechaSalida"
                value={form.fechaSalida}
                onChange={handleChange}
                className="w-full py-2 focus:outline-none"
                required
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Número de huéspedes</label>
          <input
            type="number"
            name="huespedes"
            value={form.huespedes}
            onChange={handleChange}
            min="1"
            max="6"
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
            required
          />
        </div>

       {loading ? (
  <button
    type="button"
    disabled
    className="w-full bg-indigo-400 text-white py-2 px-4 rounded-lg font-semibold cursor-not-allowed"
  >
    Procesando...
  </button>
) : (
  <button
    type="submit"
    className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-indigo-700 transition"
  >
    Confirmar reserva
  </button>
)}

      </form>
    </div>
  );
};

export default ReservaForm;
