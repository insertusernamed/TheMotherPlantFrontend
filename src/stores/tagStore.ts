import { defineStore } from 'pinia'
import apiClient from '@/utils/apiClient'
import type { Tag } from '@/models/Plant'
import { showToast } from '@/utils/BaseToast'

export const useTagStore = defineStore('tag', {
    state: () => ({
        tags: [] as Tag[],
    }),

    getters: {

    },

    actions: {
        async fetchTags() {
            try {
                const response = await apiClient.get<Tag[]>(import.meta.env.VITE_API_TAGS)
                this.tags = response.data
                console.log('Tags fetched:', this.tags)
            } catch (error) {
                showToast('Error fetching tags', 'error')
            }
        }
    }
})