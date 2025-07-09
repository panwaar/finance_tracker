import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { listTransactionsAPI } from "../../services/transactions/transactionService";

ChartJS.register(ArcElement, Tooltip, Legend);

const TransactionChart = () => {
  const {
    data: transactions = [],
    isError,
    isLoading,
  } = useQuery({
    queryFn: listTransactionsAPI,
    queryKey: ["list-transactions"],
  });

  // Calculate total income and expense
  const totals = transactions.reduce(
    (acc, tx) => {
      if (tx?.type === "income") {
        acc.income += tx.amount;
      } else if (tx?.type === "expense") {
        acc.expense += tx.amount;
      }
      return acc;
    },
    { income: 0, expense: 0 }
  );

  // Current month filtering
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const currentMonthExpenses = transactions.filter((tx) => {
    const txDate = new Date(tx.date);
    return (
      tx.type === "expense" &&
      txDate.getMonth() === currentMonth &&
      txDate.getFullYear() === currentYear
    );
  });

  // Total spent this month
  const totalSpentThisMonth = currentMonthExpenses.reduce(
    (sum, tx) => sum + tx.amount,
    0
  );

  // Find top spending category
  const categoryTotals = {};
  currentMonthExpenses.forEach((tx) => {
    const name = tx.category?.name || "Uncategorized";
    categoryTotals[name] = (categoryTotals[name] || 0) + tx.amount;
  });

  let topCategory = null;
  let maxSpent = 0;
  for (const cat in categoryTotals) {
    if (categoryTotals[cat] > maxSpent) {
      topCategory = cat;
      maxSpent = categoryTotals[cat];
    }
  }

  // Doughnut chart data
  const data = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        label: "Transactions",
        data: [totals.income, totals.expense],
        backgroundColor: ["#36A2EB", "#FF6384"],
        borderColor: ["#36A2EB", "#FF6384"],
        borderWidth: 1,
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          padding: 25,
          boxWidth: 12,
          font: { size: 14 },
        },
      },
      title: {
        display: true,
        text: "Income vs Expense",
        font: { size: 18, weight: "bold" },
        padding: { top: 10, bottom: 30 },
      },
    },
    cutout: "70%",
  };

  return (
    <div className="my-8 p-6 bg-white rounded-lg shadow-xl border border-gray-200">
      <h1 className="text-2xl font-bold text-center mb-6">
        Transaction Overview
      </h1>

      <div style={{ height: "350px" }}>
        <Doughnut data={data} options={options} />
      </div>

      {/* Summary Section Below Chart */}
      <div className="mt-8 text-center text-md text-gray-700">
        <p>
          💸 <strong>Total spent this month:</strong>{" "}
          <span className="text-red-600 font-semibold">
            ₹{totalSpentThisMonth.toLocaleString()}
          </span>
        </p>
         
      </div>
    </div>
  );
};

export default TransactionChart;
