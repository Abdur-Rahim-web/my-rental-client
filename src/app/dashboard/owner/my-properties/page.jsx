"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client"; 
import { toast } from "react-toastify";
import MyPropertiesTable from "@/components/dashboard/MyPropertiesTable";
import { getOwnerProperties } from "@/lib/api/property";
import UpdatePropertyModal from "@/components/dashboard/UpdatePropertyModal";

export default function MyPropertiesPage() {
  const { data: session, isPending } = useSession();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);

  const handleUpdateClick = (property) => {
    setSelectedProperty(property);
    setIsModalOpen(true);
  };

  useEffect(() => {
    const fetchProperties = async () => {
      if (session?.user?.email) {
        console.log("Fetching for email:", session.user.email);
        try {
          const data = await getOwnerProperties(session.user.email);
          console.log("Fetched data:", data);
          setProperties(data);
        } catch (error) {
          toast.error("Failed to load your properties.");
        } finally {
          setLoading(false);
        }
      } else if (!isPending) {
       
        setLoading(false);
      }
    };

    fetchProperties();
  }, [session, isPending]);

  
  if (isPending || loading) {
    return <div className="p-10 text-center text-zinc-500">Loading your properties...</div>;
  }

  
  if (!session?.user) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-xl font-semibold text-zinc-800">Access Denied</h2>
        <p className="text-zinc-500">Please login to view your properties.</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-black">My Properties</h1>
      </div>

      {properties.length > 0 ? (
        <MyPropertiesTable
          properties={properties}
          onDelete={(id) => setProperties(properties.filter(p => p._id !== id))}
          onUpdate={handleUpdateClick}
        />
        
      ) : (
        <div className="p-10 border border-zinc-200 rounded-lg text-center text-zinc-500">
          You haven&apos;t added any properties yet.
        </div>
      )}

      {isModalOpen && (
    <UpdatePropertyModal 
        property={selectedProperty} 
        onClose={() => setIsModalOpen(false)} 
        onUpdateSuccess={(updatedProp) => {
            setProperties(prev => prev.map(p => p._id === updatedProp._id ? updatedProp : p));
            setIsModalOpen(false);
        }}
    />
)}
    </div>
  );
}