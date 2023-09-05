import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch product details');
        }
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err);
      }
    };

    fetchProductDetail();
  }, [id]);

  return (
    <div className="container mx-auto mt-5 md:p-4 px-8 pt-10 flex justify-center items-center md:flex-row flex-col">
      {error && <p className="text-red-500">Error: {error.message}</p>}
      <div className="md:w-1/2">
        <h2 className="text-2xl font-semibold mb-4 text-center">Product Details</h2>
        <div className="mb-4">
          <strong className="text-lg">Title:</strong> {product.title}
        </div>
        <div className="mb-4">
          <strong className="text-lg">Description:</strong> {product.description}
        </div>
        <div className="mb-4">
          <strong className="text-lg">Price:</strong> ${product.price}
        </div>
        <div className="mb-4">
          <strong className="text-lg">Discount Percentage:</strong>{' '}
          {product.discountPercentage}
        </div>
        <div className='mt-8 pt-8'>
          <Link to="/" className="text-blue-500 hover:underline">
            Back to Products
          </Link>
        </div>
      </div>
      <div className="md:w-1/2 px-4 py-2 flex justify-center">
        <img src={product.thumbnail} alt={product.title} className="w-3/4 rounded-lg" />
      </div>
    </div>
  );
};

export default ProductDetail;
