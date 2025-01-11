import React, { useState, useEffect } from 'react';
import { useLocation, useParams, Link } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { updateCustomer } from '../../redux/actions';

function UpdateUserForm() {
  const { id } = useParams(); 
  const location = useLocation(); 
  const editingCustomer = location.state?.editingCustomer;

  const dispatch = useDispatch();

  // Initialize the customer state
  const [customer, setCustomer] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    premiumAmount: "",
    gstPercentage: 18,
    gstAmount: "",
    totalPremiumCollected: "",
    deleted: false,
  });

  useEffect(() => {
    if (editingCustomer) {
      setCustomer(editingCustomer); 
    } else if (id) {
      dispatch(updateCustomer(id)); 
    }
  }, [editingCustomer, id, dispatch]);

  // Calculate GST Amount and Total Premium Collected when premiumAmount or gstPercentage changes
  useEffect(() => {
    const premiumAmount = parseFloat(customer.premiumAmount) || 0; 
    const gstPercentage = parseFloat(customer.gstPercentage) || 18; 

    if (premiumAmount) {
      const gstAmount = (premiumAmount * gstPercentage) / 100;
      const totalPremiumCollected = premiumAmount + gstAmount;

      setCustomer((prev) => ({
        ...prev,
        gstAmount: gstAmount,
        totalPremiumCollected: totalPremiumCollected,
      }));
    }
  }, [customer.premiumAmount, customer.gstPercentage]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedCustomer = { ...customer, id };
    

    dispatch(updateCustomer(updatedCustomer)); 

    toast.success('Customer updated successfully!');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 border shadow-lg rounded-lg my-1">
      <div className="flex items-center justify-between gap-5 mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Edit Customer</h2>
        <Link to="/user-table" className="flex items-center space-x-2 p-3 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition duration-300">
          <FaUser className="text-lg" />
          <span>View Users</span>
        </Link>
      </div>

      {/* Customer Name */}
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-2" htmlFor="name">Customer Name</label>
        <input type="text" name="name" value={customer.name} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded" />
      </div>

      {/* Email Address */}
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-2" htmlFor="email">Email Address</label>
        <input type="email" name="email" value={customer.email} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded" />
      </div>

      {/* Phone Number */}
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-2" htmlFor="phone">Phone Number</label>
        <input type="text" name="phone" value={customer.phone} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded" />
      </div>

      {/* Premium Amount */}
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-2" htmlFor="premiumAmount">Premium Amount</label>
        <input type="number" name="premiumAmount" value={customer.premiumAmount} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded" />
      </div>

      {/* GST Percentage */}
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-2" htmlFor="gstPercentage">GST Percentage</label>
        <input type="number" name="gstPercentage" value={customer.gstPercentage} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
      </div>

      {/* GST Amount (calculated) */}
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-2" htmlFor="gstAmount">GST Amount</label>
        <input type="number" name="gstAmount" value={customer.gstAmount} readOnly className="w-full p-2 border border-gray-300 rounded bg-gray-100" />
      </div>

      {/* Total Premium Collected (calculated) */}
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-2" htmlFor="totalPremiumCollected">Total Premium Collected</label>
        <input type="number" name="totalPremiumCollected" value={customer.totalPremiumCollected} readOnly className="w-full p-2 border border-gray-300 rounded bg-gray-100" />
      </div>

      <button type="submit" className="w-full p-3 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600">
        Update Customer
      </button>

      <ToastContainer />
    </form>
  );
}

export default UpdateUserForm;
