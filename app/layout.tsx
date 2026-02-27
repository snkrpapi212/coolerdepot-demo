import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'CoolerDepot Product Catalog',
  description: 'Commercial refrigeration products from CoolerDepotUSA.com',
  keywords: ['commercial refrigeration', 'NSF certified', 'restaurant equipment', 'coolers', 'freezers'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://www.coolerdepotusa.com" />
      </head>
      
      <body className="bg-gray-50 min-h-screen antialiased">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-3">
                {/* Logo */}
                <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold shadow-md shadow-blue-500/20">
                  CD
                </div>
                
                <div className="hidden sm:block">
                  <h1 className="text-lg font-bold text-gray-900 leading-tight">CoolerDepot</h1>
                  <p className="text-xs text-gray-500">188 Products</p>
                </div>
              </div>
              
              <a
                href="https://www.coolerdepotusa.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
              >
                <span className="hidden sm:inline">Visit Store</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </header>
        
        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
        
        {/* Footer */}
        <footer className="border-t border-gray-200/80 mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
              <p>
                Data from <a href="https://www.coolerdepotusa.com" className="text-blue-600 hover:underline">CoolerDepotUSA.com</a>
              </p>
              <p>Built with Next.js</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
