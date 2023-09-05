import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductTable from './components/ProductTable';
import ProductDetail from './components/ProductDetail';
import AddProduct from './components/AddProduct';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductTable />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/add-product" element={<AddProduct />} />
      </Routes>
    </Router>
  );
};

export default App;
