import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import {toast} from "react-toastify";

export const Products = () => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null); // For product details
    const [productMovements, setProductMovements] = useState([]); // For product movements
    const [isDetailsModalOpen, setDetailsModalOpen] = useState(false);
    const [isMovementsModalOpen, setMovementsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [totalItems, setTotalItems] = useState(0);

    const customStyles = {
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(5px)',
        },
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#1a1a1a',
            border: 'none',
            borderRadius: '10px',
            padding: '20px',
            width: '400px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }
    };
    const addModalStyles = {
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(5px)',
        },
        content: {
            top: '30%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -30%)',
            backgroundColor: '#1a1a1a',
            border: 'none',
            borderRadius: '10px',
            padding: '20px',
            width: '80%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            maxHeight: '70vh',
            maxWidth: '80vw',
            overflowY: 'auto'
        }
    };
    const detailsModalStyles = {
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(5px)',
        },
        content: {
            top: '40%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -40%)',
            backgroundColor: '#1a1a1a',
            border: 'none',
            borderRadius: '10px',
            padding: '20px',
            width: '80%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            maxHeight: '50vh',
            maxWidth: '80vw',
            overflowY: 'auto'
        }
    };


    const openDetailsModal = (product) => {
        setSelectedProduct(product);
        setDetailsModalOpen(true);
    };

    const closeDetailsModal = () => {
        setSelectedProduct(null);
        setDetailsModalOpen(false);
    };

    const closeMovementsModal = () => {
        setProductMovements([]);
        setMovementsModalOpen(false);
    };

    const token = localStorage.getItem('token');

    const [isAddModalOpen, setAddModalOpen] = useState(false);

    const [newProductForm, setNewProductForm] = useState({
        name: '',
        description: '',
        code: '',
        stockQuantity: ''
    });

    const handleNewProductInputChange = (e) => {
        const { name, value } = e.target;
        setNewProductForm(prevState => ({ ...prevState, [name]: value }));
    };

    const validateForm = () => {
        if (!newProductForm.name || !newProductForm.code || !newProductForm.stockQuantity) {
            toast.error("All fields except for description must be filled!", {
                position: toast.POSITION.TOP_RIGHT
            });
            return false;
        }
        return true;
    };

    const handleAddProduct = async () => {
        if (!validateForm()) return;

        try {
            await axios.post('http://backend.soho.conf/api/products', newProductForm, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            toast.success("Product added successfully!", {
                position: toast.POSITION.TOP_RIGHT
            });
            const response = await axios.get(`http://backend.soho.conf/api/products/?limit=${itemsPerPage}&page=${currentPage}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setProducts(response.data.products);
            setTotalItems(response.data.totalCount);
            setAddModalOpen(false);
        } catch (error) {
            toast.error("Error Adding product!", {
                position: toast.POSITION.TOP_RIGHT
            });
            console.error("Error adding product:", error);
        }
    };

    const handleUpdateProduct = async () => {
        if (selectedProduct) {
            try {
                await axios.put(`http://backend.soho.conf/api/products/${selectedProduct._id}`, selectedProduct, {
                    headers: { 'Authorization': `Bearer ${token}` }
                }).then(() => {
                    toast.success("Successfully Updated!", {
                        position: toast.POSITION.TOP_RIGHT
                    });
                }).catch((e) => {
                    toast.error(e, {
                        position: toast.POSITION.TOP_RIGHT
                    });
                });
                const response = await axios.get(`http://backend.soho.conf/api/products/?limit=${itemsPerPage}&page=${currentPage}`,{
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                setProducts(response.data.products);
                setTotalItems(response.data.totalCount);
            } catch (error) {
                console.error("Error updating product:", error);
            }
        }
        closeDetailsModal();
    };

    const handleDeleteProduct = async (productId) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                await axios.delete(`http://backend.soho.conf/api/products/${productId}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                }).then(() => {
                    toast.success("Successfully Deleted!", {
                        position: toast.POSITION.TOP_RIGHT
                    });
                }).catch((e) => {
                    toast.error(e, {
                        position: toast.POSITION.TOP_RIGHT
                    });
                });
                const response = await axios.get(`http://backend.soho.conf/api/products/?limit=${itemsPerPage}&page=${currentPage}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                setProducts(response.data.products);
                setTotalItems(response.data.totalCount);
            } catch (error) {
                console.error("Error deleting product:", error);
            }
        }
    };

    const openMovementsModal = async (productId) => {
        try {
            const response = await axios.get(`http://backend.soho.conf/api/products/movements/${productId}`,{
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setProductMovements(response.data);
            setMovementsModalOpen(true);
        } catch (error) {
            console.error("Error fetching product movements:", error);
        }
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`http://backend.soho.conf/api/products/?limit=${itemsPerPage}&page=${currentPage}`,{
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                setProducts(response.data.products);
                setTotalItems(response.data.totalCount);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching products:", error);
                setLoading(false);
            }
        }

        fetchProducts();
    }, [currentPage, itemsPerPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    const totalPages = Math.ceil(totalItems / itemsPerPage);

    return (
        <div className="products-container">
            <h2>Product List</h2>
            <button
                style={{ position: 'absolute', top: '10px', right: '10px' }}
                onClick={() => setAddModalOpen(true)}
            >
                Add Product
            </button>
            <div>
                <label>Show entries: </label>
                <select
                    value={itemsPerPage}
                    onChange={e => {
                        setCurrentPage(1); // reset to page 1 when changing itemsPerPage
                        setItemsPerPage(Number(e.target.value));
                    }}
                >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={15}>15</option>
                    <option value={20}>20</option>
                </select>
            </div>
            <table className="products-table">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Code</th>
                    <th>Stock Quantity</th>
                    <th>Process</th>
                </tr>
                </thead>
                <tbody>
                {products.map(product => (
                    <tr key={product._id}>
                        <td>{product.name}</td>
                        <td>{product.description}</td>
                        <td>{product.code}</td>
                        <td>{product.stockQuantity}</td>
                        <td>
                            <button onClick={() => openMovementsModal(product._id)}>Movements</button>
                            <button onClick={() => openDetailsModal(product)}>Details</button>
                            <button onClick={() => handleDeleteProduct(product._id)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <Modal isOpen={isDetailsModalOpen}
                   style={detailsModalStyles}
                   onRequestClose={closeDetailsModal}>
                <div className="product-detail-modal">
                    <h2>Edit Product Details</h2>
                    <label style={{ marginBottom: '10px', width: '100%' }}>
                        Name:
                        <input style={{ width: '100%', boxSizing: 'border-box' }} type="text" value={selectedProduct?.name} onChange={e => setSelectedProduct(prevState => ({...prevState, name: e.target.value}))} />
                    </label>
                    <label style={{ marginBottom: '10px', width: '100%' }}>
                        Description:
                        <textarea
                            style={{
                                width: '100%',
                                boxSizing: 'border-box',
                                resize: 'vertical',
                                marginTop: '10px',
                                marginBottom: '10px',
                                minHeight: '50px'
                            }}
                            value={selectedProduct?.description}
                            onChange={e => setSelectedProduct(prevState => ({...prevState, description: e.target.value}))}
                        ></textarea>
                    </label>
                    <label style={{ marginBottom: '10px', width: '100%' }}>
                        Stock Quantity:
                        <input style={{ width: '100%', boxSizing: 'border-box' }} type="number" value={selectedProduct?.stockQuantity} onChange={e => setSelectedProduct(prevState => ({...prevState, stockQuantity: e.target.value}))} />
                    </label>
                    <button onClick={closeDetailsModal}>Close</button>
                    <button onClick={handleUpdateProduct}>Update</button>
                </div>
            </Modal>
            <Modal isOpen={isMovementsModalOpen}
                   style={customStyles}   onRequestClose={closeMovementsModal}>
                <div className="movements-modal">
                    <h3>Product Movements</h3>
                    {productMovements.map(movement => (
                        <div key={movement._id} className="movement-item">
                            <div className="movement-type">Type: {movement.movementType}</div>
                            <div className="movement-quantity">Quantity: {movement.quantity}</div>
                        </div>
                    ))}
                    <button onClick={closeMovementsModal}>Close</button>
                </div>
            </Modal>
            <Modal isOpen={isAddModalOpen} style={addModalStyles} onRequestClose={() => setAddModalOpen(false)}>
                <div className="product-detail-modal">
                    <h2>Add New Product</h2>
                    <label style={{ marginBottom: '10px', width: '100%' }}>
                        Name:
                        <input
                            style={{ width: '100%', boxSizing: 'border-box' }}
                            type="text"
                            name="name"
                            value={newProductForm.name}
                            onChange={handleNewProductInputChange}
                            required
                        />
                    </label>
                    <label style={{ marginBottom: '10px', width: '100%' }}>
                        Description:
                        <textarea
                            style={{
                                width: '100%',
                                boxSizing: 'border-box',
                                resize: 'vertical',
                                marginTop: '10px',
                                marginBottom: '10px',
                                minHeight: '50px'
                            }}
                            name="description"
                            value={newProductForm.description}
                            onChange={handleNewProductInputChange}
                            required
                        ></textarea>
                    </label>
                    <label style={{ marginBottom: '10px', width: '100%' }}>
                        Code:
                        <input
                            style={{ width: '100%', boxSizing: 'border-box' }}
                            type="text"
                            name="code"
                            value={newProductForm.code}
                            onChange={handleNewProductInputChange}
                            required
                        />
                    </label>
                    <label style={{ marginBottom: '10px', width: '100%' }}>
                        Stock Quantity:
                        <input
                            style={{ width: '100%', boxSizing: 'border-box' }}
                            type="number"
                            name="stockQuantity"
                            value={newProductForm.stockQuantity}
                            onChange={handleNewProductInputChange}
                            required
                        />
                    </label>
                    <button onClick={() => setAddModalOpen(false)}>Close</button>
                    <button onClick={handleAddProduct}>Add</button>
                </div>
            </Modal>
            <div className="pagination">
                {[...Array(totalPages).keys()].map(number => (
                    <button key={number + 1} onClick={() => handlePageChange(number + 1)}>
                        {number + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};
