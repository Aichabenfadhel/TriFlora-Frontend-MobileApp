import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './admin.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

interface Seller {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  image?: string;
}

const AdminSellers: React.FC = () => {
  const [sellers, setSellers] = useState<Seller[]>([]);
  const [newSeller, setNewSeller] = useState<Seller>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [updatingSeller, setUpdatingSeller] = useState<Seller | null>(null);

  useEffect(() => {
    fetchSellers();
  }, []);

  const fetchSellers = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/v1/sellers');
      setSellers(response.data.data);
    } catch (error) {
      console.error('Error fetching sellers:', error);
    }
  };

  const handleCreateSeller = async () => {
    try {
      await axios.post('http://localhost:8000/api/v1/sellers', newSeller);
      setNewSeller({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
      });
      fetchSellers();
      setIsCreating(false);
    } catch (error) {
      console.error('Error creating seller:', error);
    }
  };

  const handleDeleteSeller = async (id: string) => {
    try {
      await axios.delete(`http://localhost:8000/api/v1/sellers/${id}`);
      fetchSellers();
    } catch (error) {
      console.error('Error deleting seller:', error);
    }
  };

  const handleUpdateSeller = (seller: Seller) => {
    setUpdatingSeller(seller);
  };

  const handleSaveUpdateSeller = async () => {
    try {
      if (updatingSeller) {
        await axios.put(`http://localhost:8000/api/v1/sellers/${updatingSeller._id}`, updatingSeller);
        fetchSellers();
        setUpdatingSeller(null);
      }
    } catch (error) {
      console.error('Error updating seller:', error);
    }
  };

  return (
    <div>
    <div className="container">
      <h2>Manage Sellers</h2>
      <div>
            <FontAwesomeIcon icon={faPlus} className="icon" onClick={() => setIsCreating(true)}/>
            Create New Seller
            </div>
      <div>
        {isCreating ? (
          <div className="form-group">
            <h3>Add New Seller</h3>
            <input
              className="input-field"
              type="text"
              placeholder="First Name"
              value={newSeller.firstName}
              onChange={(e) => setNewSeller({ ...newSeller, firstName: e.target.value })}
            />
            <input
              className="input-field"
              type="text"
              placeholder="Last Name"
              value={newSeller.lastName}
              onChange={(e) => setNewSeller({ ...newSeller, lastName: e.target.value })}
            />
            <input
              className="input-field"
              type="email"
              placeholder="Email"
              value={newSeller.email}
              onChange={(e) => setNewSeller({ ...newSeller, email: e.target.value })}
            />
            <input
              className="input-field"
              type="password"
              placeholder="Password"
              value={newSeller.password}
              onChange={(e) => setNewSeller({ ...newSeller, password: e.target.value })}
            />
            <button className="button" onClick={handleCreateSeller}>Create Seller</button>
            <button className="button cancel-button" onClick={() => setIsCreating(false)}>Cancel</button>
          </div>
        ) : (
         <br />
        )}
      </div>
        {updatingSeller ? (
          <div className="form-group">
            <h3>Edit Seller</h3>
            <input
              className="input-field"
              type="text"
              placeholder="First Name"
              value={updatingSeller.firstName}
              onChange={(e) => setUpdatingSeller({ ...updatingSeller, firstName: e.target.value })}
            />
            <input
              className="input-field"
              type="text"
              placeholder="Last Name"
              value={updatingSeller.lastName}
              onChange={(e) => setUpdatingSeller({ ...updatingSeller, lastName: e.target.value })}
            />
            <input
              className="input-field"
              type="email"
              placeholder="Email"
              value={updatingSeller.email}
              onChange={(e) => setUpdatingSeller({ ...updatingSeller, email: e.target.value })}
            />
            <input
              className="input-field"
              type="password"
              placeholder="Password"
              value={updatingSeller.password}
              onChange={(e) => setUpdatingSeller({ ...updatingSeller, password: e.target.value })}
            />
            <button className="button" onClick={handleSaveUpdateSeller}>Save</button>
            <button className="button cancel-button" onClick={() => setUpdatingSeller(null)}>Cancel</button>
          </div>
        ) : (
          <h3>List of Sellers</h3>
        )}
        <div className="list-wrapper">
          <ul className="list">
            {sellers.map((seller) => (
              <li key={seller._id} className="list-item">
                <span>{`${seller.firstName} ${seller.lastName}`}</span>
                <div>
                    <FontAwesomeIcon icon={faTrash} className="icon" onClick={() => seller._id && handleDeleteSeller(seller._id)}/>
                  
                    <FontAwesomeIcon icon={faPen} className="icon" onClick={() => seller._id && handleUpdateSeller(seller)}/>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      </div>
  );
};

export default AdminSellers;
