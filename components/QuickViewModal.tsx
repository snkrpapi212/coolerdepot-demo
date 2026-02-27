'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Product } from '../lib/types';
import { getCategory } from '../lib/data';
import { 
  XMarkIcon, 
  ArrowTopRightOnSquareIcon, 
  CheckBadgeIcon,
  PhotoIcon,
  ShoppingBagIcon
} from '@heroicons/react/24/outline';

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function QuickViewModal({ product, isOpen, onClose }: QuickViewModalProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      window.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);
  
  // Reset image state when product changes
  useEffect(() => {
    setImageLoaded(false);
  }, [product?.url]);
  
  if (!isOpen || !product) return null;
  
  const category = getCategory(product.name);
  const isNSF = product.name.toLowerCase().includes('nsf');
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-300">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
        >
          <XMarkIcon className="w-5 h-5 text-gray-700" />
        </button>
        
        <div className="flex flex-col md:flex-row overflow-y-auto max-h-[90vh]">
          {/* Image Section */}
          <div className="relative w-full md:w-1/2 aspect-square md:aspect-auto md:min-h-[500px] bg-gray-100 flex-shrink-0">
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gray-200 animate-pulse" />
            )}
            
            {product.image ? (
              <Image
                src={product.image}
                alt={product.name}
                fill
                className={`
                  object-cover transition-opacity duration-500
                  ${imageLoaded ? 'opacity-100' : 'opacity-0'}
                `}
                sizes="(max-width: 768px) 100vw, 50vw"
                onLoad={() => setImageLoaded(true)}
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                <PhotoIcon className="w-20 h-20 mb-4" />
                <span className="text-lg">No Image Available</span>
              </div>
            )}
            
            {/* NSF Badge */}
            {isNSF && (
              <div className="absolute top-4 left-4">
                <div className="flex items-center gap-1.5 px-4 py-2 bg-green-500 text-white font-semibold rounded-full shadow-lg">
                  <CheckBadgeIcon className="w-5 h-5" />
                  NSF Certified
                </div>
              </div>
            )}
          </div>
          
          {/* Content Section */}
          <div className="flex-1 p-6 md:p-10 flex flex-col">
            {/* Category */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 text-sm font-semibold rounded-full w-fit mb-4">
              {category}
            </div>
            
            {/* Title */}
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight">
              {product.name}
            </h2>
            
            {/* Description */}
            <p className="text-gray-600 mb-6 leading-relaxed">
              Professional-grade commercial refrigeration equipment designed for demanding food service environments. Built to maintain optimal temperatures and preserve food quality.
            </p>
            
            {/* Features */}
            <div className="space-y-3 mb-8">
              <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Key Features</h4>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-gray-600">
                  <CheckBadgeIcon className="w-5 h-5 text-green-500 flex-shrink-0" />
                  {isNSF ? 'NSF Certified for commercial use' : 'Commercial-grade construction'}
                </li>
                <li className="flex items-center gap-2 text-gray-600">
                  <CheckBadgeIcon className="w-5 h-5 text-green-500 flex-shrink-0" />
                  Energy efficient cooling system
                </li>
                <li className="flex items-center gap-2 text-gray-600">
                  <CheckBadgeIcon className="w-5 h-5 text-green-500 flex-shrink-0" />
                  Durable stainless steel construction
                </li>
                <li className="flex items-center gap-2 text-gray-600">
                  <CheckBadgeIcon className="w-5 h-5 text-green-500 flex-shrink-0" />
                  Precise temperature control
                </li>
              </ul>
            </div>
            
            {/* Actions */}
            <div className="mt-auto space-y-3">
              {product.url ? (
                <a
                  href={product.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full px-6 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all hover:shadow-lg hover:shadow-blue-600/25"
                >
                  <ShoppingBagIcon className="w-5 h-5" />
                  View on CoolerDepotUSA
                  <ArrowTopRightOnSquareIcon className="w-5 h-5" />
                </a>
              ) : (
                <button
                  disabled
                  className="flex items-center justify-center gap-2 w-full px-6 py-4 bg-gray-300 text-gray-500 font-semibold rounded-xl cursor-not-allowed"
                >
                  Link Unavailable
                </button>
              )}
              
              <button
                onClick={onClose}
                className="w-full px-6 py-3 text-gray-600 font-medium hover:text-gray-900 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
