import React from 'react'

import planData from '../../../utils/planData'
import PlanItemCard from './_components/PlanItemCard'

function Upgrade() {
    return (
        <div className='p-10'>
         <div className="max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:items-stretch md:grid-cols-3 md:gap-8">
    <div className="divide-y divide-gray-200 rounded-2xl border border-gray-200 shadow-sm dark:divide-gray-700 ">
      <div className="p-6 sm:px-8">
        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-200">
          Free
          <span className="sr-only">Plan</span>
        </h2>

       

        <p className="mt-2 sm:mt-4">
          <strong className="text-3xl font-bold text-gray-900 dark:text-gray-100 sm:text-4xl"> 0$ </strong>

          <span className="text-sm font-medium text-gray-700 dark:text-gray-400">/lifetime</span>
        </p>

        <a
           className="mt-4 block rounded border border-blue-500  bg-blue-500  px-12 py-3 text-center text-sm font-medium text-white hover:bg-transparent hover:text-blue-500  focus:outline-none focus:ring active:text-blue-500 dark:text-gray-200 dark:hover:bg-transparent dark:hover:text-gray-300 sm:mt-6"
          href="/dashboard"
        >
          Get Started
        </a>
      </div>

      <div className="p-6 sm:px-8">
        <p className="text-lg font-medium text-gray-900  dark:text-gray-200 sm:text-xl">What's included:</p>

        <ul className="mt-2 space-y-2 sm:mt-4">
          <li className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-5 text-green-400"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>

            <span className="text-gray-700 dark:text-gray-400"> Unlimited Mock Interviews </span>
          </li>

          <li className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-5 text-green-400"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>

            <span className="text-gray-700 dark:text-gray-400"> Unlimited Retakes </span>
          </li>

          <li className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-5 text-green-400"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>

            <span className="text-gray-700 dark:text-gray-400"> Any Domain
 </span>
          </li>

          <li className="flex items-center gap-1">
             <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-5 text-green-400"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>

            <span className="text-gray-700 dark:text-gray-400">  Easy to Use </span>
          </li>

          <li className="flex items-center gap-1">
             <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-5 text-green-400"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>

            <span className="text-gray-700 dark:text-gray-400"> Mobile-Friendly Interface </span>
          </li>

          <li className="flex items-center gap-1">
             <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-5 text-green-400"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>

            <span className="text-gray-700 dark:text-gray-400"> Real-Time Feedback </span>
          </li>
        </ul>
      </div>
    </div>

    <div className="divide-y divide-gray-200 rounded-2xl border border-gray-200 shadow-sm">
      <div className="p-6 sm:px-8">
        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-400">
          Pro
          <span className="sr-only">Plan</span>
        </h2>

       

        <p className="mt-2 sm:mt-4">
          <strong className="text-3xl font-bold text-gray-900 sm:text-4xl dark:text-gray-400"> 30$ </strong>

          <span className="text-sm font-medium text-gray-700 dark:text-gray-400">/month</span>
        </p>

        <a
          className="mt-4 block rounded border border-blue-500  bg-blue-500  px-12 py-3 text-center text-sm font-medium text-white hover:bg-transparent hover:text-blue-500  focus:outline-none focus:ring active:text-blue-500 dark:text-gray-200 dark:hover:bg-transparent dark:hover:text-gray-300 sm:mt-6"
          href="https://buy.stripe.com/test_7sI3d46uB6uX58IbIL"
           target="_blank"
  rel="noopener noreferrer"
        >
          Get Started
        </a>
      </div>

      <div className="p-6 sm:px-8">
        <p className="text-lg font-medium text-gray-900 sm:text-xl dark:text-gray-400">What's included:</p>

        <ul className="mt-2 space-y-2 sm:mt-4">
          <li className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-5 text-green-400"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>

            <span className="text-gray-700 dark:text-gray-400"> Unlimited Mock Interviews </span>
          </li>

          <li className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-5 text-green-400"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>

            <span className="text-gray-700 dark:text-gray-400"> Unlimited Retakes </span>
          </li>

          <li className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-5 text-green-400"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>

            <span className="text-gray-700 dark:text-gray-400"> Any Domain
 </span>
          </li>

          <li className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-5 text-red-700"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>

            <span className="text-gray-700 dark:text-gray-400">  Easy to Use </span>
          </li>

          <li className="flex items-center gap-1">
             <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-5 text-green-400"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>

            <span className="text-gray-700 dark:text-gray-400"> Mobile-Friendly Interface </span>
          </li>

          <li className="flex items-center gap-1">
             <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-5 text-green-400"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>

            <span className="text-gray-700 dark:text-gray-400"> Real-Time Feedback </span>
          </li>
        </ul>
      </div>
    </div>

    <div className="divide-y divide-gray-200 rounded-2xl border border-gray-200 shadow-sm">
      <div className="p-6 sm:px-8">
        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-400">
          Enterprise
          <span className="sr-only">Plan</span>
        </h2>

        

        <p className="mt-2 sm:mt-4">
          <strong className="text-3xl font-bold text-gray-900 sm:text-4xl dark:text-gray-400"> 100$ </strong>

          <span className="text-sm font-medium text-gray-700 dark:text-gray-400">/year</span>
        </p>

        <a
 className="mt-4 block rounded border border-blue-500  bg-blue-500  px-12 py-3 text-center text-sm font-medium text-white hover:bg-transparent hover:text-blue-500  focus:outline-none focus:ring active:text-blue-500 dark:text-gray-200 dark:hover:bg-transparent dark:hover:text-gray-300 sm:mt-6"
  href="https://buy.stripe.com/test_bIY2908CJaLd30AdQR"
  target="_blank"
  rel="noopener noreferrer"
>
  Get Started
</a>

      </div>

      <div className="p-6 sm:px-8">
        <p className="text-lg font-medium text-gray-900 sm:text-xl dark:text-gray-400">What's included:</p>

        <ul className="mt-2 space-y-2 sm:mt-4">
          <li className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-5 text-green-400"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>

            <span className="text-gray-700 dark:text-gray-400"> Unlimited Mock Interviews </span>
          </li>

          <li className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-5 text-green-400"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>

            <span className="text-gray-700 dark:text-gray-400"> Unlimited Retakes </span>
          </li>

          <li className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-5 text-green-400"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>

            <span className="text-gray-700 dark:text-gray-400"> Any Domain
 </span>
          </li>

          <li className="flex items-center gap-1">
             <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-5 text-red-700"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>

            <span className="text-gray-700 dark:text-gray-400">  Easy to Use </span>
          </li>

          <li className="flex items-center gap-1">
             <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-5 text-green-400"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>

            <span className="text-gray-700 dark:text-gray-400"> Mobile-Friendly Interface </span>
          </li>

          <li className="flex items-center gap-1">
             <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-5 text-green-400"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>

            <span className="text-gray-700 dark:text-gray-400"> Real-Time Feedback </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>
        </div>
    )
}

export default Upgrade
export const metadata = {
  title: "Upgrade | PrepPal",
  description: "Prep with Prepal to ace your next interview!",
};