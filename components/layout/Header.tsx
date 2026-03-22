'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useState, useRef, useEffect } from 'react'
import { Menu, X, ChevronDown, Globe } from 'lucide-react'
import { SearchBar } from '@/components/SearchBar'
import { ModeToggle } from '@/components/mode-toggle'
import { useLanguage } from '@/components/LanguageProvider'
import { LANGUAGES } from '@/lib/translations'

const navStructure = [
  { key: 'home', href: '/' },
  {
    key: 'aboutUs',
    href: '#',
    dropdown: [
      { key: 'aboutMinistry', href: '/about/ministry' },
      { key: 'mandate', href: '/about/mandate' },
      { key: 'leadership', href: '/about/leadership' },
      { key: 'charter', href: '/about/charter' },
      { key: 'structure', href: '/about/structure' },
    ]
  },
  {
    key: 'departments',
    href: '/departments',
    dropdown: [
      { key: 'allDepartments', href: '/departments' },
      { key: 'energyDept', href: '/departments/energy' },
      { key: 'waterResourcesHydromet', href: '/departments/water-resources' },
      { key: 'planningPolicy', href: '/departments/planning-policy' },
      { key: 'adminFinance', href: '/departments/administration-finance' },
      { key: 'humanResources', href: '/departments/human-resources' },
      { key: 'ict', href: '/departments/information-technology' },
      { key: 'officer', href: '/departments/officer' },
    ]
  },
  {
    key: 'services',
    href: '/services',
    dropdown: [
      { key: 'allServices', href: '/services' },
      { key: 'onlineServices', href: '/online-services' },
    ]
  },
  {
    key: 'resources',
    href: '#',
    dropdown: [
      { key: 'events', href: '/events' },
      { key: 'training', href: '/training' },
      { key: 'resourcesLibrary', href: '/resources' },
      { key: 'statistics', href: '/statistics' },
      { key: 'news', href: '/news' },
    ]
  },
  { key: 'projects', href: '/projects' },
  {
    key: 'opportunities',
    href: '#',
    dropdown: [
      { key: 'tenders', href: '/tenders' },
      { key: 'careers', href: '/careers' },
    ]
  },
  {
    key: 'publicEngagement',
    href: '#',
    dropdown: [
      { key: 'faq', href: '/faq' },
      { key: 'feedback', href: '/feedback' },
      { key: 'contactUs', href: '/contact' },
    ]
  },
] as const

