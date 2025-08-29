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

  const stats = [
    { number: "4", label: "个城市", labelEn: "Cities" },
    { number: "32", label: "个故事", labelEn: "Stories" },
    { number: "32", label: "次相遇", labelEn: "Encounters" },
    { number: "∞", label: "份温暖", labelEn: "Warmth" },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Section */}
        <section className="text-center mb-20">
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            关于我们
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-4">
            About Story of Us
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            我们是一对热爱旅行的情侣，用脚步丈量城市，用心灵感受温暖。
            在每一次旅途中，我们都会遇见许多有趣的人，听到许多动人的故事。
          </p>
        </section>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          
          {/* Text Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-6">
                我们的初衷
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  旅行的意义不仅仅在于看风景，更在于遇见不同的人，听到不同的故事。
                  在成都的小巷里，我们遇见了坚强的粮油店奶奶；在重庆的山城步道上，
                  我们听到了老爷爷的人生感悟；在南京的街头，我们感受到了计程车司机的温暖...
                </p>
                <p>
                  这些故事虽然平凡，却充满了人间烟火气。每一个故事背后，
                  都有一个鲜活的生命，都有着独特的人生经历和感悟。
                  我们希望通过记录和分享这些故事，传递人与人之间的温暖，
                  让更多人感受到生活的美好。
                </p>
                <p>
                  Story of Us 不仅仅是我们两个人的故事，更是所有在旅途中
                  相遇的人们的故事。每一个故事都值得被听见，每一份温暖都值得被传递。
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-foreground mb-4">
                Our Mission 我们的使命
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                To capture and share the warmth of human connections encountered 
                during our travels, celebrating the ordinary people who make 
                extraordinary differences in our journey through life.
              </p>
            </div>
          </div>

          {/* Image Placeholder */}
          <div className="relative">
            <div className="aspect-[4/5] bg-warm-100 rounded-2xl overflow-hidden">
              <div className="flex items-center justify-center h-full text-warm-400">
                <div className="text-center">
                  <Camera className="h-16 w-16 mx-auto mb-4" />
                  <p className="text-lg font-medium">我们的合照</p>
                  <p className="text-sm">Our Photo Together</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
              我们的特色
            </h2>
            <p className="text-muted-foreground">
              What makes our stories special
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 text-primary rounded-full mb-6">
                  <feature.icon className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  {feature.titleEn}
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Stats */}
        <section className="bg-warm-50 rounded-2xl p-8 lg:p-12 mb-20">
          <div className="text-center mb-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
              我们的足迹
            </h2>
            <p className="text-muted-foreground">
              Our Journey in Numbers
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-foreground font-medium mb-1">
                  {stat.label}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.labelEn}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-6">
              开始你的故事之旅
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              每个人都有属于自己的故事。让我们一起在这些温暖的相遇中，
              发现生活的美好，感受人间的温暖。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/stories"
                className="inline-flex items-center justify-center px-8 py-3 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors"
              >
                开始阅读 Start Reading
              </Link>
              <Link
                href="/city/chengdu"
                className="inline-flex items-center justify-center px-8 py-3 border border-border text-foreground rounded-full hover:bg-accent transition-colors"
              >
                探索城市 Explore Cities
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}