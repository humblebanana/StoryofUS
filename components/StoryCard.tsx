import Image from "next/image";
import Link from "next/link";
import { Story } from "@/lib/types";
import { cn } from "@/lib/utils";

interface StoryCardProps {
  story: Story;
  priority?: boolean;
  className?: string;
  showCity?: boolean;
  showLocation?: boolean;
}

export default function StoryCard({ 
  story, 
  priority = false, 
  className,
  // 删除未使用的参数
  // showCity = true 
}: StoryCardProps) {
  return (
    <Link
      href={`/stories/${story.slug}`}
      className={cn(
        "group block bg-card rounded-xl overflow-hidden card-elevated hover-lift transition-all duration-300 h-full flex flex-col",
        className
      )}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={story.imagePath}
          alt={story.imageAlt}
          fill
          className="object-cover group-hover:scale-110 transition-all duration-700 ease-out"
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        

        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-7 flex-1 flex flex-col">
        {/* Title */}
        <h3 className="text-xl font-medium text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2 typography-chinese leading-tight">
          {story.title}
        </h3>
        
        {/* English Title */}
        <p className="text-base text-muted-foreground mb-4 line-clamp-2 typography-heading-en opacity-80">
          {story.titleEn}
        </p>

        {/* Excerpt */}
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-5 opacity-90 flex-1">
          {story.excerpt}
        </p>

        {/* Location (if available) */}
        {story.location && (
          <div className="flex items-center text-xs text-muted-foreground opacity-70 mt-auto">
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