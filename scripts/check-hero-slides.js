// Check hero slides in database
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
    datasources: {
        db: {
            url: process.env.DATABASE_URL,
        },
    },
});

async function checkHeroSlides() {
    try {
        console.log('🔍 Checking hero slides...');
        console.log('DATABASE_URL:', process.env.DATABASE_URL);
        
        // Get all slides
        const allSlides = await prisma.heroSlide.findMany();
        console.log(`\n📊 Total hero slides: ${allSlides.length}`);
        
        if (allSlides.length > 0) {
            console.log('\n📋 All slides:');
            allSlides.forEach((slide, index) => {
                console.log(`\n  Slide ${index + 1}:`);
                console.log(`    ID: ${slide.id}`);
                console.log(`    Title: ${slide.title}`);
                console.log(`    Active: ${slide.active}`);
                console.log(`    Order: ${slide.order}`);
                console.log(`    Image: ${slide.image}`);
            });
        }
        
        // Get active slides only
        const activeSlides = await prisma.heroSlide.findMany({
            where: { active: true },
            orderBy: { order: 'asc' },
        });
        console.log(`\n✅ Active hero slides: ${activeSlides.length}`);
        
        if (activeSlides.length === 0 && allSlides.length > 0) {
            console.log('\n⚠️  WARNING: Slides exist but none are active!');
            console.log('   Go to Admin → Hero Slider and mark slides as active.');
        }
        
    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        await prisma.$disconnect();
    }
}

checkHeroSlides();

