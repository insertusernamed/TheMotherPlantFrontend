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
import { usePlantStore } from '@/stores/plantStore';

const plantStore = usePlantStore();

const selectPrice = (price: number) => {
    plantStore.setSelectedPrice(price);
};

const resetPrice = () => {
    plantStore.setSelectedPrice(undefined);
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
</style>
