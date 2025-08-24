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

                            <!-- Admin Controls -->
                            <div v-if="isAdmin" class="mt-8 pt-6 border-t border-brand-tan/30">
                                <h3 class="font-semibold text-brand-heading mb-4">Admin Actions</h3>
                                <div class="flex gap-3">
                                    <button @click="handleDuplicate"
                                        class="flex-1 px-4 py-2 bg-brand-sage hover:bg-brand-sage/80 text-white rounded-lg transition-colors duration-200 flex items-center justify-center gap-2">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z">
                                            </path>
                                        </svg>
                                        Duplicate
                                    </button>
                                    <button @click="handleDelete"
                                        class="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-200 flex items-center justify-center gap-2">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16">
                                            </path>
                                        </svg>
                                        Delete
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
import { computed } from 'vue';
import type { Plant } from '@/models/Plant';
import { useAuthStore } from '@/stores/authStore';
import { usePlantStore } from '@/stores/plantStore';

const authStore = useAuthStore();
const plantStore = usePlantStore();
const isAdmin = computed(() => authStore.user?.role === 'ADMIN');

const emit = defineEmits<{
    close: [];
    'add-tag-filter': [tagId: number];
}>();

const handleDuplicate = async () => {
    await plantStore.duplicatePlant(props.plant.id);
    emit('close');
};

const handleDelete = async () => {
    await plantStore.deletePlant(props.plant.id);
    emit('close');
};

const props = defineProps<{
    plant: Plant;
    isVisible: boolean;
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
