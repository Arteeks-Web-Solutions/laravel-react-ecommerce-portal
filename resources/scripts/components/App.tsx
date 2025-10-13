import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Shop from '@/components/shop/ShopContainer';
import ClientArea from '@/components/client/ClientContainer';
import AdminArea from '@/components/admin/AdminContainer';
import type { Product } from '@/types/models';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NotFound from '@/components/exceptions/NotFound';

function App() {
  const [cartItems, setCartItems] = useState<Product[]>([]);

  const handleAddToCart = (product: Product) => {
    setCartItems([...cartItems, product]);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar
          cartItemCount={cartItems.length}
        />

        <Routes>
          <Route path="/" element={<Shop onAddToCart={handleAddToCart} />} />
          <Route path="/client" element={<ClientArea />} />
          <Route path="/admin" element={<AdminArea />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>

  );
}

export default App;
