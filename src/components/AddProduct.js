import { useState } from 'react';
import { Link } from 'react-router-dom';


const AddProduct = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        category: '',
    });

    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        const newErrors = {};

        if (!formData.title) {
            newErrors.title = 'Title is required';
        }

        if (!formData.description) {
            newErrors.description = 'Description is required';
        }

        if (!formData.price) {
            newErrors.price = 'Price is required';
        } else if (isNaN(parseFloat(formData.price))) {
            newErrors.price = 'Price must be a number';
        }

        if (!formData.category) {
            newErrors.category = 'Category is required';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            try {
                const response = await fetch('https://dummyjson.com/products/add', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                if (response.ok) {
                    alert('Product added successfully');
                } else {
                    console.error('Failed to add product');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    return (
        <div className="container mx-auto mt-5 md:p-4 px-8">
            <Link to="/" className="text-blue-500 hover:underline">
                Back to Products
            </Link>
            <h2 className="text-2xl font-semibold mb-4 text-center mt-4">Add a New Product</h2>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <div className="mb-4">
                    <label htmlFor="title" className="block text-lg font-medium text-gray-700">
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className="border border-gray-300 rounded-md p-2 w-full"
                    />
                    {errors.title && <span className="text-red-500">{errors.title}</span>}
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block text-lg font-medium text-gray-700">
                        Description
                    </label>
                    <input
                        type="text"
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        className="border border-gray-300 rounded-md p-2 w-full"
                    />
                    {errors.description && <span className="text-red-500">{errors.description}</span>}
                </div>
                <div className="mb-4">
                    <label htmlFor="price" className="block text-lg font-medium text-gray-700">
                        Price
                    </label>
                    <input
                        type="text"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        className="border border-gray-300 rounded-md p-2 w-full"
                    />
                    {errors.price && <span className="text-red-500">{errors.price}</span>}
                </div>
                <div className="mb-4">
                    <label htmlFor="category" className="block text-lg font-medium text-gray-700">
                        Category
                    </label>
                    <input
                        type="text"
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="border border-gray-300 rounded-md p-2 w-full"
                    />
                    {errors.category && <span className="text-red-500">{errors.category}</span>}
                </div>
                <div className='text-center'>
                <button
                    type="submit"
                    className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Add Product
                </button>
                </div>

            </form>

        </div>
    );
};

export default AddProduct;
