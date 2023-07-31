<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import Enjeux from '../components/Enjeux.vue'
import { ref } from 'vue';

const text = ref([
    "Vous cherchez une information juridique, vous ne savez pas vers quelles sources vous tourner, vous ne savez pas comment vous y prendre.",
    "Nous vous proposons de répondre à quelques questions afin de vous présenter les différentes services en fonction de vos réponses.",
])
</script>

<template>
    <div class="col-12 col-md-6">
        <div class="card bg-light">
            <div class="card-body">
                <h4 class="card-title ml-4">Bienvenue sur le guide de l'information juridique 👋</h4>
                <Enjeux :enjeux="text" />
                <a
                    href="/questions"
                    class="btn btn-outline-secondary"
                    type="button"
                >Démarrer le questionnaire</a> 
            </div>
        </div>
    </div>
</template>