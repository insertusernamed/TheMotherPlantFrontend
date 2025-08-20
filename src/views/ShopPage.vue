<template>
    <div class="bg-brand-background h-full font-sans text-brand-text">
        <main class="container mx-auto px-6 py-16 md:py-24">

            <section class="text-center mb-12 md:mb-16">
                <h1 class="font-serif text-5xl md:text-6xl font-bold text-brand-heading">Our Collection</h1>
                <p class="mt-4 text-xl text-brand-forest">Find the perfect plant for your space.</p>

                <div class="mt-8 max-w-4xl mx-auto">
                    <div class="flex flex-col sm:flex-row gap-4">
                        <div class="flex-1">
                            <input type="text" v-model="searchQuery" placeholder="Search by name (e.g., Monstera)"
                                class="w-full px-5 py-3 bg-white/80 border border-brand-tan rounded-full focus:outline-none focus:ring-2 focus:ring-brand-sage transition shadow-sm">
                        </div>

                        <div class="relative sm:w-80">
                            <button @click="showTagSelector = !showTagSelector"
                                class="w-full px-5 py-3 bg-white/80 border border-brand-tan rounded-full focus:outline-none focus:ring-2 focus:ring-brand-sage transition shadow-sm text-left flex items-center justify-between">
                                <span class="text-brand-text/70 truncate">
                                    {{ selectedTagIds.size > 0 ? `${selectedTagIds.size} tag${selectedTagIds.size > 1 ?
                                        's' : ''} selected` : 'Browse by tags...' }}
                                </span>
                                <svg class="w-5 h-5 text-brand-text/70 transition-transform flex-shrink-0"
                                    :class="{ 'rotate-180': showTagSelector }" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </button>

                            <Transition name="dropdown">
                                <div v-if="showTagSelector"
                                    class="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-sm border border-brand-tan rounded-lg shadow-lg p-4 z-10">
                                    <div class="flex flex-wrap gap-2 max-h-48 overflow-y-auto">
                                        <VTooltip v-for="tag in sortedTags" :key="tag.id">
                                            <button @click="toggleTagFilter(tag.id)" :class="[
                                                'px-3 py-1 rounded-full text-sm transition-all duration-200 text-center',
                                                selectedTagIds.has(tag.id)
                                                    ? 'bg-brand-sage text-white shadow-sm'
                                                    : 'bg-brand-sage/20 text-brand-forest hover:bg-brand-sage/40'
                                            ]">
                                                {{ tag.name }}
                                            </button>

                                            <template #popper>
                                                {{ tag.description }}
                                            </template>
                                        </VTooltip>
                                    </div>
                                    <div class="mt-3 pt-3 border-t border-brand-tan/50 text-center">
                                        <button @click="clearAllTagFilters"
                                            class="text-sm text-brand-forest hover:text-brand-heading underline">
                                            Clear all
                                        </button>
                                    </div>
                                </div>
                            </Transition>
                        </div>
                    </div>
                </div>

                <div v-if="selectedTagIds.size > 0" class="mt-6 max-w-4xl mx-auto">
                    <div class="bg-white/60 rounded-lg p-4">
                        <h3 class="text-lg font-semibold text-brand-heading mb-3">Filtering by tags:</h3>
                        <div class="flex flex-wrap gap-2 justify-center">
                            <span v-for="tagId in Array.from(selectedTagIds)" :key="tagId"
                                class="inline-flex items-center px-3 py-1 bg-brand-sage text-white rounded-full text-sm">
                                {{ getTagNameById(tagId) }}
                                <button @click="removeTagFilter(tagId)"
                                    class="ml-2 w-4 h-4 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center">
                                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M6 18L18 6M6 6l12 12">
                                        </path>
                                    </svg>
                                </button>
                            </span>
                        </div>
                        <button @click="clearAllTagFilters"
                            class="mt-3 text-sm text-brand-forest hover:text-brand-heading underline">
                            Clear all filters
                        </button>
                    </div>
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

        <PlantModal v-if="selectedPlant" :plant="selectedPlant" :is-visible="isModalVisible" @close="closeModal"
            @add-tag-filter="addTagFilter" />
    </div>
</template>

<script setup lang="ts">
import { onMounted, computed, ref, nextTick } from 'vue';
import { usePlantStore } from '@/stores/plantStore';
import { useTagStore } from '@/stores/tagStore';
import PlantCard from '@/components/PlantCard.vue';
import PlantModal from '@/components/PlantModal.vue';
import type { Plant } from '@/models/Plant';

const plantStore = usePlantStore();
const tagStore = useTagStore();
const searchQuery = ref('');
const loading = ref(true);
const selectedPlant = ref<Plant | null>(null);
const isModalVisible = ref(false);
const selectedTagIds = ref(new Set<number>());
const showTagSelector = ref(false);

const filteredPlants = computed(() => {
    const query = searchQuery.value.trim().toLowerCase();
    let plants = plantStore.plants;

    // Filter by search query
    if (query) {
        plants = plants.filter(plant =>
            plant.commonName?.toLowerCase().includes(query) ||
            plant.genus?.toLowerCase().includes(query)
        );
    }

    // Filter by selected tags (plant must have ALL selected tags)
    if (selectedTagIds.value.size > 0) {
        plants = plants.filter(plant => {
            if (!plant.tags || plant.tags.length === 0) return false;
            const plantTagIds = new Set(plant.tags.map(tag => tag.id));
            return Array.from(selectedTagIds.value).every(tagId => plantTagIds.has(tagId));
        });
    }

    return plants.sort((a, b) => b.id - a.id);
});

const sortedTags = computed(() => {
    return [...tagStore.tags].sort((a, b) => a.name.localeCompare(b.name));
});

onMounted(async () => {
    loading.value = true;
    await plantStore.fetchPlants();
    await tagStore.fetchTags();
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

const addTagFilter = (tagId: number) => {
    selectedTagIds.value.add(tagId);
};

const removeTagFilter = (tagId: number) => {
    selectedTagIds.value.delete(tagId);
};

const clearAllTagFilters = () => {
    selectedTagIds.value.clear();
    showTagSelector.value = false;
};

const toggleTagFilter = (tagId: number) => {
    if (selectedTagIds.value.has(tagId)) {
        selectedTagIds.value.delete(tagId);
    } else {
        selectedTagIds.value.add(tagId);
    }
};

const getTagNameById = (tagId: number) => {
    const tag = tagStore.tags.find(t => t.id === tagId);
    return tag ? tag.name : 'Unknown';
};
</script>

<style scoped>
.dropdown-enter-active,
.dropdown-leave-active {
    transition: all 0.2s ease-out;
}

.dropdown-enter-from,
.dropdown-leave-to {
    opacity: 0;
    transform: translateY(-10px);
}
</style>