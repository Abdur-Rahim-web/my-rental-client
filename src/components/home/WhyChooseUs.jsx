"use client";

import React from "react";
import { ShieldCheck, LayoutSplitColumns3, Rocket } from "@gravity-ui/icons";
import { motion } from "framer-motion";

const features = [
  {
    icon: <ShieldCheck className="w-9 h-9" />,
    title: "Verified Landlords",
    description: "Every property listing profile undergoes robust regulatory compliance filtering before authorization.",
    color: "from-emerald-500 to-teal-600"
  },
  {
    icon: <LayoutSplitColumns3 className="w-9 h-9" />,
    title: "Flexible Dashboards",
    description: "Easily supervise monthly invoicing pipelines, lease terms, and booking requests via one central core panel.",
    color: "from-blue-500 to-indigo-600"
  },
  {
    icon: <Rocket className="w-9 h-9" />,
    title: "Instant Confirmation",
    description: "Eliminate traditional brokers. Finalize agreements and payment terms dynamically without middle layers.",
    color: "from-orange-500 to-red-600"
  }
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="mx-auto max-w-[1280px] px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-foreground mb-6">
            Why Choose <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent italic">Nestora </span> ?
          </h2>
          <p className="text-xl text-default-500 max-w-2xl mx-auto font-light">
            Experience the future of housing where technology meets comfort.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: false, amount: 0.3 }} 
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 10,
                delay: idx * 0.2
              }}
              
              whileHover={{
                scale: 1.08,
                rotate: 2,
                transition: { type: "spring", stiffness: 300 }
              }}
              className="group relative p-10 rounded-[2.5rem] border border-default-100 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:shadow-[0_40px_60px_rgba(0,0,0,0.1)] transition-shadow duration-500 flex flex-col items-center text-center"
            >
              <div className={`p-5 rounded-3xl bg-gradient-to-tr ${feature.color} text-white mb-8 shadow-xl shadow-blue-500/20`}>
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4 text-foreground">{feature.title}</h3>
              <p className="text-default-500 leading-relaxed font-medium">{feature.description}</p>

              
              <motion.div
                className="absolute inset-0 rounded-[2.5rem] border-2 border-blue-500/20 opacity-0 group-hover:opacity-100 pointer-events-none"
                initial={false}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}