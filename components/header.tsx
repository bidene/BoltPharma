"use client";

import type React from "react";

import Link from "next/link";
import { ShoppingCart, User, Search, Menu, Heart, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/lib/cart-context";
import { useState } from "react";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export function Header() {
    const { totalItems } = useCart();
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            window.location.href = `/catalogue?search=${encodeURIComponent(
                searchQuery
            )}`;
        }
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
            {/* Top bar */}
            <div className="bg-primary text-primary-foreground">
                <div className="container mx-auto px-4 py-2">
                    <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <Phone className="h-4 w-4" />
                                <span>+229 97 00 00 00</span>
                            </div>
                            <span className="hidden md:inline">
                                Livraison rapide avec GoZem
                            </span>
                        </div>
                        <div className="flex items-center gap-4">
                            <Link href="/faq" className="hover:underline">
                                Aide
                            </Link>
                            <Link href="/sign-up" className="hover:underline">
                                Devenir partenaire
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main header */}
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between gap-4">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <img
                            src="/Logo.jpg"
                            alt="BoltPharma Logo"
                            className="h-10 w-10 object-contain"
                        />
                        <div className="hidden md:block">
                            <div className="text-xl font-bold text-primary">
                                BoltPharma
                            </div>
                            <div className="text-xs text-muted-foreground">
                                Votre santé, notre priorité
                            </div>
                        </div>
                    </Link>

                    {/* Search bar */}
                    <form
                        onSubmit={handleSearch}
                        className="hidden flex-1 md:block md:max-w-xl"
                    >
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Rechercher un médicament, une catégorie..."
                                className="pl-10"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </form>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="hidden md:inline-flex"
                            asChild
                        >
                            <Link href="/favoris">
                                <Heart className="h-5 w-5" />
                            </Link>
                        </Button>
                        <SignedIn>
                            <UserButton
                                afterSignOutUrl="/"
                                appearance={{
                                    elements: { userButtonTrigger: "h-9 w-9" },
                                }}
                            />
                        </SignedIn>
                        <SignedOut>
                            <Button variant="ghost" size="icon" asChild>
                                <Link href="/sign-in">
                                    <User className="h-5 w-5" />
                                </Link>
                            </Button>
                        </SignedOut>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="relative"
                            asChild
                        >
                            <Link href="/panier">
                                <ShoppingCart className="h-5 w-5" />
                                {totalItems > 0 && (
                                    <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-xs">
                                        {totalItems}
                                    </Badge>
                                )}
                            </Link>
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="md:hidden"
                        >
                            <Menu className="h-5 w-5" />
                        </Button>
                    </div>
                </div>

                {/* Mobile search */}
                <form onSubmit={handleSearch} className="mt-4 md:hidden">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Rechercher un médicament..."
                            className="pl-10"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </form>
            </div>
        </header>
    );
}
