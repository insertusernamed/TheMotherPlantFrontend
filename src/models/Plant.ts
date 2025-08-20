export interface Plant {
    id: number
    genus: string
    commonName: string
    description: string
    imageUrl: string
    price: number
    tags: Tag[]
}

export interface Tag {
    id: number;
    name: string;
    description?: string;
}

export interface PlantResponse {
    results: {
        score: number
        species: {
            genus: string | null
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
    genus?: string
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