import { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, query, where, addDoc, getDocs, serverTimestamp, orderBy } from 'firebase/firestore';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import StarRating from './StarRating';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';

const SeccionResenas = ({ habitacionId }) => {
  const [resenas, setResenas] = useState([]);
  const [nombre, setNombre] = useState('');
  const [comentario, setComentario] = useState('');
  const [calificacion, setCalificacion] = useState(5);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const cargarResenas = async () => {
      try {
        const q = query(
          collection(db, 'resenas'), 
          where('habitacionId', '==', habitacionId),
          orderBy('fecha', 'desc')
        );
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({ 
          id: doc.id, 
          ...doc.data(),
          fechaFormateada: doc.data().fecha ? 
            format(doc.data().fecha.toDate(), "dd 'de' MMMM yyyy", { locale: es }) : 
            'Fecha no disponible'
        }));
        
        setResenas(data);
      } catch (err) {
        console.error('Error al cargar reseñas:', err);
        setError('Error al cargar las reseñas. Por favor intenta nuevamente.');
      } finally {
        setLoading(false);
      }
    };

    cargarResenas();
  }, [habitacionId]);

  const enviarResena = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      if (!nombre.trim() || !comentario.trim()) {
        throw new Error('Por favor completa todos los campos requeridos');
      }

      if (comentario.length < 20) {
        throw new Error('El comentario debe tener al menos 20 caracteres');
      }

      await addDoc(collection(db, 'resenas'), {
        habitacionId,
        nombre: nombre.trim(),
        comentario: comentario.trim(),
        calificacion,
        fecha: serverTimestamp()
      });

      // Actualizar la lista de reseñas
      const q = query(
        collection(db, 'resenas'), 
        where('habitacionId', '==', habitacionId),
        orderBy('fecha', 'desc')
      );
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data(),
        fechaFormateada: doc.data().fecha ? 
          format(doc.data().fecha.toDate(), "dd 'de' MMMM yyyy", { locale: es }) : 
          'Fecha no disponible'
      }));

      setResenas(data);
      setNombre('');
      setComentario('');
      setCalificacion(5);
      setSuccessMessage('¡Gracias por tu reseña! Ha sido enviada correctamente.');
      
      setTimeout(() => setSuccessMessage(''), 5000);
    } catch (err) {
      console.error('Error al enviar reseña:', err);
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Calcular calificación promedio
  const promedioCalificacion = resenas.length > 0 
    ? (resenas.reduce((sum, resena) => sum + resena.calificacion, 0) / resenas.length)
    : 0;

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <section className="max-w-4xl mx-auto my-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Opiniones de Huéspedes</h2>
          
          {/* Resumen de calificaciones */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 bg-gray-50 p-6 rounded-lg">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-semibold text-gray-800">Calificación promedio</h3>
              <div className="flex items-center mt-2">
                <StarRating rating={promedioCalificacion} />
                <span className="ml-2 text-gray-700">
                  {promedioCalificacion.toFixed(1)} ({resenas.length} {resenas.length === 1 ? 'reseña' : 'reseñas'})
                </span>
              </div>
            </div>
            
            <div className="w-full md:w-auto">
              <button 
                className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-lg transition duration-200"
                onClick={() => document.getElementById('form-resena').scrollIntoView({ behavior: 'smooth' })}
              >
                Escribir una reseña
              </button>
            </div>
          </div>

          {/* Lista de reseñas */}
          {resenas.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Esta habitación aún no tiene reseñas. Sé el primero en opinar.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {resenas.map((resena) => (
                <div key={resena.id} className="border-b border-gray-200 pb-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-lg text-gray-900">{resena.nombre}</h4>
                      <p className="text-gray-500 text-sm">{resena.fechaFormateada}</p>
                    </div>
                    <StarRating rating={resena.calificacion} />
                  </div>
                  <p className="mt-3 text-gray-700 leading-relaxed">{resena.comentario}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Formulario de reseña */}
        <div id="form-resena" className="bg-gray-50 px-8 py-8 border-t border-gray-200">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">Comparte tu experiencia</h3>
          
          {successMessage && (
            <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg">
              {successMessage}
            </div>
          )}
          
          <form onSubmit={enviarResena} className="space-y-4">
            <div>
              <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
                Nombre <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Tu nombre"
                required
              />
            </div>
            
            <div>
              <label htmlFor="calificacion" className="block text-sm font-medium text-gray-700 mb-1">
                Calificación <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setCalificacion(star)}
                    className={`text-2xl ${star <= calificacion ? 'text-yellow-400' : 'text-gray-300'}`}
                  >
                    ★
                  </button>
                ))}
                <span className="ml-2 text-gray-600">{calificacion} de 5</span>
              </div>
            </div>
            
            <div>
              <label htmlFor="comentario" className="block text-sm font-medium text-gray-700 mb-1">
                Comentario <span className="text-red-500">*</span>
              </label>
              <textarea
                id="comentario"
                rows="4"
                value={comentario}
                onChange={(e) => setComentario(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Describe tu experiencia (mínimo 20 caracteres)"
                required
                minLength="20"
              />
              <p className="mt-1 text-sm text-gray-500">Mínimo 20 caracteres</p>
            </div>
            
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 px-4 rounded-lg font-medium ${isSubmitting ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'} text-white transition duration-200`}
              >
                {isSubmitting ? 'Enviando...' : 'Enviar reseña'}
              </button>
            </div>
            
            {error && (
              <div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default SeccionResenas;