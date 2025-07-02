// src/components/ErrorMessage.jsx
const ErrorMessage = ({ message }) => (
  <div className="text-red-600 text-center py-6 font-semibold">
    ⚠️ {message}
  </div>
);

export default ErrorMessage;
