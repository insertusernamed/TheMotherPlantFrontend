<template>
    <div>
        <p>{{ plantInfo ? '' : 'No plant selected' }}</p>
        <div v-if="plantInfo && plantInfo.results.length" class="results-container">
            <h3>Top Match:</h3>
            <p>
                <strong>Plant:</strong> {{ plantInfo.results[0].species.commonNames[0] }}<br />
                <strong>Certainty:</strong> {{ (plantInfo.results[0].score * 100).toFixed(2) }}%
            </p>
            <button @click="showOthers = !showOthers">
                {{ showOthers ? 'Hide Other Results' : 'Show Other Results' }}
            </button>
            <div v-if="showOthers" class="other-results">
                <h3>Other Results:</h3>
                <ul>
                    <li v-for="(result, index) in plantInfo.results.slice(1)" :key="index">
                        <strong>Score:</strong> {{ (result.score * 100).toFixed(2) }}%<br />
                        <strong>Common Names:</strong> {{ result.species.commonNames.join(', ') }}<br />
                        <strong>Family:</strong> {{ result.species.family }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { usePlantStore } from '@/stores/plantStore';

const plantStore = usePlantStore();
const plantInfo = computed(() => plantStore.selectedPlant);

const showOthers = ref(false);
</script>

<style scoped>
.results-container {
    margin-top: 1rem;
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    background-color: #fdfdfd;
}

.results-container h3 {
    margin-bottom: 0.5rem;
    font-size: 1rem;
}

.results-container p {
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
}

button {
    margin-top: 0.5rem;
    padding: 0.3rem 0.6rem;
    border-radius: 4px;
    font-size: 0.9rem;
    cursor: pointer;
}

.other-results {
    margin-top: 0.5rem;
}

.other-results ul {
    list-style-type: none;
    padding: 0;
}

.other-results li {
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
}
</style>