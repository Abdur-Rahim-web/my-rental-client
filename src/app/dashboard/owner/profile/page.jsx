"use client";

import React from "react";
import UserInfoCard from "@/components/dashboard/UserInfoCard";

const ProfilePage = () => {
    return (
        
        <div className="flex justify-center items-center bg-gray-100 h-[calc(100vh-80px)] w-full">
            <UserInfoCard />
        </div>
    );
};

export default ProfilePage;