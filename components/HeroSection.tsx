"use client";

import Image from "next/image";
import { ChevronDown } from "lucide-react";

interface HeroSectionProps {
  title?: string;
  titleEn?: string;
  subtitle?: string;
  subtitleEn?: string;
  backgroundImage?: string;
  showScrollIndicator?: boolean;
}
export default function HeroSection({
  title = "这是一个从我们的故事了解'我们'的角落",
  titleEn = "Great people write great stories, ordinaries just live their stories",
  subtitle = "",
  subtitleEn = "",
  backgroundImage = "/cover.png",
  showScrollIndicator = true,
}: HeroSectionProps) {
  const scrollToContent = () => {
    const element = document.getElementById('main-content');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
          <h1 className="mb-8 leading-relaxed">
            {/* Chinese Title */}
            <span className="block text-2xl sm:text-3xl lg:text-4xl font-light text-white mb-4 leading-relaxed">
              {title}
            </span>
            {/* English Title - More Prominent */}
            <span className="block text-3xl sm:text-4xl lg:text-5xl font-bold text-white/95 leading-tight">
              {titleEn}
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
              onClick={scrollToContent}
              className="inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-105"
            >
              <span className="mr-2">开始阅读故事</span>
              <span className="text-sm text-white/80">Start Reading</span>
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      {showScrollIndicator && (
        <button
          onClick={scrollToContent}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70 hover:text-white transition-colors animate-bounce"
          aria-label="Scroll to content"
        >
          <ChevronDown className="h-8 w-8" />
        </button>
      )}
    </section>
  );
}