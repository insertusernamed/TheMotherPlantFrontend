<template>
    <div class="relative">
        <button @click="showTagSelector = !showTagSelector"
            class="w-8 h-8 bg-brand-sage text-white rounded-full flex items-center justify-center hover:bg-brand-forest transition-colors shadow-md">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
            </svg>
        </button>

        <Transition name="dropdown">
            <div v-if="showTagSelector"
                class="absolute top-full left-0 mt-2 bg-white/95 backdrop-blur-sm border border-brand-tan rounded-lg shadow-lg p-4 z-10 min-w-80">
                <h3 class="font-semibold text-brand-heading mb-3">Add Tags</h3>

                <div v-if="tagStore.tags.length === 0" class="text-center text-brand-text/70 py-4">
                    Loading tags...
                </div>

                <div v-else class="max-h-48 overflow-y-auto">
                    <div class="flex flex-wrap gap-2">
                        <button v-for="tag in availableTags" :key="tag.id" @click="addTag(tag)"
                            class="px-3 py-1 rounded-full text-sm bg-brand-sage/20 text-brand-forest hover:bg-brand-sage/40 transition-colors">
                            {{ tag.name }}
                        </button>
                    </div>

                    <div v-if="availableTags.length === 0" class="text-center text-brand-text/70 py-4">
                        All available tags have been added.
                    </div>
                </div>

                <div class="mt-3 pt-3 border-t border-brand-tan/50 text-center">
                    <button @click="showTagSelector = false"
                        class="text-sm text-brand-forest hover:text-brand-heading underline">
                        Close
                    </button>
                </div>
            </div>
        </Transition>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useTagStore } from '@/stores/tagStore';
import type { Tag } from '@/models/Plant';

const props = defineProps<{
    selectedTagNames: string[]
}>();

const emit = defineEmits<{
    addTag: [tagName: string]
}>();

const tagStore = useTagStore();
const showTagSelector = ref(false);

const availableTags = computed(() => {
    return tagStore.tags.filter(tag => !props.selectedTagNames.includes(tag.name));
});

const addTag = (tag: Tag) => {
    emit('addTag', tag.name);
    if (availableTags.value.length <= 1) {
        showTagSelector.value = false;
    }
};

onMounted(async () => {
    if (tagStore.tags.length === 0) {
        await tagStore.fetchTags();
    }
});
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
