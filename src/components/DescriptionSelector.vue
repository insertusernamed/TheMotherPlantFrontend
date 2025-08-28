<template>
    <div>
        <h2 class="section-title">Step 2: Choose Description</h2>

        <div v-if="plantStore.selectedPlantInfo.description"
            class="p-4 bg-brand-sage/20 rounded-lg border border-brand-sage flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p class="text-brand-text flex-1">{{ plantStore.selectedPlantInfo.description }}</p>
            <button @click="resetDescription"
                class="bg-brand-brown/80 text-white font-semibold py-2 px-4 rounded-md hover:bg-brand-brown transition-colors flex-shrink-0">
                Change
            </button>
        </div>

        <div v-else class="space-y-4">
            <div v-if="plantStore.generatedDescriptionsAndPrice?.descriptions"
                v-for="(desc, index) in plantStore.generatedDescriptionsAndPrice.descriptions" :key="index"
                @click="selectDescription(desc)"
                class="p-4 bg-white/70 rounded-lg border border-brand-tan/50 cursor-pointer hover:border-brand-sage hover:bg-white transition-all">
                {{ desc }}
            </div>

            <div v-if="plantStore.generationFailed && !plantStore.generatedDescriptionsAndPrice"
                class="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <p class="text-amber-800 mb-2">Automatic description generation failed. Please write your own
                    description:</p>
            </div>

            <div class="bg-white/70 rounded-lg border border-brand-tan/50 overflow-hidden">
                <div @click="toggleManualInput"
                    class="p-4 cursor-pointer hover:bg-brand-tan/20 transition-all flex items-center justify-between">
                    <span class="text-brand-heading font-medium">Write your own description</span>
                    <span class="text-brand-forest text-sm">{{ showManualInput ? 'Click to collapse' : 'Click to expand'
                        }}</span>
                </div>

                <div v-if="showManualInput" class="border-t border-brand-tan/50 p-4 bg-white/50">
                    <textarea v-model="manualDescription" placeholder="Write a custom description for your plant..."
                        rows="4"
                        class="w-full px-3 py-2 border border-brand-tan rounded-lg focus:outline-none focus:border-brand-forest focus:ring-2 focus:ring-brand-forest/20 resize-none"></textarea>
                    <div class="mt-3 flex items-center justify-end gap-3">
                        <button @click="toggleManualInput"
                            class="px-4 py-2 text-brand-text hover:text-brand-heading transition-colors">Cancel</button>
                        <button @click="submitManualDescription" :disabled="!isValidDescription"
                            class="bg-brand-sage text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-brand-forest transition-all transform hover:-translate-y-1 disabled:bg-brand-tan disabled:cursor-not-allowed disabled:transform-none">
                            Set Description
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
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
    manualDescription.value = plantStore.selectedPlantInfo.description || '';
    showManualInput.value = true;
    plantStore.setSelectedDescription('');
};

onMounted(() => {
    if (plantStore.generationFailed && !plantStore.generatedDescriptionsAndPrice) {
        showManualInput.value = true;
    }
});
</script>