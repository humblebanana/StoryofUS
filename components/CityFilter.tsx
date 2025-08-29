"use client";

import Link from "next/link";
import Image from "next/image";
import { City } from "@/lib/types";
import { cn } from "@/lib/utils";

interface CityFilterProps {
  cities: City[];
  currentCity?: string;
  showCounts?: boolean;
  variant?: "pills" | "cards";
  className?: string;
}

export default function CityFilter({
  cities,
  currentCity,
  showCounts = true,
  variant = "pills",
  className,
}: CityFilterProps) {
  if (variant === "cards") {
    return (
      <div className={cn("grid grid-cols-2 lg:grid-cols-4 gap-6", className)}>
        {cities.map((city) => (
          <Link
            key={city.slug}
            href={`/city/${city.slug}`}
            className={cn(
              "group relative overflow-hidden rounded-xl aspect-[4/3] block",
              "bg-gradient-to-t from-black/60 via-black/20 to-transparent",
              "hover:scale-105 transition-transform duration-300",
              currentCity === city.slug && "ring-2 ring-primary"
            )}
          >
            {/* Background Image */}
            {city.heroImage && (
              <Image
                src={city.heroImage}
                alt={`${city.name} stories`}
                fill
                className="object-cover -z-10"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            )}
            
            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-4">
              <div className="text-white">
                <h3 className="text-lg font-semibold mb-1">
                  {city.name}
                </h3>
                <p className="text-sm text-white/80 mb-2">
                  {city.nameEn}
                </p>
                {showCounts && (
                  <p className="text-xs text-white/70">
                    {city.storyCount} 个故事
                  </p>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    );
  }

  return (
    <div className={cn("flex flex-wrap gap-3", className)}>
      {/* All stories pill */}
      <Link
        href="/stories"
        className={cn(
          "inline-flex items-center px-6 py-3 rounded-full border transition-all duration-200",
          !currentCity
            ? "bg-primary text-primary-foreground border-primary"
            : "bg-background text-foreground border-border hover:border-primary hover:bg-primary/5"
        )}
      >
        <span className="font-medium">所有故事</span>
        <span className="ml-2 text-sm opacity-75">All Stories</span>
      </Link>

      {/* City pills */}
      {cities.map((city) => (
        <Link
          key={city.slug}
          href={`/city/${city.slug}`}
          className={cn(
            "inline-flex items-center px-6 py-3 rounded-full border transition-all duration-200",
            currentCity === city.slug
              ? "bg-primary text-primary-foreground border-primary"
              : "bg-background text-foreground border-border hover:border-primary hover:bg-primary/5"
          )}
        >
          <span className="font-medium">{city.name}</span>
          <span className="ml-2 text-sm opacity-75">{city.nameEn}</span>
          {showCounts && (
            <span className="ml-2 px-2 py-0.5 bg-black/10 dark:bg-white/10 text-xs rounded-full">
              {city.storyCount}
            </span>
          )}
        </Link>
      ))}
    </div>
  );
}

// Compact version for mobile or sidebar use
export function CompactCityFilter({ 
  cities, 
  currentCity, 
  className 
}: Omit<CityFilterProps, 'showCounts' | 'variant'>) {
  return (
    <div className={cn("flex flex-col space-y-2", className)}>
      <Link
        href="/stories"
        className={cn(
          "px-4 py-2 text-sm rounded-md transition-colors",
          !currentCity
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:text-foreground hover:bg-accent"
        )}
      >
        所有故事 All Stories
      </Link>
      
      {cities.map((city) => (
        <Link
          key={city.slug}
          href={`/city/${city.slug}`}
          className={cn(
            "px-4 py-2 text-sm rounded-md transition-colors flex items-center justify-between",
            currentCity === city.slug
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground hover:bg-accent"
          )}
        >
          <span>
            {city.name} {city.nameEn}
          </span>
          <span className="text-xs opacity-75">
            {city.storyCount}
          </span>
        </Link>
      ))}
    </div>
  );
}