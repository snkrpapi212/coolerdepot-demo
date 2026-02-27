'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { products, getCategories, getCategory, searchProducts } from '../lib/data';
import ProductCard from './ProductCard';
import FeaturedCard from './FeaturedCard';
import CategoryPills from './CategoryPills';
import SearchBar from './SearchBar';
import QuickViewModal from './QuickViewModal';
import { Product } from '../lib/types';

function CatalogContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const [search, setSearch] = useState(searchParams.get('q') || '');
  const [activeCategory, setActiveCategory] = useState(searchParams.get('cat') || 'All');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  const categories = getCategories();
  const filteredProducts = searchProducts(search, activeCategory === 'All' ? undefined : activeCategory);
  
  // Featured products (first 2 NSF items)
  const featuredProducts = filteredProducts.filter(p => p.name.toLowerCase().includes('nsf')).slice(0, 2);
  const regularProducts = filteredProducts.filter(p => !featuredProducts.includes(p));
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (search) params.set('q', search);
    else params.delete('q');
    
    if (activeCategory !== 'All') params.set('cat', activeCategory);
    else params.delete('cat');
    
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
    
    // Trigger animation
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 400);
    return () => clearTimeout(timer);
  }, [search, activeCategory]);
  
  const clearFilters = () => {
    setSearch('');
    setActiveCategory('All');
  };
  
  const hasFilters = search || activeCategory !== 'All';
  
  return (
    <div className="space-y-8">
      {/* Search & Filters */}
      <div className="space-y-4">
        <SearchBar 
          value={search} 
          onChange={setSearch}
          placeholder="Search 188 commercial refrigeration products..."
        />
        
        <CategoryPills
          categories={categories}
          activeCategory={activeCategory}
          onSelect={setActiveCategory}
          onClear={hasFilters ? clearFilters : undefined}
        />
      </div>
      
      {/* Results Info */}
      <div className="flex items-center justify-between text-sm text-gray-500">
        <span>
          Showing <span className="font-semibold text-gray-900">{filteredProducts.length}</span> products
          {activeCategory !== 'All' && <span className="text-blue-600"> in {activeCategory}</span>}
          {search && <span className="text-blue-600"> matching "{search}"</span>}
        </span>
        
        {hasFilters && (
          <button
            onClick={clearFilters}
            className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
          >
            Clear filters
          </button>
        )}
      </div>
      
      {/* Empty State */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-2xl">
          <div className="w-20 h-20 mx-auto mb-6 bg-gray-200 rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-500 max-w-md mx-auto mb-6">
            Try adjusting your search terms or browse a different category.
          </p>
          <button
            onClick={clearFilters}
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-all hover:shadow-lg hover:shadow-blue-600/20"
          >
            View all products
          </button>
        </div>
      ) : (
        <>
          {/* Featured Section */}
          {featuredProducts.length > 0 && !search && activeCategory === 'All' && (
            <section className={mounted ? 'animate-in fade-in duration-500' : ''}>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Featured Products</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {featuredProducts.map((product, idx) => (
                  <FeaturedCard
                    key={idx}
                    product={product}
                    category={getCategory(product.name)}
                    onClick={() => setSelectedProduct(product)}
                    delay={idx * 100}
                  />
                ))}
              </div>
            </section>
          )}
          
          {/* Product Grid - Bento Style */}
          <section>
            {featuredProducts.length > 0 && !search && activeCategory === 'All' && (
              <h2 className="text-lg font-semibold text-gray-900 mb-4">All Products</h2>
            )}
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-5">
              {(featuredProducts.length > 0 && !search && activeCategory === 'All' ? regularProducts : filteredProducts).map((product, idx) => (
                <div
                  key={idx}
                  className={`
                    transition-all duration-300 ease-out
                    ${isAnimating ? 'opacity-0 translate-y-4 scale-95' : 'opacity-100 translate-y-0 scale-100'}
                  `}
                  style={{
                    transitionDelay: isAnimating ? '0ms' : `${Math.min(idx * 25, 400)}ms`
                  }}
                >
                  <ProductCard
                    product={product}
                    category={getCategory(product.name)}
                    onClick={() => setSelectedProduct(product)}
                  />
                </div>
              ))}
            </div>
          </section>
        </>
      )}
      
      {/* Quick View Modal */}
      <QuickViewModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
}

export default function ProductCatalog() {
  return (
    <Suspense fallback={<div className="h-96 bg-gray-100 rounded-2xl animate-pulse" />}>
      <CatalogContent />
    </Suspense>
  );
}
