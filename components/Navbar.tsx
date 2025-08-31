"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigationItems = [
    { href: "/", label: "首页", labelEn: "Home" },
    { href: "/stories", label: "所有故事", labelEn: "Stories" },
    { href: "/about", label: "关于我们", labelEn: "About" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled || isMobileMenuOpen
          ? "bg-background/90 backdrop-blur-md border-b border-border"
          : "bg-black/20 backdrop-blur-sm"
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className={cn(
              "navbar-link text-xl font-bold transition-colors relative group",
              isScrolled || isMobileMenuOpen
                ? "text-foreground hover:text-primary"
                : "text-white hover:text-white/80"
            )}
          >
            <span className="typography-heading-en">Story of Us</span> <span className="typography-chinese">我们</span>
            <span 
              className={cn(
                "absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full",
                isScrolled ? "bg-primary" : "bg-white"
              )}
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "navbar-link transition-colors relative group",
                  isScrolled
                    ? "text-foreground/80 hover:text-foreground"
                    : "text-white/80 hover:text-white"
                )}
              >
                <span className="flex flex-col items-center">
                  <span className="text-sm">{item.label}</span>
                  <span 
                    className={cn(
                      "text-xs",
                      isScrolled ? "text-muted-foreground" : "text-white/60"
                    )}
                  >
                    {item.labelEn}
                  </span>
                </span>
                <span 
                  className={cn(
                    "absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full",
                    isScrolled ? "bg-primary" : "bg-white"
                  )}
                />
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={cn(
              "navbar-button md:hidden p-2 transition-colors",
              isScrolled || isMobileMenuOpen
                ? "text-foreground hover:text-primary"
                : "text-white hover:text-white/80"
            )}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col space-y-4">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="navbar-link text-foreground/80 hover:text-foreground transition-colors px-2 py-1 relative group block"
                >
                  <div className="flex items-center space-x-2">
                    <span>{item.label}</span>
                    <span className="text-xs text-muted-foreground">
                      {item.labelEn}
                    </span>
                  </div>
                  <span className="absolute bottom-0 left-2 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-[calc(100%-1rem)]" />
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
