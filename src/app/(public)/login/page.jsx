"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button, Input, Card } from "@heroui/react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        console.log("Logging in with:", email, password);
        // এখানে পরবর্তীতে Auth Context বা API Call যুক্ত হবে
    };

    return (
        <div className="flex min-h-[calc(100vh-64px)] items-center justify-center px-6 py-12 bg-default-50">
            <Card className="w-full max-w-md p-8 border border-default-200" shadow="md">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-foreground">Welcome Back</h1>
                    <p className="text-sm text-default-400 mt-2">Login to manage your property bookings</p>
                </div>

                <form onSubmit={handleLogin} className="flex flex-col gap-4">
                    <Input
                        type="email"
                        label="Email Address"
                        placeholder="enter your email"
                        variant="bordered"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                        type="password"
                        label="Password"
                        placeholder="enter your password"
                        variant="bordered"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <Button
                        type="submit"
                        color="primary"
                        className="w-full bg-blue-600 hover:bg-blue-700 font-semibold mt-2"
                    >
                        Sign In
                    </Button>
                </form>

                <p className="text-center text-sm text-default-500 mt-6">
                    Don&apos;t have an account?{" "}
                    <Link href="/register" className="text-blue-600 font-semibold hover:underline">
                        Register here
                    </Link>
                </p>
            </Card>
        </div>
    );
}