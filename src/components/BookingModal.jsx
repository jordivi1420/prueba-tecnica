// src/components/BookingModal.jsx
const BookingModal = ({ room, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-2">Reservar {room.name}</h2>
        <p className="mb-4">Precio por noche: ${room.price.toLocaleString()} COP</p>
        <label className="block mb-2">Selecciona la fecha:</label>
        <input type="date" className="w-full border p-2 rounded mb-4" />
        <button
          onClick={onClose}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mr-2"
        >
          Confirmar
        </button>
        <button
          onClick={onClose}
          className="text-gray-600 hover:underline ml-2"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default BookingModal;
