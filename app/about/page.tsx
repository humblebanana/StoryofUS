import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { Heart, Camera, Map, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "关于我们 | Story of Us",
  description: "了解Story of Us的故事，我们为什么要记录旅途中遇见的每一个温暖故事。",
  openGraph: {
    title: "关于我们 | Story of Us",
    description: "了解Story of Us的故事，我们为什么要记录旅途中遇见的每一个温暖故事。",
  },
};

export default function AboutPage() {
  const features = [
    {
      icon: Heart,
      title: "温暖相遇",
      titleEn: "Warm Encounters",
      description: "记录旅途中与陌生人的温暖相遇，发现平凡生活中的不平凡故事。",
    },
    {
      icon: Camera,
      title: "真实记录",
      titleEn: "Authentic Stories",
      description: "用镜头和文字真实记录每一个故事，保持原汁原味的人文情怀。",
    },
    {
      icon: Map,
      title: "城市探索",
      titleEn: "City Exploration",
      description: "穿梭在不同的城市，探索每座城市独特的人文风情和生活气息。",
    },
    {
      icon: Users,
      title: "人文关怀",
      titleEn: "Human Care",
      description: "关注普通人的生活故事，传递人与人之间的理解与温暖。",
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Section */}
        <section className="text-center mb-20 animate-fade-in">
          <h1 className="text-4xl lg:text-5xl font-medium text-foreground mb-6 typography-chinese">
            关于我们
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8 typography-heading-en italic">
            About Story of Us
          </p>
          <div className="max-w-4xl mx-auto space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed animate-slide-up animate-delay-200">
              在过去的两年中，我利用假期时间独自游历了中国的多个城市。在这些旅程中，我与当地人进行了深入的对话，聆听他们的故事，感受他们的生活。
            </p>
            <p className="text-base text-muted-foreground/80 leading-relaxed typography-heading-en animate-slide-up animate-delay-400">
              Over the past two years, I have taken the opportunity of my holiday time to travel solo through numerous cities across China. Through these voyages, I have engaged in deep conversations with the locals, listened to their tales, and immersed myself in their daily lives.
            </p>
          </div>
        </section>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          
          {/* Text Content */}
          <div className="space-y-10 animate-slide-up animate-delay-300">
            <div>
              <h2 className="text-2xl lg:text-3xl font-medium text-foreground mb-8 typography-chinese">
                我的初衷
              </h2>
              <div className="space-y-6 text-muted-foreground leading-relaxed typography-heading-chinese">
                <p className="text-lg">
                  我相信，正是无数个人的故事编织成了我们共同的记忆和历史。旅行的意义不仅仅在于看风景，更在于遇见不同的人，听到不同的故事。
                </p>
                <p>
                  在成都的小巷里，我遇见了坚强的粮油店奶奶；在重庆的山城步道上，
                  我听到了老爷爷的人生感悟；在南京的街头，我感受到了出租车司机的温暖；在武汉的街道上，我与当地人分享着生活的点滴...
                </p>
                <p>
                  这些故事虽然平凡，却充满了人间烟火气。每一个故事背后，
                  都有一个鲜活的生命，都有着独特的人生经历和感悟。
                  我希望通过记录和分享这些故事，传递人与人之间的温暖，
                  让更多人感受到生活的美好。
                </p>
              </div>
            </div>

            <div className="p-6 bg-card/50 rounded-2xl border border-border">
              <h3 className="text-xl font-medium text-foreground mb-4 typography-heading-en">
                My Mission
              </h3>
              <p className="text-muted-foreground leading-relaxed typography-heading-en">
                My aim is to understand society through the narratives of every ordinary person, for it is the countless stories of individuals that are woven together to form our shared memory and history.
              </p>
            </div>
          </div>

          {/* Visual Content */}
          <div className="relative animate-scale-in animate-delay-500">
            <div className="aspect-[4/5] bg-gradient-to-br from-warm-100 to-warm-200 rounded-2xl overflow-hidden card-elevated">
              <div className="flex items-center justify-center h-full text-warm-600">
                <div className="text-center p-8">
                  <div className="relative mb-6">
                    <Map className="h-16 w-16 mx-auto mb-2 animate-float" />
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-xs text-white font-bold">4</span>
                    </div>
                  </div>
                  <p className="text-lg font-medium typography-chinese mb-2">行走的故事</p>
                  <p className="text-sm typography-heading-en opacity-75">Walking Stories</p>
                  <div className="mt-4 space-y-2 text-sm opacity-60">
                    <p>成都 • 重庆</p>
                    <p>南京 • 武汉</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}