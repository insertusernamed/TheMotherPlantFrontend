<template>
    <Teleport to="body">
        <Transition name="modal">
            <div v-if="isVisible" class="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" @click="$emit('close')"></div>

                <div
                    class="relative bg-brand-background rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
                    <button @click="$emit('close')"
                        class="absolute top-4 right-4 z-10 w-10 h-10 bg-white/80 hover:bg-white hover:shadow-lg rounded-full flex items-center justify-center transition-all duration-200 group">
                        <svg class="w-6 h-6 text-brand-text group-hover:text-red-500 transition-colors duration-200"
                            fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>

                    <div class="flex flex-col md:flex-row overflow-hidden">
                        <div class="md:w-1/2 h-64 md:h-auto">
                            <img :src="plant.imageUrl" :alt="plant.commonName" class="w-full h-full object-cover" />
                        </div>

                        <div class="md:w-1/2 p-8 overflow-y-auto">
                            <h2 class="font-serif text-3xl font-bold text-brand-heading mb-2">
                                {{ plant.commonName }}
                            </h2>

                            <p class="text-brand-forest italic text-lg mb-4">
                                {{ plant.genus }}
                            </p>

                            <div class="text-2xl font-bold text-brand-brown mb-6">
                                ${{ plant.price }}
                            </div>

                            <div class="mb-6">
                                <h3 class="font-semibold text-brand-heading mb-2">Description</h3>
                                <p class="text-brand-text leading-relaxed">
                                    {{ plant.description }}
                                </p>
                            </div>

                            <div v-if="plant.tags && plant.tags.length > 0" class="mb-6">
                                <h3 class="font-semibold text-brand-heading mb-2">Tags</h3>
                                <p class="text-sm text-brand-text/70 mb-3">Click a tag to filter by it</p>
                                <div class="flex flex-wrap gap-2">
                                    <button v-for="tag in plant.tags" :key="tag.id"
                                        @click="$emit('add-tag-filter', tag.id)"
                                        class="px-3 py-1 bg-brand-sage/20 hover:bg-brand-sage/40 text-brand-forest rounded-full text-sm transition-colors duration-200 cursor-pointer hover:shadow-sm">
                                        {{ tag.name }}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<script setup lang="ts">
import type { Plant } from '@/models/Plant';

defineProps<{
    plant: Plant;
    isVisible: boolean;
}>();

defineEmits<{
    close: [];
    'add-tag-filter': [tagId: number];
}>();
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
    transition: opacity 0.3s ease-out;
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0;
}

.modal-enter-active .relative {
    transition: transform 0.3s ease-out;
}

.modal-leave-active .relative {
    transition: transform 0.3s ease-out;
}

.modal-enter-from .relative {
    transform: scale(0.95);
}

.modal-leave-to .relative {
    transform: scale(0.95);
}
</style>
