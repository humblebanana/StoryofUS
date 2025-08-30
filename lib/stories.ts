import fs from 'fs';
import path from 'path';
import { Story, City, CityName, CITY_MAPPINGS, CITY_NAMES_EN } from './types';

const STORIES_DIRECTORY = path.join(process.cwd(), 'public/StoryofUs');

// Helper function to create slug from Chinese text
function createSlug(text: string, city: string, folderName: string): string {
  // Extract number from folder name if available
  const folderMatch = folderName.match(/^(\d+)_/);
  const folderNumber = folderMatch ? folderMatch[1] : '001';
  
  const citySlug = CITY_MAPPINGS[city as CityName] || city.toLowerCase();
  
  // Create a simple, consistent slug
  return `${citySlug}-${folderNumber}`;
}

// Helper function to extract title from story content
function extractTitle(content: string): { title: string; titleEn: string } {
  const lines = content.split('\n');
  const firstLine = lines[0]?.trim() || '';
  
  // Remove any markdown heading symbols
  const cleanFirstLine = firstLine.replace(/^#+\s*/, '');
  
  // Check if first line contains both Chinese and English title separated by | or ｜
  if (cleanFirstLine.includes('|') || cleanFirstLine.includes('｜')) {
    const separator = cleanFirstLine.includes('｜') ? '｜' : '|';
    const [title, titleEn] = cleanFirstLine.split(separator).map(t => t.trim());
    return { title, titleEn };
  }
  
  return { title: cleanFirstLine, titleEn: cleanFirstLine };
}

// Helper function to clean markdown symbols from text
function cleanMarkdown(text: string): string {
  return text
    .replace(/^#+\s*/gm, '') // Remove heading symbols
    .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold markers
    .replace(/\*(.*?)\*/g, '$1') // Remove italic markers
    .replace(/`(.*?)`/g, '$1') // Remove inline code markers
    .trim();
}

// Helper function to separate Chinese and English content
function separateContent(content: string): { content: string; contentEn: string; location?: string } {
  const lines = content.split('\n');
  // 删除未使用的变量
  // const titleLine = lines[0] || '';
  
  // Skip title line and empty lines
  // 将let改为const
  const contentLines: string[] = [];
  let englishStart = -1;
  let location: string | undefined;
  
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Skip empty lines at the beginning
    if (contentLines.length === 0 && line === '') continue;
    
    // Check for location line
    if (line.startsWith('Location:')) {
      location = line.replace('Location:', '').trim();
      continue;
    }
    
    // Detect English content start (first line that starts with English letter after Chinese content)
    if (englishStart === -1 && line && /^[A-Z]/.test(line) && contentLines.length > 0) {
      englishStart = contentLines.length;
    }
    
    if (line) {
      contentLines.push(cleanMarkdown(line)); // Clean markdown from each line
    }
  }
  
  let chineseContent = '';
  let englishContent = '';
  
  if (englishStart > -1) {
    chineseContent = contentLines.slice(0, englishStart).join('\n\n').trim();
    englishContent = contentLines.slice(englishStart).join('\n\n').trim();
  } else {
    chineseContent = contentLines.join('\n\n').trim();
    englishContent = contentLines.join('\n\n').trim(); // Fallback to same content
  }
  
  return { content: chineseContent, contentEn: englishContent, location };
}

// Helper function to find image file in story folder
function findImageFile(folderPath: string): string {
  try {
    const files = fs.readdirSync(folderPath);
    const imageFile = files.find(file => 
      /\.(jpg|jpeg|png|gif|webp)$/i.test(file)
    );
    
    if (imageFile) {
      // Return path relative to public directory
      const relativePath = path.relative(
        path.join(process.cwd(), 'public'), 
        path.join(folderPath, imageFile)
      );
      return '/' + relativePath.replace(/\\/g, '/');
    }
  } catch (error) {
    console.error(`Error finding image in ${folderPath}:`, error);
  }
  
  return '/placeholder-image.svg'; // Fallback image
}

// Get all stories from the filesystem
export async function getAllStories(): Promise<Story[]> {
  const stories: Story[] = [];
  
  try {
    const cityFolders = fs.readdirSync(STORIES_DIRECTORY);
    
    for (const cityFolder of cityFolders) {
      if (!cityFolder.includes('故事集合')) continue;
      
      const cityPath = path.join(STORIES_DIRECTORY, cityFolder);
      const cityName = cityFolder.replace('故事集合', '') as CityName;
      
      if (!fs.statSync(cityPath).isDirectory()) continue;
      
      const storyFolders = fs.readdirSync(cityPath);
      
      for (const storyFolder of storyFolders) {
        const storyPath = path.join(cityPath, storyFolder);
        
        if (!fs.statSync(storyPath).isDirectory()) continue;
        
        const storyFilePath = path.join(storyPath, 'story.txt');
        
        if (!fs.existsSync(storyFilePath)) continue;
        
        try {
          const fileContent = fs.readFileSync(storyFilePath, 'utf-8');
          const { title, titleEn } = extractTitle(fileContent);
          const { content, contentEn, location } = separateContent(fileContent);
          
          const imagePath = findImageFile(storyPath);
          const slug = createSlug(title, cityName, storyFolder);
          
          // Create excerpt (first 100 characters)
          const excerpt = content.substring(0, 100) + (content.length > 100 ? '...' : '');
          const excerptEn = contentEn.substring(0, 100) + (contentEn.length > 100 ? '...' : '');
          
          stories.push({
            id: slug,
            slug,
            title,
            titleEn,
            content,
            contentEn,
            city: cityName,
            cityEn: CITY_NAMES_EN[cityName],
            imagePath,
            imageAlt: title,
            location,
            excerpt,
            excerptEn,
            folderPath: storyPath
          });
          
        } catch (error) {
          console.error(`Error processing story in ${storyPath}:`, error);
        }
      }
    }
  } catch (error) {
    console.error('Error reading stories directory:', error);
  }
  
  // Sort by city and then by folder name (which includes numbering)
  return stories.sort((a, b) => {
    if (a.city !== b.city) {
      return a.city.localeCompare(b.city);
    }
    return a.folderPath.localeCompare(b.folderPath);
  });
}

// Get story by slug
export async function getStoryBySlug(slug: string): Promise<Story | null> {
  const allStories = await getAllStories();
  return allStories.find(story => story.slug === slug) || null;
}

// Get stories by city
export async function getStoriesByCity(cityName: string): Promise<Story[]> {
  const allStories = await getAllStories();
  return allStories.filter(story => 
    story.city === cityName || CITY_MAPPINGS[story.city as CityName] === cityName
  );
}

// Get all cities with story counts
export async function getAllCities(): Promise<City[]> {
  const allStories = await getAllStories();
  const cityMap = new Map<string, { count: number; stories: Story[] }>();
  
  for (const story of allStories) {
    const cityKey = story.city;
    if (!cityMap.has(cityKey)) {
      cityMap.set(cityKey, { count: 0, stories: [] });
    }
    cityMap.get(cityKey)!.count++;
    cityMap.get(cityKey)!.stories.push(story);
  }
  
  const cities: City[] = [];
  
  for (const [cityName, data] of cityMap.entries()) {
    const citySlug = CITY_MAPPINGS[cityName as CityName] || cityName.toLowerCase();
    const city: City = {
      name: cityName,
      nameEn: CITY_NAMES_EN[cityName as CityName],
      slug: citySlug,
      storyCount: data.count,
      heroImage: `/city_photo/${citySlug}.jpg` // Use dedicated city photo
    };
    cities.push(city);
  }
  
  return cities;
}

// Get latest stories (for homepage) - randomly selected from different cities
export async function getLatestStories(limit: number = 6): Promise<Story[]> {
  const allStories = await getAllStories();
  
  if (allStories.length === 0) return [];
  
  // Group stories by city
  const storiesByCity = new Map<string, Story[]>();
  for (const story of allStories) {
    if (!storiesByCity.has(story.city)) {
      storiesByCity.set(story.city, []);
    }
    storiesByCity.get(story.city)!.push(story);
  }
  
  const cities = Array.from(storiesByCity.keys());
  const selectedStories: Story[] = [];
  
  // Try to get stories from different cities first
  let cityIndex = 0;
  while (selectedStories.length < limit && selectedStories.length < allStories.length) {
    const cityName = cities[cityIndex % cities.length];
    const cityStories = storiesByCity.get(cityName)!;
    
    // Find a story from this city that hasn't been selected yet
    const availableStories = cityStories.filter(
      story => !selectedStories.some(selected => selected.slug === story.slug)
    );
    
    if (availableStories.length > 0) {
      // Randomly select one story from this city
      const randomIndex = Math.floor(Math.random() * availableStories.length);
      selectedStories.push(availableStories[randomIndex]);
    }
    
    cityIndex++;
    
    // If we've cycled through all cities, break to avoid infinite loop
    if (cityIndex > cities.length * 10) break;
  }
  
  // If we still need more stories, fill from any remaining stories
  if (selectedStories.length < limit) {
    const remainingStories = allStories.filter(
      story => !selectedStories.some(selected => selected.slug === story.slug)
    );
    
    // Shuffle and take what we need
    const shuffled = remainingStories.sort(() => Math.random() - 0.5);
    selectedStories.push(...shuffled.slice(0, limit - selectedStories.length));
  }
  
  // Final shuffle of selected stories
  return selectedStories.sort(() => Math.random() - 0.5).slice(0, limit);
}

// Get related stories (same city, excluding current story)
export async function getRelatedStories(currentStory: Story, limit: number = 3): Promise<Story[]> {
  const cityStories = await getStoriesByCity(currentStory.city);
  return cityStories
    .filter(story => story.slug !== currentStory.slug)
    .slice(0, limit);
}