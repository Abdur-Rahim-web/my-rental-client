"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Card, Button, Link, TextField, Label, InputGroup, Input } from "@heroui/react";
import { Eye, EyeSlash, At, ShieldKeyhole } from "@gravity-ui/icons";
import { authClient, signIn } from "@/lib/auth-client";
import { FcGoogle } from "react-icons/fc";

export default function SigninPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const redirectPath = searchParams.get("redirect") || "/";

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isVisible, setIsVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const toggleVisibility = () => setIsVisible(!isVisible);

    const handleSignin = async (e) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            const { error: authError } = await signIn.email({
                email,
                password,
                callbackURL: redirectPath,
            });

            if (authError) {
                setError(authError.message || "Invalid email or password.");
            } else {

                router.push(redirectPath);
                router.refresh();
            }
        } catch (err) {
            setError("An unexpected network error occurred.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-4">
            <Card className="w-full max-w-md p-6 border border-zinc-200 rounded-2xl">
                <div className="text-center mb-6">
                    <h1 className="text-2xl font-semibold">Welcome back</h1>
                    <p className="text-sm text-zinc-600">Enter your credentials to access your account</p>
                </div>

                <form onSubmit={handleSignin} className="flex flex-col gap-5">
                    <TextField isRequired name="email" className="flex flex-col gap-1.5">
                        <Label className="text-sm font-medium">Email Address</Label>
                        <InputGroup className="border rounded-xl px-3 bg-zinc-50">
                            <At size={16} />
                            <Input placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full py-2 outline-none" />
                        </InputGroup>
                    </TextField>

                    <TextField isRequired name="password" className="flex flex-col gap-1.5">
                        <Label className="text-sm font-medium">Password</Label>
                        <InputGroup className="border rounded-xl px-3 bg-zinc-50">
                            <ShieldKeyhole size={16} />
                            <Input type={isVisible ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} className="w-full py-2 outline-none" />
                            <button type="button" onClick={toggleVisibility}>{isVisible ? <EyeSlash size={18} /> : <Eye size={18} />}</button>
                        </InputGroup>
                    </TextField>

                    {error && <div className="p-3 text-xs bg-red-100 text-red-700 rounded-xl">{error}</div>}

                    <Button type="submit" color="primary" className="w-full h-12" isLoading={isLoading}>
                        Sign In
                    </Button>

                    <div className="flex items-center gap-3 my-2">
                        <hr className="flex-1 border-zinc-100 dark:border-zinc-800" />
                        <span className="text-xs text-zinc-400">OR</span>
                        <hr className="flex-1 border-zinc-100 dark:border-zinc-800" />
                    </div>

                    {/* Google Social Login Button */}
                    <Button
                        className="w-full font-semibold rounded-xl bg-white border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-50 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition"
                        onPress={async () => {
                            await authClient.signIn.social({
                                provider: "google",
                                callbackURL: redirectPath,
                                additionalData: {
                                    role: "tenant"
                                }
                            });
                        }}
                    >
                       <FcGoogle /> Continue with Google
                    </Button>

                    {/* Navigation Option */}
                    <div className="text-center pt-4 border-t border-zinc-100 dark:border-zinc-800 mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                        Don&apos;t have an account?{" "}

                        <Link href={`/auth/register?redirect=${encodeURIComponent(redirectPath)}`} className="font-medium cursor-pointer text-sm text-blue-600 dark:text-blue-400">
                            Register instead
                        </Link>
                    </div>
                </form>
            </Card>
        </div>
    );
}