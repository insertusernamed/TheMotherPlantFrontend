import { defineStore } from 'pinia'
import type { PlantResponse, Plant, OutboundPlant, GeneratedResponse } from '@/models/Plant'
import apiClient from '@/utils/apiClient'
import { showToast } from '@/utils/BaseToast'

export const usePlantStore = defineStore('plant', {
    state: () => ({
        plants: [] as Plant[], // plants fetched from our db
        latestPlants: [] as Plant[], // latest plants fetched from our db
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
        isGenerating: false, // loading state for description and price generation
        isUploading: false, // loading state for plant upload
    }),

    getters: {
        isSelectedPlantComplete(): boolean {
            return !!(
                this.selectedPlantInfo.commonName &&
                this.selectedPlantInfo.image &&
                this.selectedPlantInfo.description &&
                this.selectedPlantInfo.price
            )
        }
    },

    actions: {
        async fetchPlants() {
            this.plants = []
            const { data } = await apiClient.get<Plant[]>(import.meta.env.VITE_API_PLANT_LIST)
            this.plants = data
        },

        async fetchLatestPlants(count: number = 3) {
            this.latestPlants = []
            const { data } = await apiClient.get<Plant[]>(`${import.meta.env.VITE_API_GET_LATEST_PLANTS}/${count}`)
            this.latestPlants = data
            console.log('Latest plants fetched:', data)
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

        removeTag(tagToRemove: string) {
            if (this.generatedDescriptionsAndPrice?.tags) {
                const index = this.generatedDescriptionsAndPrice.tags.indexOf(tagToRemove);

                if (index > -1) {
                    this.generatedDescriptionsAndPrice.tags.splice(index, 1);
                }
            }
        },

        addPlantToNewPlants() {
            this.newPlants.push({ ...this.selectedPlantInfo })
            this.clearSelectedPlantInfo()
        },

        removePlantFromNewPlants(index: number) {
            if (index >= 0 && index < this.newPlants.length) {
                this.newPlants.splice(index, 1)
            }
        },

        async uploadPlants() {
            if (this.isUploading) return; // Prevent multiple uploads

            this.isUploading = true;

            const formData = new FormData();

            const plantsWithFiles = this.newPlants.filter(p => {
                return p.image instanceof File ||
                    (p.image instanceof Blob) ||
                    (p.image && 'size' in p.image && 'type' in p.image && 'name' in p.image);
            });

            if (plantsWithFiles.length === 0) {
                console.error("No plants with valid files to upload!");
                showToast("No plants with valid files to upload!", "error");
                this.isUploading = false;
                return;
            }

            const plainPlantData = plantsWithFiles.map(p => ({
                commonName: p.commonName,
                description: p.description,
                price: p.price,
                tags: p.tags,
            }));

            const fileObjects = plantsWithFiles.map(p => p.image as File);

            formData.append('plantsJson', JSON.stringify(plainPlantData));

            for (const file of fileObjects) {
                formData.append('files', file);
            }

            try {
                await apiClient.post(import.meta.env.VITE_API_UPLOAD_PLANTS, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                });

                this.newPlants = [];
                showToast(`Successfully uploaded ${plantsWithFiles.length} plant(s)!`, "success");
            } catch (error) {
                console.error('Failed to upload plants:', error);
                showToast("Failed to upload plants. Please try again.", "error");
            } finally {
                this.isUploading = false;
            }
        },

        async deletePlant(id: number) {
            try {
                await apiClient.delete(`${import.meta.env.VITE_API_PLANT_LIST}/${id}`);
                this.plants = this.plants.filter(plant => plant.id !== id);
                showToast("Plant deleted successfully!", "success");
            } catch (error) {
                console.error('Failed to delete plant:', error);
                showToast("Failed to delete plant. Please try again.", "error");
            }
        },

        async duplicatePlant(id: number) {
            try {
                await apiClient.post(`${import.meta.env.VITE_API_PLANT_LIST}/${id}/duplicate`);
                await this.fetchPlants();
                showToast("Plant duplicated successfully!", "success");
            } catch (error) {
                console.error('Failed to duplicate plant:', error);
                showToast("Failed to duplicate plant. Please try again.", "error");
            }
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
            this.isUploading = false
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