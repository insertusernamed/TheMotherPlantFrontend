<template>
    <div class="mb-8">
        <button v-if="!plantStore.identifyResults" @click="plantStore.identifyPlant"
            :disabled="!plantStore.selectedPlantInfo.image || plantStore.isIdentifying"
            class="w-full bg-brand-button text-white font-bold py-3 px-8 rounded-lg shadow-md hover:bg-brand-button-hover transition-all transform hover:-translate-y-1 disabled:bg-brand-tan disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2">
            <span v-if="plantStore.isIdentifying"
                class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            {{ plantStore.isIdentifying ? 'Identifying...' : 'Identify Plant' }}
        </button>

        <div v-if="identifyResults && identifyResults.results.length && !plantStore.selectedPlantInfo.commonName"
            class="mt-8">
            <h3 class="font-serif text-2xl font-bold text-brand-heading mb-6">Select the correct plant:</h3>
            <div class="space-y-4">
                <div v-for="(result, index) in identifyResults.results" :key="index"
                    class="bg-white/70 p-6 border border-brand-tan/50 rounded-lg cursor-pointer transition-all hover:bg-brand-tan/20 hover:border-brand-forest/50 hover:shadow-md"
                    @click="selectPlant(result.species.commonNames[0])">
                    <div class="flex justify-between items-center">
                        <div class="flex flex-col gap-1">
                            <span class="font-serif text-lg font-semibold text-brand-heading block">
                                {{ result.species.commonNames[0] }}
                            </span>
                            <span class="text-brand-forest italic text-sm">
                                {{ result.species.genus }}
                            </span>
                        </div>
                        <span class="bg-brand-sage text-white px-3 py-1 rounded-full text-sm font-medium">
                            {{ (result.score * 100).toFixed(0) }}% match
                        </span>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="plantStore.selectedPlantInfo.commonName"
            class="mt-8 p-6 bg-brand-tan/30 rounded-lg border border-brand-tan/70">
            <div class="mb-4">
                <span class="font-semibold text-brand-heading">Selected:</span>
                <div class="ml-2 inline-flex flex-col">
                    <span class="font-serif text-lg font-semibold text-brand-heading">{{
                        plantStore.selectedPlantInfo.commonName }}</span>
                    <span v-if="selectedGenus" class="text-brand-forest italic text-sm">{{ selectedGenus }}</span>
                </div>
            </div>
            <button @click="resetSelection"
                class="bg-brand-sage text-white font-bold py-2 px-6 rounded-lg shadow-md hover:bg-brand-forest transition-all transform hover:-translate-y-1">
                Choose Different Plant
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { usePlantStore } from '@/stores/plantStore';

const plantStore = usePlantStore();
const identifyResults = computed(() => plantStore.identifyResults);

const selectedGenus = computed(() => {
    if (!identifyResults.value?.results || !plantStore.selectedPlantInfo.commonName) return null;

    const selectedResult = identifyResults.value.results.find(
        result => result.species.commonNames[0] === plantStore.selectedPlantInfo.commonName
    );

    return selectedResult?.species.genus || null;
});

const selectPlant = (commonName: string) => {
    plantStore.setSelectedCommonName(commonName);
};

const resetSelection = () => {
    plantStore.setSelectedCommonName('');
};
</script>
