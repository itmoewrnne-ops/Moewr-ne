// Shared leadership data
// In a real application, this would come from a database
// For now, we'll use a JSON file that both admin and frontend can access

export type LeadershipMember = {
    id: number
    name: string
    position: string
    image: string
    bio: string
    email?: string
    phone?: string
}

// This will be updated when you upload photos in the admin panel
export const leadershipData: LeadershipMember[] = [
    {
        id: 1,
        name: 'Hon. Ahmed Mohamed',
        position: 'Minister',
        image: 'https://ui-avatars.com/api/?name=Ahmed+Mohamed&size=400&background=1e40af&color=fff',
        bio: 'Leading the ministry with over 20 years of experience in public service and resource management.',
        email: 'minister@mow.gov',
        phone: '+252 61 234 5678',
    },
    {
        id: 2,
        name: 'Dr. Fatima Hassan',
        position: 'Deputy Minister',
        image: 'https://ui-avatars.com/api/?name=Fatima+Hassan&size=400&background=059669&color=fff',
        bio: 'Expert in water resource management with a PhD in Environmental Engineering.',
        email: 'deputy.minister@mow.gov',
        phone: '+252 61 234 5679',
    },
    {
        id: 3,
        name: 'Eng. Omar Ali',
        position: 'Permanent Secretary',
        image: 'https://ui-avatars.com/api/?name=Omar+Ali&size=400&background=dc2626&color=fff',
        bio: 'Experienced civil engineer specializing in infrastructure development and energy systems.',
        email: 'ps@mow.gov',
        phone: '+252 61 234 5680',
    },
]

export const departmentHeads = [
    {
        id: 1,
        name: 'Dr. Amina Yusuf',
        position: 'Director - Water Resources Department',
        email: 'a.yusuf@mow.gov',
    },
    {
        id: 2,
        name: 'Eng. Ibrahim Farah',
        position: 'Director - Energy Department',
        email: 'i.farah@mow.gov',
    },
    {
        id: 3,
        name: 'Dr. Khadija Abdi',
        position: 'Director - Natural Resources Department',
        email: 'k.abdi@mow.gov',
    },
    {
        id: 4,
        name: 'Mr. Hassan Omar',
        position: 'Director - Planning & Policy Department',
        email: 'h.omar@mow.gov',
    },
]
