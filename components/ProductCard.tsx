'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Product } from '../lib/types';
import { PhotoIcon, EyeIcon } from '@heroicons/react/24/outline';

interface ProductCardProps {
  product: Product;
  category: string;
  onClick: () => void;
}

export default function ProductCard({ product, category, onClick }: ProductCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const isNSF = product.name.toLowerCase().includes('nsf');
  
  return (
    <article
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
    >
      {/* Image Container */}
      <div className="relative aspect-square bg-gray-100 overflow-hidden">
        {/* Loading Skeleton */}
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse" />
        )}
        
        {/* Product Image */}
        {product.image && !imageError ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className={`
              object-cover transition-all duration-500 ease-out
              ${imageLoaded ? 'opacity-100' : 'opacity-0 scale-105'}
              ${isHovered ? 'scale-110' : 'scale-100'}
            `}
            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 bg-gray-50">
            <PhotoIcon className="w-8 h-8 mb-1" />
            <span className="text-xs">No Image</span>
          </div>
        )}
        
        {/* NSF Badge */}
        {isNSF && (
          <div className="absolute top-2 left-2">
            <div className="px-2 py-0.5 bg-green-500 text-white text-[10px] font-bold rounded-full shadow-sm">
              NSF
            </div>
          </div>
        )}
        
        {/* Hover Overlay with Quick View */}
        <div className={`
          absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent
          flex items-end justify-center pb-4
          transition-opacity duration-300
          ${isHovered ? 'opacity-100' : 'opacity-0'}
        `}>
          <button className="flex items-center gap-1.5 px-4 py-2 bg-white text-gray-900 text-sm font-medium rounded-full shadow-lg transform transition-transform duration-300 hover:scale-105">
            <EyeIcon className="w-4 h-4" />
            Quick View
          </button>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-3">
        {/* Category Tag */}
        <div className="inline-block px-2 py-0.5 bg-gray-100 text-gray-600 text-[10px] font-medium rounded-md mb-1.5">
          {category}
        </div>
        
        {/* Product Name */}
        <h3 className="text-sm font-medium text-gray-900 line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors">
          {product.name}
        </h3>
      </div>
    </article>
  );
}
