"use client";

import React, { useState } from "react";
import { toast } from "react-toastify";
import { Form, TextField, Label, Input, Button, TextArea } from "@heroui/react";
import { updateProperty } from "@/lib/actions/property";

export default function UpdatePropertyModal({ property, onClose, onUpdateSuccess }) {
    const [loading, setLoading] = useState(false);

    const inputClass = "w-full bg-white border border-zinc-200 rounded-lg h-12 px-3 text-black focus:border-blue-500 outline-none transition-all";
    const labelClass = "text-zinc-500 text-sm font-medium";

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        const finalData = {
            ...data,
            rent: parseFloat(data.rent),
            bedrooms: parseInt(data.bedrooms),
            bathrooms: parseInt(data.bathrooms),
            size: parseInt(data.size),
            amenities: data.amenities.split(',').map(item => item.trim()),
            images: data.images.split(',').map(item => item.trim()),
        };

        const result = await updateProperty(property._id, finalData);

        if (!result.error) {
            toast.success("Property updated successfully!");
            onUpdateSuccess({ ...property, ...finalData });
            onClose();
        } else {
            toast.error(result.error || "Failed to update.");
        }
        setLoading(false);
    };
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl flex flex-col max-h-[90vh]">

                
                <div className="p-6 border-b border-zinc-100 shrink-0">
                    <h2 className="text-xl font-bold text-black">Update Property</h2>
                </div>

                
                <div className="p-6 overflow-y-auto">
                    <Form onSubmit={handleUpdate} className="space-y-4">
                        <TextField name="title" defaultValue={property.title} isRequired className="flex flex-col gap-2">
                            <Label className={labelClass}>Property Title</Label>
                            <Input className={inputClass} />
                        </TextField>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <TextField name="location" defaultValue={property.location} isRequired className="flex flex-col gap-2">
                                <Label className={labelClass}>Location</Label>
                                <Input className={inputClass} />
                            </TextField>
                            <div className="flex flex-col gap-2">
                                <Label className={labelClass}>Property Type</Label>
                                <select name="propertyType" defaultValue={property.propertyType} className={inputClass}>
                                    <option value="Apartment">Apartment</option>
                                    <option value="House">House</option>
                                    <option value="Studio">Studio</option>
                                    <option value="Villa">Villa</option>
                                </select>
                            </div>
                        </div>

                        <TextField name="description" defaultValue={property.description} className="flex flex-col gap-2">
                            <Label className={labelClass}>Description</Label>
                            <TextArea className={`${inputClass} h-20 p-3`} />
                        </TextField>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <TextField name="rent" defaultValue={property.rent} isRequired className="flex flex-col gap-2">
                                <Label className={labelClass}>Rent</Label>
                                <Input type="number" className={inputClass} />
                            </TextField>
                            <div className="flex flex-col gap-2">
                                <Label className={labelClass}>Rent Type</Label>
                                <select name="rentType" defaultValue={property.rentType} className={inputClass}>
                                    <option value="Monthly">Monthly</option>
                                    <option value="Weekly">Weekly</option>
                                    <option value="Daily">Daily</option>
                                </select>
                            </div>
                            <TextField name="bedrooms" defaultValue={property.bedrooms} className="flex flex-col gap-2">
                                <Label className={labelClass}>Bedrooms</Label>
                                <Input type="number" className={inputClass} />
                            </TextField>
                            <TextField name="bathrooms" defaultValue={property.bathrooms} className="flex flex-col gap-2">
                                <Label className={labelClass}>Bathrooms</Label>
                                <Input type="number" className={inputClass} />
                            </TextField>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <TextField name="size" defaultValue={property.size} className="flex flex-col gap-2">
                                <Label className={labelClass}>Size (sq ft)</Label>
                                <Input type="number" className={inputClass} />
                            </TextField>
                            <TextField name="amenities" defaultValue={property.amenities?.join(', ')} className="flex flex-col gap-2">
                                <Label className={labelClass}>Amenities (comma separated)</Label>
                                <Input className={inputClass} />
                            </TextField>
                        </div>

                        <TextField name="images" defaultValue={property.images?.join(', ')} className="flex flex-col gap-2">
                            <Label className={labelClass}>Images URL</Label>
                            <Input className={inputClass} />
                        </TextField>

                        
                        <div className="flex gap-3 mt-6 pt-4 border-t border-zinc-100">
                            <Button type="button" onClick={onClose} className="w-full bg-zinc-400">Cancel</Button>
                            <Button type="submit" isLoading={loading} className="w-full bg-blue-600 text-white">Save Changes</Button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
}