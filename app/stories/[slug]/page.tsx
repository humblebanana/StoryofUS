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

      </div>

      {/* Related Stories */}
      {relatedStories.length > 0 && (
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-2xl lg:text-3xl font-medium text-foreground mb-4 typography-chinese">
                更多{story.city}的故事
              </h2>
              <p className="text-lg text-muted-foreground typography-heading-en">
                Discover more stories from {story.cityEn}
              </p>
            </div>

            {/* Elegant Story Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedStories.map((relatedStory, index) => (
                <div
                  key={relatedStory.slug}
                  className={`animate-fade-in animate-delay-${(index + 1) * 100}`}
                >
                  <Link
                    href={`/stories/${relatedStory.slug}`}
                    className="group block"
                  >
                    <div className="relative overflow-hidden rounded-2xl aspect-[4/3] mb-6 card-elevated hover-lift">
                      <Image
                        src={relatedStory.imagePath}
                        alt={relatedStory.imageAlt}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="text-white">
                          <div className="inline-flex items-center px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium mb-3">
                            📍 {relatedStory.location || relatedStory.city}
                          </div>
                          <h3 className="text-lg font-semibold mb-2 typography-chinese line-clamp-2">
                            {relatedStory.title}
                          </h3>
                          <p className="text-sm text-white/80 typography-heading-en line-clamp-1">
                            {relatedStory.titleEn}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>

            {/* Subtle Navigation */}
            <div className="text-center mt-16">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Link
                  href={`/city/${CITY_MAPPINGS[story.city as CityName] || story.city.toLowerCase()}`}
                  className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors group"
                >
                  <span className="mr-2">查看{story.city}所有故事</span>
                  <span className="text-sm mr-3">View All {story.cityEn} Stories</span>
                  <div className="w-6 h-px bg-current group-hover:w-12 transition-all duration-300"></div>
                </Link>
                <div className="w-px h-4 bg-border hidden sm:block"></div>
                <Link
                  href="/stories"
                  className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors group"
                >
                  <span className="mr-2">浏览所有故事</span>
                  <span className="text-sm mr-3">Browse All Stories</span>
                  <div className="w-6 h-px bg-current group-hover:w-12 transition-all duration-300"></div>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}
    </article>
  );
}