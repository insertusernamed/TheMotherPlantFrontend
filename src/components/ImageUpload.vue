<template>
    <div>
        <input type="file" accept="image/*" @change="handleFileSelect" ref="fileInput" />
        <div v-if="previewUrl">
            <img class="preview-image" :src="previewUrl" alt="Preview" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { usePlantStore } from '@/stores/plantStore'
import Compressor from 'compressorjs'

const plantStore = usePlantStore()
const fileInput = ref<HTMLInputElement>()
const selectedFile = ref<File | null>(null)
const previewUrl = computed(() => plantStore.selectedPlantPreview || '')

const handleFileSelect = (event: Event) => {
    const target = event.target as HTMLInputElement
    const file = target.files?.[0]

    if (file) {
        new Compressor(file, {
            quality: 0.6,
            maxWidth: 1024,
            maxHeight: 1024,
            convertSize: 1000000,
            success(compressedFile: File) {
                selectedFile.value = compressedFile
                plantStore.selectedPlantPreview = URL.createObjectURL(compressedFile)
                plantStore.selectedPlantInfo.image = compressedFile
                console.log('Selected plant info:', plantStore.selectedPlantInfo)
            },
            error(err) {
                console.error('Compression failed:', err)
            },
        })
    }
}

defineExpose({
    selectedFile,
    clearSelection: () => {
        selectedFile.value = null
        plantStore.selectedPlantPreview = ''
        if (fileInput.value) {
            fileInput.value.value = ''
        }
    },
})
</script>

<style scoped>
.preview-image {
    max-width: 90%;
    max-height: 50vh;
    height: auto;
    margin-top: 1rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    display: block;
    margin-left: auto;
    margin-right: auto;
}
</style>
