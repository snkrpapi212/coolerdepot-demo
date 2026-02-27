'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Product } from '../lib/types';
import { ArrowTopRightOnSquareIcon, PhotoIcon, SparklesIcon } from '@heroicons/react/24/outline';

interface FeaturedCardProps {
  product: Product;
  category: string;
  onClick: () => void;
  delay?: number;
}

export default function FeaturedCard({ product, category, onClick, delay = 0 }: FeaturedCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <article
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Background Gradient on Hover */}
      <div className={`
        absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 transition-opacity duration-500
        ${isHovered ? 'opacity-100' : 'opacity-0'}
      `} />
      
      <div className="relative flex flex-col md:flex-row">
        {/* Image Section */}
        <div className="relative w-full md:w-1/2 aspect-square md:aspect-auto md:min-h-[320px] bg-gray-100 overflow-hidden">
          {/* Loading Skeleton */}
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse" />
          )}
          
          {/* Image */}
          {product.image && !imageError ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              className={`
                object-cover transition-all duration-700 ease-out
                ${imageLoaded ? 'opacity-100' : 'opacity-0 scale-105'}
                ${isHovered ? 'scale-110' : 'scale-100'}
              `}
              sizes="(max-width: 768px) 100vw, 50vw"
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
              priority
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 bg-gray-50">
              <PhotoIcon className="w-16 h-16 mb-3" />
              <span className="text-base">No Image Available</span>
            </div>
          )}
          
          {/* NSF Badge */}
          <div className="absolute top-4 left-4">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-green-500 text-white text-sm font-medium rounded-full shadow-lg">
              <SparklesIcon className="w-4 h-4" />
              NSF Certified
            </div>
          </div>
          
          {/* Hover Overlay */}
          <div className={`
            absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300
            ${isHovered ? 'opacity-100' : 'opacity-0'}
          `}>
            <span className="px-6 py-3 bg-white text-gray-900 font-medium rounded-full transform transition-transform duration-300 hover:scale-105">
              Quick View
            </span>
          </div>
        </div>
        
        {/* Content Section */}
        <div className="flex-1 p-6 md:p-8 flex flex-col justify-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full w-fit mb-4">
            {category}
          </div>
          
          <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
          
          <p className="text-gray-500 mb-6 line-clamp-2">
            Commercial-grade refrigeration equipment built for professional kitchens and food service operations.
          </p>
          
          <div className="flex items-center gap-4">
            {product.url && (
              <a
                href={product.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white font-medium rounded-xl hover:bg-gray-800 transition-all hover:shadow-lg"
              >
                View Details
                <ArrowTopRightOnSquareIcon className="w-4 h-4" />
              </a>
            )}
            
            <span className="text-sm text-gray-400">
              Click card for quick view
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
