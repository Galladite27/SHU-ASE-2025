"use client";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function EditStockPage() {
  const searchParams = useSearchParams();
  //const itemId = searchParams.get("item_id");
  const [editingId, setEditingId] = useState(null);
  const [editValues, setEditValues] = useState({ material: "", weight: "" });
  
  const handleEditClick = (item) => {
    setEditingId(item.id);
    setEditValues({ material: item.material, weight: item.weight });
  };

  const handleSave = (id) => {
    const updated = stockLevels.map((item) =>item.id === id ? { ...item, ...editValues } : item);
    setStock(updated);
    setEditingId(null);
  };

  const [stockLevels, setStock] = useState([]);
    useEffect(() => {
        async function loadMetrics() {
          try {
            const res = await fetch("../../../api/getClothingStockLevel");
            if (!res.ok) throw new Error("Failed to fetch stock");
            const data = await res.json();
            setStock(data);
          } catch (err) {
            console.error(err);
          }
        }
        loadMetrics();
      }, []); 

  return (
    <main className="p-6 sm:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Manchester Piccadilly Branch</h1>
          <p className="text-gray-600 mt-1">Manage inventory for this branch.</p>
        </div>

        {/* Stock Table */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">View and Edit All Items</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="border-b-2 border-gray-200">
                <tr>
                  <th className="py-3 px-4 font-semibold text-gray-600">Item</th>
                  <th className="py-3 px-4 font-semibold text-gray-600">Material</th>
                  <th className="py-3 px-4 font-semibold text-gray-600">Weight</th>
                  <th className="py-3 px-4 font-semibold text-gray-600">Gender</th>
                  <th className="py-3 px-4 font-semibold text-gray-600">Quality</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {stockLevels.map((item) => (
                  <tr key={item.id}>
                    <td className="py-3 px-4 text-gray-800 font-medium">{item.itemName}</td>
                    <td className="py-3 px-4 text-gray-600">
                      {editingId === item.id ? (<input type="text" className="border rounded px-2 py-1 w-18" value={editValues.material} onChange={(e) => setEditValues((prev) => ({ ...prev, material: e.target.value }))}/>) : (item.material)}
                    </td>
                    <td className="py-3 px-4 text-gray-800 font-semibold">
                      {editingId === item.id ? (<input type="number" className="border rounded px-2 py-1 w-18" value={editValues.weight}onChange={(e) =>setEditValues((prev) => ({ ...prev, weight: e.target.value }))}/>) : (item.weight)}
                    </td>
                    <td className="py-3 px-4 text-gray-800 font-medium">{item.gender}</td>
                    <td className="py-3 px-4 text-gray-800 font-medium">{item.quality}</td>
                    <td className="py-3 px-4 text-gray-800">
                      {editingId === item.id ? (
                          <button onClick={() => handleSave(item.id)} className="bg-green-400 text-black px-3 py-1 rounded hover:bg-green-600 mr-2">Save</button>
                      ) : (
                        <button onClick={() => handleEditClick(item)} className="bg-gray-300 text-black px-3 py-1 rounded hover:bg-gray-600 cursor-pointer">Edit</button>
                      )}
                    </td>
                    <td className="py-3 px-4 text-gray-800">
                      <button className="bg-gray-300 text-black px-3 py-1 rounded hover:bg-gray-600 cursor-pointer">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
