import { Header } from '@/components/layout/header'
import { BottomNav } from '@/components/layout/bottom-nav'
import { MenuItemCard } from '@/components/menu-item-card'
import { Search } from 'lucide-react'
import Link from 'next/link'
import { CATEGORIES, MENU_ITEMS } from '@/lib/menu-data'
import { cn } from '@/lib/utils'

export default function Home() {
  const trendingItems = MENU_ITEMS.filter(i => i.tags.includes('Bestseller') || i.rating >= 4.7).slice(0, 4)
  const topRatedItems = MENU_ITEMS.filter(i => i.rating >= 4.5).slice(0, 4)

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header />

      <main className="container py-6 space-y-8 max-w-7xl mx-auto">
        {/* Hero Section with Search */}
        <section className="bg-gradient-to-br from-primary via-primary to-orange-600 rounded-2xl p-6 md:p-8 text-white shadow-lg relative overflow-hidden">
          <div className="relative z-10 max-w-xl">
            <div className="text-sm font-medium mb-2 opacity-90">Deliver to</div>
            <h1 className="text-3xl md:text-4xl font-bold font-display mb-3">Home • Nairobi</h1>

            {/* Search Bar */}
            <div className="relative mt-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="search"
                placeholder="Search for Pizza, Beef Fry..."
                className="w-full h-12 md:h-14 rounded-xl bg-white pl-12 pr-4 text-sm md:text-base text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 shadow-sm"
              />
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute right-[-40px] bottom-[-40px] opacity-10 rotate-12">
            <div className="w-48 h-48 rounded-full border-[16px] border-white"></div>
          </div>
        </section>

        {/* Categories */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl md:text-2xl font-bold font-display">Categories</h2>
            <Link href="/menu" className="text-sm font-medium text-primary hover:underline">
              See All
            </Link>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
            {CATEGORIES.filter(c => c !== "All").map((cat) => (
              <Link key={cat} href={`/menu?category=${cat}`}>
                <div className="flex flex-col items-center gap-2 min-w-[80px]">
                  <div className="h-16 w-16 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow flex items-center justify-center border border-gray-100">
                    <span className="text-3xl">
                      {cat === "Main Dishes" ? "🍛" :
                        cat === "Breakfast" ? "☕" :
                          cat === "Sides" ? "🍚" :
                            cat === "Beverages" ? "🥤" : "🍽️"}
                    </span>
                  </div>
                  <span className="text-xs font-medium text-center whitespace-nowrap">{cat}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Trending Now */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl md:text-2xl font-bold font-display">Trending Now 🔥</h2>
            <Link href="/menu" className="text-sm font-medium text-primary hover:underline">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {trendingItems.map((item) => (
              <MenuItemCard
                key={item.id}
                {...item}
                variant="vertical"
              />
            ))}
          </div>
        </section>

        {/* Top Rated */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl md:text-2xl font-bold font-display">Top Rated</h2>
            <Link href="/menu" className="text-sm font-medium text-primary hover:underline">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-3">
            {topRatedItems.map((item) => (
              <MenuItemCard
                key={item.id}
                {...item}
                variant="horizontal"
              />
            ))}
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  )
}
