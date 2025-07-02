import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const ReservaDetalle = () => {
  const { id } = useParams();
  const [reserva, setReserva] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerReserva = async () => {
      try {
        const docRef = doc(db, 'reservas', id);
        const docSnap = await getDoc(docRef);
        
        if (!docSnap.exists()) {
          throw new Error('La reserva solicitada no existe');
        }
        
        const reservaData = docSnap.data();
        // Formatear fechas para mejor visualización
        const formattedReserva = {
          ...reservaData,
          fechaEntrada: format(new Date(reservaData.fechaEntrada), 'PPPP', { locale: es }),
          fechaSalida: format(new Date(reservaData.fechaSalida), 'PPPP', { locale: es }),
          precioFormateado: new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0
          }).format(reservaData.precio)
        };
        
        setReserva(formattedReserva);
      } catch (err) {
        console.error('Error al obtener la reserva:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    obtenerReserva();
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!reserva) return <ErrorMessage message="No se encontraron datos de la reserva" />;

  return (
    <div className="max-w-4xl mx-auto my-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow-2xl rounded-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2">
            <img 
              src={reserva.imagen} 
              alt={`Habitación ${reserva.habitacion}`}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="md:w-1/2 p-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Detalles de tu Reserva</h1>
                <p className="text-indigo-600 mt-1">Código de reserva: {id}</p>
              </div>
              <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                Confirmada
              </span>
            </div>
            
            <div className="space-y-4">
              <div className="border-b pb-4">
                <h2 className="text-xl font-semibold text-gray-800">{reserva.habitacion}</h2>
                <p className="text-gray-600 mt-1">Gracias por elegirnos, {reserva.nombre}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Fecha de llegada</p>
                  <p className="font-medium">{reserva.fechaEntrada}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Fecha de salida</p>
                  <p className="font-medium">{reserva.fechaSalida}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Huéspedes</p>
                  <p className="font-medium">{reserva.huespedes}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Contacto</p>
                  <p className="font-medium">{reserva.correo}</p>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <p className="text-sm font-medium text-gray-500">Total de la reserva</p>
                <p className="text-2xl font-bold text-indigo-700">{reserva.precioFormateado}</p>
                <p className="text-xs text-gray-500 mt-1">Incluye impuestos y cargos</p>
              </div>
            </div>
            
            <div className="mt-8">
              <button className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-indigo-700 transition duration-200">
                Descargar comprobante
              </button>
              <p className="text-center text-sm text-gray-500 mt-4">
                ¿Necesitas ayuda? <a href="/contacto" className="text-indigo-600 hover:underline">Contáctanos</a>
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 bg-blue-50 p-6 rounded-lg">
        <h3 className="font-medium text-blue-800 mb-3">Información importante</h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex items-start">
            <svg className="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Check-in a partir de las 3:00 PM</span>
          </li>
          <li className="flex items-start">
            <svg className="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Check-out antes de las 12:00 PM</span>
          </li>
          <li className="flex items-start">
            <svg className="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Política de cancelación: 48 horas antes del check-in</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ReservaDetalle;