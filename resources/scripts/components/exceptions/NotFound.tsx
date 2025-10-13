import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center text-center px-4">
      <div className="bg-gradient-to-r from-gray-900 to-gray-700 text-white rounded-xl shadow-lg p-12 max-w-md">
        <h1 className="text-6xl md:text-7xl font-extrabold mb-4">404</h1>
        <h2 className="text-2xl md:text-3xl font-bold mb-2">Pagina niet gevonden</h2>
        <p className="text-gray-300 mb-6">
          Oeps! De pagina die je zoekt bestaat niet of is verwijderd.
        </p>
        <button
          onClick={() => navigate('/')}
          className="bg-white text-gray-900 px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Terug naar startpagina
        </button>
      </div>
    </div>
  );
}
