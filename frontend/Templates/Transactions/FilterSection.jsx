import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { listTransactionsAPI } from "../../services/transactions/transactionService";
import { FaTrash, FaEdit } from "react-icons/fa";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

const FilterSection = () => {
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    type: "",
    category: "",
  });

  const { data: transactions, isLoading, isError } = useQuery({
    queryKey: ["transactions", filters],
    queryFn: () => listTransactionsAPI(filters),
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="my-4 p-4 shadow-lg rounded-lg bg-white">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <input
          type="date"
          name="startDate"
          value={filters.startDate}
          onChange={handleInputChange}
          className="p-2 rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
        />
        <input
          type="date"
          name="endDate"
          value={filters.endDate}
          onChange={handleInputChange}
          className="p-2 rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
        />
        <div className="relative">
          <select
            name="type"
            value={filters.type}
            onChange={handleInputChange}
            className="w-full p-2 rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 appearance-none"
          >
            <option value="">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <ChevronDownIcon className="w-5 h-5 absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={filters.category}
          onChange={handleInputChange}
          className="p-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
        />
      </div>

      <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow-inner">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">
          Filtered Transactions
        </h3>
        {isLoading ? (
          <p>Loading...</p>
        ) : isError ? (
          <p className="text-red-500">Error loading transactions.</p>
        ) : transactions?.length === 0 ? (
          <p>No transactions found.</p>
        ) : (
          <ul className="list-disc pl-5 space-y-2">
            {transactions.map((txn) => (
              <li
                key={txn._id}
                className="bg-white p-3 rounded-md shadow border border-gray-200 flex justify-between items-center"
              >
                <div>
                  <span className="font-medium text-gray-600">
                    {new Date(txn.date).toLocaleDateString()}
                  </span>
                  <span
                    className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      txn.type === "income"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {txn.type.charAt(0).toUpperCase() + txn.type.slice(1)}
                  </span>
                  <span className="ml-2 text-gray-800">
                    {txn.category} - ₹{txn.amount.toLocaleString()}
                  </span>
                  <span className="ml-2 text-sm text-blue-600">
                    {txn.paymentMethod || "N/A"}
                  </span>
                </div>
                <div className="flex space-x-3">
                  <Link to={`/update-transaction/${txn._id}`}>
                    <button className="text-blue-500 hover:text-blue-700">
                      <FaEdit />
                    </button>
                  </Link>
                  <button
                    // onClick={() => handleDelete(txn._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default FilterSection;
