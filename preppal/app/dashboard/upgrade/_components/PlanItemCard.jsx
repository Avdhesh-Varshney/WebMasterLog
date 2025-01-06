"use client";
import { useUser } from '@clerk/nextjs';
import React from 'react';

function PlanItemCard({ plan }) {
  const { user } = useUser();

  return (
    <div className="rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm sm:px-8 lg:p-12 dark:bg-gray-800">
      <div className="text-center">
        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
          {plan.name}
          <span className="sr-only">Plan</span>
        </h2>

        <p className="mt-2 sm:mt-4">
          <strong className="text-3xl font-bold text-gray-900 dark:text-gray-100 sm:text-4xl">
            {plan.cost}$
          </strong>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-400"> /lifetime</span>
        </p>
      </div>

      <ul className="mt-6 space-y-2">
        {plan.offering.map((item, index) => (
          <li key={index} className="flex items-center gap-1 mb-2">
            <h2 className="text-gray-700 dark:text-gray-300">{item.value}</h2>
          </li>
        ))}
      </ul>

      <a
        href="/dashboard" // Link to your dashboard
        target="_self"
        rel="noopener noreferrer" // Add rel attribute for security
        className="mt-8 block rounded-full border border-blue-600 bg-white  px-12 py-3 text-center text-sm font-medium text-blue-600 hover:ring-1 hover:ring-blue-600 focus:outline-none focus:ring active:text-blue-500 hover:bg-blue-600 hover:text-white dark:bg-blue-500 dark:hover:bg-blue-600 dark:text-gray-100"
      >
        Get Started
      </a>
    </div>
  );
}

export default PlanItemCard;