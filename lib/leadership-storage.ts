// Simple in-memory storage for leadership data
// This will persist in the browser's localStorage

export type LeadershipMember = {
    id: string
    name: string
    position: string
    image: string
    bio?: string
    email?: string
    phone?: string
    order: number
    active: boolean
    createdAt: string
}

const STORAGE_KEY = 'mow_leadership_data'

// Default leadership data
const defaultLeadership: LeadershipMember[] = [
    {
        id: '1',
        name: 'Hon. Ahmed Mohamed',
        position: 'Minister',
        image: 'https://ui-avatars.com/api/?name=Ahmed+Mohamed&size=400&background=1e40af&color=fff',
        bio: 'Leading the ministry with over 20 years of experience in public service and resource management.',
        email: 'minister@mow.gov',
        phone: '+252 61 234 5678',
        order: 1,
        active: true,
        createdAt: new Date().toISOString(),
    },
    {
        id: '2',
        name: 'Dr. Fatima Hassan',
        position: 'Deputy Minister',
        image: 'https://ui-avatars.com/api/?name=Fatima+Hassan&size=400&background=059669&color=fff',
        bio: 'Expert in water resource management with a PhD in Environmental Engineering.',
        email: 'deputy.minister@mow.gov',
        phone: '+252 61 234 5679',
        order: 2,
        active: true,
        createdAt: new Date().toISOString(),
    },
    {
        id: '3',
        name: 'Eng. Omar Ali',
        position: 'Permanent Secretary',
        image: 'https://ui-avatars.com/api/?name=Omar+Ali&size=400&background=dc2626&color=fff',
        bio: 'Experienced civil engineer specializing in infrastructure development and energy systems.',
        email: 'ps@mow.gov',
        phone: '+252 61 234 5680',
        order: 3,
        active: true,
        createdAt: new Date().toISOString(),
    },
]

export function getLeadershipData(): LeadershipMember[] {
    if (typeof window === 'undefined') {
        return defaultLeadership
    }

    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
        try {
            return JSON.parse(stored)
        } catch {
            return defaultLeadership
        }
    }

    // Initialize with default data
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultLeadership))
    return defaultLeadership
}

export function saveLeadershipData(data: LeadershipMember[]) {
    if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
        // Trigger storage event for cross-tab sync
        window.dispatchEvent(new Event('leadership-updated'))
    }
}

export function addLeadershipMember(member: Omit<LeadershipMember, 'id' | 'createdAt' | 'active' | 'order'>) {
    const data = getLeadershipData()
    const newMember: LeadershipMember = {
        ...member,
        id: Date.now().toString(),
        order: data.length + 1,
        active: true,
        createdAt: new Date().toISOString(),
    }
    data.push(newMember)
    saveLeadershipData(data)
    return newMember
}

export function updateLeadershipMember(id: string, updates: Partial<LeadershipMember>) {
    const data = getLeadershipData()
    const index = data.findIndex(m => m.id === id)
    if (index !== -1) {
        data[index] = { ...data[index], ...updates }
        saveLeadershipData(data)
        return data[index]
    }
    return null
}

export function deleteLeadershipMember(id: string) {
    const data = getLeadershipData()
    const filtered = data.filter(m => m.id !== id)
    saveLeadershipData(filtered)
    return true
}
