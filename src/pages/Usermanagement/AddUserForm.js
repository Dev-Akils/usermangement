import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addCustomer } from "../../redux/actions";

const AddUserForm = () => {
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
      
      const dispatch = useDispatch();
    
      // Calculate GST Amount and Total Premium Collected
      useEffect(() => {
        if (customer.premiumAmount) {
          const gstAmount = (customer.premiumAmount * customer.gstPercentage) / 100;
          const totalPremiumCollected =
            parseFloat(customer.premiumAmount) + gstAmount;
          setCustomer((prev) => ({
            ...prev,
            gstAmount,
            totalPremiumCollected,
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
        toast.success("Customer added successfully!");
    
        // Dispatch the addCustomer action to add the new customer to the Redux store
        dispatch(addCustomer(customer));
    
        // Reset the form after adding the customer
        setCustomer({
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
      };
    

  return (
    <div className="max-w-2xl mx-auto">
      <form
        onSubmit={handleSubmit}
        className="p-6 border shadow-lg rounded-lg my-4"
      >
        <div className="flex justify-between items-center gap-5 mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Add New Customer</h2>
          <Link
            to="/user-table"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
          >
            View Data
          </Link>
        </div>
        {/* Customer Name */}
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2" htmlFor="name">
            Customer Name
          </label>
          <input
            type="text"
            name="name"
            value={customer.name}
            placeholder="Enter Customer Name"
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* Email Address */}
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2" htmlFor="email">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={customer.email}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* Phone Number */}
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2" htmlFor="phone">
            Phone Number
          </label>
          <input
            type="text"
            name="phone"
            placeholder="Enter Phone Number"
            value={customer.phone}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* Premium Amount */}
        <div className="mb-4">
          <label
            className="block text-sm font-semibold mb-2"
            htmlFor="premiumAmount"
          >
            Premium Amount
          </label>
          <input
            type="number"
            name="premiumAmount"
            placeholder="Enter Premium Amount"
            value={customer.premiumAmount}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* GST % */}
        <div className="mb-4">
          <label
            className="block text-sm font-semibold mb-2"
            htmlFor="gstPercentage"
          >
            GST Percentage
          </label>
          <input
            type="number"
            name="gstPercentage"
            placeholder="Enter GST %"
            value={customer.gstPercentage}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* GST Amount (calculated) */}
        <div className="mb-4">
          <label
            className="block text-sm font-semibold mb-2"
            htmlFor="gstAmount"
          >
            GST Amount
          </label>
          <input
            type="number"
            name="gstAmount"
            value={customer.gstAmount}
            readOnly
            className="w-full p-2 border border-gray-300 rounded bg-gray-100"
          />
        </div>

        {/* Total Premium Collected (calculated) */}
        <div className="mb-4">
          <label
            className="block text-sm font-semibold mb-2"
            htmlFor="totalPremiumCollected"
          >
            Total Premium Collected
          </label>
          <input
            type="number"
            name="totalPremiumCollected"
            value={customer.totalPremiumCollected}
            readOnly
            className="w-full p-2 border border-gray-300 rounded bg-gray-100"
          />
        </div>

        <button
          type="submit"
          className="w-full p-3 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
        >
          Add Customer
        </button>
      </form>

      <ToastContainer />
    </div>
  );
};

export default AddUserForm;
