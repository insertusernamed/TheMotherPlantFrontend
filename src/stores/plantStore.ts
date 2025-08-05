import { defineStore } from 'pinia'
import type { PlantResponse, Plant } from '@/models/Plant'
import apiClient from '@/utils/apiClient'

export const usePlantStore = defineStore('plant', {
    state: () => ({
        plants: [] as Plant[],
        selectedPlant: null as PlantResponse | null

    }),

    getters: {
    },

    actions: {
        setPlants(plants: Plant[]) {
            this.plants = plants
        },

        setSelectedPlant(plant: PlantResponse | null) {
            this.selectedPlant = plant
        },

        clearSelectedPlant() {
            this.selectedPlant = null
        },

        async identifyPlant(file: File) {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('organ', 'flower');

            const { data } = await apiClient.post<PlantResponse>(import.meta.env.VITE_API_PLANT_IDENTIFY, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('Identified plant:', data);
            data.results = data.results.slice(0, 3);
            this.selectedPlant = data;
        },
    }
})