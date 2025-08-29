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

  // Use first story's image as hero image
  const heroImage = stories[0]?.imagePath;

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
            <p className="text-2xl sm:text-3xl lg:text-4xl font-light text-white/90 mb-6">
              {englishCityName}
            </p>

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

          {/* Bottom CTA */}
          <div className="text-center mt-16 py-12 bg-warm-50 rounded-2xl">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              探索更多城市故事
            </h3>
            <p className="text-muted-foreground mb-8">
              Explore stories from other cities and discover more heartwarming encounters.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {cities
                .filter(city => city.slug !== cityName)
                .slice(0, 3)
                .map((city) => (
                <Link
                  key={city.slug}
                  href={`/city/${city.slug}`}
                  className="inline-flex items-center px-6 py-3 bg-background border border-border text-foreground rounded-full hover:bg-accent transition-colors"
                >
                  {city.name} {city.nameEn}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}