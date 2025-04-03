<script setup lang="ts">
import { ref } from 'vue'

const tab = ref('app')
</script>

<template>
    <q-page class="q-pa-md">
        <q-card class="q-pa-md">
            <q-tabs v-model="tab" dense class="text-primary" align="left" narrow-indicator active-color="primary"
                indicator-color="primary">
                <q-tab name="app" label="Sonre la App" />
                <q-tab name="quasar" label="Componentes Quasar" />
                <q-tab name="api" label="Información API" />
            </q-tabs>

            <q-separator />


            <q-tab-panels v-model="tab" animated>
                <q-tab-panel name="app">
                    <div class="text-h6">Rick & Morty Explorer</div>
                    <p>App sencilla e interactiva para conocer todo sobre el mundo de Rick & Morty!</p>
                    <p>Desarrollada con VUE3 y Quasar</p>
                </q-tab-panel>

                <q-tab-panel name="quasar">
                    <div class="text-h6">Componentes Usados</div>
                    <ul>
                        <li><strong>QCard:</strong>
                            Card para cada personaje de la serie</li>

                        <li><strong>QForm, QInput, QSelect:</strong>
                            Para el formulario de nuevo personaje</li>

                        <li><strong>QTabs:</strong>
                            Para realizar el about</li>

                        <li><strong>QBtn, QDialog:</strong>
                            Para poder agregar/eliminar personajes</li>
                    </ul>
                </q-tab-panel>

                <q-tab-panel name="api">
                    <div class="text-h6">La API de Rick y Morty</div>
                    <p>URL Base: <a href="https://rickandmortyapi.com/api/character"
                            target="_blank">https://rickandmortyapi.com/api/character</a></p>

                    <p>App gratuita que proporciona esta web sobre Rikcy & Morty</p>
                    <p>Endpoints usados:</p>
                    <ul>
                        <li><code>GET /character</code>: para obtener todos los personajes</li>
                        <li><code>GET /character/:id</code>: para obtener la info mas detallada de cada personaje</li>
                    </ul>
                </q-tab-panel>
            </q-tab-panels>
        </q-card>
    </q-page>
</template>
