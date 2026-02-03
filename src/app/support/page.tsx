'use client'

import React, { useState } from 'react'
import { Header } from '@/components/layout/header'
import { Button } from '@/components/ui/button'
import { HelpCircle, ChevronDown, Mail, Phone, MessageSquare, ExternalLink, ArrowRight, LifeBuoy } from 'lucide-react'

const FAQS = [
    {
        question: "How do you guarantee authentic African flavors?",
        answer: "Every dish at Savan Restaurant is crafted using time-honored recipes. We source our ingredients fresh and cook every meal to order, just like the heritage kitchens that inspired us."
    },
    {
        question: "What is your typical delivery time?",
        answer: "To maintain the excellence and temperature of our dishes, we aim for a 30-45 minute delivery window. Our thermal transport system is specifically designed to preserve the delicate textures of traditional African platters."
    },
    {
        question: "Can I customize the spice levels?",
        answer: "Absolutely. We understand that palates vary. You can choose from 'Traditional' (high spice), 'Moderate', or 'Mild' for most of our dishes during the checkout process."
    },
    {
        question: "Do you offer catering for large events?",
        answer: "Yes, our 'Grand Savannah' catering service is designed for groups of 10 or more. We provide full setup and presentation to bring the cinematic Savan experience to your location."
    }
]

export default function SupportPage() {
    const [openIndex, setOpenIndex] = useState<number | null>(0)

    return (
        <div className="min-h-screen bg-white">
            <Header />

            <main className="container max-w-7xl px-6 lg:px-12 py-16">
                {/* Hero Header */}
                <div className="mb-24 text-center">
                    <div className="w-20 h-20 bg-gray-900 rounded-3xl flex items-center justify-center text-[#E67E22] mx-auto mb-10 shadow-xl shadow-gray-200">
                        <LifeBuoy className="w-10 h-10" />
                    </div>
                    <h1 className="text-5xl md:text-8xl font-black text-gray-900 tracking-tighter mb-8 leading-none">
                        How can we <br />
                        <span className="text-[#E67E22]">assist you?</span>
                    </h1>
                    <p className="text-xl text-gray-400 font-medium max-w-2xl mx-auto leading-relaxed italic">
                        Our dedicated team is standing by to ensure your experience with Savan is nothing short of perfect.
                    </p>
                </div>

                <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
                    {/* FAQ Section */}
                    <div className="lg:col-span-7">
                        <h2 className="text-3xl font-black text-gray-900 tracking-tighter mb-12">Common Inquiries</h2>
                        <div className="space-y-4">
                            {FAQS.map((faq, index) => (
                                <div
                                    key={index}
                                    className={cn(
                                        "bg-white border rounded-[2.5rem] transition-all duration-500 overflow-hidden",
                                        openIndex === index ? "border-[#E67E22]/30 shadow-2xl shadow-gray-100" : "border-gray-50 hover:border-gray-100"
                                    )}
                                >
                                    <button
                                        onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                        className="w-full flex items-center justify-between p-8 text-left"
                                    >
                                        <span className="text-xl font-black text-gray-900 tracking-tight">{faq.question}</span>
                                        <ChevronDown className={cn(
                                            "w-6 h-6 text-gray-400 transition-transform duration-500",
                                            openIndex === index && "rotate-180 text-[#E67E22]"
                                        )} />
                                    </button>
                                    <div className={cn(
                                        "px-8 pb-8 transition-all duration-500",
                                        openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0 pointer-events-none"
                                    )}>
                                        <p className="text-lg text-gray-500 font-medium leading-relaxed max-w-2xl">
                                            {faq.answer}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Contact Channels */}
                    <div className="lg:col-span-5">
                        <div className="sticky top-32 space-y-8">
                            <h2 className="text-3xl font-black text-gray-900 tracking-tighter mb-12">Direct Assistance</h2>

                            {/* Contact Cards */}
                            <div className="grid gap-6">
                                <a href="mailto:concierge@savaneats.com" className="group p-8 bg-gray-50 rounded-[2.5rem] border border-gray-100 flex items-center justify-between hover:bg-white hover:shadow-2xl hover:border-[#E67E22]/20 transition-all">
                                    <div className="flex items-center gap-6">
                                        <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-[#E67E22] shadow-sm group-hover:bg-[#E67E22] group-hover:text-white transition-all">
                                            <Mail className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Email Us</p>
                                            <p className="text-lg font-black text-gray-900 tracking-tight">concierge@savaneats.com</p>
                                        </div>
                                    </div>
                                    <ArrowRight className="w-5 h-5 text-gray-200 group-hover:text-[#E67E22] group-hover:translate-x-2 transition-all" />
                                </a>

                                <a href="tel:0797698194" className="group p-8 bg-gray-50 rounded-[2.5rem] border border-gray-100 flex items-center justify-between hover:bg-white hover:shadow-2xl hover:border-[#E67E22]/20 transition-all">
                                    <div className="flex items-center gap-6">
                                        <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-gray-900 shadow-sm group-hover:bg-gray-900 group-hover:text-white transition-all">
                                            <Phone className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Call Support</p>
                                            <p className="text-lg font-black text-gray-900 tracking-tight">0797 698 194</p>
                                        </div>
                                    </div>
                                    <ArrowRight className="w-5 h-5 text-gray-200 group-hover:text-gray-900 group-hover:translate-x-2 transition-all" />
                                </a>

                                <div className="p-8 bg-black rounded-[2.5rem] text-white">
                                    <div className="flex items-center gap-6 mb-8">
                                        <div className="w-14 h-14 bg-[#E67E22] rounded-2xl flex items-center justify-center shadow-lg shadow-[#E67E22]/20">
                                            <MessageSquare className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Live Chat</p>
                                            <p className="text-lg font-black tracking-tight">Real-time Concierge</p>
                                        </div>
                                    </div>
                                    <Button className="w-full h-16 bg-white text-gray-900 hover:bg-[#E67E22] hover:text-white rounded-2xl font-black text-sm uppercase tracking-widest transition-all">
                                        Start Conversation
                                    </Button>
                                </div>
                            </div>

                            <p className="text-xs text-gray-400 font-bold px-4 leading-relaxed">
                                Our support center is active 24/7. Response times vary based on kitchen volume and regional traffic.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

function cn(...classes: any[]) {
    return classes.filter(Boolean).join(' ')
}
