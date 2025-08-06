<template>
    <div class="description-selector">
        <div v-if="!plantStore.selectedPlantInfo.description && plantStore.generatedDescriptionsAndPrice?.descriptions"
            class="selection">
            <h3>Choose a description:</h3>
            <div class="options">
                <div v-for="(desc, index) in plantStore.generatedDescriptionsAndPrice.descriptions" :key="index"
                    class="option description-option" @click="selectDescription(desc)">
                    {{ desc }}
                </div>
            </div>
        </div>

        <div v-if="plantStore.selectedPlantInfo.description" class="selected">
            <div class="selected-info">
                <span class="label">Description:</span>
                <p class="description-text">{{ plantStore.selectedPlantInfo.description }}</p>
            </div>
            <button @click="resetDescription" class="btn btn-secondary">Choose Different Description</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { usePlantStore } from '@/stores/plantStore';

const plantStore = usePlantStore();

const selectDescription = (description: string) => {
    plantStore.setSelectedDescription(description);
};

const resetDescription = () => {
    plantStore.setSelectedDescription('');
};
</script>

<style scoped>
.description-selector {
    margin-bottom: 2rem;
}

.options {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    margin-top: 1rem;
}

.description-option {
    padding: 1rem;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;
    background: #ffffff;
    line-height: 1.5;
    color: #374151;
}

.description-option:hover {
    border-color: #3b82f6;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.selected {
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
    display: block;
    margin-bottom: 0.5rem;
}

.description-text {
    margin: 0;
    line-height: 1.5;
    color: #1f2937;
}
</style>
