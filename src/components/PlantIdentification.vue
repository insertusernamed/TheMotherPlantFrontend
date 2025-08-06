<template>
    <div class="plant-identification">
        <button v-if="!plantStore.identifyResults" @click="plantStore.identifyPlant"
            :disabled="!plantStore.selectedPlantInfo.image || plantStore.isIdentifying" class="btn btn-primary">
            <span v-if="plantStore.isIdentifying" class="loading-spinner"></span>
            {{ plantStore.isIdentifying ? 'Identifying...' : 'Identify Plant' }}
        </button>

        <div v-if="identifyResults && identifyResults.results.length && !plantStore.selectedPlantInfo.commonName"
            class="results">
            <h3>Select the correct plant:</h3>
            <div class="options">
                <div v-for="(result, index) in identifyResults.results" :key="index" class="option"
                    @click="selectPlant(result.species.commonNames[0])">
                    <div class="option-content">
                        <span class="plant-name">{{ result.species.commonNames[0] }}</span>
                        <span class="confidence">{{ (result.score * 100).toFixed(0) }}% match</span>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="plantStore.selectedPlantInfo.commonName" class="selected">
            <div class="selected-info">
                <span class="label">Selected:</span>
                <span class="value">{{ plantStore.selectedPlantInfo.commonName }}</span>
            </div>
            <button @click="resetSelection" class="btn btn-secondary">Choose Different Plant</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { usePlantStore } from '@/stores/plantStore';

const plantStore = usePlantStore();
const identifyResults = computed(() => plantStore.identifyResults);

const selectPlant = (commonName: string) => {
    plantStore.setSelectedCommonName(commonName);
};

const resetSelection = () => {
    plantStore.setSelectedCommonName('');
};
</script>

<style scoped>
.plant-identification {
    margin-bottom: 2rem;
}

.results {
    margin-top: 1.5rem;
}

.options {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    margin-top: 1rem;
}

.option {
    padding: 1rem;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;
    background: #ffffff;
}

.option:hover {
    border-color: #3b82f6;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.option-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.plant-name {
    font-weight: 500;
    color: #1f2937;
}

.confidence {
    font-size: 0.875rem;
    color: #6b7280;
}

.selected {
    margin-top: 1.5rem;
    padding: 1rem;
    background: #f9fafb;
    border-radius: 8px;
    border: 1px solid #e5e7eb;
}

.selected-info {
    margin-bottom: 0.75rem;
}

.label {
    font-weight: 500;
    color: #374151;
    margin-right: 0.5rem;
}

.value {
    color: #1f2937;
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
    background: #3b82f6;
    color: white;
}

.btn:hover {
    background: #2563eb;
}

.btn:disabled {
    background: #9ca3af;
    cursor: not-allowed;
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
