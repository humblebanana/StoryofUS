"use client";

import Link from "next/link";
import { Mail, MessageCircle, Heart } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const contactLinks = [
    {
      href: "mailto:humbleguava@gmail.com",
      icon: Mail,
      label: "Email",
      text: "humbleguava@gmail.com",
    },
    {
      href: "#",
      icon: MessageCircle,
      label: "WeChat",
      text: "lty112500",
      onClick: () => {
        navigator.clipboard.writeText('lty112500');
        alert('微信号已复制到剪贴板：lty112500');
      }
    },
  ];

  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">
              Story of Us
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              记录旅途中遇见的每一个人以及他们的故事，编织我眼中所见的世界
            </p>
            <p className="text-muted-foreground text-xs leading-relaxed">
              Recording every person we meet on our journey, sharing their stories, 
              and spreading the warmth between people.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-foreground">快速导航</h4>
            <div className="space-y-2">
              <Link
                href="/"
                className="block text-muted-foreground hover:text-foreground transition-colors text-sm"
              >
                首页 Home
              </Link>
              <Link
                href="/stories"
                className="block text-muted-foreground hover:text-foreground transition-colors text-sm"
              >
                所有故事 Stories
              </Link>
              <Link
                href="/about"
                className="block text-muted-foreground hover:text-foreground transition-colors text-sm"
              >
                关于我们 About
              </Link>
            </div>
          </div>

          {/* Cities */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-foreground">城市故事</h4>
            <div className="space-y-2">
              {[
                { city: "成都", cityEn: "Chengdu", slug: "chengdu" },
                { city: "重庆", cityEn: "Chongqing", slug: "chongqing" },
                { city: "南京", cityEn: "Nanjing", slug: "nanjing" },
                { city: "武汉", cityEn: "Wuhan", slug: "wuhan" },
              ].map((city) => (
                <Link
                  key={city.slug}
                  href={`/city/${city.slug}`}
                  className="block text-muted-foreground hover:text-foreground transition-colors text-sm"
                >
                  {city.city} {city.cityEn}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8 mt-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            {/* Copyright */}
            <p className="text-muted-foreground text-sm flex items-center gap-1">
              © {currentYear} Story of Us. Made with
              <Heart className="h-4 w-4 text-red-500 fill-current" />
              for travelers.
            </p>

            {/* Contact Links - With Hover Tooltip */}
            <div className="flex items-center space-x-6">
              {contactLinks.map((contact) => (
                <div key={contact.label} className="relative group">
                  {contact.onClick ? (
                    <button
                      onClick={contact.onClick}
                      className="text-muted-foreground hover:text-foreground transition-colors opacity-60 hover:opacity-100"
                    >
                      <contact.icon className="h-5 w-5" />
                    </button>
                  ) : (
                    <a
                      href={contact.href}
                      className="text-muted-foreground hover:text-foreground transition-colors opacity-60 hover:opacity-100"
                      aria-label={contact.label}
                    >
                      <contact.icon className="h-5 w-5" />
                    </a>
                  )}
                  
                  {/* Hover Tooltip */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-foreground text-background text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                    <div className="text-center">
                      <div className="font-medium">{contact.label}</div>
                      <div className="text-xs opacity-90">{contact.text}</div>
                    </div>
                    {/* Arrow */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-foreground"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}