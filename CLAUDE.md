# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is **Story of Us**, a personal travel blog website built with Next.js 15, TypeScript, and TailwindCSS. The project showcases travel stories from different Chinese cities (成都, 重庆, 南京, 武汉) with a focus on human stories and local encounters.

## Key Commands

- **Development server**: `npm run dev` (uses Turbopack)
- **Build**: `npm run build --turbopack`
- **Production server**: `npm start`
- **Linting**: `npm run lint` (uses ESLint)

## Architecture & Structure

### Content Management System
- **Content source**: Local filesystem at `public/StoryofUs/`
- **Structure**: Stories organized by city in Chinese (e.g., `成都故事集合/`, `重庆故事集合/`)
- **Each story folder contains**: `story.txt` (content) + image file
- **Cities covered**: 南京, 成都, 武汉, 重庆

### Tech Stack
- **Framework**: Next.js 15 with App Router
- **Styling**: TailwindCSS 4 + PostCSS
- **Fonts**: Geist Sans & Geist Mono via next/font
- **TypeScript**: Strict mode enabled
- **Path aliases**: `@/*` maps to root directory

### Design Philosophy
- Follows design inspiration from `https://blog-demo.wisp.blog/`
- Emphasis on large high-quality images, elegant typography, generous whitespace
- Modern, minimalist, content-rich aesthetic with human warmth

### Planned Page Structure
1. **Homepage (/)**: Hero section + latest posts grid + city exploration
2. **Stories listing (/stories)**: Article archive with filtering
3. **City pages (/city/:cityName)**: City-specific story collections  
4. **Story details (/stories/:slug)**: Individual story reading experience
5. **About (/about)**: Personal introduction page

### Content Features
- Stories expect Markdown with frontmatter (title, date, coverImage, city, tags)
- Local image optimization with Next.js Image component
- Lightbox functionality for image galleries
- Related posts recommendations based on city/tags

## Development Notes

- Uses Turbopack for faster builds and development
- Geist fonts are pre-configured and optimized
- Strict TypeScript configuration with modern ES2017 target
- ESLint configured with Next.js recommended rules