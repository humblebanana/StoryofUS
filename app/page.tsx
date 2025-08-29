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
            <div className="flex items-center justify-between mb-12 animate-slide-up">
              <div>
                <h2 className="text-3xl lg:text-4xl font-medium text-foreground mb-4 typography-chinese leading-tight">
                  最新故事
                </h2>
                <p className="text-xl text-muted-foreground typography-heading-en italic opacity-80">
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
                <div
                  key={story.slug}
                  className={`animate-fade-in animate-delay-${Math.min((index + 1) * 100, 600)}`}
                >
                  <StoryCard
                    story={story}
                    priority={index < 3}
                  />
                </div>
              ))}
            </div>
          </section>

          {/* City Exploration Section */}
          <section className="mb-20">
            <div className="text-center mb-12 animate-slide-up">
              <h2 className="text-3xl lg:text-4xl font-medium text-foreground mb-6 typography-chinese leading-tight">
                城市探索
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto typography-heading-en italic mb-2">
                Explore by City
              </p>
              <p className="text-muted-foreground max-w-2xl mx-auto opacity-80">
                按城市探索每一个故事
              </p>
            </div>

            <CityFilter cities={cities} variant="cards" />
          </section>

          {/* Call to Action */}
          <section className="text-center py-16 animate-fade-in animate-delay-300">
            <div className="max-w-2xl mx-auto px-6">
              <h3 className="text-2xl lg:text-3xl font-medium text-foreground mb-4 animate-slide-up animate-delay-400 typography-chinese">
                每个人都有故事值得被听见
              </h3>
              <p className="text-muted-foreground mb-8 animate-slide-up animate-delay-500 typography-heading-en">
                Everyone has a story worth being heard. Join us in discovering the warmth and humanity in every journey.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-scale-in animate-delay-600">
                <Link
                  href="/stories"
                  className="inline-flex items-center justify-center px-8 py-4 btn-warm text-primary-foreground rounded-full font-medium tracking-wide"
                >
                  开始阅读 Start Reading
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center px-8 py-4 bg-card border-2 border-warm-200 text-foreground rounded-full hover:bg-warm-50 hover:border-warm-300 transition-all duration-300 hover-lift font-medium tracking-wide"
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
