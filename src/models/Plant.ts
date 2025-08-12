export interface Plant {
    id: number
    scientificName: string
    commonName: string
    description: string
    imageUrl: string
    price: number
    tags: (string | { id: number; name: string })[]
}

export interface PlantResponse {
    results: {
        score: number
        species: {
            scientificName: string | null
            commonNames: string[]
            family: string
        }
    }[]
}

export interface GeneratedResponse {
    descriptions: string[]
    priceSuggestions: Record<string, number>
    tags: string[]
}

export interface OutboundPlant {
    commonName?: string
    image?: File
    description?: string
    price?: number
    tags?: string[]
}

export interface PlantUploadList {
    plants: {
        plant: OutboundPlant
    }[]
}