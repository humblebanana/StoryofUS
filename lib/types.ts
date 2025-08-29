export interface Story {
  id: string;
  slug: string;
  title: string;
  titleEn: string;
  content: string;
  contentEn: string;
  city: string;
  cityEn: string;
  imagePath: string;
  imageAlt: string;
  location?: string;
  date?: string;
  excerpt: string;
  excerptEn: string;
  folderPath: string;
}

export interface City {
  name: string;
  nameEn: string;
  slug: string;
  storyCount: number;
  heroImage?: string;
  description?: string;
  descriptionEn?: string;
}

export interface StoryMetadata {
  title: string;
  date?: string;
  coverImage?: string;
  city: string;
  tags?: string[];
  location?: string;
}

export type CityName = "成都" | "重庆" | "南京" | "武汉";

export const CITY_MAPPINGS: Record<CityName, string> = {
  "成都": "chengdu",
  "重庆": "chongqing", 
  "南京": "nanjing",
  "武汉": "wuhan"
};

export const CITY_NAMES_EN: Record<CityName, string> = {
  "成都": "Chengdu",
  "重庆": "Chongqing",
  "南京": "Nanjing", 
  "武汉": "Wuhan"
};