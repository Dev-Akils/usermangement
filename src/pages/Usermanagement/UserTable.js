import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCustomer,
  
  setCustomers,
} from "../../redux/actions";
import * as XLSX from "xlsx";
import { Link, useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";

const UserTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const customers = useSelector((state) => state.customers) || [];

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  // Filter customers based on search query
  const filteredCustomers = customers.filter((row) =>
    Object.values(row).some((value) =>
      value.toString().toLowerCase().includes(search.toLowerCase())
    )
  );

  // Paginate filtered customers
  const totalPages = Math.ceil(filteredCustomers.length / rowsPerPage);
  const currentCustomers = filteredCustomers.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handleDelete = (id) => {
    dispatch(deleteCustomer(id));
  };

  const handleEdit = (customer) => {
    navigate(`/update-user/${customer.id}`, {
      state: { editingCustomer: customer },
    });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) {
      alert("Please upload a valid file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet);

        // Ensure each customer has a unique ID
        const customersWithIds = jsonData.map((customer) => ({
          ...customer,
          id: uuidv4(),
        }));
        console.log(customersWithIds);
        dispatch(setCustomers(customersWithIds));
      } catch (error) {
        console.error("Error reading file:", error);
        alert("There was an error processing the file.");
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const handleExport = () => {
    const exportData = filteredCustomers;
    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Customers");
    XLSX.writeFile(workbook, "customers.xlsx");
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col gap-4">
        <label className="block">
          <span className="block text-sm font-medium text-gray-700 mb-2">
            Upload Excel File
          </span>
          <input
            type="file"
            accept=".xlsx, .xls"
            onChange={handleFileUpload}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </label>
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 w-full">
          <input
            type="text"
            placeholder="Search..."
            className="w-full sm:w-3/4 p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 outline-none"
            onChange={handleSearch}
          />
          <button
            onClick={handleExport}
            className="w-full sm:w-1/4 p-2 border rounded-md hover:bg-blue-400 bg-blue-100 text-slate-400 hover:text-white hover:font-bold font-bold"
          >
            Export Data
          </button>

          <Link
            to="/add-user"
            className="w-full sm:w-1/4 p-2 text-center border rounded-md hover:bg-blue-400 bg-blue-100 text-slate-400 hover:text-white font-bold"
          >
            Add User+
          </Link>
        </div>
      </div>

      <div className="mt-4">
        {/* Display Users in a Table */}
        <table className="w-full border-collapse border border-gray-200 text-sm">
          <thead>
            <tr className="bg-gray-100">
              {currentCustomers.length > 0 &&
                Object.keys(currentCustomers[0]).map((key, index) => {
                  // Ensure the "id" field is displayed first
                  if (key === "id") {
                    return (
                      <th
                        key={index}
                        className="border border-gray-300 px-4 py-2 text-left"
                      >
                        {key}
                      </th>
                    );
                  }
                  return null;
                })}
              {currentCustomers.length > 0 &&
                Object.keys(currentCustomers[0]).map((key, index) => {
                  if (key !== "id") {
                    return (
                      <th
                        key={index + 1}
                        className="border border-gray-300 px-4 py-2 text-left"
                      >
                        {key}
                      </th>
                    );
                  }
                  return null;
                })}
              <th className="border border-gray-300 px-4 py-2 text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {currentCustomers.length > 0 ? (
              currentCustomers.map((row, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  {/* Render id column first */}
                  <td className="border border-gray-300 px-4 py-2">{row.id}</td>

                  {/* Render other data columns */}
                  {Object.keys(row).map((key, i) => {
                    if (key !== "id") {
                      return (
                        <td
                          key={i}
                          className="border border-gray-300 px-4 py-2"
                        >
                          {row[key]}
                        </td>
                      );
                    }
                    return null;
                  })}
                  <td className="border border-gray-300 p-2 text-center">
                    <button
                      onClick={() => handleEdit(row)}
                      className="text-blue-500 hover:text-blue-700 mr-2"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(row.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-4">
                  No customers available
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="flex items-center justify-between mt-4">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          >
            Previous
          </button>

          <span className="text-sm text-gray-700">
            Page {currentPage} of {totalPages}
          </span>

          <button
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
            disabled={currentPage === totalPages}
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserTable;
