<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const character = ref(null)
const loading = ref(false)

const fetchCharacter = async () => {
    loading.value = true
    try {
        const res = await fetch(`https://rickandmortyapi.com/api/character/${route.params.id}`)
        const data = await res.json()
        if (data && data.image) {
            character.value = data
        } else {
            console.error('Character image is missing.')
        }
    } catch (err) {
        console.error('Error loading character detail:', err)
    } finally {
        loading.value = false
    }
}

onMounted(fetchCharacter)

function goBack() {
    router.back()
}
</script>

<template>
    <q-page class="q-pa-md bg-brown-8">
        <q-btn label="← Back" flat color="primary" @click="goBack" class="q-mb-md bg-red-10 text-white" />

        <div v-if="loading" class="q-pa-lg flex flex-center">
            <q-spinner-dots color="primary" size="40px" />
        </div>

        <q-card v-else-if="character && character.image" class="q-pa-md bg-white shadow-2">
            <div class="row q-col-gutter-xl items-center">
                <div class="col-12 col-md-4 flex flex-center">
                    <q-avatar size="200px" class="shadow-4">
                        <img :src="character.image" :alt="character.name" />
                    </q-avatar>
                </div>

                <div class="col-12 col-md-8">
                    <q-card-section>
                        <div class="text-h5 text-indigo-10">{{ character.name }}</div>
                        <q-separator class="q-my-sm" />
                        <div class="q-mb-sm"><strong>Status:</strong> {{ character.status }}</div>
                        <div class="q-mb-sm"><strong>Species:</strong> {{ character.species }}</div>
                        <div class="q-mb-sm"><strong>Gender:</strong> {{ character.gender }}</div>
                        <div class="q-mb-sm"><strong>Origin:</strong> {{ character.origin?.name }}</div>
                        <div class="q-mb-sm"><strong>Location:</strong> {{ character.location?.name }}</div>
                    </q-card-section>
                </div>
            </div>
        </q-card>

        <div v-else>
            <p class="text-center text-grey-8">Sorry, character details are missing.</p>
        </div>
    </q-page>
</template>
