<template>
    <div class="tag-selector">
        <h3>Tags:</h3>
        <div class="tags">
            <span v-for="(tag, index) in tags" :key="index" class="tag">{{ tag }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { usePlantStore } from '@/stores/plantStore';

const plantStore = usePlantStore();
const tags = computed(() => plantStore.generatedDescriptionsAndPrice?.tags || []);
</script>

<style scoped>
.tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.tag {
    background-color: #e5e7eb;
    color: #374151;
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 14px;
}

.tag-suggestions {
    margin-top: 16px;
}

.tag-suggestions h4 {
    margin: 0 0 8px 0;
    font-size: 16px;
}

.tag.suggestion {
    background-color: #ddd6fe;
    color: #5b21b6;
    border: 1px dashed #8b5cf6;
}
</style>