<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import Question from '@/components/Question.vue';
import DisplaySolutions from '@/components/DisplaySolutions.vue';
import { ref, reactive, computed, watch, onBeforeUnmount } from 'vue';
import { filterSolutionsByUserPath, centerElementInView } from '../utils';
import { type Path, type Question as QuestionElement, type Solution } from '../types';
import { fetchQuestions, fetchSolutions } from "../data";

const questions = ref(fetchQuestions() || []);
const solutions = ref(fetchSolutions() || []);

const state = reactive({ 
    steps: Array<QuestionElement>(),
    userPath: Array<Path>(),
    solutionsFiltered: Array<Solution>(),
})
const solutionsCount = computed(() => {
    return state.solutionsFiltered.length;
})
const isLastQuestion = computed(() => {
    return state.steps.length === 5;
})

function findQuestionByRef(ref: string): string|undefined {
    const data = questions.value.find((item: typeof Question) => item.ref === ref);
    return data?.question;
}
function loadStep(nextStep: number, lastStep: boolean, answerChoose: string, ref: string): void {
    function getRefIndex(ref: string) : number {
        return state.userPath.findIndex((info) => info.ref === ref);
    }
    const refIndex = getRefIndex(ref);
    if (refIndex >= 0) {
        state.userPath = state.userPath.slice(0, refIndex);
        state.steps = state.steps.slice(0, refIndex + 1)
    }
    if (nextStep > 0) {
        state.steps.push(questions[nextStep])
    }
    const question = findQuestionByRef(ref)
    if (question) {
        state.userPath.push({
            ref: ref,
            answer: answerChoose,
            question: question,
        });
    }
}
function getSolutions() : void {
    state.solutionsFiltered = filterSolutionsByUserPath(solutions, state.userPath);
    centerElementInView("display-solution");
}

// Watcher pour steps
watch(
  () => state.steps,
  (val) => {
    if (val.length > 0) {
     const lastStepRef = val[val.length - 1].ref;
     centerElementInView(lastStepRef);
    }
  },
  { deep: true }
);

// Watcher pour userPath
watch(
  () => state.userPath,
  (newVal, oldVal) => {
    if (
      newVal.length === 5 &&
      oldVal.length === 5 &&
      newVal[4].answer !== oldVal[4].answer
    ) {
      getSolutions();
    }
  },
  { deep: true }
);

// Watcher pour isLastQuestion
watch(
  () => isLastQuestion,
  (val) => {
    if (val) {
      //getSolutions();
    }
  }
);

// Hook de nettoyage avant la destruction du composant
onBeforeUnmount(() => {
  state.steps = [];
  state.userPath = [];
});

</script>

<template>
    <div class="col-12 col-lg-8 col-xl-6 d-flex flex-column">
        <question 
          v-for="(item, index) in state.steps" 
          :key="index" 
          :item="item"
          @next-step="loadStep" 
        />
    </div>
    <div class="col-12 col-lg-1 col-xl-2"></div>
    <display-solutions 
        :is-last-question="isLastQuestion"
        :user-path="state.userPath"
        :solutions-count="solutionsCount"
    />
</template>