"use client";

import React, { useState, useCallback, useEffect } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { MagicCard } from "@/components/ui/magic-card";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion"; // Add framer-motion for smooth animations

interface FrontMatter {
  title: string;
  description: string;
  date: string;
  thumbnail: string;
}

interface BlogPost {
  slug: string;
  frontMatter: FrontMatter;
}

const EventsCarousel: React.FC<{ blogs: BlogPost[] }> = ({ blogs }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const timer = setInterval(() => {
      handleSlide("next");
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, [currentIndex, isAutoPlaying]);

  const handleSlide = useCallback(
    (direction: "next" | "prev") => {
      setCurrentIndex((prevIndex) => {
        if (direction === "next") {
          return prevIndex + 1 >= blogs.length ? 0 : prevIndex + 1;
        } else {
          return prevIndex - 1 < 0 ? blogs.length - 1 : prevIndex - 1;
        }
      });
    },
    [blogs.length]
  );

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handleSlide("prev");
      if (e.key === "ArrowRight") handleSlide("next");
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleSlide]);

  return (
    <div
      className="relative w-full max-w-2xl mx-auto"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <div className="overflow-hidden px-4 py-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
          >
            <MagicCard className="items-center justify-center opacity-95 w-full max-w-md mx-auto rounded-[20px] shadow-[0_4px_10px_rgba(255,255,255,0.3),0_-4px_10px_rgba(255,255,255,0.3)] hover:shadow-[0_8px_20px_rgba(255,255,255,0.4),0_-8px_20px_rgba(255,255,255,0.4)] transition-all duration-300">
              <CardHeader className="space-y-4">
                <div className="relative w-full h-56 rounded-sm overflow-hidden group">
                  <Image
                    src={`/${blogs[currentIndex].frontMatter.thumbnail}`}
                    alt={blogs[currentIndex].frontMatter.title}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 500px"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
                    {blogs[currentIndex].frontMatter.title}
                  </h3>
                  <time
                    dateTime={blogs[currentIndex].frontMatter.date}
                    className="text-sm text-gray-200 text-end block"
                  >
                    {blogs[currentIndex].frontMatter.date}
                  </time>
                </div>
              </CardHeader>

              <CardContent>
                <p className="text-gray-300 text-center leading-relaxed">
                  {blogs[currentIndex].frontMatter.description}
                </p>
              </CardContent>

              <CardFooter className="flex justify-center items-center p-4">
                <Link
                  href={`/events/${encodeURIComponent(
                    blogs[currentIndex].slug
                  )}`}
                  className="text-blue-400 hover:text-blue-300 hover:underline text-lg inline-flex items-center transition-colors duration-200"
                  aria-label={`Read more about ${blogs[currentIndex].frontMatter.title}`}
                >
                  <span className="flex items-center gap-2">
                    Read more{" "}
                    <ExternalLink
                      className="animate-bounce"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              </CardFooter>
            </MagicCard>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation dots */}
      <div className="flex justify-center gap-2 mt-4">
        {blogs.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-200 ${
              index === currentIndex ? "bg-white w-4" : "bg-gray-500"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <button
        onClick={() => handleSlide("prev")}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transform -translate-x-1/2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50 hover:scale-110"
        aria-label="Previous event"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={() => handleSlide("next")}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transform translate-x-1/2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50 hover:scale-110"
        aria-label="Next event"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
};

export default EventsCarousel;
