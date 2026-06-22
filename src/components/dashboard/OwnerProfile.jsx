"use client";

import React, { useState } from "react";
import { toast } from "react-toastify";
import { Button, Input, Form } from "@heroui/react";

export default function OwnerProfile({ owner }) {
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const updatedData = Object.fromEntries(formData.entries());

        // এখানে আপনার আপডেট API কল করুন (API Route /api/user/update)
        try {
            // উদাহরণস্বরূপ অ্যাকশন কল:
            // await updateOwnerProfile(owner._id, updatedData);
            toast.success("Profile updated successfully!");
            setIsEditing(false);
        } catch (error) {
            toast.error("Failed to update profile.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto bg-white p-6 md:p-8 rounded-xl border border-zinc-200 shadow-sm">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-zinc-900">Personal Information</h2>
                <Button
                    variant="flat"
                    color={isEditing ? "default" : "primary"}
                    onClick={() => setIsEditing(!isEditing)}
                >
                    {isEditing ? "Cancel" : "Edit Profile"}
                </Button>
            </div>

            {isEditing ? (
                <Form onSubmit={handleUpdate} className="space-y-4">
                    <Input name="name" label="Full Name" defaultValue={owner.name} isRequired />
                    <Input name="email" label="Email" value={owner.email} isReadOnly />
                    <Input name="phone" label="Phone Number" defaultValue={owner.phone} />
                    <Input name="address" label="Address" defaultValue={owner.address} />

                    <Button type="submit" color="primary" isLoading={loading} className="w-full">
                        Save Changes
                    </Button>
                </Form>
            ) : (
                <div className="space-y-6">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl">
                            {owner.name?.charAt(0)}
                        </div>
                        <div>
                            <p className="font-semibold text-lg">{owner.name}</p>
                            <p className="text-zinc-500 text-sm">{owner.email}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-zinc-100">
                        <div>
                            <p className="text-zinc-400 text-xs uppercase">Phone</p>
                            <p className="font-medium">{owner.phone || "Not set"}</p>
                        </div>
                        <div>
                            <p className="text-zinc-400 text-xs uppercase">Address</p>
                            <p className="font-medium">{owner.address || "Not set"}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}