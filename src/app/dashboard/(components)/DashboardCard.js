// src/app/dashboard/(components)/DashboardCard.js

import React from 'react';

// This component now accepts `title` and `value` as props
export default function DashboardCard({ title, value }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">{title}</h3>
      <p className="mt-2 text-3xl font-semibold text-gray-900">{value}</p>
    </div>
  );
}