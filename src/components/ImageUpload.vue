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

const plantStore = usePlantStore()
const fileInput = ref<HTMLInputElement>()
const selectedFile = ref<File | null>(null)
const previewUrl = ref<string>('')

const handleFileSelect = (event: Event) => {
    const target = event.target as HTMLInputElement
    const file = target.files?.[0]

    if (file) {
        selectedFile.value = file
        previewUrl.value = URL.createObjectURL(file)
        plantStore.identifyPlant(file)
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
    }
})
</script>