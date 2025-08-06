<template>
    <p>Welcome to the Shop Page!</p>
    <div class="shop-container">
        <h1>Available Plants</h1>
        <div class="plant-list">
            <div v-for="plant in plants" :key="plant.id" class="plant-item">
                <img class="preview_image" :src="plant.imageUrl" alt="Plant Image">
                <h2>{{ plant.commonName }}</h2>
                <p>{{ plant.description }}</p>
                <p>Price: ${{ plant.price }}</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { usePlantStore } from '@/stores/plantStore';

const plantStore = usePlantStore();
const plants = computed(() => plantStore.plants);

onMounted(() => {
    plantStore.fetchPlants();
});
</script>

<style scoped>
.preview_image {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 8px;
}
</style>