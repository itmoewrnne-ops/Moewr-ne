'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import Image from 'next/image'
import { Lock, AlertCircle } from 'lucide-react'

function AdminLoginForm() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const redirect = searchParams.get('redirect') || '/admin'
    const errorParam = searchParams.get('error')

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        if (errorParam === 'unauthorized') {
            setError('You are not authorized to access this area')
        }
    }, [errorParam])

    const validateForm = () => {
        if (!email || !password) {
            setError('Please enter both email and password')
            return false
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            setError('Please enter a valid email address')
            return false
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters')
            return false
        }

        return true
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')

        if (!validateForm()) {
            return
        }

        setLoading(true)

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            })

            const data = await response.json()

            if (response.ok) {
                // Successful login
                window.location.href = redirect
            } else {
                setError(data.error || 'Login failed')
            }
        } catch (error) {
            setError('An error occurred. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <Card className="w-full max-w-md shadow-2xl border-t-4 border-t-blue-600">
            <CardHeader className="space-y-1 text-center pb-8">
                <div className="flex justify-center mb-4">
                    <div className="relative w-20 h-20 rounded-full overflow-hidden bg-white border-2 border-blue-100 flex items-center justify-center">
                        <Image
                            src="/ministry-logo.png"
                            alt="Ministry of Energy, Water Resources"
                            fill
                            className="object-contain p-1"
                            priority
                        />
                    </div>
                </div>
                <CardTitle className="text-3xl font-bold text-gray-900">
                    Admin Access
                </CardTitle>
                <CardDescription className="text-base">
                    Ministry of Energy, Water Resources
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-5">
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg text-sm flex items-start gap-3">
                            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                            <span>{error}</span>
                        </div>
                    )}

                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium">
                            Email Address
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="h-11"
                            autoComplete="email"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password" className="text-sm font-medium">
                            Password
                        </Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder=""
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="h-11"
                            autoComplete="new-password"
                        />
                    </div>

                    <Button
                        type="submit"
                        className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-base font-medium"
                        disabled={loading}
                    >
                        {loading ? (
                            <span className="flex items-center gap-2">
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                Signing in...
                            </span>
                        ) : (
                            <span className="flex items-center gap-2">
                                <Lock className="w-4 h-4" />
                                Sign In
                            </span>
                        )}
                    </Button>
                </form>

                <div className="mt-6 pt-6 border-t text-center">
                    <p className="text-xs text-gray-500 flex items-center justify-center gap-2">
                        <Lock className="w-3 h-3" />
                        Protected System • Authorized Personnel Only
                    </p>
                </div>
            </CardContent>
        </Card>
    )
}

export default function AdminLogin() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100 px-4 relative">
            <div className="absolute top-4 left-4 md:top-8 md:left-8">
                <a
                    href="/"
                    className="flex items-center text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 h-4 w-4"
                    >
                        <path d="m15 18-6-6 6-6" />
                    </svg>
                    Back to Website
                </a>
            </div>
            <Suspense fallback={
                <Card className="w-full max-w-md shadow-2xl border-t-4 border-t-blue-600">
                    <CardContent className="p-12 flex justify-center">
                        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
                    </CardContent>
                </Card>
            }>
                <AdminLoginForm />
            </Suspense>
        </div>
    )
}
