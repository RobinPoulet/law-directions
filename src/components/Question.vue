<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
interface QuestionElement {
    question: string;
    ref: string;
    enjeux: Array<string>;
    answer: Array<Answer>;
}
interface Answer {
  text: string;
  next: number;
}

defineProps<{
  item: QuestionElement;
}>();
const emit = defineEmits<{
  nextStep: [ids: number, lastStep: boolean, answerChoose: string, ref: string]
}>()
function loadStep(ids: number, lastStep: boolean, answerChoose: string, ref: string) {
  emit('nextStep', ids, lastStep, answerChoose, ref)
}
</script>

<template>
    <div class="card bg-light my-3">
        <div class="card-body"> 
            <h4 class="card-title ml-4">
              {{ item.question }}
            </h4>
            <enjeux :enjeux="item.enjeux" />
            <step-btn 
              :item="item"
              @next-step="loadStep" 
            /> 
        </div>
    </div>
</template>