import HeroSection from "@/components/HeroSection";
import CityFilter from "@/components/CityFilter";
import LatestStoriesSection from "@/components/LatestStoriesSection";
import { getLatestStories, getAllCities, getAllStories } from "@/lib/stories";
import Link from "next/link";

export default async function Home() {
  const [latestStories, cities, allStories] = await Promise.all([
    getLatestStories(3),
    getAllCities(),
    getAllStories(),
  ]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Main Content */}
      <div id="main-content" className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Latest Stories Section */}
          <LatestStoriesSection 
            initialStories={latestStories} 
            allStories={allStories} 
          />

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
            <div className="max-w-5xl mx-auto px-6">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-medium text-foreground mb-4 animate-slide-up animate-delay-400 typography-chinese leading-tight">
                无数个人的故事编织成了我们共同的记忆和历史
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground mb-8 animate-slide-up animate-delay-500 typography-heading-en">
                Countless personal stories weave together to form our collective memory and shared history.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center animate-scale-in animate-delay-600">
                <Link
                  href="/stories"
                  className="inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 btn-warm text-primary-foreground rounded-full font-medium tracking-wide text-sm sm:text-base"
                >
                  探索故事 Discover Stories
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 bg-card border-2 border-warm-200 text-foreground rounded-full hover:bg-warm-50 hover:border-warm-300 transition-all duration-300 hover-lift font-medium tracking-wide text-sm sm:text-base"
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
