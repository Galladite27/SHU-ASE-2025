"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black flex flex-col">
      
      {/* Hero */}
      <section className="px-6 py-24 text-center bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
        <h1 className="text-4xl sm:text-5xl font-bold text-zinc-900 dark:text-zinc-50">
          Welcome to <span className="text-green-600">SustainWear</span>
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
          A sustainable clothing donation platform connecting donors and charities, 
          helping reduce textile waste and track real CO₂ savings.  
          Learn more about how SustainWear empowers communities and supports a circular economy.
        </p>

        <a
          href="#learn-more"
          className="mt-10 inline-block px-8 py-3 rounded-full border border-zinc-300 dark:border-zinc-700 text-zinc-800 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
        >
          Learn More
        </a>
      </section>

      {/* Roles */}
      <section id="learn-more" className="px-6 py-20">
        <h2 className="text-3xl text-center font-semibold text-zinc-900 dark:text-zinc-50 mb-12">
          What is SustainWear?
        </h2>

        <div className="grid sm:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="p-8 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800">
            <h3 className="text-xl font-semibold text-green-600">For Donors</h3>
            <p className="mt-3 text-zinc-600 dark:text-zinc-400">
              Log clothes, upload photos, and track your sustainability impact.
            </p>
          </div>

          <div className="p-8 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800">
            <h3 className="text-xl font-semibold text-green-600">For Charities</h3>
            <p className="mt-3 text-zinc-600 dark:text-zinc-400">
              Manage donation inventory, process received items, and distribute clothes to communities in need.
            </p>
          </div>

          <div className="p-8 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800">
            <h3 className="text-xl font-semibold text-green-600">For Admins</h3>
            <p className="mt-3 text-zinc-600 dark:text-zinc-400">
              Oversee the platform, manage users, and access system-wide sustainability analytics.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section Without Buttons */}
      <section className="px-6 py-20 text-center bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800">
        <h2 className="text-3xl font-semibold text-zinc-900 dark:text-zinc-50">
          Ready to make an impact?
        </h2>

        <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto">
          SustainWear empowers donors, charities, and organisations to work together 
          in reducing clothing waste and supporting a more sustainable future.
        </p>
      </section>
    </div>
  );
}