export function Header() {
    const router = useRouter()
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
    const [langDropdownOpen, setLangDropdownOpen] = useState(false)
    const langDropdownRef = useRef<HTMLDivElement>(null)
    const { language, setLanguage, t } = useLanguage()

    const handleDropdownEnter = (item: typeof navStructure[number]) => {
        setActiveDropdown(item.key)
        if ('dropdown' in item) {
            item.dropdown.forEach((sub) => router.prefetch(sub.href))
        }
    }

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (langDropdownRef.current && !langDropdownRef.current.contains(e.target as Node)) {
                setLangDropdownOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    return (
        <>
            {/* Top Bar – scrolls away */}
            <div className="bg-[#3BA944] text-white text-sm transition-colors w-full border-b border-white/20">
                <div className="w-full px-4 lg:px-8">
                    <div className="flex justify-between items-center py-3 lg:py-4">
                        <div className="flex items-center gap-2">
                            <span className="font-bold">{t.stateName}</span>
                            <span className="text-white/70">|</span>
                            <span className="font-bold">{t.ministryName}</span>
                        </div>
                        <div className="hidden md:flex items-center gap-6">
                            <span className="text-white/90 font-medium" suppressHydrationWarning>
                                {new Date().toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}
                            </span>
                            <a href="mailto:moewr@ne.so" className="inline-flex items-center px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 transition-all duration-300 font-bold text-white">
                                moewr@ne.so
                            </a>
                            <div className="relative" ref={langDropdownRef}>
                                <button
                                    onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 transition-all duration-300 font-bold text-white"
                                >
                                    <Globe className="h-4 w-4" />
                                    {LANGUAGES.find(l => l.code === language)?.label || 'English'}
                                    <ChevronDown className={`h-4 w-4 transition-transform ${langDropdownOpen ? 'rotate-180' : ''}`} />
                                </button>
                                {langDropdownOpen && (
                                    <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-2xl py-2 border-2 border-gray-300 z-[100]">
                                        {LANGUAGES.map((lang) => (
                                            <button
                                                key={lang.code}
                                                onClick={() => {
                                                    setLanguage(lang.code)
                                                    setLangDropdownOpen(false)
                                                }}
                                                className={`block w-full text-left px-4 py-3 text-sm font-bold transition-colors ${
                                                    language === lang.code
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'text-gray-900 hover:bg-gray-100'
                                                }`}
                                            >
                                                {lang.label}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div className="pl-4 border-l border-white/30">
                                <ModeToggle />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Header – sticky */}
            <header className="sticky top-0 z-50 bg-white border-b border-gray-200 w-full shadow-sm">
                <nav className="flex items-center justify-between w-full py-3 lg:py-4" aria-label="Global">
                    <div className="flex-shrink-0">
                        <Link href="/" prefetch={true} className="flex items-center gap-2 pl-4 lg:pl-6">
                            <span className="sr-only">{t.ministryName}</span>
                            <div className="flex items-center gap-2">
                                <div className="flex items-center justify-center w-16 h-16 lg:w-20 lg:h-20 relative">
                                    <Image src="/ministry-logo.png" alt="MOEWR Logo" width={64} height={64} className="h-14 w-14 lg:h-16 lg:w-16 object-contain" priority />
                                </div>
                                <span className="text-blue-900 font-bold text-2xl lg:text-3xl">MOEWR</span>
                            </div>
                        </Link>
                    </div>
                    <div className="flex-1 flex items-center justify-center pr-4 lg:pr-8">
                        <div className="hidden lg:flex items-center justify-center gap-6 xl:gap-8">
                        {navStructure.map((item) => (
                            'dropdown' in item ? (
                                <div key={item.key} className="relative group">
                                    <button
                                        className="flex items-center gap-1 text-sm font-bold leading-6 text-gray-900 hover:text-blue-600 transition-colors px-2 py-1"
                                        onMouseEnter={() => handleDropdownEnter(item)}
                                        onMouseLeave={() => setActiveDropdown(null)}
                                    >
                                        {t.nav[item.key as keyof typeof t.nav]}
                                        <ChevronDown className="h-4 w-4" />
                                    </button>
                                    <div
                                        className={`absolute left-0 mt-2 w-64 bg-white shadow-lg rounded-md py-2 transition-all duration-200 ${activeDropdown === item.key ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
                                        onMouseEnter={() => handleDropdownEnter(item)}
                                        onMouseLeave={() => setActiveDropdown(null)}
                                    >
                                        {item.dropdown.map((subItem: { key: string; href: string }) => (
                                            <Link
                                                key={subItem.key}
                                                href={subItem.href}
                                                prefetch={true}
                                                onMouseEnter={() => router.prefetch(subItem.href)}
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                                            >
                                                {t.nav[subItem.key as keyof typeof t.nav]}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <Link key={item.key} href={item.href} prefetch={true} className="text-sm font-bold leading-6 text-gray-900 hover:text-blue-600 transition-colors px-2 py-1">
                                    {t.nav[item.key as keyof typeof t.nav]}
                                </Link>
                            )
                        ))}
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex lg:hidden">
                                <button
                                    type="button"
                                    className="inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                                    onClick={() => setIsMenuOpen(true)}
                                >
                                    <span className="sr-only">Open main menu</span>
                                    <Menu className="h-6 w-6" aria-hidden="true" />
                                </button>
                            </div>
                            <SearchBar />
                        </div>
                    </div>
                </nav>

                {/* Mobile menu */}
                {isMenuOpen && (
                    <div className="lg:hidden" role="dialog" aria-modal="true">
                        <div className="fixed inset-0 z-50 bg-black/50" onClick={() => setIsMenuOpen(false)} />
                        <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                            <div className="flex items-center justify-between">
                                <Link href="/" prefetch={true} className="-m-1.5 p-1.5 flex items-center gap-2">
                                    <div className="flex items-center gap-2">
                                        <div className="flex items-center justify-center w-16 h-16 relative">
                                            <Image src="/ministry-logo.png" alt="MOEWR Logo" width={64} height={64} className="h-14 w-14 object-contain" />
                                        </div>
                                        <span className="text-blue-900 font-bold text-2xl">MOEWR</span>
                                    </div>
                                </Link>
                                <button
                                    type="button"
                                    className="-m-2.5 rounded-md p-2.5 text-gray-700"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <span className="sr-only">Close menu</span>
                                    <X className="h-6 w-6" aria-hidden="true" />
                                </button>
                            </div>
                            <div className="mt-6 flow-root">
                                <div className="-my-6 divide-y divide-gray-500/10">
                                    <div className="space-y-2 py-6">
                                        {navStructure.map((item) => (
                                            'dropdown' in item ? (
                                                <div key={item.key}>
                                                    <div className="font-semibold text-gray-900 px-3 py-2">{t.nav[item.key as keyof typeof t.nav]}</div>
                                                    {item.dropdown.map((subItem: { key: string; href: string }) => (
                                                        <Link
                                                            key={subItem.key}
                                                            href={subItem.href}
                                                prefetch={true}
                                                            className="-mx-3 block rounded-lg px-6 py-2 text-sm leading-7 text-gray-700 hover:bg-gray-50"
                                                            onClick={() => setIsMenuOpen(false)}
                                                        >
                                                            {t.nav[subItem.key as keyof typeof t.nav]}
                                                        </Link>
                                                    ))}
                                                </div>
                                            ) : (
                                                <Link
                                                    key={item.key}
                                                    href={item.href}
                                                    prefetch={true}
                                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                                    onClick={() => setIsMenuOpen(false)}
                                                >
                                                    {t.nav[item.key as keyof typeof t.nav]}
                                                </Link>
                                            )
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </header>
        </>
    )
}
