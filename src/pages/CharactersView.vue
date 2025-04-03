<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { QSpinnerTail } from 'quasar'

const router = useRouter()

const characters = ref([])
const userCharacters = ref([])


const loading = ref(false)
const search = ref('')
const statusFilter = ref('')

const form = ref({
    name: '',
    species: '',
    status: '',
    image: ''
})

const dialog = ref(false)
const characterToDelete = ref(null)

const fetchCharacters = async () => {
    loading.value = true
    try {
        const res = await fetch('https://rickandmortyapi.com/api/character')
        const data = await res.json()
        characters.value = data.results
    } catch (err) {
        console.error('Error fetching characters:', err)
    } finally {
        loading.value = false
    }
}

onMounted(fetchCharacters)

const allCharacters = computed(() => {
    const all = [...userCharacters.value, ...characters.value]
    return all.filter((char) => {
        const matchesSearch = char.name.toLowerCase().includes(search.value.toLowerCase())
        const matchesStatus = statusFilter.value ? char.status === statusFilter.value : true
        return matchesSearch && matchesStatus
    })
})


function addCharacter() {
    if (!form.value.name || !form.value.species || !form.value.status || !form.value.image) return

    userCharacters.value.push({ ...form.value, id: Date.now(), isCustom: true })
    form.value = { name: '', species: '', status: '', image: '' }
}

function goToDetail(id) {
    router.push({ name: 'character-detail', params: { id } })
}

function confirmDelete(char) {
    characterToDelete.value = char
    dialog.value = true
}

function deleteCharacter() {
    userCharacters.value = userCharacters.value.filter(c => c.id !== characterToDelete.value.id)
    dialog.value = false
    characterToDelete.value = null
}
</script>

<template>
    <q-page class="q-pa-md  bg-orange-2">
        <div class="q-mb-xl">
            <div class="text-h4 text-primary text-center q-mb-md">Rick & Morty Explorer</div>
            <div class="row q-col-gutter-md items-center  justify-center">
                <div class="col-xs-12 col-md-5">
                    <q-input filled color="orange-10" v-model="search" label="Search character" debounce="300" />
                </div>
                <div class="col-xs-12 col-md-3">
                    <q-select filled color="green-9" v-model="statusFilter" label=" Filter by status"
                        :options="['Alive', 'Dead', 'unknown']" clearable />
                </div>
            </div>
        </div>

        <q-card flat bordered class="q-pa-lg  q-mb-xl bg-white shadow-2 bg-white">
            <div class="text-h6 text-indigo-10 q-mb-md "> Add your own character!!</div>
            <q-form @submit.prevent="addCharacter" class="q-gutter-md ">
                <div class="row q-col-gutter-md">

                    <div class="col-xs-12 col-md-3 text-white">
                        <q-input filled v-model="form.name" label="Name" />
                    </div>
                    <div class="col-xs-12 col-md-3">
                        <q-input filled v-model="form.species" label="Species" />
                    </div>

                    <div class="col-xs-12 col-md-3">
                        <q-select filled v-model="form.status" label="Status" :options="['Alive', 'Dead', 'unknown']" />
                    </div>
                    <div class="col-xs-12 col-md-3">
                        <q-input filled v-model="form.image" label="Image URL" />
                    </div>
                </div>

                <q-btn label="ADD CHARACTER!" color="info" class="q-mt-md" type="submit" />
            </q-form>
        </q-card>

        <div v-if="loading" class="q-pa-lg flex flex-center">
            <q-spinner-tail size="50px" color="primary" />
        </div>


        <div class="row q-col-gutter-lg">
            <div v-for="char in allCharacters" :key="char.id" class="col-xs-12 col-sm-6 col-md-4 col-lg-3">
                <q-card class="bg-brown-3 shadow-3">
                    <q-img :src="char.image" :alt="char.name" @click="goToDetail(char.id)" class="cursor-pointer"
                        style="height: 250px;" />
                    <q-card-section @click="goToDetail(char.id)" class="cursor-pointer">
                        <div class="
                        text-h6 
                        text-weight-bold 
                        text-blue-10">
                            {{ char.name }}
                        </div>
                        <div class="text-caption text-grey-10">{{ char.species }} - {{ char.status }}</div>
                    </q-card-section>
                    <q-card-actions align="right" v-if="char.isCustom">
                        <q-btn flat color="red" icon="delete" @click.stop="confirmDelete(char)" />
                    </q-card-actions>
                </q-card>
            </div>
        </div>

        <q-dialog v-model="dialog">
            <q-card>
                <q-card-section class="text-h6">
                    Are you sure you want to delete <strong>
                        {{ characterToDelete?.name }}
                    </strong>?
                </q-card-section>

                <q-card-actions align="right">
                    <q-btn flat label="Cancel" color="primary" v-close-popup />
                    <q-btn flat label="Delete" color="negative" @click="deleteCharacter" />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </q-page>
</template>
