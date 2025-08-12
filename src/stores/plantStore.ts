import { defineStore } from 'pinia'
import type { PlantResponse, Plant, OutboundPlant, GeneratedResponse } from '@/models/Plant'
import apiClient from '@/utils/apiClient'

export const usePlantStore = defineStore('plant', {
    state: () => ({
        plants: [] as Plant[], // plants fetched from our db
        newPlants: [] as OutboundPlant[], // plants to be added
        selectedPlantInfo: { // current plant being added
            commonName: '',
            image: undefined,
            description: '',
            price: undefined,
            tags: []
        } as OutboundPlant,
        selectedPlantPreview: null as string | null, // preview url for the current plant
        identifyResults: null as PlantResponse | null, // results from plant identification API
        generatedDescriptionsAndPrice: null as GeneratedResponse | null, // results from description and price generation API
        isIdentifying: false, // loading state for plant identification
        isGenerating: false // loading state for description and price generation
    }),

    getters: {
    },

    actions: {
        async fetchPlants() {
            const { data } = await apiClient.get<Plant[]>(import.meta.env.VITE_API_PLANT_LIST)
            this.plants = data
        },

        async identifyPlant() {
            if (!this.selectedPlantInfo.image) {
                console.error('No image selected for identification');
                return;
            }

            this.isIdentifying = true;
            try {
                const formData = new FormData();
                formData.append('file', this.selectedPlantInfo.image as File);
                formData.append('organ', 'flower');

                const { data } = await apiClient.post<PlantResponse>(import.meta.env.VITE_API_PLANT_IDENTIFY, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                console.log('Identified plant:', data);
                data.results = data.results.slice(0, 3);
                this.identifyResults = data;
            } finally {
                this.isIdentifying = false;
            }
        },

        async generateDescriptionsAndPrice() {
            if (!this.identifyResults || !this.selectedPlantInfo.commonName) {
                console.error('Unable to generate descriptions and price: missing identify results or common name');
                return;
            }

            this.isGenerating = true;
            try {
                const formData = new FormData();
                formData.append('commonName', this.selectedPlantInfo.commonName);

                const { data } = await apiClient.post<GeneratedResponse>(import.meta.env.VITE_API_PLANT_DESCRIPTION_PRICE, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                console.log('Generated description and prices', data);
                this.generatedDescriptionsAndPrice = data;
                this.selectedPlantInfo.tags = data.tags;
            } finally {
                this.isGenerating = false;
            }
        },

        addPlantToNewPlants() {
            this.newPlants.push({ ...this.selectedPlantInfo })
            this.clearSelectedPlantInfo()
        },

        clearSelectedPlantInfo() {
            this.selectedPlantInfo = {
                commonName: '',
                image: undefined,
                description: '',
                price: undefined,
                tags: []
            }

            this.selectedPlantPreview = null
            this.identifyResults = null
            this.generatedDescriptionsAndPrice = null
            this.isIdentifying = false
            this.isGenerating = false
        },

        setSelectedCommonName(commonName: string | undefined) {
            this.selectedPlantInfo.commonName = commonName
        },

        setSelectedDescription(description: string | undefined) {
            this.selectedPlantInfo.description = description
        },

        setSelectedPrice(price: number | undefined) {
            this.selectedPlantInfo.price = price
        },
    }
})