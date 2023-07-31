<!-- eslint-disable vue/valid-template-root -->
<script setup lang="ts">
interface Path {
  ref: string;
  answer: string;
  question: string | undefined;
}

defineProps<{
    isLastQuestion: boolean;
    userPath: Array<Path>;
    solutionsCount: number;
}>();
</script>

<template>
    <div class="col-12 col-lg-3 col-xl-4 display-solutions-container" id="display-solution">
        <div class="card bg-light mb-2">
            <div class="card-body h-100 d-flex flex-column">
                <h5 class="card-title">Vos critères</h5>
                <p class="card-text">
                    <span
                        class="badge badge-info ml-2"
                        v-for="(criteria, index) in userPath"
                        :key="index"
                    >{{ criteria.answer }}</span>
                </p>
                <div
                    class="flex-grow-1"
                    v-if="solutionsCount"
                >
                    <h6>Nous avons trouvé {{ solutionsCount }} résultat(s) avec cette sélection de critères</h6>
                    <p class="card-text">
                        ℹ️
                        Vous pouvez modifier vos critères, ou afficher les résultats en cliquant sur le bouton ci-dessous
                    </p>
                    <a
                        href="/results"
                        type="button" 
                        class="btn btn-outline-success mb-2 mt-2 btn-sm btn-block"
                    >Afficher</a>
                </div>
                <div
                    class="alert alert-danger flex-grow-1"
                    role="alert"
                    v-else
                >
                    <h6>Nous n'avons pas trouvé de solution correspondant à votre sélection</h6>
                    <p class="card-text">
                        ℹ️
                        Vous pouvez modifier votre sélection de critères
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>