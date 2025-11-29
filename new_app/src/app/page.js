"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black flex flex-col">


      <section className="px-6 py-16 sm:py-24 text-center bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
        <h1 className="text-4xl sm:text-5xl font-bold text-zinc-900 dark:text-zinc-50">
          Welcome to <span className="text-green-600">SustainWear</span>
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
          A sustainable clothing donation platform connecting donors and charities,
          helping reduce textile waste and track real CO₂ savings.
        </p>

        <a
          href="#learn-more"
          className="mt-10 inline-block px-8 py-3 rounded-full border border-zinc-300 dark:border-zinc-700 text-zinc-800 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
        >
          Learn More
        </a>
      </section>


      <section id="learn-more"className="px-6 py-20 bg-zinc-100 dark:bg-zinc-950 border-b border-zinc-300 dark:border-zinc-800">
        <h2 className="text-3xl text-center font-semibold text-zinc-900 dark:text-zinc-50 mb-12">
          What is SustainWear?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto text-center">


          <div className="p-6 sm:p-8 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800">
            <h3 className="text-xl font-semibold text-green-600">Donor</h3>
            <p className="mt-3 text-zinc-600 dark:text-zinc-400">
              Log donations, upload item photos, and track your sustainable impact.
            </p>

            <Link
              href="/dashboard/donor"
              className="mt-6 inline-block px-6 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 transition"
            >
              Go to Donor Dashboard
            </Link>
          </div>

          <div className="p-6 sm:p-8 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800">
            <h3 className="text-xl font-semibold text-green-600">Charity</h3>
            <p className="mt-3 text-zinc-600 dark:text-zinc-400">
              Manage donations, track inventory, and support your community.
            </p>

            <Link
              href="/dashboard/charity"
              className="mt-6 inline-block px-6 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 transition"
            >
              Go to Charity Dashboard
            </Link>
          </div>


          <div className="p-6 sm:p-8 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800">
            <h3 className="text-xl font-semibold text-green-600">Admin</h3>
            <p className="mt-3 text-zinc-600 dark:text-zinc-400">
              Oversee the platform, manage users, and view impact analytics.
            </p>

            <Link
              href="/dashboard/admin"
              className="mt-6 inline-block px-6 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 transition"
            >
              Go to Admin Dashboard
            </Link>
          </div>

        </div>
      </section>


      <section className="px-6 py-16 sm:py-20 text-center bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800">
        <h2 className="text-3xl font-semibold text-zinc-900 dark:text-zinc-50">
          Ready to make an impact?
        </h2>

        <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto">
          SustainWear helps donors, charities, and organisations reduce clothing waste and support a sustainable future.
          <br /> <br /> Make a donation today for a healthier tommorrow.
        </p>
      </section>
    </div>
  );
}
