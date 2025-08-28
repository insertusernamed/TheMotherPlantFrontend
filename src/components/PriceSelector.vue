<template>
    <div class="mb-8">
        <h2 class="section-title">Step 3: Choose Price</h2>

        <div v-if="!plantStore.selectedPlantInfo.price && plantStore.generatedDescriptionsAndPrice?.priceSuggestions"
            class="selection">
            <h3 class="font-serif text-2xl font-bold text-brand-heading mb-6">Choose a price:</h3>
            <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div class="bg-white/70 p-4 border border-brand-tan/50 rounded-lg cursor-pointer transition-all hover:bg-brand-tan/20 hover:border-brand-forest/50 hover:shadow-md text-center"
                    @click="selectPrice(plantStore.generatedDescriptionsAndPrice!.priceSuggestions.low)">
                    <div class="flex flex-col gap-1">
                        <span class="text-xl font-bold text-brand-heading">${{
                            plantStore.generatedDescriptionsAndPrice.priceSuggestions.low }}</span>
                        <span class="text-sm text-brand-forest">Budget-friendly</span>
                    </div>
                </div>
                <div class="bg-white/70 p-4 border border-brand-tan/50 rounded-lg cursor-pointer transition-all hover:bg-brand-tan/20 hover:border-brand-forest/50 hover:shadow-md text-center"
                    @click="selectPrice(plantStore.generatedDescriptionsAndPrice!.priceSuggestions.mid)">
                    <div class="flex flex-col gap-1">
                        <span class="text-xl font-bold text-brand-heading">${{
                            plantStore.generatedDescriptionsAndPrice.priceSuggestions.mid }}</span>
                        <span class="text-sm text-brand-forest">Standard</span>
                    </div>
                </div>
                <div class="bg-white/70 p-4 border border-brand-tan/50 rounded-lg cursor-pointer transition-all hover:bg-brand-tan/20 hover:border-brand-forest/50 hover:shadow-md text-center"
                    @click="selectPrice(plantStore.generatedDescriptionsAndPrice!.priceSuggestions.high)">
                    <div class="flex flex-col gap-1">
                        <span class="text-xl font-bold text-brand-heading">${{
                            plantStore.generatedDescriptionsAndPrice.priceSuggestions.high }}</span>
                        <span class="text-sm text-brand-forest">Premium</span>
                    </div>
                </div>
                <div class="bg-white/70 p-4 border-2 border-dashed border-brand-sage rounded-lg cursor-pointer transition-all hover:bg-brand-tan/20 hover:border-brand-forest text-center"
                    @click="toggleManualInput">
                    <div class="flex flex-col gap-1">
                        <span class="text-xl font-bold text-brand-heading">Custom</span>
                        <span class="text-sm text-brand-forest">Set your own</span>
                    </div>
                </div>
            </div>

            <div v-if="showManualInput" class="mt-4 p-4 bg-white/80 rounded-lg border border-brand-sage">
                <label for="manual-price" class="block mb-2 font-semibold text-brand-heading">Enter custom
                    price:</label>
                <div class="flex items-center gap-2">
                    <span class="text-lg font-semibold text-brand-heading">$</span>
                    <input id="manual-price" v-model="manualPrice" type="number" step="0.01" min="0" placeholder="0.00"
                        @keyup.enter="submitManualPrice"
                        class="flex-1 px-3 py-2 border border-brand-tan rounded-lg focus:outline-none focus:border-brand-forest focus:ring-2 focus:ring-brand-forest/20" />
                    <button @click="submitManualPrice" :disabled="!isValidPrice"
                        class="bg-brand-sage text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-brand-forest transition-all transform hover:-translate-y-1 disabled:bg-brand-tan disabled:cursor-not-allowed disabled:transform-none">
                        Set Price
                    </button>
                </div>
            </div>
        </div>

        <div v-else-if="!plantStore.selectedPlantInfo.price && (plantStore.generationFailed || !plantStore.generatedDescriptionsAndPrice?.priceSuggestions)"
            class="space-y-4">
            <div v-if="plantStore.generationFailed && !plantStore.generatedDescriptionsAndPrice"
                class="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <p class="text-amber-800 mb-2">Automatic price generation failed. Please set a price manually:</p>
            </div>

            <div class="p-4 bg-white/80 rounded-lg border border-brand-sage">
                <label for="manual-price" class="block mb-2 font-semibold text-brand-heading">Enter price:</label>
                <div class="flex items-center gap-2">
                    <span class="text-lg font-semibold text-brand-heading">$</span>
                    <input id="manual-price" v-model="manualPrice" type="number" step="0.01" min="0" placeholder="0.00"
                        @keyup.enter="submitManualPrice"
                        class="flex-1 px-3 py-2 border border-brand-tan rounded-lg focus:outline-none focus:border-brand-forest focus:ring-2 focus:ring-brand-forest/20" />
                    <button @click="submitManualPrice" :disabled="!isValidPrice"
                        class="bg-brand-sage text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-brand-forest transition-all transform hover:-translate-y-1 disabled:bg-brand-tan disabled:cursor-not-allowed disabled:transform-none">
                        Set Price
                    </button>
                </div>
            </div>
        </div>

        <div v-if="plantStore.selectedPlantInfo.price"
            class="p-6 bg-brand-tan/30 rounded-lg border border-brand-tan/70">
            <div class="mb-4">
                <span class="font-semibold text-brand-heading">Price:</span>
                <span class="text-xl font-bold text-brand-text ml-2">${{ plantStore.selectedPlantInfo.price }}</span>
            </div>
            <button @click="resetPrice"
                class="bg-brand-sage text-white font-bold py-2 px-6 rounded-lg shadow-md hover:bg-brand-forest transition-all transform hover:-translate-y-1">
                Choose Different Price
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
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

onMounted(() => {
    if (plantStore.generationFailed && !plantStore.generatedDescriptionsAndPrice) {
    }
});
</script>