<template>
    <div v-if="plantStore.newPlants.length > 0" class="mt-8 pt-6 border-t border-brand-tan/50">
        <h3 class="font-serif text-xl font-bold text-brand-heading mb-4 text-center">
            Plants Ready for Upload ({{ plantStore.newPlants.length }})
        </h3>

        <div class="space-y-3">
            <div v-for="(plant, index) in plantStore.newPlants" :key="index"
                class="bg-white/70 rounded-lg shadow-sm p-3 border border-brand-tan/30 flex items-center gap-4 group">

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

                        <div class="flex items-center gap-3">
                            <div class="text-right">
                                <p class="text-brand-forest font-bold text-lg">
                                    ${{ plant.price?.toFixed(2) || '0.00' }}
                                </p>
                            </div>

                            <button @click="showDeleteConfirmation(index)"
                                class="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full"
                                title="Delete plant">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16">
                                    </path>
                                </svg>
                            </button>
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

        <div v-if="plantToDelete !== null" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            @click="cancelDelete">
            <div class="bg-white rounded-lg shadow-xl p-6 max-w-sm mx-4" @click.stop>
                <div class="flex items-center gap-3 mb-4">
                    <div class="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                        <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z">
                            </path>
                        </svg>
                    </div>
                    <div>
                        <h3 class="font-serif text-lg font-semibold text-brand-heading">Delete Plant</h3>
                        <p class="text-brand-text text-sm">This action cannot be undone.</p>
                    </div>
                </div>

                <p class="text-brand-text mb-6">
                    Are you sure you want to remove <strong>{{ plantStore.newPlants[plantToDelete]?.commonName
                    }}</strong> from the upload list?
                </p>

                <div class="flex gap-3 justify-end">
                    <button @click="cancelDelete"
                        class="px-4 py-2 text-brand-text border border-brand-tan rounded-lg hover:bg-brand-tan/10 transition-colors">
                        Cancel
                    </button>
                    <button @click="confirmDelete"
                        class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                        Delete
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { usePlantStore } from '@/stores/plantStore';

const plantStore = usePlantStore();
const plantToDelete = ref<number | null>(null);

const getImageUrl = (image: File | undefined): string | undefined => {
    if (!image) return undefined;
    return URL.createObjectURL(image);
};

const showDeleteConfirmation = (index: number) => {
    plantToDelete.value = index;
};

const confirmDelete = () => {
    if (plantToDelete.value !== null) {
        plantStore.removePlantFromNewPlants(plantToDelete.value);
        plantToDelete.value = null;
    }
};

const cancelDelete = () => {
    plantToDelete.value = null;
};
</script>
