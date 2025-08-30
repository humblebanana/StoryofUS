import Image from "next/image";
import { notFound } from "next/navigation";
import StoryCard from "@/components/StoryCard";
import CityFilter from "@/components/CityFilter";
import ScrollIndicator from "@/components/ScrollIndicator";
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
  
  // City background descriptions
  const CITY_DESCRIPTIONS = {
    '成都': {
      chinese: '天府之国成都，一座浸润在茶香与辣味中的悠闲之都。从宽窄巷子的慢时光到熊猫基地的憨态可掬，这座城市以其独特的安逸与深厚的文化底蕴，诠释着"巴适"的生活哲学。',
      english: 'Chengdu, the capital of Tianfu, is a leisurely city steeped in tea fragrance and spicy flavors. From the slow moments in Kuanzhai Alley to the adorable pandas at the base, this city interprets the philosophy of "comfortable living" with its unique tranquility and profound cultural heritage.'
    },
    '重庆': {
      chinese: '山城重庆，一座以山为骨、以江为魂的城市。他们穿行于层叠的楼宇与过江的索道间，将火锅的热辣融入血液，活出了一种坦荡而充满活力的"江湖气"，这是一种属于山城的，粗粝而真诚的生活美学。',
      english: 'Chongqing, the mountain city with mountains as bones and rivers as soul. People navigate between layered buildings and river-crossing cable cars, infusing the spiciness of hotpot into their blood, living with a frank and vibrant "jianghu spirit" - a rough yet sincere aesthetic of life that belongs to this mountain city.'
    },
    '武汉': {
      chinese: '江城武汉，于长江汉水交汇处崛起，素有"九省通衢"之称。黄鹤楼的千古绝唱与东湖的烟波浩渺，共同见证了这座城市的坚韧与新生。一碗热干面，唤醒的是江城人火热的日常与豪迈的情怀。',
      english: 'Wuhan, the river city that rises at the confluence of the Yangtze and Han rivers, known as the "Thoroughfare to Nine Provinces." The eternal song of Yellow Crane Tower and the misty expanse of East Lake together witness this city\'s resilience and renewal. A bowl of hot dry noodles awakens the passionate daily life and bold spirit of Wuhan people.'
    },
    '南京': {
      chinese: '六朝古都南京，历史的厚重与现代的朝气在这里交织。无论是漫步于梧桐掩映的颐和路，还是泛舟于秦淮河的桨声灯影，这座城市总在不经意间，将千年的金陵风雅与温润的人文气息，娓娓道来。',
      english: 'Nanjing, the ancient capital of six dynasties, where historical depth interweaves with modern vitality. Whether strolling along the plane tree-lined Yihe Road or boating amid the oars and lantern reflections of the Qinhuai River, this city always effortlessly narrates the millennium-old elegance of Jinling and its gentle humanistic atmosphere.'
    }
  } as const;
  
  const cityDescription = CITY_DESCRIPTIONS[chineseCityName];
  
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
      <section className="relative h-[100vh] min-h-[400px] flex items-center justify-center overflow-hidden">
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

            {/* City Title */}
            <h1 className="font-bold mb-2 leading-tight typography-chinese" style={{fontSize: 'clamp(3.5rem, 10vw, 7rem)'}}>
              {chineseCityName}
            </h1>
            <p className="text-white/80 mb-4 typography-heading-en" style={{fontSize: 'clamp(1.8rem, 5vw, 3.5rem)'}}>
              {englishCityName}
            </p>

            {/* Stats */}
            <div className="flex items-center justify-center space-x-6 text-white/80">
              <div className="flex items-center">
                        </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <ScrollIndicator />
      </section>

      {/* Main Content */}
      <div id="main-content" className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* City Description */}
          <div className="text-center mb-16">
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto mb-4 typography-chinese leading-relaxed">
              {cityDescription?.chinese}
            </p>
            <p className="text-base text-muted-foreground max-w-4xl mx-auto mb-6 typography-heading-en leading-relaxed opacity-80">
              {cityDescription?.english}
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