'use client';

import { useState } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, ResponsiveContainer } from 'recharts';
import { FaUtensils, FaFilm, FaCar, FaPlus, FaTrash, FaEdit } from 'react-icons/fa';
import { Dialog } from '@headlessui/react';

export default function ExpenseTracker() {
  const [balance, setBalance] = useState(4500);
  const [expenses, setExpenses] = useState(500);
  const [isIncomeModalOpen, setIncomeModalOpen] = useState(false);
  const transactions = [
    { id: 1, name: 'Samosa', amount: 150, date: 'March 20, 2024', icon: <FaUtensils /> },
    { id: 2, name: 'Movie', amount: 300, date: 'March 21, 2024', icon: <FaFilm /> },
    { id: 3, name: 'Auto', amount: 50, date: 'March 22, 2024', icon: <FaCar /> },
  ];

  const expenseData = [
    { name: 'Food', value: 150 },
    { name: 'Entertainment', value: 300 },
    { name: 'Travel', value: 50 },
  ];

  const COLORS = ['#8A2BE2', '#FFA500', '#FFD700'];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold">Expense Tracker</h1>
      
      {/* Wallet Balance, Expenses & Pie Chart */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 items-center">
        <div className="bg-gray-700 p-4 rounded-lg text-center">
          <p className="text-lg">Wallet Balance: <span className="text-green-400">₹{balance}</span></p>
          <button onClick={() => setIncomeModalOpen(true)} className="mt-2 px-4 py-2 bg-green-500 rounded-lg flex items-center justify-center gap-2 w-full">
            <FaPlus /> Add Income
          </button>
        </div>
        <div className="bg-gray-700 p-4 rounded-lg text-center">
          <p className="text-lg">Expenses: <span className="text-red-400">₹{expenses}</span></p>
          <button className="mt-2 px-4 py-2 bg-red-500 rounded-lg flex items-center justify-center gap-2 w-full">
            <FaPlus /> Add Expense
          </button>
        </div>
        <div className="bg-gray-700 p-4 rounded-lg flex justify-center">
          <ResponsiveContainer width={150} height={150}>
            <PieChart>
              <Pie data={expenseData} dataKey="value" outerRadius={60}>
                {expenseData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Transactions List & Bar Chart */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="text-xl font-semibold">Recent Transactions</h2>
          {transactions.map((tx) => (
            <div key={tx.id} className="flex justify-between items-center border-b border-gray-600 py-2">
              <div className="flex items-center gap-2">
                <span className="text-xl">{tx.icon}</span>
                <div>
                  <p>{tx.name}</p>
                  <p className="text-gray-400 text-sm">{tx.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-red-400">₹{tx.amount}</p>
                <button className="text-yellow-400"><FaEdit /></button>
                <button className="text-red-400"><FaTrash /></button>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="text-xl font-semibold">Top Expenses</h2>
          <ResponsiveContainer width="100%" height={100}>
            <BarChart data={expenseData}>
              <XAxis dataKey="name" hide />
              <Bar dataKey="value" fill="#8A2BE2" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Add Income Modal */}
      <Dialog open={isIncomeModalOpen} onClose={() => setIncomeModalOpen(false)} className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg w-96 text-black">
          <h2 className="text-xl font-bold mb-4">Add Income</h2>
          <input type="number" placeholder="Income Amount" className="w-full p-2 border rounded mb-4" />
          <div className="flex justify-end gap-2">
            <button onClick={() => setIncomeModalOpen(false)} className="px-4 py-2 bg-gray-500 text-white rounded">Cancel</button>
            <button className="px-4 py-2 bg-green-500 text-white rounded">Add Balance</button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}