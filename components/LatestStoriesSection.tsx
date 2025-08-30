"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, RotateCcw } from "lucide-react";
import StoryCard from "@/components/StoryCard";
import { Story } from "@/lib/types";

interface LatestStoriesSectionProps {
  initialStories: Story[];
  allStories: Story[];
}

export default function LatestStoriesSection({ 
  initialStories, 
  allStories 
}: LatestStoriesSectionProps) {
  const [displayedStories, setDisplayedStories] = useState(initialStories);
  const [isShuffling, setIsShuffling] = useState(false);

  const shuffleStories = () => {
    setIsShuffling(true);
    
    // Filter out currently displayed stories to prevent duplicates
    const availableStories = allStories.filter(
      story => !displayedStories.some(displayed => displayed.slug === story.slug)
    );
    
    // If we don't have enough different stories, use all stories
    const storiesToChooseFrom = availableStories.length >= 3 ? availableStories : allStories;
    
    // Shuffle and select 3 different stories
    const shuffled = [...storiesToChooseFrom].sort(() => Math.random() - 0.5);
    const newStories = shuffled.slice(0, 3);
    
    // Add a slight delay for smoother transition
    setTimeout(() => {
      setDisplayedStories(newStories);
      setIsShuffling(false);
    }, 400);
  };

  return (
    <section className="mb-20">
      <div className="flex items-center justify-between mb-12 animate-slide-up">
        <div>
          <h2 className="text-3xl lg:text-4xl font-medium text-foreground mb-4 typography-chinese leading-tight">
            最新故事
          </h2>
          <p className="text-xl text-muted-foreground typography-heading-en italic opacity-80">
            Latest Stories
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Elegant Shuffle Button */}
          <button
            onClick={shuffleStories}
            disabled={isShuffling}
            className="group inline-flex items-center justify-center w-10 h-10 rounded-full hover:bg-accent transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            title="换一批故事"
          >
            <RotateCcw 
              className={`h-4 w-4 text-muted-foreground group-hover:transition-all duration-600 ${
                isShuffling ? 'animate-spin' : 'group-hover:rotate-360'
              }`} 
            />
          </button>
          
          <Link
            href="/stories"
            className="inline-flex items-center text-primary hover:text-primary/80 transition-colors group"
          >
            <span className="mr-2">查看全部</span>
            <span className="text-sm text-muted-foreground mr-2">View All</span>
            <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Stories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayedStories.map((story, index) => (
          <div
            key={story.slug}
            className={`animate-fade-in animate-delay-${Math.min((index + 1) * 100, 600)} ${
              isShuffling 
                ? 'opacity-70 transform translate-y-1' 
                : 'opacity-100 transform translate-y-0'
            } transition-all duration-500 ease-out`}
          >
            <StoryCard
              story={story}
              priority={index < 3}
            />
          </div>
        ))}
      </div>
    </section>
  );
}