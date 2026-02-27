'use client';

import { useState, useRef, useEffect } from 'react';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchBar({ value, onChange, placeholder = "Search..." }: SearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Keyboard shortcut: / to focus
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && !e.metaKey && !e.ctrlKey && document.activeElement?.tagName !== 'INPUT') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
  
  return (
    <div 
      className={`
        relative group
        transition-all duration-300 ease-out
        ${isFocused ? 'scale-[1.02]' : 'scale-100'}
      `}
    >
      <div 
        className={`
          absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur opacity-0 transition-opacity duration-300
          ${isFocused ? 'opacity-20' : 'group-hover:opacity-10'}
        `}
      />
      
      <div className={`
        relative flex items-center bg-white rounded-2xl border-2 transition-all duration-300
        ${isFocused 
          ? 'border-blue-500 shadow-lg shadow-blue-500/10' 
          : 'border-gray-200 hover:border-gray-300 shadow-sm'
        }
      `}>
        <MagnifyingGlassIcon className={`
          w-5 h-5 ml-4 transition-colors duration-300
          ${isFocused ? 'text-blue-500' : 'text-gray-400'}
        `} />
        
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="flex-1 px-4 py-4 bg-transparent outline-none text-gray-900 placeholder:text-gray-400 text-base"
        />
        
        {value ? (
          <button
            onClick={() => {
              onChange('');
              inputRef.current?.focus();
            }}
            className="mr-2 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-all"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        ) : (
          <kbd className="hidden sm:flex items-center gap-1 mr-4 px-2 py-1 text-xs text-gray-400 bg-gray-100 rounded-lg font-mono">
            <span>Press</span>
            <span className="font-bold text-gray-600">/</span>
            <span>to search</span>
          </kbd>
        )}
      </div>
    </div>
  );
}
