import Image from "next/image";
import Link from "next/link";
import { Story } from "@/lib/types";
import { cn } from "@/lib/utils";

interface StoryCardProps {
  story: Story;
  priority?: boolean;
  className?: string;
  showCity?: boolean;
}

export default function StoryCard({ 
  story, 
  priority = false, 
  className,
  showCity = true 
}: StoryCardProps) {
  return (
    <Link
      href={`/stories/${story.slug}`}
      className={cn(
        "group block bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1",
        className
      )}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={story.imagePath}
          alt={story.imageAlt}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* City Badge */}
        {showCity && (
          <div className="absolute top-4 left-4">
            <span className="inline-block px-3 py-1 text-xs font-medium bg-background/80 backdrop-blur-sm text-foreground rounded-full">
              {story.city} {story.cityEn}
            </span>
          </div>
        )}
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Title */}
        <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
          {story.title}
        </h3>
        
        {/* English Title */}
        <p className="text-sm text-muted-foreground mb-3 line-clamp-1">
          {story.titleEn}
        </p>

        {/* Excerpt */}
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-4">
          {story.excerpt}
        </p>

        {/* Location (if available) */}
        {story.location && (
          <div className="flex items-center text-xs text-muted-foreground">
            <span>📍 {story.location}</span>
          </div>
        )}
      </div>
    </Link>
  );
}

// Simplified card variant for smaller layouts
export function CompactStoryCard({ story, className }: Omit<StoryCardProps, 'priority' | 'showCity'>) {
  return (
    <Link
      href={`/stories/${story.slug}`}
      className={cn(
        "group flex bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300",
        className
      )}
    >
      {/* Image */}
      <div className="relative w-24 h-24 flex-shrink-0">
        <Image
          src={story.imagePath}
          alt={story.imageAlt}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="96px"
        />
      </div>

      {/* Content */}
      <div className="flex-1 p-4">
        <h4 className="font-medium text-foreground group-hover:text-primary transition-colors line-clamp-1">
          {story.title}
        </h4>
        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
          {story.excerpt}
        </p>
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs text-muted-foreground">{story.city}</span>
        </div>
      </div>
    </Link>
  );
}