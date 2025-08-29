import StoryCard from "@/components/StoryCard";
import CityFilter from "@/components/CityFilter";
import { getAllStories, getAllCities } from "@/lib/stories";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "所有故事 | Story of Us",
  description: "探索我们在旅途中收集的所有温暖故事，每一个故事都承载着独特的人文情怀。",
  openGraph: {
    title: "所有故事 | Story of Us",
    description: "探索我们在旅途中收集的所有温暖故事，每一个故事都承载着独特的人文情怀。",
  },
};

export default async function StoriesPage() {
  const [stories, cities] = await Promise.all([
    getAllStories(),
    getAllCities(),
  ]);

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            所有故事
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-4">
            All Stories
          </p>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            在这里，每一个故事都承载着独特的人文情怀，记录着我们与城市中不同人们的温暖相遇。
          </p>
        </div>

        {/* City Filter */}
        <div className="mb-12">
          <div className="flex items-center justify-center">
            <CityFilter cities={cities} showCounts={true} />
          </div>
        </div>

        {/* Stories Stats */}
        <div className="text-center mb-8">
          <p className="text-muted-foreground">
            共收录 <span className="font-semibold text-foreground">{stories.length}</span> 个故事，
            来自 <span className="font-semibold text-foreground">{cities.length}</span> 个城市
          </p>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.map((story, index) => (
            <StoryCard
              key={story.slug}
              story={story}
              priority={index < 6} // Prioritize loading for first 6 images
              showCity={true}
            />
          ))}
        </div>

        {/* Empty State (if no stories) */}
        {stories.length === 0 && (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="text-6xl mb-4">📖</div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                暂无故事
              </h3>
              <p className="text-muted-foreground">
                我们正在收集更多温暖的故事，请稍后再来查看。
              </p>
            </div>
          </div>
        )}

        {/* Load More Placeholder */}
        {stories.length > 0 && stories.length >= 12 && (
          <div className="text-center mt-12">
            <div className="inline-flex items-center px-6 py-3 border border-border rounded-full text-muted-foreground">
              <span>已显示全部故事</span>
              <span className="ml-2 text-sm">All stories loaded</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}