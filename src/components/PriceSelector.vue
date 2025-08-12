<template>
    <div class="price-selector">
        <div v-if="!plantStore.selectedPlantInfo.price && plantStore.generatedDescriptionsAndPrice?.priceSuggestions"
            class="selection">
            <h3>Choose a price:</h3>
            <div class="options">
                <div class="option price-option"
                    @click="selectPrice(plantStore.generatedDescriptionsAndPrice!.priceSuggestions.low)">
                    <div class="price-content">
                        <span class="price">${{ plantStore.generatedDescriptionsAndPrice.priceSuggestions.low }}</span>
                        <span class="tier">Budget-friendly</span>
                    </div>
                </div>
                <div class="option price-option"
                    @click="selectPrice(plantStore.generatedDescriptionsAndPrice!.priceSuggestions.mid)">
                    <div class="price-content">
                        <span class="price">${{ plantStore.generatedDescriptionsAndPrice.priceSuggestions.mid }}</span>
                        <span class="tier">Standard</span>
                    </div>
                </div>
                <div class="option price-option"
                    @click="selectPrice(plantStore.generatedDescriptionsAndPrice!.priceSuggestions.high)">
                    <div class="price-content">
                        <span class="price">${{ plantStore.generatedDescriptionsAndPrice.priceSuggestions.high }}</span>
                        <span class="tier">Premium</span>
                    </div>
                </div>
                <div class="option price-option custom-option" @click="toggleManualInput">
                    <div class="price-content">
                        <span class="price">Custom</span>
                        <span class="tier">Set your own</span>
                    </div>
                </div>
            </div>

            <div v-if="showManualInput" class="manual-input">
                <label for="manual-price">Enter custom price:</label>
                <div class="input-group">
                    <span class="currency">$</span>
                    <input id="manual-price" v-model="manualPrice" type="number" step="0.01" min="0" placeholder="0.00"
                        @keyup.enter="submitManualPrice" />
                    <button @click="submitManualPrice" class="btn btn-primary" :disabled="!isValidPrice">
                        Set Price
                    </button>
                </div>
            </div>
        </div>

        <div v-if="plantStore.selectedPlantInfo.price" class="selected">
            <div class="selected-info">
                <span class="label">Price:</span>
                <span class="value">${{ plantStore.selectedPlantInfo.price }}</span>
            </div>
            <button @click="resetPrice" class="btn btn-secondary">Choose Different Price</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { usePlantStore } from '@/stores/plantStore';

const plantStore = usePlantStore();
const showManualInput = ref(false);
const manualPrice = ref('');

const isValidPrice = computed(() => {
    const price = parseFloat(manualPrice.value);
    return !isNaN(price) && price > 0;
});

const selectPrice = (price: number) => {
    plantStore.setSelectedPrice(price);
    resetManualInput();
};

const toggleManualInput = () => {
    showManualInput.value = !showManualInput.value;
    if (!showManualInput.value) {
        manualPrice.value = '';
    }
};

const submitManualPrice = () => {
    if (isValidPrice.value) {
        const price = parseFloat(manualPrice.value);
        plantStore.setSelectedPrice(price);
        resetManualInput();
    }
};

const resetManualInput = () => {
    showManualInput.value = false;
    manualPrice.value = '';
};

const resetPrice = () => {
    plantStore.setSelectedPrice(undefined);
    resetManualInput();
};
</script>

<style scoped>
.price-selector {
    margin-bottom: 2rem;
}

.options {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 0.75rem;
    margin-top: 1rem;
}

.price-option {
    padding: 1rem;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;
    background: #ffffff;
    text-align: center;
}

.price-option:hover {
    border-color: #3b82f6;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.price-content {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
}

.price {
    font-size: 1.25rem;
    font-weight: 600;
    color: #1f2937;
}

.tier {
    font-size: 0.875rem;
    color: #6b7280;
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
    margin-right: 0.5rem;
}

.value {
    font-size: 1.125rem;
    font-weight: 600;
    color: #1f2937;
}

.custom-option {
    border: 2px dashed #d1d5db;
    background: #fafafa;
}

.custom-option:hover {
    border-color: #3b82f6;
    background: #ffffff;
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
    align-items: center;
    gap: 0.5rem;
}

.currency {
    font-size: 1.125rem;
    font-weight: 500;
    color: #374151;
}

.input-group input {
    flex: 1;
    padding: 0.5rem;
    border: 1px solid #d1d5db;
    border-radius: 4px;
    font-size: 1rem;
}

.input-group input:focus {
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
