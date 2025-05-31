import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Wishlist = () => {
    const [wishlistItems, setWishlistItems] = useState([]);
    const [products, setProducts] = useState({});
    const [error, setError] = useState('');
    const [username, setUsername] = useState(localStorage.getItem('username') || null);
    const navigate = useNavigate();

    // Handle username prompt
    useEffect(() => {
        if (!username) {
            const promptedUsername = prompt('Please enter your username to view your wishlist:');
            if (promptedUsername) {
                setUsername(promptedUsername);
                localStorage.setItem('username', promptedUsername);
            } else {
                navigate('/user-dashboard');
            }
        }
    }, [username, navigate]);

    // Fetch wishlist and products
    useEffect(() => {
        if (!username) return;

        let isMounted = true;

        const fetchWishlistAndProducts = async () => {
            try {
                const publicApi = axios.create({
                    baseURL: 'https://pranayuvbackendfinal-production.up.railway.app',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                const wishlistResponse = await publicApi.get(`/pran/getwishlist/${username}`);
                if (isMounted) {
                    setWishlistItems(wishlistResponse.data || []);
                }

                const productResponse = await publicApi.get('/pran/products');
                if (isMounted) {
                    const productMap = productResponse.data.reduce((map, product) => {
                        map[product.id] = product;
                        return map;
                    }, {});
                    setProducts(productMap);
                }
            } catch (error) {
                if (isMounted) {
                    setError('Failed to load wishlist: ' + (error.response?.data?.message || error.message));
                    console.error('Wishlist fetch error:', error);
                }
            }
        };
        fetchWishlistAndProducts();

        return () => {
            isMounted = false;
        };
    }, [username]);

    const addToCart = async (wishlistItem) => {
        try {
            const publicApi = axios.create({
                baseURL: 'https://pranayuvbackendfinal-production.up.railway.app',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const cartItem = {
                username: username,
                productId: wishlistItem.productId,
                quantity: 1,
                addedDate: new Date().toISOString(),
            };
            console.log('Sending add to cart request:', cartItem);
            const response = await publicApi.post('/pran/addtocart', cartItem);
            console.log('Add to cart response:', response.data);
            if (response.data.stockQuantity === -1) {
                throw new Error('Failed to add to cart: Product may not exist or is out of stock');
            }
            alert('Successfully added to cart!');
            await publicApi.delete(`/pran/deletefromwishlist/${wishlistItem.id}`);
            setWishlistItems(wishlistItems.filter((item) => item.id !== wishlistItem.id));
            // Navigate to cart page to show the updated cart
            navigate('/cart');
        } catch (error) {
            setError('Failed to add to cart: ' + (error.response?.data?.message || error.message));
            console.error('Add to cart error:', error);
        }
    };

    const removeFromWishlist = async (wishlistId) => {
        try {
            const publicApi = axios.create({
                baseURL: 'https://pranayuvbackendfinal-production.up.railway.app',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            await publicApi.delete(`/pran/deletefromwishlist/${wishlistId}`);
            setWishlistItems(wishlistItems.filter((item) => item.id !== wishlistId));
        } catch (error) {
            setError('Failed to remove item: ' + (error.response?.data?.message || error.message));
            console.error('Remove wishlist error:', error);
        }
    };

    if (!username) {
        return null;
    }

    return (
        <section className="py-20 bg-gray-100">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-8">Your Wishlist</h2>
                <div className="bg-white p-6 rounded shadow max-w-4xl mx-auto">
                    <div className="flex justify-between items-center mb-6">
                        <button
                            onClick={() => navigate('/user-dashboard')}
                            className="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            Back to Dashboard
                        </button>
                        <h3 className="text-xl font-semibold">Username: {username}</h3>
                    </div>
                    {error && <p className="text-red-600 mb-4">{error}</p>}
                    {wishlistItems.length > 0 ? (
                        <div className="grid gap-4">
                            {wishlistItems.map((item) => {
                                const product = products[item.productId] || {};
                                return (
                                    <div key={item.id} className="flex items-center border-b py-4">
                                        <img
                                            src={`https://pranayuvbackendfinal-production.up.railway.app/pran/product/${item.productId}/image`}
                                            alt={product.name || 'Product'}
                                            className="w-24 h-24 object-cover rounded mr-4"
                                            onError={(e) => (e.target.src = 'https://via.placeholder.com/150?text=No+Image')}
                                        />
                                        <div className="flex-1">
                                            <h3 className="text-lg font-semibold">{product.name || 'Unknown Product'}</h3>
                                            <p className="text-gray-600">Brand: {product.brand || 'N/A'}</p>
                                            <p className="text-blue-900 font-bold">₹{(product.price || 0).toFixed(2)}</p>
                                        </div>
                                        <div className="space-x-2">
                                            <button
                                                onClick={() => addToCart(item)}
                                                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                                            >
                                                Add to Cart
                                            </button>
                                            <button
                                                onClick={() => removeFromWishlist(item.id)}
                                                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <p className="text-gray-600 text-center">Your wishlist is empty.</p>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Wishlist;