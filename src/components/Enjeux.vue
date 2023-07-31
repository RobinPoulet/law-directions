<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
defineProps<{
  enjeux: Array<string>
}>()
</script>

<template>
    <div class="alert alert-primary" role="alert">
        <span>ℹ️ Enjeux</span>
        <p 
            v-for="(enjeu, index) in enjeux" 
            :key="index" 
            class="card-text" 
            style="font-size:0.8em; opacity:0.8;"
        >{{ enjeu }}</p>
    </div>
</template>