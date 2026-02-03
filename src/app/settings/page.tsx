'use client'

import React, { useState } from 'react'
import { Header } from '@/components/layout/header'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useUserStore } from '@/lib/user-store'
import { Settings, User, MapPin, CreditCard, Bell, Shield, ArrowRight, Save } from 'lucide-react'

export default function SettingsPage() {
    const { user, updateProfile } = useUserStore()
    const addresses = user?.addresses || []
    const [name, setName] = useState(user?.name || '')
    const [email, setEmail] = useState(user?.email || '')
    const [isSaving, setIsSaving] = useState(false)

    const handleSaveProfile = async () => {
        setIsSaving(true)
        // Simulate API call
        setTimeout(() => {
            updateProfile({ name, email })
            setIsSaving(false)
        }, 1000)
    }

    return (
        <div className="min-h-screen bg-white">
            <Header />

            <main className="container max-w-[1440px] px-6 lg:px-12 py-16">
                <div className="mb-16">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-gray-900 rounded-2xl flex items-center justify-center text-[#E67E22]">
                            <Settings className="w-6 h-6" />
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter">
                            Control <span className="text-[#E67E22]">Center</span>
                        </h1>
                    </div>
                    <p className="text-lg text-gray-400 font-medium max-w-2xl">
                        Manage your profile, delivery preferences, and account security with clinical precision.
                    </p>
                </div>

                <div className="grid lg:grid-cols-12 gap-16">
                    {/* Sidebar Tabs (Desktop) / Quick Links */}
                    <div className="lg:col-span-3 space-y-2">
                        {[
                            { id: 'profile', label: 'Personal Info', icon: User, active: true },
                            { id: 'address', label: 'Saved Addresses', icon: MapPin },
                            { id: 'payment', label: 'Payment Methods', icon: CreditCard },
                            { id: 'notifications', label: 'Notifications', icon: Bell },
                            { id: 'security', label: 'Security', icon: Shield },
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                className={cn(
                                    "w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300",
                                    tab.active
                                        ? "bg-gray-900 text-white shadow-xl shadow-gray-200"
                                        : "text-gray-400 hover:bg-gray-50 hover:text-gray-900"
                                )}
                            >
                                <tab.icon className="w-5 h-5" />
                                <span className="font-bold text-sm tracking-tight">{tab.label}</span>
                            </button>
                        ))}
                    </div>

                    {/* Main Content Area */}
                    <div className="lg:col-span-9">
                        <div className="bg-white border border-gray-100 rounded-[3rem] p-8 md:p-16 shadow-[0_20px_60px_rgba(0,0,0,0.02)]">
                            {/* Profile Section */}
                            <div className="max-w-2xl">
                                <h3 className="text-2xl font-black text-gray-900 mb-12 flex items-center gap-4 tracking-tighter">
                                    Personal Information
                                    <div className="h-[1px] flex-1 bg-gray-50 ml-4" />
                                </h3>

                                <div className="space-y-8">
                                    <div className="grid md:grid-cols-2 gap-8">
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Full Identity</label>
                                            <Input
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                className="h-14 rounded-2xl border-gray-100 bg-gray-50/50 px-6 font-bold focus:bg-white transition-all ring-offset-0 focus-visible:ring-1 focus-visible:ring-[#E67E22]"
                                                placeholder="Enter your name"
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Digital Address</label>
                                            <Input
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="h-14 rounded-2xl border-gray-100 bg-gray-50/50 px-6 font-bold focus:bg-white transition-all ring-offset-0 focus-visible:ring-1 focus-visible:ring-[#E67E22]"
                                                placeholder="Enter your email"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Communication Number</label>
                                        <div className="flex gap-4">
                                            <div className="flex-1">
                                                <Input
                                                    className="h-14 rounded-2xl border-gray-100 bg-gray-50/50 px-6 font-bold focus:bg-white transition-all"
                                                    placeholder="+254 700 000 000"
                                                    disabled
                                                />
                                            </div>
                                            <Button variant="outline" className="h-14 px-8 rounded-2xl font-black text-xs uppercase tracking-widest border-gray-100 hover:bg-gray-50">
                                                Update
                                            </Button>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-16 flex items-center justify-between pt-12 border-t border-gray-50">
                                    <p className="text-xs text-gray-400 font-bold max-w-xs">
                                        All sensitive data is encrypted with 256-bit security.
                                    </p>
                                    <Button
                                        onClick={handleSaveProfile}
                                        disabled={isSaving}
                                        className="bg-[#E67E22] hover:bg-black text-white px-12 h-16 rounded-2xl font-black text-lg transition-all shadow-xl shadow-[#E67E22]/20 active:scale-95 disabled:opacity-50"
                                    >
                                        {isSaving ? 'Processing...' : (
                                            <span className="flex items-center gap-3">
                                                <Save className="w-5 h-5" />
                                                Save Changes
                                            </span>
                                        )}
                                    </Button>
                                </div>
                            </div>

                            {/* Address Preview (Compact) */}
                            <div className="mt-24">
                                <h3 className="text-2xl font-black text-gray-900 mb-12 flex items-center gap-4 tracking-tighter">
                                    Primary Hub
                                    <div className="h-[1px] flex-1 bg-gray-50 ml-4" />
                                </h3>

                                {addresses.length > 0 ? (
                                    <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 flex items-center justify-between group cursor-pointer hover:bg-[#E67E22]/5 hover:border-[#E67E22]/20 transition-all">
                                        <div className="flex items-center gap-6">
                                            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-[#E67E22] shadow-sm group-hover:bg-[#E67E22] group-hover:text-white transition-all">
                                                <MapPin className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-black text-gray-900 mb-1 italic">{addresses[0].title}</p>
                                                <p className="text-xs font-bold text-gray-400">{addresses[0].address}</p>
                                            </div>
                                        </div>
                                        <ArrowRight className="w-5 h-5 text-gray-300 group-hover:translate-x-2 transition-transform" />
                                    </div>
                                ) : (
                                    <Button variant="outline" className="w-full h-24 rounded-3xl border-dashed border-gray-200 text-gray-400 hover:text-[#E67E22] hover:bg-[#E67E22]/5 transition-all font-bold text-lg">
                                        + Add New Delivery Hub
                                    </Button>
                                )}
                            </div>
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
