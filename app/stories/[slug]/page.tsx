import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { ArrowLeft, MapPin, Calendar, Tag } from "lucide-react";
import { getStoryBySlug, getAllStories, getRelatedStories } from "@/lib/stories";
import { CITY_MAPPINGS, CityName } from "@/lib/types";
import ImageGallery from "@/components/ImageGallery";
import { CompactStoryCard } from "@/components/StoryCard";

interface StoryPageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for all stories
export async function generateStaticParams() {
  const stories = await getAllStories();
  return stories.map((story) => ({
    slug: story.slug,
  }));
}

// Generate metadata for story pages
export async function generateMetadata({ params }: StoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const story = await getStoryBySlug(slug);

  if (!story) {
    return {
      title: "故事未找到 | Story of Us",
    };
  }

  return {
    title: `${story.title} | Story of Us`,
    description: story.excerpt,
    openGraph: {
      title: `${story.title} | Story of Us`,
      description: story.excerpt,
      images: [
        {
          url: story.imagePath,
          width: 1200,
          height: 800,
          alt: story.imageAlt,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${story.title} | Story of Us`,
      description: story.excerpt,
      images: [story.imagePath],
    },
  };
}

export default async function StoryPage({ params }: StoryPageProps) {
  const { slug } = await params;
  const story = await getStoryBySlug(slug);

  if (!story) {
    notFound();
  }

  const relatedStories = await getRelatedStories(story, 3);

  // Prepare images for gallery
  const galleryImages = [
    {
      src: story.imagePath,
      alt: story.imageAlt,
      width: 1200,
      height: 800,
    },
  ];

  return (
    <article className="min-h-screen">
      {/* Hero Image */}
      <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <Image
          src={story.imagePath}
          alt={story.imageAlt}
          fill
          className="object-cover"
          priority
          quality={90}
        />
        <div className="absolute inset-0 bg-black/30" />
        
        {/* Back Button */}
        <div className="absolute top-24 left-4 sm:left-6 lg:left-8 z-10">
          <Link
            href={`/city/${CITY_MAPPINGS[story.city as CityName] || story.city.toLowerCase()}`}
            className="inline-flex items-center px-4 py-2 bg-black/20 backdrop-blur-sm text-white rounded-full hover:bg-black/30 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            <span>返回{story.city}</span>
          </Link>
        </div>
      </section>

      {/* Story Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Story Header */}
        <header className="mb-12">
          {/* City Badge */}
          <div className="flex items-center space-x-4 mb-6">
            <span className="inline-flex items-center px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
              <MapPin className="h-4 w-4 mr-1" />
              {story.city} {story.cityEn}
            </span>
            {story.location && (
              <span className="text-muted-foreground text-sm">
                📍 {story.location}
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight">
            {story.title}
          </h1>
          <p className="text-xl sm:text-2xl text-muted-foreground font-light mb-8">
            {story.titleEn}
          </p>
        </header>

        {/* Story Content */}
        <div className="prose prose-lg max-w-none mb-12">
          {/* Chinese Content */}
          <div className="mb-8">
            {story.content.split('\n\n').map((paragraph, index) => (
              <p key={`zh-${index}`} className="mb-6 text-lg leading-relaxed text-foreground">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Divider */}
          <div className="border-t border-border my-12"></div>

          {/* English Content */}
          <div className="text-muted-foreground">
            {story.contentEn.split('\n\n').map((paragraph, index) => (
              <p key={`en-${index}`} className="mb-6 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Image Gallery */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold text-foreground mb-6">
            照片 Gallery
          </h3>
          <ImageGallery images={galleryImages} />
        </div>

        {/* Story Tags/Info */}
        <div className="bg-warm-50 rounded-2xl p-8 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-foreground mb-2">故事地点</h4>
              <p className="text-muted-foreground">
                {story.location || `${story.city}, China`}
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">故事特色</h4>
              <p className="text-muted-foreground">
                温暖相遇，人文故事
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Related Stories */}
      {relatedStories.length > 0 && (
        <section className="bg-warm-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
                更多{story.city}的故事
              </h2>
              <p className="text-muted-foreground">
                Discover more stories from {story.cityEn}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedStories.map((relatedStory) => (
                <CompactStoryCard
                  key={relatedStory.slug}
                  story={relatedStory}
                  className="bg-background"
                />
              ))}
            </div>

            <div className="text-center mt-8">
              <Link
                href={`/city/${CITY_MAPPINGS[story.city as CityName] || story.city.toLowerCase()}`}
                className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors"
              >
                查看{story.city}所有故事
              </Link>
            </div>
          </div>
        </section>
      )}
    </article>
  );
}