import { Header } from '@/components/layout/header'
import { BottomNav } from '@/components/layout/bottom-nav'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { CATEGORIES, MENU_ITEMS } from '@/lib/menu-data'

export default function Home() {
  const popularItems = MENU_ITEMS.filter(i => i.rating >= 4.7).slice(0, 4)
  const newItems = MENU_ITEMS.slice(0, 3)

  return (
    <div className="min-h-screen bg-muted/20 pb-20">
      <Header />

      <main className="container py-6 space-y-8">
        {/* Hero Section */}
        <section className="bg-primary rounded-xl p-6 text-primary-foreground shadow-lg relative overflow-hidden">
          <div className="relative z-10">
            <h1 className="text-3xl font-bold font-display mb-2">Authentic African Flavors</h1>
            <p className="mb-4 opacity-90 max-w-xs">Delicious meals delivered fresh to your door in Nairobi.</p>
            <Link href="/menu">
              <span className="inline-flex items-center justify-center rounded-full bg-white text-primary font-bold px-6 py-2 text-sm shadow hover:bg-gray-100 transition">
                Order Now
              </span>
            </Link>
          </div>
          <div className="absolute right-[-20px] bottom-[-40px] opacity-20 rotate-12">
            {/* Abstract decorative circle or pattern */}
            <div className="w-64 h-64 rounded-full border-[20px] border-white"></div>
          </div>
        </section>

        {/* Categories */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold font-display">Categories</h2>
            <Link href="/menu" className="text-sm text-primary font-medium hover:underline">View All</Link>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4">
            {CATEGORIES.filter(c => c !== "All").map((cat) => (
              <Link key={cat} href={`/menu?category=${cat}`}>
                <div className="flex flex-col items-center gap-2 min-w-[80px]">
                  <div className="h-16 w-16 rounded-full bg-secondary/20 flex items-center justify-center shadow-sm">
                    {/* Placeholder icons based on category */}
                    <span className="text-2xl">
                      {cat === "Main Dishes" ? "🥘" :
                        cat === "Breakfast" ? "☕" :
                          cat === "Sides" ? "🍚" :
                            cat === "Beverages" ? "🥤" : "🍽️"}
                    </span>
                  </div>
                  <span className="text-xs font-medium whitespace-nowrap">{cat}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Trending */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold font-display">Trending Now 🔥</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularItems.map((item) => (
              <Link key={item.id} href={`/dish/${item.slug}`}>
                <Card className="overflow-hidden hover:shadow-md transition-shadow h-full">
                  <div className="aspect-[4/3] relative bg-muted">
                    {/* Placeholder since we don't have real images yet */}
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-200 text-gray-400">
                      Image: {item.name}
                    </div>
                    <Badge className="absolute top-2 left-2 bg-accent text-white">Popular</Badge>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold font-display line-clamp-1">{item.name}</h3>
                      <div className="flex items-center gap-1 text-xs font-medium bg-secondary/10 text-secondary-700 px-1.5 py-0.5 rounded">
                        <Star className="w-3 h-3 fill-current" />
                        {item.rating}
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{item.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-primary">KES {item.price}</span>
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  )
}
