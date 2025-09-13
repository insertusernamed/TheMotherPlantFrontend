<template>
    <div class="bg-brand-background font-sans text-brand-text">
        <main class="container mx-auto px-6 py-16 md:py-24">

            <section class="grid md:grid-cols-2 gap-12 items-center">
                <div class="text-center md:text-left">
                    <h1 class="font-serif text-5xl md:text-6xl font-bold text-brand-heading leading-tight">
                        Nurturing Greenery,
                    </h1>
                    <p class="text-2xl mt-4 text-brand-forest">One Plant at a Time.</p>
                    <p class="mt-6 text-lg max-w-prose">
                        Welcome to our little corner of the internet. We're a family-run shop dedicated to sharing the
                        joy of plants, from our home to yours.
                    </p>
                    <a href="/shop"
                        class="mt-8 inline-block bg-brand-button text-white font-bold py-3 px-8 rounded-lg shadow-md hover:bg-brand-button-hover transition-all transform hover:-translate-y-1">
                        Explore Our Plants
                    </a>
                </div>
                <div class="hidden md:block w-full h-96 bg-brand-sage rounded-lg shadow-xl bg-cover bg-center"
                    :style="{ backgroundImage: `url(${heroImageUrl})` }">
                </div>
            </section>

            <section class="mt-24 md:mt-32">
                <div class="text-center">
                    <h2 class="font-serif text-4xl font-bold text-brand-heading">Our Newest Additions</h2>
                    <p class="mt-2 text-lg">Fresh from the garden, ready for a new home.</p>
                </div>

                <TransitionGroup name="plant" tag="div"
                    class="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    <div v-for="(plant, index) in newAdditions" :key="plant.id"
                        :style="{ transitionDelay: `${index * 100}ms` }">
                        <PlantCard :common-name="plant.commonName" :price="plant.price" :image-url="plant.imageUrl" />
                    </div>
                </TransitionGroup>

            </section>

            <section class="mt-24 md:mt-32 bg-brand-tan/40 rounded-lg p-8 md:p-12">
                <div class="grid md:grid-cols-3 gap-8 items-center">
                    <div class="md:col-span-2 text-center md:text-left">
                        <h2 class="font-serif text-4xl font-bold text-brand-heading">A Note From Our Founder</h2>
                        <p class="mt-4 text-lg max-w-prose">
                            Hi there! I've been growing plants for years, and what started as a hobby has grown into
                            something I'm passionate about sharing. I know how overwhelming it can feel to choose the
                            right plant, so I created this space to help you find the perfect green companion for your
                            home. Every plant here has been lovingly cared for, and I'm here to help you succeed with
                            yours too!
                        </p>
                    </div>
                    <div class="w-48 h-48 mx-auto bg-brand-sage rounded-full shadow-lg bg-cover bg-center"
                        :style="{ backgroundImage: `url(${founderImageUrl})` }">
                    </div>
                </div>
            </section>
        </main>
    </div>
</template>

<script setup lang="ts">
import { computed, onBeforeMount } from 'vue'
import { usePlantStore } from '@/stores/plantStore'
import PlantCard from '@/components/PlantCard.vue'
import heroImageUrl from '@/assets/hero.webp'
import founderImageUrl from '@/assets/founder.jpg'

const plantStore = usePlantStore()
const newAdditions = computed(() => plantStore.latestPlants)

onBeforeMount(() => {
    plantStore.fetchLatestPlants()
})
</script>