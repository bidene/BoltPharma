"use client";

import { SignIn } from "@clerk/nextjs";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function Page() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="container mx-auto px-4 py-16 flex-1">
                <div className="flex justify-center">
                    <SignIn
                        path="/sign-in"
                        routing="path"
                        signUpUrl="/sign-up"
                    />
                </div>
            </main>
            <Footer />
        </div>
    );
}
