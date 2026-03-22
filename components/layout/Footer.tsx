'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react'
import { useLanguage } from '@/components/LanguageProvider'

function TikTokIcon({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
        </svg>
    )
}

export function Footer() {
    const { t } = useLanguage()
    const [email, setEmail] = useState('')
    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault()
        if (email.trim()) {
            // TODO: wire to newsletter API
            setEmail('')
        }
    }
    return (
        <footer className="text-white overflow-x-hidden bg-[#3BA944]" aria-labelledby="footer-heading">
            <h2 id="footer-heading" className="sr-only">
                Footer
            </h2>
            <div className="mx-auto max-w-7xl px-6 pt-12 pb-0 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* About Section */}
                    <div className="space-y-5">
                        <div className="flex items-center gap-3">
                            <div className="bg-white rounded-full p-1 shadow-lg flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32">
                                <img src="/ministry-logo.png" alt="MOEWR" className="w-full h-full object-contain" />
                            </div>
                            <div>
                                <h3 className="font-bold text-base text-white">{t.footer.ministryName}</h3>
                                <p className="text-green-300 font-bold text-xs">{t.footer.resourcesEnergy}</p>
                            </div>
                        </div>
                        <p className="text-xs text-white/90 leading-relaxed font-medium">
                            {t.footer.tagline}
                        </p>
                        <div className="flex space-x-3">
                            <Link href="https://www.facebook.com/share/1FcxkGoMLJ/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="bg-amber-400/20 hover:bg-amber-400/40 text-amber-300 hover:text-amber-200 transition-all duration-300 p-3 rounded-full hover:scale-110 hover:shadow-lg hover:shadow-amber-500/30 border border-amber-400/30">
                                <span className="sr-only">Facebook</span>
                                <Facebook className="h-6 w-6" aria-hidden="true" />
                            </Link>
                            <Link href="http://x.com/MoEWR_NEState" target="_blank" rel="noopener noreferrer" className="bg-amber-400/20 hover:bg-amber-400/40 text-amber-300 hover:text-amber-200 transition-all duration-300 p-3 rounded-full hover:scale-110 hover:shadow-lg hover:shadow-amber-500/30 border border-amber-400/30">
                                <span className="sr-only">Twitter</span>
                                <Twitter className="h-6 w-6" aria-hidden="true" />
                            </Link>
                            <Link href="#" className="bg-amber-400/20 hover:bg-amber-400/40 text-amber-300 hover:text-amber-200 transition-all duration-300 p-3 rounded-full hover:scale-110 hover:shadow-lg hover:shadow-amber-500/30 border border-amber-400/30">
                                <span className="sr-only">TikTok</span>
                                <TikTokIcon className="h-6 w-6" />
                            </Link>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-sm font-bold mb-5 text-white">{t.footer.quickLinks}</h3>
                        <ul role="list" className="space-y-2.5">
                            <li>
                                <Link href="/" className="text-xs text-white/90 hover:text-white transition-colors font-bold">
                                    {t.footer.home}
                                </Link>
                            </li>
                            <li>
                                <Link href="/about/ministry" className="text-xs text-white/90 hover:text-white transition-colors font-bold">
                                    {t.footer.aboutUs}
                                </Link>
                            </li>
                            <li>
                                <Link href="/tenders" className="text-xs text-white/90 hover:text-white transition-colors font-bold">
                                    {t.footer.tenders}
                                </Link>
                            </li>
                            <li>
                                <Link href="/careers" className="text-xs text-white/90 hover:text-white transition-colors font-bold">
                                    {t.footer.vacancies}
                                </Link>
                            </li>
                            <li>
                                <Link href="/projects" className="text-xs text-white/90 hover:text-white transition-colors font-bold">
                                    {t.footer.projects}
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-xs text-white/90 hover:text-white transition-colors font-bold">
                                    {t.footer.contactUs}
                                </Link>
                            </li>
                            <li>
                                <Link href="/admin/login" className="text-xs text-white/90 hover:text-white transition-colors font-bold">
                                    {t.footer.staffLogin}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Departments */}
                    <div>
                        <h3 className="text-sm font-bold mb-5 text-white">{t.footer.departments}</h3>
                        <ul role="list" className="space-y-2.5">
                            <li>
                                <Link href="/departments" className="text-xs text-white/90 hover:text-white transition-colors font-bold">
                                    {t.footer.allDepartments}
                                </Link>
                            </li>
                            <li>
                                <Link href="/departments/energy" className="text-xs text-white/90 hover:text-white transition-colors font-bold">
                                    {t.footer.energyDept}
                                </Link>
                            </li>
                            <li>
                                <Link href="/departments/water-resources" className="text-xs text-white/90 hover:text-white transition-colors font-bold">
                                    {t.footer.waterResources}
                                </Link>
                            </li>
                            <li>
                                <Link href="/departments/planning-policy" className="text-xs text-white/90 hover:text-white transition-colors font-bold">
                                    {t.footer.planningPolicy}
                                </Link>
                            </li>
                            <li>
                                <Link href="/departments/administration-finance" className="text-xs text-white/90 hover:text-white transition-colors font-bold">
                                    {t.footer.financeAdmin}
                                </Link>
                            </li>
                            <li>
                                <Link href="/departments/human-resources" className="text-xs text-white/90 hover:text-white transition-colors font-bold">
                                    {t.footer.humanResources}
                                </Link>
                            </li>
                            <li>
                                <Link href="/departments/information-technology" className="text-xs text-white/90 hover:text-white transition-colors font-bold">
                                    {t.footer.ict}
                                </Link>
                            </li>
                            <li>
                                <Link href="/departments/officer" className="text-xs text-white/90 hover:text-white transition-colors font-bold">
                                    {t.footer.officer}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Stay Updated + Contact Info */}
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-sm font-bold mb-2 text-[#B0E0E6] uppercase tracking-wide">{t.footer.stayUpdated}</h3>
                            <p className="text-xs text-white/90 mb-4">{t.footer.emailDescription}</p>
                            <form onSubmit={handleSubscribe} className="flex gap-0 rounded-lg overflow-hidden">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder={t.footer.yourEmail}
                                    className="flex-1 min-w-0 px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-500 bg-white rounded-l-lg focus:outline-none focus:ring-2 focus:ring-white/50"
                                    aria-label={t.footer.yourEmail}
                                />
                                <button
                                    type="submit"
                                    className="px-4 py-2.5 text-sm font-bold text-white bg-[#3B70DC] hover:bg-[#2d5bc7] transition-colors rounded-r-lg whitespace-nowrap"
                                >
                                    {t.footer.subscribe}
                                </button>
                            </form>
                        </div>
                        <div>
                            <h3 className="text-sm font-bold mb-5 text-white">{t.footer.contactInfo}</h3>
                            <ul role="list" className="space-y-3">
                            <li className="flex items-start gap-3 text-xs text-white/90">
                                <MapPin className="h-4 w-4 text-white flex-shrink-0 mt-0.5" />
                                <span className="font-bold">{t.footer.address.split(', ').slice(0, 2).join(', ')}<br />{t.footer.address.split(', ').slice(2).join(', ')}</span>
                            </li>
                            <li className="flex items-center gap-3 text-xs text-white/90">
                                <Phone className="h-4 w-4 text-white flex-shrink-0" />
                                <a href="tel:+252907000000" className="hover:text-white transition-colors font-bold">
                                    +252 90 7000000
                                </a>
                            </li>
                            <li className="flex items-center gap-3 text-xs text-white/90">
                                <Mail className="h-4 w-4 text-white flex-shrink-0" />
                                <a href="mailto:moewr@ne.so" className="hover:text-white transition-colors font-bold">
                                    moewr@ne.so
                                </a>
                            </li>
                        </ul>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Bottom Bar - blends smoothly with gradient above */}
            <div className="mt-10 pt-6 border-t border-white/10 flex flex-col gap-4 px-6 pb-8 lg:px-8 bg-[#3BA944]">
                <div className="mx-auto max-w-7xl w-full flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-white font-bold text-center md:text-left">
                        © {new Date().getFullYear()} {t.footer.copyright}
                    </p>
                    <div className="flex gap-6 justify-center md:justify-end">
                        <Link href="/privacy" className="text-xs text-white/90 hover:text-white transition-colors font-bold">
                            {t.footer.privacyPolicy}
                        </Link>
                        <Link href="/terms" className="text-xs text-white/90 hover:text-white transition-colors font-bold">
                            {t.footer.termsOfService}
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
