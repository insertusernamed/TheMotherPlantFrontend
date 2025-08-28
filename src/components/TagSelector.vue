<template>
    <div>
        <h2 class="section-title">Step 4: Review Tags</h2>

        <div v-if="plantStore.generationFailed && !plantStore.generatedDescriptionsAndPrice"
            class="p-4 bg-amber-50 border border-amber-200 rounded-lg mb-4">
            <p class="text-amber-800 mb-2">Automatic tag generation failed. You can manually add tags:</p>
        </div>

        <div
            class="p-4 bg-white/70 rounded-lg border border-brand-tan/50 min-h-[6rem] flex items-center justify-between">

            <div class="flex-1">
                <p v-if="!effectiveTags || effectiveTags.length === 0" class="text-brand-text/70 italic">
                    No tags assigned.
                </p>

                <div v-else class="flex flex-wrap gap-3">
                    <span v-for="tag in effectiveTags" :key="tag"
                        class="bg-brand-sage/50 text-brand-forest font-semibold text-sm px-3 py-1.5 rounded-full inline-flex items-center gap-2">
                        <span>{{ tag }}</span>
                        <button @click="removeTag(tag)"
                            class="bg-brand-sage/80 rounded-full w-5 h-5 flex items-center justify-center hover:bg-brand-forest hover:text-white transition-colors"
                            title="Remove tag">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor" stroke-width="3">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </span>
                </div>
            </div>

            <div class="ml-4 flex-shrink-0">
                <TagAdder :selected-tag-names="effectiveTags" @add-tag="addTag" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { usePlantStore } from '@/stores/plantStore';
import TagAdder from '@/components/TagAdder.vue';

const plantStore = usePlantStore();

const effectiveTags = computed(() => {
    if (plantStore.generatedDescriptionsAndPrice?.tags) {
        return plantStore.generatedDescriptionsAndPrice.tags;
    }
    return plantStore.selectedPlantInfo.tags || [];
});

const removeTag = (tagToRemove: string) => {
    plantStore.removeTag(tagToRemove);
};

const addTag = (tagName: string) => {
    plantStore.addTag(tagName);
};
</script>