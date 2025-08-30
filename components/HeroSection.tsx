"use client";

import Image from "next/image";
import ScrollIndicator from "@/components/ScrollIndicator";

interface HeroSectionProps {
  title?: string;
  titleEn?: string;
  subtitle?: string;
  subtitleEn?: string;
  backgroundImage?: string;
  showScrollIndicator?: boolean;
}
export default function HeroSection({
  title = "這是一個從我們的故事了解“我們”的角落",
  titleEn = "Great people write great stories, ordinaries just live their stories",
  subtitle = "",
  subtitleEn = "",
  backgroundImage = "/cover.png",
  showScrollIndicator = true,
}: HeroSectionProps) {

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={backgroundImage}
          alt="Hero background"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Main Title */}
          <h1 className="mb-12 leading-relaxed animate-fade-in">
            {/* Chinese Title */}
            <span className="block text-2xl sm:text-3xl lg:text-4xl font-light text-white mb-6 leading-relaxed typography-chinese">
              {title}
            </span>
            {/* English Title - More Prominent */}
            <span className="block text-2xl sm:text-3xl lg:text-4xl font-normal text-white/95 leading-tight typography-heading-en">
              Great people write great stories<br />
              Ordinaries just live their stories
            </span>
          </h1>

          {/* Subtitle - Only show if not empty */}
          {(subtitle || subtitleEn) && (
            <div className="text-lg sm:text-xl text-white/70 mb-12 max-w-3xl mx-auto leading-relaxed">
              {subtitle && <p className="mb-3">{subtitle}</p>}
              {subtitleEn && <p className="text-base sm:text-lg font-light">{subtitleEn}</p>}
            </div>
          )}

          {/* CTA Button */}
          <div className="space-y-4">
            <button
              onClick={() => {
                // 平滑滚动到下一个section
                window.scrollTo({
                  top: window.innerHeight,
                  behavior: 'smooth'
                })
              }}
              className="group relative inline-flex items-center px-10 py-4 overflow-hidden rounded-full transition-all duration-500 hover:scale-105"
            >
              {/* Liquid Glass Background */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/20 to-white/10 backdrop-blur-md border border-white/20 rounded-full transition-all duration-500 group-hover:from-white/15 group-hover:via-white/25 group-hover:to-white/15 group-hover:border-white/30" />
              
              {/* Floating Glass Orbs */}
              <div className="absolute inset-0 overflow-hidden rounded-full">
                <div className="absolute -top-2 -left-2 w-6 h-6 bg-white/20 rounded-full blur-sm animate-float opacity-60" />
                <div className="absolute top-1 right-4 w-3 h-3 bg-white/30 rounded-full blur-sm animate-float opacity-40" style={{animationDelay: '1s'}} />
                <div className="absolute bottom-1 left-6 w-4 h-4 bg-white/15 rounded-full blur-sm animate-float opacity-70" style={{animationDelay: '2s'}} />
              </div>
              
              {/* Shimmer Effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full" />
              
              {/* Content */}
              <span className="relative z-10 text-white font-medium mr-3">探索故事</span>
              <span className="relative z-10 text-sm text-white/90">Discover Stories</span>
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      {showScrollIndicator && <ScrollIndicator />}
    </section>
  );
}