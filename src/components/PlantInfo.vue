<template>
    <div class="mt-6">
        <PlantIdentification />

        <div class="text-center my-6">
            <button v-if="plantStore.selectedPlantInfo.commonName && !plantStore.isGenerating"
                @click="plantStore.generateDescriptionsAndPrice"
                class="bg-brand-button text-white font-bold py-3 px-8 rounded-lg shadow-md inline-flex items-center justify-center transition-all transform hover:-translate-y-1">
                <span>Generate Descriptions & Price</span>
            </button>
            <button v-else-if="plantStore.isGenerating"
                class="bg-brand-button text-white font-bold py-3 px-8 rounded-lg shadow-md inline-flex items-center justify-center">
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4">
                    </circle>
                    <path class="opacity-75" fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                    </path>
                </svg>
                <span>Generating Details...</span>
            </button>
        </div>

        <div v-if="plantStore.generatedDescriptionsAndPrice" class="mt-6 pt-6 border-t border-brand-tan/50 space-y-8">
            <DescriptionSelector />
            <PriceSelector />
            <TagSelector />
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