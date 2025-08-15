<template>
    <div class="text-center p-4 border-2 border-dashed border-brand-sage/50 rounded-xl">
        <input type="file" accept="image/*" @change="handleFileSelect" ref="fileInput" class="hidden"
            id="file-upload" />

        <label for="file-upload" class="cursor-pointer">
            <div v-if="previewUrl" class="mb-4">
                <img class="preview-image" :src="previewUrl" alt="Preview" />
                <p class="mt-2 text-sm text-brand-text/80">Click here to change the image</p>
            </div>
            <div v-else class="flex flex-col items-center justify-center p-8">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-brand-sage" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                <p class="mt-4 text-lg font-semibold text-brand-heading">Upload Plant Image</p>
                <p class="text-sm text-brand-text/80">Click here to select a file</p>
            </div>
        </label>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { usePlantStore } from '@/stores/plantStore'
import Compressor from 'compressorjs'

const plantStore = usePlantStore()
const fileInput = ref<HTMLInputElement | null>(null)
const previewUrl = computed(() => plantStore.selectedPlantPreview || '')

const handleFileSelect = (event: Event) => {
    const target = event.target as HTMLInputElement
    const file = target.files?.[0]

    if (file) {
        new Compressor(file, {
            quality: 0.6,
            maxWidth: 1024,
            maxHeight: 1024,
            success(compressedFile: File) {
                plantStore.selectedPlantPreview = URL.createObjectURL(compressedFile)
                plantStore.selectedPlantInfo.image = compressedFile
            },
            error(err) {
                console.error('Compression failed:', err)
            },
        })
    }
}
</script>

<style scoped>
.preview-image {
    max-height: 400px;
    width: auto;
    margin: 0 auto;
    border-radius: 0.5rem;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}
</style>