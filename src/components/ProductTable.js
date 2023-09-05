import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setProducts(data.products);
      } catch (err) {
        setError(err);
      }
    };

    fetchData();
  }, []);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  const filteredProducts = products.filter((product) =>
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = () => {
    const filteredProducts = products.filter((product) =>
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setCurrentPage(1);
    setProducts(filteredProducts);
  };

  return (
    <div className="container mx-auto mt-5 p-8">
      {error && <p className="text-red-500">Error: {error.message}</p>}
      <div className="flex md:justify-between md:items-center mb-4 md:flex-row flex-col">
        <Link to="/add-product">
          <button className="md:mb-0 mb-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Add Product
          </button>
        </Link>
        <div className="relative">
          <input
            type="text"
            placeholder="Search by category"
            className="border rounded py-2 px-3 pr-10"
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <AiOutlineSearch
              className="text-gray-400 cursor-pointer"
              onClick={handleSearch}
            />
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Image</th>
              <th className="px-4 py-2">Rating</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.map((product) => (
              <tr key={product.id} className="border hover:bg-gray-100">
              <td className="border px-4 py-2">{product.id}</td>
                <td className="border px-4 py-2">
                  <Link to={`/product/${product.id}`} className="text-blue-500 hover:underline">
                    {product.title}
                  </Link>
                </td>
                <td className="border px-4 py-2">{product.description}</td>
                <td className="border px-4 py-2">${product.price}</td>
                <td className="border px-4 py-2">
                  <Link to={`/product/${product.id}`}>
                    <img src={product.thumbnail} alt={product.title} className="w-16 h-16" />
                  </Link>
                </td>
                <td className="border px-4 py-2">{product.rating}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-8 text-center">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
        >
          Previous
        </button>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={indexOfLastProduct >= filteredProducts.length}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductTable;
