"use client";

import React, { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Form, TextField, Label, Input, TextArea, Button } from "@heroui/react";
import { createProperty } from "@/lib/actions/property";
import { useSession } from "@/lib/auth-client"; // Better Auth হুক

export default function AddPropertyPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const { data: session } = useSession();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!session?.user?.email) {
            toast.error("Please login to add a property.");
            return;
        }

        setLoading(true);
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        const propertyData = {
            title: data.title,
            description: data.description,
            location: data.location,
            propertyType: data.propertyType,
            rent: parseFloat(data.rent),
            rentType: data.rentType,
            bedrooms: parseInt(data.bedrooms),
            bathrooms: parseInt(data.bathrooms),
            size: parseInt(data.size),
            amenities: data.amenities ? data.amenities.split(',').map(item => item.trim()) : [],
            images: data.images ? data.images.split(',').map(item => item.trim()) : [],
            extraFeatures: data.extraFeatures,
            status: "Pending",
            rejectionFeedback: "",
            ownerEmail: session.user.email,
            ownerName: session.user.name || "User",
            createdAt: new Date().toISOString(),
        };

        try {
            const result = await createProperty(propertyData);
            if (result && !result.error) {
                toast.success("Property added successfully!");
                router.push("/dashboard/owner/my-properties");
            } else {
                toast.error(result?.error || "Failed to add property.");
            }
        } catch (error) {
            toast.error("Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    const inputClass = "w-full bg-white border border-zinc-200 rounded-lg h-12 px-3 text-black focus:border-blue-500 outline-none transition-all";
    const labelClass = "text-zinc-500 text-sm font-medium";

    return (
        <div className="min-h-screen bg-zinc-50 py-10 px-4">
            <div className="max-w-4xl mx-auto bg-white border border-zinc-200 rounded-xl p-6 shadow-sm">
                <h1 className="text-2xl font-bold mb-8 text-black">Add New Property</h1>

                <Form onSubmit={handleSubmit} className="space-y-6">


                    <TextField name="title" isRequired className="flex flex-col gap-2">
                        <Label className={labelClass}>Property Title</Label>
                        <Input className={inputClass} />
                    </TextField>


                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <TextField name="location" isRequired className="flex flex-col gap-2">
                            <Label className={labelClass}>Location</Label>
                            <Input className={inputClass} />
                        </TextField>
                        <TextField name="rentType" className="flex flex-col gap-2">
                            <Label className={labelClass}>Property Type</Label>
                            <select
                                name="rentType"
                                className={`${inputClass} bg-white`}
                            >
                                <option value="Apartment">Apartment</option>
                                <option value="House">House</option>
                                <option value="Studio">Studio</option>
                                <option value="Villa">Villa</option>
                            </select>
                        </TextField>
                    </div>

                    <TextField name="description" className="flex flex-col gap-2">
                        <Label className={labelClass}>Description</Label>
                        <TextArea className={`${inputClass} h-24 p-3`} />
                    </TextField>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <TextField name="rent" isRequired className="flex flex-col gap-2">
                            <Label className={labelClass}>Rent (Price)</Label>
                            <Input type="number" className={inputClass} />
                        </TextField>
                        <div className="flex flex-col gap-2">
                            <Label className={labelClass}>Rent Type</Label>
                            <select name="rentType" className={inputClass}>
                                <option value="Monthly">Monthly</option>
                                <option value="Weekly">Weekly</option>
                                <option value="Daily">Daily</option>
                            </select>
                        </div>
                        <TextField name="bedrooms" className="flex flex-col gap-2">
                            <Label className={labelClass}>Bedrooms</Label>
                            <Input type="number" className={inputClass} />
                        </TextField>
                        <TextField name="bathrooms" className="flex flex-col gap-2">
                            <Label className={labelClass}>Bathrooms</Label>
                            <Input type="number" className={inputClass} />
                        </TextField>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <TextField name="size" className="flex flex-col gap-2">
                            <Label className={labelClass}>Property Size (sq ft)</Label>
                            <Input type="number" className={inputClass} />
                        </TextField>
                        <TextField name="amenities" className="flex flex-col gap-2">
                            <Label className={labelClass}>Amenities (comma separated)</Label>
                            <Input className={inputClass} placeholder="WiFi, Pool, Parking" />
                        </TextField>
                    </div>

                    <TextField name="extraFeatures" className="flex flex-col gap-2">
                        <Label className={labelClass}>Extra Features</Label>
                        <Input className={inputClass} />
                    </TextField>

                    <TextField name="images" className="flex flex-col gap-2">
                        <Label className={labelClass}>Images URL</Label>
                        <Input className={inputClass} placeholder="Enter image URLs" />
                    </TextField>

                    <Button
                        type="submit"
                        isLoading={loading}
                        className="w-full bg-blue-600 text-white h-12 rounded-lg font-bold hover:bg-blue-700"
                    >
                        {loading ? "Submitting..." : "Submit Property"}
                    </Button>
                </Form>
            </div>
        </div>
    );
}