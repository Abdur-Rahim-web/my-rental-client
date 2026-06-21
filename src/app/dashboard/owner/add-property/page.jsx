"use client";

import React from "react";
import { Form, TextField, Label, Input, TextArea, Select, ListBox, Button } from "@heroui/react";

export default function AddPropertyPage() {
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());
        console.log("Submitted Property Data:", data);
    };
    

    // Responsive class logic
    const inputClass = "w-full bg-white border border-zinc-200 rounded-lg h-12 px-3 text-black focus:border-blue-500 outline-none transition-all";
    const labelClass = "text-zinc-500 text-sm font-medium";

    return (
        <div className="min-h-screen bg-zinc-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto bg-white border border-zinc-200 rounded-xl p-6 sm:p-8 shadow-sm">
                <h1 className="text-xl sm:text-2xl font-bold mb-6 text-black">Add New Property</h1>
                
                <Form onSubmit={handleSubmit} className="space-y-6">
                    {/* Title & Description */}
                    <TextField name="title" className="flex flex-col gap-2">
                        <Label className={labelClass}>Property Title</Label>
                        <Input className={inputClass} placeholder="e.g. Modern Apartment" />
                    </TextField>

                    <TextField name="description" className="flex flex-col gap-2">
                        <Label className={labelClass}>Description</Label>
                        <TextArea className={`${inputClass} h-24 p-3`} placeholder="Enter details..." />
                    </TextField>

                    {/* Grid Layout: Responsive (1 column on mobile, 2 on desktop) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <TextField name="location" className="flex flex-col gap-2">
                            <Label className={labelClass}>Location</Label>
                            <Input className={inputClass} placeholder="City, Address" />
                        </TextField>

                        <Select name="propertyType" className="flex flex-col gap-2">
                            <Label className={labelClass}>Property Type</Label>
                            <Select.Trigger className={inputClass}>
                                <Select.Value placeholder="Select type" />
                            </Select.Trigger>
                            <Select.Popover className="bg-white border border-zinc-200 p-1 rounded-lg">
                                <ListBox>
                                    <ListBox.Item id="apartment" className="p-2 hover:bg-zinc-100 cursor-pointer">Apartment</ListBox.Item>
                                    <ListBox.Item id="house" className="p-2 hover:bg-zinc-100 cursor-pointer">House</ListBox.Item>
                                </ListBox>
                            </Select.Popover>
                        </Select>
                    </div>

                    {/* Multi-column grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <TextField name="rent" className="flex flex-col gap-2">
                            <Label className={labelClass}>Rent (Price)</Label>
                            <Input type="number" className={inputClass} placeholder="0.00" />
                        </TextField>

                        <Select name="rentType" className="flex flex-col gap-2">
                            <Label className={labelClass}>Rent Type</Label>
                            <Select.Trigger className={inputClass}>
                                <Select.Value placeholder="Select" />
                            </Select.Trigger>
                            <Select.Popover className="bg-white border border-zinc-200 p-1 rounded-lg">
                                <ListBox>
                                    <ListBox.Item id="monthly" className="p-2 hover:bg-zinc-100">Monthly</ListBox.Item>
                                    <ListBox.Item id="weekly" className="p-2 hover:bg-zinc-100">Weekly</ListBox.Item>
                                </ListBox>
                            </Select.Popover>
                        </Select>

                        <TextField name="bedrooms" className="flex flex-col gap-2">
                            <Label className={labelClass}>Bedrooms</Label>
                            <Input type="number" className={inputClass} placeholder="0" />
                        </TextField>
                    </div>

                    <Button type="submit" className="w-full bg-blue-600 text-white font-semibold h-12 rounded-lg hover:bg-blue-700 transition-all">
                        Submit Property
                    </Button>
                </Form>
            </div>
        </div>
    );
}