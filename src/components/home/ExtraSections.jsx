"use client";

import React from "react";

export default function ExtraSections() {
  return (
    <>
      {/* Extra Section 1: Top Locations */}
      <section className="py-16 bg-default-50/50 border-t border-default-100">
        <div className="mx-auto max-w-[1280px] px-6">
          <h3 className="text-2xl font-bold text-foreground mb-8">Explore Top Locations</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {["Dhaka", "Cox's Bazar", "Sylhet", "Chittagong"].map((city, idx) => (
              <div key={idx} className="relative group overflow-hidden rounded-xl h-36 cursor-pointer border border-default-200 bg-slate-800">
                <div className="absolute inset-0 bg-blue-900/40 group-hover:bg-blue-900/60 transition-colors z-10" />
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <p className="text-white font-bold text-lg tracking-wide">{city}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Extra Section 2: Rental Analytics/Statistics */}
      <section className="py-16 mx-auto max-w-[1280px] px-6 text-center border-t border-default-100">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <p className="text-4xl font-extrabold text-blue-600">12K+</p>
            <p className="text-sm text-default-500 mt-2 font-medium">Premium Listings Available</p>
          </div>
          <div>
            <p className="text-4xl font-extrabold text-blue-600">45K+</p>
            <p className="text-sm text-default-500 mt-2 font-medium">Active Safe Bookings</p>
          </div>
          <div>
            <p className="text-4xl font-extrabold text-blue-600">99.2%</p>
            <p className="text-sm text-default-500 mt-2 font-medium">Verified Identity Retention</p>
          </div>
          <div>
            <p className="text-4xl font-extrabold text-blue-600">24/7</p>
            <p className="text-sm text-default-500 mt-2 font-medium">Automated Support Channels</p>
          </div>
        </div>
      </section>
    </>
  );
}