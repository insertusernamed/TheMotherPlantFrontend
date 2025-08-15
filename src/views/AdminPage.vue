<template>
    <div class="bg-brand-background min-h-full font-sans text-brand-text p-4 sm:p-6 md:p-8">
        <main class="container mx-auto">

            <section class="text-center mb-8">
                <h1 class="font-serif text-5xl font-bold text-brand-heading">Admin Panel</h1>
                <p class="mt-2 text-xl text-brand-forest">Add a new plant to the collection</p>
            </section>

            <div class="max-w-4xl mx-auto bg-white/50 rounded-xl shadow-2xl p-6 sm:p-8">
                <ImageUpload />
                <PlantInfo />

                <div
                    class="mt-8 pt-6 border-t border-brand-tan/50 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button @click="plantStore.addPlantToNewPlants" :disabled="!plantStore.isSelectedPlantComplete"
                        class="w-full sm:w-auto bg-brand-forest text-white font-bold py-3 px-8 rounded-lg shadow-md transition-all transform hover:-translate-y-1 disabled:bg-brand-sage disabled:cursor-not-allowed disabled:transform-none">
                        Save and Add Another Plant
                    </button>
                    <button @click="plantStore.uploadPlants" :disabled="plantStore.newPlants.length === 0"
                        class="w-full sm:w-auto bg-brand-button text-white font-bold py-3 px-8 rounded-lg shadow-md transition-all transform hover:-translate-y-1 disabled:bg-brand-tan disabled:cursor-not-allowed disabled:transform-none">
                        Upload All Saved Plants ({{ plantStore.newPlants.length }})
                    </button>
                </div>
            </div>

        </main>
    </div>
</template>

<script setup lang="ts">
import ImageUpload from '@/components/ImageUpload.vue';
import PlantInfo from '@/components/PlantInfo.vue';
import { usePlantStore } from '@/stores/plantStore';

const plantStore = usePlantStore();
</script>