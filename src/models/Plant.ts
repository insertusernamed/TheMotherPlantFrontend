export interface Plant {
    id: number
    scientificName: string
    commonName: string
    description: string
    imageUrl: string
    price: number
    tags: string[]
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