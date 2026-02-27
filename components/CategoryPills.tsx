'use client';

import { useRef, useState, useEffect } from 'react';
import { XMarkIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface CategoryPillsProps {
  categories: string[];
  activeCategory: string;
  onSelect: (category: string) => void;
  onClear?: () => void;
}

export default function CategoryPills({ categories, activeCategory, onSelect, onClear }: CategoryPillsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  
  const allCategories = ['All', ...categories];
  
  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };
  
  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (el) {
      el.addEventListener('scroll', checkScroll);
      return () => el.removeEventListener('scroll', checkScroll);
    }
  }, []);
  
  const scroll = (direction: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    
    const scrollAmount = 200;
    el.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };
  
  return (
    <div className="relative group">
      {/* Left Fade */}
      <div className={`
        absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none
        transition-opacity duration-300
        ${canScrollLeft ? 'opacity-100' : 'opacity-0'}
      `} />
      
      {/* Right Fade */}
      <div className={`
        absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none
        transition-opacity duration-300
        ${canScrollRight ? 'opacity-100' : 'opacity-0'}
      `} />
      
      {/* Scroll Left Button */}
      <button
        onClick={() => scroll('left')}
        className={`
          absolute left-0 top-1/2 -translate-y-1/2 z-20 w-8 h-8 bg-white shadow-md rounded-full flex items-center justify-center
          transition-all duration-300 hover:shadow-lg hover:scale-110
          ${canScrollLeft ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 pointer-events-none'}
        `}
      >
        <ChevronLeftIcon className="w-4 h-4 text-gray-600" />
      </button>
      
      {/* Scroll Right Button */}
      <button
        onClick={() => scroll('right')}
        className={`
          absolute right-0 top-1/2 -translate-y-1/2 z-20 w-8 h-8 bg-white shadow-md rounded-full flex items-center justify-center
          transition-all duration-300 hover:shadow-lg hover:scale-110
          ${canScrollRight ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'}
        `}
      >
        <ChevronRightIcon className="w-4 h-4 text-gray-600" />
      </button>
      
      {/* Pills Container */}
      <div
        ref={scrollRef}
        className="flex gap-2 overflow-x-auto scrollbar-hide py-1 px-1 -mx-1"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {allCategories.map((category) => {
          const isActive = category === activeCategory;
          const isAll = category === 'All';
          
          return (
            <button
              key={category}
              onClick={() => onSelect(category)}
              className={`
                flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap
                transition-all duration-200 ease-out
                ${isActive
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20 scale-105'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }
                ${isAll && !isActive ? 'border-blue-200 text-blue-600 hover:bg-blue-50' : ''}
              `}
            >
              {category}
            </button>
          );
        })}
        
        {onClear && (
          <button
            onClick={onClear}
            className="flex-shrink-0 px-3 py-2 rounded-full text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 transition-colors flex items-center gap-1"
          >
            <XMarkIcon className="w-4 h-4" />
            Clear
          </button>
        )}
      </div>
    </div>
  );
}
