import { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';

const HistorialReservas = () => {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarReservas = async () => {
      try {
        const q = query(collection(db, 'reservas'), orderBy('fechaCreacion', 'desc'));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          fechaEntrada: format(new Date(doc.data().fechaEntrada), 'PP', { locale: es }),
          fechaSalida: format(new Date(doc.data().fechaSalida), 'PP', { locale: es }),
        }));
        setReservas(data);
      } catch (err) {
        console.error('Error cargando reservas:', err);
        setError('No se pudo cargar el historial de reservas.');
      } finally {
        setLoading(false);
      }
    };

    cargarReservas();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Historial de Reservas</h2>
      {reservas.length === 0 ? (
        <p className="text-gray-600">No hay reservas registradas.</p>
      ) : (
        <div className="grid gap-6">
          {reservas.map(reserva => (
            <div key={reserva.id} className="border border-gray-200 rounded-lg p-6 shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-semibold">{reserva.habitacion?.nombre}</h3>
                <span className="text-sm text-gray-500">#{reserva.id.slice(0, 8)}</span>
              </div>
              <p><strong>Nombre:</strong> {reserva.nombre}</p>
              <p><strong>Correo:</strong> {reserva.correo}</p>
              <p><strong>Fechas:</strong> {reserva.fechaEntrada} → {reserva.fechaSalida}</p>
              <p><strong>Huéspedes:</strong> {reserva.huespedes}</p>
              <p><strong>Precio:</strong> {new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(reserva.habitacion?.precio)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistorialReservas;
