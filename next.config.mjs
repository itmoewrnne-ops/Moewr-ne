/** @type {import('next').NextConfig} */
const nextConfig = {
    // Security Headers
    async headers() {
        return [
            {
                source: '/:path*',
                headers: [
                    // Content Security Policy
                    {
                        key: 'Content-Security-Policy',
                        value: [
                            "default-src 'self'",
                            "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com",
                            "style-src 'self' 'unsafe-inline'",
                            "img-src 'self' data: https: blob:",
                            "font-src 'self' data:",
                            "connect-src 'self' https://va.vercel-scripts.com https://vitals.vercel-insights.com",
                            "frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com",
                            "frame-ancestors 'none'",
                        ].join('; ')
                    },
                    // Prevent clickjacking
                    {
                        key: 'X-Frame-Options',
                        value: 'DENY'
                    },
                    // Prevent MIME type sniffing
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff'
                    },
                    // XSS Protection
                    {
                        key: 'X-XSS-Protection',
                        value: '1; mode=block'
                    },
                    // Referrer Policy
                    {
                        key: 'Referrer-Policy',
                        value: 'strict-origin-when-cross-origin'
                    },
                    // Permissions Policy
                    {
                        key: 'Permissions-Policy',
                        value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()'
                    },
                    // HSTS (HTTP Strict Transport Security)
                    {
                        key: 'Strict-Transport-Security',
                        value: 'max-age=31536000; includeSubDomains'
                    }
                ]
            }
        ]
    },

    // Performance Optimizations
    compress: true,

    // Image Optimization - enable for faster loading
    images: {
        unoptimized: false,
        formats: ['image/webp', 'image/avif'],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
                pathname: '**',
            },
            {
                protocol: 'https',
                hostname: 'upload.wikimedia.org',
                pathname: '**',
            },
        ],
    },

    // Production optimizations
    swcMinify: true,
    reactStrictMode: true,

    // Experimental optimizations
    experimental: {
        optimizePackageImports: ['lucide-react', '@prisma/client'],
    },

    // Output configuration
    // Temporarily disable standalone mode to use standard next start
    // output: 'standalone',
};

export default nextConfig;
