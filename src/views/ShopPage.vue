<template>
    <div class="shop-container">
        <h1>Available Plants</h1>
        <div class="plant-grid">
            <div v-for="plant in plants" :key="plant.id" class="plant-card">
                <img class="plant-image" :src="plant.imageUrl" :alt="plant.commonName">
                <div class="plant-info">
                    <h2 class="plant-name">{{ plant.commonName }}</h2>
                    <p class="plant-description">{{ plant.description }}</p>
                    <div class="tags" v-if="plant.tags && plant.tags.length > 0">
                        <span v-for="tag in plant.tags" :key="typeof tag === 'string' ? tag : tag.id" class="tag">
                            {{ typeof tag === 'string' ? tag : tag.name }}
                        </span>
                    </div>
                    <div class="plant-footer">
                        <span class="price">${{ plant.price }}</span>
                    </div>
                </div>
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
.shop-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
}

h1 {
    text-align: center;
    margin-bottom: 2rem;
    font-size: 2.5rem;
    color: #1f2937;
    font-weight: 300;
}

.plant-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
}

@media (max-width: 900px) {
    .plant-grid {
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    }
}

@media (max-width: 600px) {
    .plant-grid {
        grid-template-columns: 1fr;
    }
}

.plant-card {
    background: white;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    margin-bottom: 2rem;
}

.plant-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.plant-image {
    width: 100%;
    height: 250px;
    object-fit: cover;
}

.plant-info {
    padding: 1.5rem;
}

.plant-name {
    margin: 0 0 0.75rem 0;
    font-size: 1.25rem;
    font-weight: 600;
    color: #1f2937;
}

.plant-description {
    margin: 0 0 1rem 0;
    color: #6b7280;
    line-height: 1.5;
    font-size: 0.95rem;
}

.tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
}

.tag {
    background-color: #f3f4f6;
    color: #374151;
    padding: 0.25rem 0.75rem;
    border-radius: 16px;
    font-size: 0.75rem;
    font-weight: 500;
}

.plant-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.price {
    font-size: 1.5rem;
    font-weight: 700;
    color: #059669;
}

.add-to-cart {
    background-color: #059669;
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s ease;
}

.add-to-cart:hover {
    background-color: #047857;
}
</style>