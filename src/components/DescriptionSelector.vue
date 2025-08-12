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

                <div class="option description-option custom-option" @click="toggleManualInput">
                    Write your own description
                </div>
            </div>

            <div v-if="showManualInput" class="manual-input">
                <label for="manual-description">Enter custom description:</label>
                <div class="input-group">
                    <textarea id="manual-description" v-model="manualDescription"
                        placeholder="Write a custom description for your plant..." rows="4"
                        @keyup.ctrl.enter="submitManualDescription"></textarea>
                    <button @click="submitManualDescription" class="btn btn-primary" :disabled="!isValidDescription">
                        Set Description
                    </button>
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
import { ref, computed } from 'vue';
import { usePlantStore } from '@/stores/plantStore';

const plantStore = usePlantStore();
const showManualInput = ref(false);
const manualDescription = ref('');

const isValidDescription = computed(() => {
    return manualDescription.value.trim().length > 0;
});

const selectDescription = (description: string) => {
    plantStore.setSelectedDescription(description);
    resetManualInput();
};

const toggleManualInput = () => {
    showManualInput.value = !showManualInput.value;
    if (!showManualInput.value) {
        manualDescription.value = '';
    }
};

const submitManualDescription = () => {
    if (isValidDescription.value) {
        plantStore.setSelectedDescription(manualDescription.value.trim());
        resetManualInput();
    }
};

const resetManualInput = () => {
    showManualInput.value = false;
    manualDescription.value = '';
};

const resetDescription = () => {
    plantStore.setSelectedDescription('');
    resetManualInput();
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

.custom-option {
    border: 2px dashed #d1d5db;
    background: #fafafa;
    text-align: center;
    font-style: italic;
    color: #6b7280;
}

.custom-option:hover {
    border-color: #3b82f6;
    background: #ffffff;
    color: #374151;
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

.manual-input {
    margin-top: 1rem;
    padding: 1rem;
    background: #f9fafb;
    border-radius: 8px;
    border: 1px solid #e5e7eb;
}

.manual-input label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: #374151;
}

.input-group {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}

.input-group textarea {
    padding: 0.75rem;
    border: 1px solid #d1d5db;
    border-radius: 4px;
    font-size: 1rem;
    font-family: inherit;
    resize: vertical;
    min-height: 100px;
}

.input-group textarea:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.btn {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 500;
    transition: all 0.2s ease;
    align-self: flex-start;
}

.btn-primary {
    background: #3b82f6;
    color: white;
}

.btn-primary:hover:not(:disabled) {
    background: #2563eb;
}

.btn-primary:disabled {
    background: #9ca3af;
    cursor: not-allowed;
}

.btn-secondary {
    background: #6b7280;
    color: white;
}

.btn-secondary:hover {
    background: #4b5563;
}
</style>
