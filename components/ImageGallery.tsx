"use client";

import Image from "next/image";

import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";

interface ImageGalleryProps {
  images: Array<{
    src: string;
    alt: string;
    width?: number;
    height?: number;
  }>;
  className?: string;
}

export default function ImageGallery({ images, className }: ImageGalleryProps) {
  return (
    <Gallery>
      <div className={className}>
        {images.map((image, index) => (
          <Item
            key={index}
            original={image.src}
            thumbnail={image.src}
            width={image.width || 1200}
            height={image.height || 800}
          >
            {({ ref, open }) => (
              <div
                ref={ref}
                onClick={open}
                className="cursor-pointer group relative overflow-hidden rounded-lg"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={image.width || 1200}
                  height={image.height || 800}
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm">
                      点击放大查看
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Item>
        ))}
      </div>
    </Gallery>
  );
}