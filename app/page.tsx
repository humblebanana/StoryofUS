import HeroSection from "@/components/HeroSection";
import StoryCard from "@/components/StoryCard";
import CityFilter from "@/components/CityFilter";
import { getLatestStories, getAllCities } from "@/lib/stories";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default async function Home() {
  const [latestStories, cities] = await Promise.all([
    getLatestStories(6),
    getAllCities(),
  ]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Main Content */}
      <div id="main-content" className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Latest Stories Section */}
          <section className="mb-20">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                  最新故事
                </h2>
                <p className="text-lg text-muted-foreground">
                  Latest Stories
                </p>
              </div>
              <Link
                href="/stories"
                className="inline-flex items-center text-primary hover:text-primary/80 transition-colors group"
              >
                <span className="mr-2">查看全部</span>
                <span className="text-sm text-muted-foreground mr-2">View All</span>
                <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Stories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {latestStories.map((story, index) => (
                <StoryCard
                  key={story.slug}
                  story={story}
                  priority={index < 3} // Prioritize loading for first 3 images
                />
              ))}
            </div>
          </section>

          {/* City Exploration Section */}
          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                城市探索
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Explore by City - 按城市探索我们收集的每一个温暖故事
              </p>
            </div>

            <CityFilter cities={cities} variant="cards" />
          </section>

          {/* Call to Action */}
          <section className="text-center py-16 bg-warm-50 rounded-2xl">
            <div className="max-w-2xl mx-auto px-6">
              <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
                每个人都有故事值得被听见
              </h3>
              <p className="text-muted-foreground mb-8">
                Everyone has a story worth being heard. Join us in discovering the warmth and humanity in every journey.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/stories"
                  className="inline-flex items-center justify-center px-8 py-3 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors"
                >
                  开始阅读 Start Reading
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center px-8 py-3 border border-border text-foreground rounded-full hover:bg-accent transition-colors"
                >
                  了解我们 About Us
                </Link>
              </div>
            </div>
          </section>
          
        </div>
      </div>
    </div>
  );
}
