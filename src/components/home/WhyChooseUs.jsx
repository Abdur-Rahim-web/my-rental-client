"use client";

import React from "react";
import { ShieldCheck, LayoutSplitColumns3, Rocket } from "@gravity-ui/icons";

export default function WhyChooseUs() {
  return (
    <section className="py-16 bg-default-50">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Why Choose StayEase Platform?</h2>
          <p className="mt-4 text-default-500">We streamline real estate mechanics to give you unmatched housing flexibility.</p>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          <div className="bg-background p-6 rounded-2xl border border-default-200 shadow-xs text-center flex flex-col items-center">
            <div className="p-3 bg-blue-50 rounded-xl text-blue-600 mb-4"><ShieldCheck className="w-8 h-8" /></div>
            <h3 className="text-xl font-bold mb-2">Verified Landlords</h3>
            <p className="text-sm text-default-500">Every property listing profile undergoes robust regulatory compliance filtering before authorization.</p>
          </div>
          <div className="bg-background p-6 rounded-2xl border border-default-200 shadow-xs text-center flex flex-col items-center">
            <div className="p-3 bg-blue-50 rounded-xl text-blue-600 mb-4"><LayoutSplitColumns3 className="w-8 h-8" /></div>
            <h3 className="text-xl font-bold mb-2">Flexible Dashboards</h3>
            <p className="text-sm text-default-500">Easily supervise monthly invoicing pipelines, lease terms, and booking requests via one central core panel.</p>
          </div>
          <div className="bg-background p-6 rounded-2xl border border-default-200 shadow-xs text-center flex flex-col items-center">
            <div className="p-3 bg-blue-50 rounded-xl text-blue-600 mb-4"><Rocket className="w-8 h-8" /></div>
            <h3 className="text-xl font-bold mb-2">Instant Confirmation</h3>
            <p className="text-sm text-default-500">Eliminate traditional brokers. Finalize agreements and payment terms dynamically without middle layers.</p>
          </div>
        </div>
      </div>
    </section>
  );
}