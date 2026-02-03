'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Header } from '@/components/layout/header'
import { Home, Compass, MapPin } from 'lucide-react'

export default function NotFound() {
    return (
        <div className="min-h-screen bg-white flex flex-col">
            <Header />

            <main className="flex-1 flex flex-col items-center justify-center relative overflow-hidden px-6 text-center">
                {/* Visual Background Elements */}
                <div className="absolute inset-0 pointer-events-none opacity-30">
                    <div className="absolute top-[10%] left-[5%] w-96 h-96 bg-[#E67E22]/5 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute bottom-[10%] right-[5%] w-96 h-96 bg-gray-100 rounded-full blur-3xl" />
                </div>

                {/* Big Error Number */}
                <div className="relative mb-8">
                    <h1 className="text-[15rem] md:text-[25rem] font-black text-gray-50 leading-none tracking-tighter select-none">
                        404
                    </h1>
                    <div className="absolute inset-0 flex items-center justify-center mt-20 md:mt-40">
                        <div className="bg-[#E67E22] text-white px-8 py-4 rounded-[2rem] shadow-2xl rotate-3">
                            <p className="text-xl md:text-3xl font-black tracking-tighter uppercase italic">Lost in the Savannah</p>
                        </div>
                    </div>
                </div>

                {/* Message */}
                <h2 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter mb-8 max-w-3xl leading-tight">
                    Even the best explorers<br />
                    <span className="text-[#E67E22]">take a wrong turn.</span>
                </h2>

                <p className="text-lg md:text-xl text-gray-400 font-medium max-w-xl mb-12 leading-relaxed">
                    The dish or destination you're looking for has moved or vanished into thin air. Let's get you back to the soul of Africa.
                </p>

                {/* Navigation Actions */}
                <div className="flex flex-col sm:flex-row gap-6 items-center">
                    <Link href="/">
                        <Button size="lg" className="bg-black hover:bg-gray-900 text-white h-16 px-12 rounded-2xl flex items-center gap-3 font-black text-lg transition-all active:scale-95 shadow-xl">
                            <Home className="w-5 h-5 mb-0.5" />
                            Return Home
                        </Button>
                    </Link>
                    <Link href="/menu">
                        <Button size="lg" variant="outline" className="border-gray-200 hover:bg-gray-50 h-16 px-12 rounded-2xl flex items-center gap-3 font-black text-lg transition-all active:scale-95">
                            <Compass className="w-5 h-5 text-[#E67E22]" />
                            Explore Menu
                        </Button>
                    </Link>
                </div>

                {/* Quick Help Footer */}
                <div className="mt-24 pt-12 border-t border-gray-50 w-full max-w-3xl flex flex-wrap justify-center gap-12">
                    <div className="flex items-center gap-3 text-gray-400">
                        <MapPin className="w-4 h-4 text-[#E67E22]" />
                        <span className="text-xs font-black uppercase tracking-widest">Check locations</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-400">
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                        <span className="text-xs font-black uppercase tracking-widest">System Online</span>
                    </div>
                </div>
            </main>
        </div>
    )
}
