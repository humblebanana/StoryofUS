import Image from "next/image";
import { notFound } from "next/navigation";
import StoryCard from "@/components/StoryCard";
import CityFilter from "@/components/CityFilter";
import { getStoriesByCity, getAllCities } from "@/lib/stories";
import { CITY_MAPPINGS, CITY_NAMES_EN, CityName } from "@/lib/types";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, MapPin } from "lucide-react";

interface CityPageProps {
  params: Promise<{ cityName: string }>;
}

// Generate static params for all cities
export async function generateStaticParams() {
  const cities = await getAllCities();
  return cities.map((city) => ({
    cityName: city.slug,
  }));
}

// Generate metadata for city pages
export async function generateMetadata({ params }: CityPageProps): Promise<Metadata> {
  const { cityName } = await params;
  
  // Find the Chinese city name from the slug
  const chineseCityName = Object.keys(CITY_MAPPINGS).find(
    key => CITY_MAPPINGS[key as CityName] === cityName
  ) as CityName;
  
  const englishCityName = chineseCityName ? CITY_NAMES_EN[chineseCityName] : cityName;
  
  if (!chineseCityName) {
    return {
      title: "城市未找到 | Story of Us",
    };
  }

  return {
    title: `${chineseCityName}的故事 | Story of Us`,
    description: `探索我们在${chineseCityName}收集的所有温暖故事，感受这座城市独特的人文魅力。`,
    openGraph: {
      title: `${chineseCityName}的故事 | Story of Us`,
      description: `探索我们在${chineseCityName}收集的所有温暖故事，感受这座城市独特的人文魅力。`,
    },
  };
}

export default async function CityPage({ params }: CityPageProps) {
  const { cityName } = await params;
  
  // Find the Chinese city name from the slug
  const chineseCityName = Object.keys(CITY_MAPPINGS).find(
    key => CITY_MAPPINGS[key as CityName] === cityName
  ) as CityName;
  
  if (!chineseCityName) {
    notFound();
  }
  
  const englishCityName = CITY_NAMES_EN[chineseCityName];
  
  const [stories, cities] = await Promise.all([
    getStoriesByCity(chineseCityName),
    getAllCities(),
  ]);

  if (stories.length === 0) {
    notFound();
  }

  // Use dedicated city photo as hero image
  const heroImage = `/city_photo/${cityName}.jpg`;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        {heroImage && (
          <div className="absolute inset-0 z-0">
            <Image
              src={heroImage}
              alt={`${chineseCityName} hero`}
              fill
              className="object-cover"
              priority
              quality={90}
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>
        )}

        {/* Content */}
        <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Back Link */}
            <div className="mb-8">
              <Link
                href="/stories"
                className="inline-flex items-center text-white/80 hover:text-white transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                <span>返回所有故事</span>
                <span className="ml-2 text-sm">Back to Stories</span>
              </Link>
            </div>

            {/* City Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              {chineseCityName}
            </h1>

            {/* Stats */}
            <div className="flex items-center justify-center space-x-6 text-white/80">
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                <span>{stories.length} 个故事</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* City Description */}
          <div className="text-center mb-16">
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              在{chineseCityName}的街头巷尾，我们遇见了{stories.length}个温暖的故事。
              每一个故事都承载着这座城市独特的人文情怀，记录着平凡生活中的不平凡温暖。
            </p>
          </div>

          {/* City Filter */}
          <div className="mb-12">
            <div className="flex items-center justify-center">
              <CityFilter cities={cities} currentCity={cityName} showCounts={true} />
            </div>
          </div>

          {/* Stories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stories.map((story, index) => (
              <StoryCard
                key={story.slug}
                story={story}
                priority={index < 6}
                showCity={false} // Don't show city badge since we're on a city page
              />
            ))}
          </div>

          {/* More Stories Section */}
          <section className="mt-20">
            <div className="text-center mb-12">
              <h3 className="text-2xl lg:text-3xl font-medium text-foreground mb-4 typography-chinese">
                探索更多城市
              </h3>
              <p className="text-lg text-muted-foreground typography-heading-en">
                Explore More Cities
              </p>
            </div>
            
            {/* Elegant City Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {cities
                .filter(city => city.slug !== cityName)
                .slice(0, 3)
                .map((city, index) => (
                <div
                  key={city.slug}
                  className={`animate-fade-in animate-delay-${(index + 1) * 100}`}
                >
                  <Link
                    href={`/city/${city.slug}`}
                    className="group block"
                  >
                    <div className="relative overflow-hidden rounded-2xl aspect-[4/3] mb-4 card-elevated hover-lift">
                      {city.heroImage && (
                        <Image
                          src={city.heroImage}
                          alt={`${city.name} stories`}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="text-white">
                          <div className="inline-flex items-center px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium mb-3">
                            {city.storyCount} 个故事
                          </div>
                          <h4 className="text-xl font-semibold mb-1 typography-chinese">
                            {city.name}
                          </h4>
                          <p className="text-sm text-white/80 typography-heading-en">
                            {city.nameEn}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>

            {/* Subtle CTA */}
            <div className="text-center mt-12">
              <Link
                href="/stories"
                className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors group"
              >
                <span className="mr-2">查看所有故事</span>
                <span className="text-sm mr-3">View All Stories</span>
                <div className="w-6 h-px bg-current group-hover:w-12 transition-all duration-300"></div>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}