<template>
    <div class="admin-page">
        <h1 class="admin-title">Admin Page</h1>

        <div class="admin-content">
            <ImageUpload />
            <PlantInfo />

            <div class="action-buttons">
                <button @click="plantStore.addPlantToNewPlants" :disabled="!plantStore.isSelectedPlantComplete"
                    class="btn btn-primary">
                    Finish Plant
                </button>
                <button @click="plantStore.uploadPlants" :disabled="plantStore.newPlants.length === 0"
                    class="btn btn-secondary">
                    Upload All Plants
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import ImageUpload from '@/components/ImageUpload.vue';
import PlantInfo from '@/components/PlantInfo.vue';
import { usePlantStore } from '@/stores/plantStore';

const plantStore = usePlantStore();
</script>

<style scoped>
.admin-page {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
}

.admin-title {
    font-size: 2rem;
    font-weight: 300;
    color: #333;
    margin-bottom: 2rem;
    text-align: center;
}

.admin-content {
    background: #fff;
    border-radius: 8px;
    padding: 2rem;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.action-buttons {
    display: flex;
    gap: 1rem;
    margin-top: 2rem;
    justify-content: center;
}

.btn {
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 4px;
    font-size: 0.9rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
}

.btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.btn-primary {
    background-color: #4CAF50;
    color: white;
}

.btn-primary:hover:not(:disabled) {
    background-color: #45a049;
}

.btn-secondary {
    background-color: #2196F3;
    color: white;
}

.btn-secondary:hover:not(:disabled) {
    background-color: #1976D2;
}
</style>