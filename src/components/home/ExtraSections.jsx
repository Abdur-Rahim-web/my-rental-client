"use client";

import React from "react";
import { motion } from "framer-motion";

const stats = [
  { value: "12K+", label: "Premium Listings Available" },
  { value: "45K+", label: "Active Safe Bookings" },
  { value: "99.2%", label: "Verified Identity Retention" },
  { value: "24/7", label: "Automated Support Channels" },
];

const cities = ["Dhaka", "Cox's Bazar", "Sylhet", "Chittagong"];

export default function ExtraSections() {
  return (
    <>
      {/* Top Locations Section */}
      <section className="py-20 bg-default-50/50 border-t border-default-100">
        <div className="mx-auto max-w-[1280px] px-6">
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-3xl font-bold text-foreground mb-10"
          >
            Explore Top Locations
          </motion.h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {cities.map((city, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -8 }}
                className="relative group overflow-hidden rounded-2xl h-40 cursor-pointer border border-default-200 shadow-md"
              >
                
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-900 opacity-80 group-hover:opacity-90 transition-opacity" />

                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <p className="text-white font-bold text-xl tracking-wide">{city}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 mx-auto max-w-[1280px] px-6 border-t border-default-100">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="text-center"
            >
              <motion.p
                className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500"
              >
                {stat.value}
              </motion.p>
              <p className="text-sm text-default-500 mt-3 font-semibold uppercase tracking-wider">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}