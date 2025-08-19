<template>
    <div class="bg-brand-background h-full font-sans text-brand-text">
        <main class="container mx-auto px-6 py-16 md:py-24">

            <section class="text-center mb-12 md:mb-16">
                <h1 class="font-serif text-5xl md:text-6xl font-bold text-brand-heading">Our Collection</h1>
                <p class="mt-4 text-xl text-brand-forest">Find the perfect plant for your space.</p>

                <div class="mt-8 max-w-lg mx-auto">
                    <input type="text" v-model="searchQuery" placeholder="Search by name (e.g., Monstera)"
                        class="w-full px-5 py-3 bg-white/80 border border-brand-tan rounded-full focus:outline-none focus:ring-2 focus:ring-brand-sage transition shadow-sm">
                </div>
            </section>

            <div v-if="loading" class="text-center text-lg text-brand-text/80">
                <p>Loading our beautiful plants...</p>
            </div>

            <div v-else-if="filteredPlants.length === 0" class="text-center text-lg text-brand-text/80">
                <p>No plants found matching your search. Try another name!</p>
            </div>

            <TransitionGroup v-show="!loading && filteredPlants.length > 0" name="plant" tag="div"
                class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                <div v-for="(plant, index) in filteredPlants" :key="plant.id"
                    :style="{ transitionDelay: `${index * 100}ms` }">
                    <PlantCard :common-name="plant.commonName" :scientific-name="plant.genus" :price="plant.price"
                        :description="plant.description" :tags="plant.tags" :image-url="plant.imageUrl"
                        @click="openModal(plant)" class="cursor-pointer hover:scale-101 transition-transform" />
                </div>
            </TransitionGroup>

        </main>

        <PlantModal v-if="selectedPlant" :plant="selectedPlant" :is-visible="isModalVisible" @close="closeModal" />
    </div>
</template>

<script setup lang="ts">
import { onMounted, computed, ref, nextTick } from 'vue';
import { usePlantStore } from '@/stores/plantStore';
import PlantCard from '@/components/PlantCard.vue';
import PlantModal from '@/components/PlantModal.vue';
import type { Plant } from '@/models/Plant';

const plantStore = usePlantStore();
const searchQuery = ref('');
const loading = ref(true);
const selectedPlant = ref<Plant | null>(null);
const isModalVisible = ref(false);

const filteredPlants = computed(() => {
    const query = searchQuery.value.trim().toLowerCase();
    let plants = plantStore.plants;

    if (query) {
        plants = plants.filter(plant =>
            plant.commonName?.toLowerCase().includes(query) ||
            plant.genus?.toLowerCase().includes(query)
        );
    }

    return plants.sort((a, b) => b.id - a.id);
});

onMounted(async () => {
    loading.value = true;
    await plantStore.fetchPlants();
    loading.value = false;
});

const openModal = async (plant: Plant) => {
    selectedPlant.value = plant;
    await nextTick();
    isModalVisible.value = true;
    document.body.style.overflow = 'hidden';
};

const closeModal = () => {
    isModalVisible.value = false;
    document.body.style.overflow = '';
    setTimeout(() => {
        selectedPlant.value = null;
    }, 300);
};
</script>