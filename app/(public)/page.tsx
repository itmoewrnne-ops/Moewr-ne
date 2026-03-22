import { Suspense } from "react";
import dynamicImport from "next/dynamic";
import { HeroSlider } from "@/components/HeroSlider";
import { WelcomeSection } from "@/components/WelcomeSection";
import { VisionMissionCards } from "@/components/VisionMissionCards";
import { AnnouncementsSection } from "@/components/AnnouncementsSection";
import { StatsSection } from "@/components/StatsSection";
import { LeadershipSection } from "@/components/LeadershipSection";
import {
    StatsSkeleton,
    EventsSkeleton,
    LeadershipSkeleton,
    AnnouncementsSkeleton,
    PartnersSkeleton
} from "@/components/skeletons";

// Lazy load below-fold components for faster initial page load
const FeaturedVideos = dynamicImport(() => import("@/components/FeaturedVideos").then((m) => m.FeaturedVideos), {
    ssr: true,
    loading: () => <div className="py-20 bg-gray-50 animate-pulse" aria-hidden />
});
const ProjectsTabs = dynamicImport(() => import("@/components/ProjectsTabs").then((m) => m.ProjectsTabs), {
    ssr: true,
    loading: () => <div className="py-16 bg-gray-50 text-center text-gray-500">Loading Projects...</div>
});
const UpcomingEvents = dynamicImport(() => import("@/components/UpcomingEvents"), {
    ssr: true,
    loading: () => <EventsSkeleton />
});
const PartnersSection = dynamicImport(() => import("@/components/PartnersSection").then((m) => m.PartnersSection), {
    ssr: true,
    loading: () => <PartnersSkeleton />
});

// Dynamic to ensure locale changes (from cookie) are reflected
export const dynamic = 'force-dynamic'

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen">
            <HeroSlider />
            
            {/* Vision, Mission & Value Cards */}
            <VisionMissionCards />
            
            <WelcomeSection />

            {/* Statistics/Achievements Section */}
            <Suspense fallback={<StatsSkeleton />}>
                <StatsSection />
            </Suspense>

            {/* Projects */}
            <Suspense fallback={<div className="py-16 bg-gray-50 text-center">Loading Projects...</div>}>
                <ProjectsTabs />
            </Suspense>

            {/* Leadership Section – always visible */}
            <Suspense fallback={<LeadershipSkeleton />}>
                <LeadershipSection />
            </Suspense>

            {/* Featured Videos Section */}
            <FeaturedVideos />

            {/* Announcements Section - Our Recent News Articles */}
            <Suspense fallback={<AnnouncementsSkeleton />}>
                <AnnouncementsSection />
            </Suspense>

            {/* Upcoming Events */}
            <Suspense fallback={<EventsSkeleton />}>
                <UpcomingEvents limit={3} />
            </Suspense>

            {/* Development Partners Section */}
            <Suspense fallback={<PartnersSkeleton />}>
                <PartnersSection />
            </Suspense>
        </div>
    );
}
