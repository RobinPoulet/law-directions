<!-- eslint-disable vue/valid-template-root -->
<script setup lang="ts">
interface Answer {
  text: string;
  next: number;
}

const props = defineProps<{
  item: {
    question: string;
    enjeux: Array<string>;
    answers: Array<Answer>;
    ref: string;
    lastStep: boolean;
  },
}>();
const emit = defineEmits<{
  nextStep: [ids: number, lastStep: boolean, answerChoose: string, ref: string]
}>()
function btnClick(answer: Answer) {
  const ids = answer.next;
  const lastStep = props.item.lastStep;
  const answerChoose = answer.text;
  const ref = props.item.ref;
  emit('nextStep', ids, lastStep, answerChoose, ref);
}
</script>

<template>
    <div 
        class="d-flex gap-2"
        :id="item.ref + '_button_container'"
    >
        <button
            class="btn btn-outline-secondary mr-2 mt-2"
            type="button"
            v-for="(answer, index) in item.answers"
            :key="index"
            @click="btnClick(answer)"
        >{{ answer.text }}</button>
    </div>
</template>