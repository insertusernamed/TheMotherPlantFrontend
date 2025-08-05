<template>
    <div>
        <input type="file" accept="image/*" @change="handleFileSelect" ref="fileInput" />
        <div v-if="previewUrl">
            <img :src="previewUrl" alt="Preview" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { usePlantStore } from '@/stores/plantStore'
import Compressor from 'compressorjs'

const plantStore = usePlantStore()
const fileInput = ref<HTMLInputElement>()
const selectedFile = ref<File | null>(null)
const previewUrl = ref<string>('')

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
                previewUrl.value = URL.createObjectURL(compressedFile)
                plantStore.identifyPlant(compressedFile)

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
        previewUrl.value = ''
        if (fileInput.value) {
            fileInput.value.value = ''
        }
    },
})
</script>
