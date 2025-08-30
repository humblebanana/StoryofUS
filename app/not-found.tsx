"use client";

import Link from "next/link";
import { Home, Search, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
      <div className="max-w-md mx-auto text-center px-4">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="text-6xl mb-4">🗺️</div>
          <div className="text-8xl font-bold text-primary/20 mb-4">404</div>
        </div>

        {/* Error Message */}
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
          页面走丢了
        </h1>
        <p className="text-muted-foreground mb-2">
          Page Not Found
        </p>
        <p className="text-muted-foreground mb-8 leading-relaxed">
          看起来我们在这次旅程中迷路了。让我们回到起点，重新开始这段温暖的故事之旅。
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors"
          >
            <Home className="h-4 w-4 mr-2" />
            <span>回到首页</span>
            <span className="ml-2 text-sm opacity-80">Home</span>
          </Link>
          <Link
            href="/stories"
            className="inline-flex items-center justify-center px-6 py-3 border border-border text-foreground rounded-full hover:bg-accent transition-colors"
          >
            <Search className="h-4 w-4 mr-2" />
            <span>浏览故事</span>
            <span className="ml-2 text-sm opacity-80">Stories</span>
          </Link>
        </div>

        {/* Go Back Option */}
        <div className="mt-8 pt-8 border-t border-border">
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            <span>返回上一页</span>
            <span className="ml-2 text-sm">Go Back</span>
          </button>
        </div>
      </div>
    </div>
  );
}