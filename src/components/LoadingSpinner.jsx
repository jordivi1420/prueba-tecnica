// src/components/LoadingSpinner.jsx
const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-40">
      <div className="w-10 h-10 border-4 border-indigo-500 border-dashed rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingSpinner;
