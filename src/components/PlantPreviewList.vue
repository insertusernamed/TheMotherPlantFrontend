<template>
    <div v-if="plantStore.newPlants.length > 0" class="mt-8 pt-6 border-t border-brand-tan/50">
        <h3 class="font-serif text-xl font-bold text-brand-heading mb-4 text-center">
            Plants Ready for Upload ({{ plantStore.newPlants.length }})
        </h3>

        <div class="space-y-3">
            <div v-for="(plant, index) in plantStore.newPlants" :key="index"
                class="bg-white/70 rounded-lg shadow-sm p-3 border border-brand-tan/30 flex items-center gap-4">

                <div class="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                    <img v-if="getImageUrl(plant.image)" :src="getImageUrl(plant.image)!" :alt="plant.commonName"
                        class="w-full h-full object-cover">
                    <div v-else class="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                        <span>No Image</span>
                    </div>
                </div>

                <div class="flex-1 min-w-0">
                    <div class="flex items-start justify-between gap-4">
                        <div class="flex-1 min-w-0">
                            <h4 class="font-serif text-base font-semibold text-brand-heading truncate">
                                {{ plant.commonName }}
                            </h4>
                            <p class="text-brand-text text-sm line-clamp-2 mt-1">
                                {{ plant.description }}
                            </p>
                        </div>

                        <div class="flex-shrink-0 text-right">
                            <p class="text-brand-forest font-bold text-lg">
                                ${{ plant.price?.toFixed(2) || '0.00' }}
                            </p>
                        </div>
                    </div>

                    <div v-if="plant.tags && plant.tags.length > 0" class="flex flex-wrap gap-1 mt-2">
                        <span v-for="tag in plant.tags.slice(0, 4)" :key="tag"
                            class="inline-block bg-brand-sage/20 text-brand-forest text-xs px-2 py-1 rounded-full">
                            {{ tag }}
                        </span>
                        <span v-if="plant.tags.length > 4" class="inline-block text-brand-forest text-xs px-2 py-1">
                            +{{ plant.tags.length - 4 }}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { usePlantStore } from '@/stores/plantStore';

const plantStore = usePlantStore();

const getImageUrl = (image: File | undefined): string | undefined => {
    if (!image || !(image instanceof File)) return undefined;
    return URL.createObjectURL(image);
};
</script>
