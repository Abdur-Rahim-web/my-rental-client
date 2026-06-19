"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button, Input, Card } from "@heroui/react";

export default function RegisterPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = (e) => {
        e.preventDefault();
        console.log("Registering user:", name, email, password);
        // এখানে পরবর্তীতে SignUp API বা Firebase/Next-Auth ইন্টিগ্রেশন হবে
    };

    return (
        <div className="flex min-h-[calc(100vh-64px)] items-center justify-center px-6 py-12 bg-default-50">
            <Card className="w-full max-w-md p-8 border border-default-200" shadow="md">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-foreground">Create Account</h1>
                    <p className="text-sm text-default-400 mt-2">Join StayEase to find your perfect home</p>
                </div>

                <form onSubmit={handleRegister} className="flex flex-col gap-4">
                    <Input
                        type="text"
                        label="Full Name"
                        placeholder="enter your full name"
                        variant="bordered"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
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
                        placeholder="create a strong password"
                        variant="bordered"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <Button
                        type="submit"
                        color="primary"
                        className="w-full bg-blue-600 hover:bg-blue-700 font-semibold mt-2"
                    >
                        Register
                    </Button>
                </form>

                <p className="text-center text-sm text-default-500 mt-6">
                    Already have an account?{" "}
                    <Link href="/login" className="text-blue-600 font-semibold hover:underline">
                        Login here
                    </Link>
                </p>
            </Card>
        </div>
    );
}