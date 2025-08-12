<template>
    <div class="plant-info">
        <PlantIdentification />

        <button @click="plantStore.generateDescriptionsAndPrice"
            :disabled="!plantStore.selectedPlantInfo.commonName || plantStore.isGenerating"
            class="btn btn-primary generate-btn">
            <span v-if="plantStore.isGenerating" class="loading-spinner"></span>
            {{ plantStore.isGenerating ? 'Generating...' : 'Generate Descriptions and Price' }}
        </button>

        <div v-if="plantStore.generatedDescriptionsAndPrice" class="generated-content">
            <DescriptionSelector v-if="plantStore.generatedDescriptionsAndPrice" />
            <PriceSelector v-if="plantStore.generatedDescriptionsAndPrice" />
            <TagSelector v-if="plantStore.generatedDescriptionsAndPrice" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { usePlantStore } from '@/stores/plantStore';
import PlantIdentification from '@/components/PlantIdentification.vue';
import DescriptionSelector from '@/components/DescriptionSelector.vue';
import PriceSelector from '@/components/PriceSelector.vue';
import TagSelector from '@/components/TagSelector.vue';

const plantStore = usePlantStore();
</script>

<style scoped>
.plant-info {
    max-width: 800px;
    margin: 0 auto;
    padding: 1.5rem;
}

.generate-btn {
    margin: 2rem 0;
}

.generated-content {
    margin-top: 2rem;
}

.btn {
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    font-weight: 500;
    transition: all 0.2s ease;
    cursor: pointer;
    border: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    gap: 0.5rem;
}

.btn-primary {
    background: #3b82f6;
    color: white;
}

.btn-primary:hover {
    background: #2563eb;
}

.btn-primary:disabled {
    background: #9ca3af;
    cursor: not-allowed;
}

.btn-secondary {
    background: #f3f4f6;
    color: #374151;
    border: 1px solid #d1d5db;
}

.btn-secondary:hover {
    background: #e5e7eb;
}

h3 {
    margin: 0 0 1rem 0;
    font-size: 1.125rem;
    font-weight: 600;
    color: #1f2937;
}

.loading-spinner {
    width: 16px;
    height: 16px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-top: 2px solid white;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>