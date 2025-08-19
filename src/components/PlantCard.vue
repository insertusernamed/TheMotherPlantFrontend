<template>
    <div class="bg-white/60 rounded-lg shadow-lg overflow-hidden group transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col"
        @click="$emit('click')">

        <div class="h-80 bg-cover bg-center" :style="{ backgroundImage: `url(${imageUrl})` }"></div>

        <div class="p-5 text-center flex-1 flex flex-col justify-between space-y-4">

            <div>
                <h3 class="text-2xl font-bold font-serif text-brand-heading truncate">{{ commonName }}</h3>
                <p class="text-md text-brand-text/70 italic mt-1 truncate">{{ scientificName }}</p>
                <p class="mt-4 text-2xl font-semibold text-brand-forest">${{ price }}</p>
            </div>

            <div v-if="description || (tags && tags.length > 0)" class="text-left pt-4 border-t border-brand-tan/50">
                <p v-if="description" class="text-sm text-brand-text/90 mb-4">
                    {{ description.length > 100 ? description.substring(0, 100) + '...' : description }}
                </p>

                <div v-if="tags && tags.length > 0" class="flex flex-wrap gap-2 justify-center">
                    <span v-for="tag in tags" :key="tag.id"
                        class="bg-brand-sage/50 text-brand-forest font-semibold text-xs px-3 py-1 rounded-full">
                        {{ tag.name }}
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Tag } from '@/models/Plant';

defineProps({
    commonName: { type: String, required: true },
    scientificName: { type: String, required: false },
    price: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    description: { type: String, default: null },
    tags: { type: Array as () => Tag[], default: null }
});
</script>