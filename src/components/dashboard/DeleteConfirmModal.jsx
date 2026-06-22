"use client";
import React from "react";
import { Button } from "@heroui/react";

export default function DeleteConfirmModal({ isOpen, onClose, onConfirm, loading }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 w-full max-w-sm shadow-xl">
                <h3 className="text-lg font-bold text-red-600">Delete Property</h3>
                <p className="text-zinc-600 mt-2 mb-6">
                    Are you sure you want to delete this property? This action cannot be undone.
                </p>
                <div className="flex gap-3">
                    <Button onClick={onClose} className="w-full bg-zinc-200">Cancel</Button>
                    <Button 
                        onClick={onConfirm} 
                        isLoading={loading} 
                        className="w-full bg-red-600 text-white"
                    >
                        Delete
                    </Button>
                </div>
            </div>
        </div>
    );
}