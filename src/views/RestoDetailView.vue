<script setup>
import { useRestoRepository } from "@/composables";
import { useReviewRepository } from "@/composables";
import { ref, onMounted, reactive } from "vue";
import { useRoute } from "vue-router";
import BaseCard from "@/components/BaseCard.vue";
import BaseContainer from "../components/BaseContainer.vue";

const repository = useRestoRepository();

const route = useRoute();

const isLoading = ref(true);

const resto = ref({});

const fetchDetail = async () => {
  isLoading.value = true;
  try {
    const id = route.params.id;
    const { data } = await repository.show(id);
    resto.value = data;
  } catch (e) {
    console.log(e);
  }
}

const id = route.params.id;
    const review_data = reactive({
        rating: '',
        text: '',
        resto_id: id
    })

onMounted(() => fetchDetail());
const reviews = ref([]);
const fetchReviews = async () => {
  isLoading.value = true;
  try {
    const id = route.params.id;
    const { data } = await repository.reviews(id);
    reviews.value = data;
  } catch (e) {
    console.log(e);
  }
  isLoading.value = false;
};

onMounted(() => fetchReviews());

const review_repository = useReviewRepository();
    const onSubmit = async () => {
        isLoading.value = true
        try {
            await review_repository.store(review_data);
            window.location.reload()
        } catch (e) {
            console.error(e)
        }   
        isLoading.value = false
    }
</script>

<template>
  <BaseContainer>
    <RouterLink
      :to="{ name: 'restos' }"
      class="inline-block p-2 px-4 bg-[#353535] text-white rounded hover:bg-[#303030]"
    >
     Back
    </RouterLink>

    <BaseCard class="mt-4 bg-[#353535] text-white">
      <template #title>Resto</template>
    </BaseCard>

    <BaseCard class="mt-4 bg-[#353535]">
      <template #title>{{ resto.name }}</template>
    </BaseCard>

    <BaseCard class="mt-4 bg-[#353535] text-white">
      <div v-if="resto.description">
                {{ resto.description }}
            </div>
            <div v-else>
                No Description Yet
            </div>
    </BaseCard>

    <BaseCard class="mt-4 mb-4 bg-[#353535] text-white">
      <template #title>Review</template>
    </BaseCard>

    <BaseCard>
            <div class="my-[3%] ">
            <form :action="route.path" class="flex flex-col w-[40%]" @submit.prevent="onSubmit()">
                <label for="name" class="mt-2 mb-3 text-white font-bold">Rating: </label>
                <input 
                    type="number" 
                    name="rating" 
                    class="border-2 text-black border-[rgb(138,138,138)] p-1 focus:border-black rounded-sm transition-all duration-300 outline-none mb-2"
                    v-model="review_data.rating"
                    placeholder="1 to 5"
                    min="1"
                    max="5"
                    required
                >
                <label class="mb-3 text-white font-bold" for="description">Review: </label>
                <textarea 
                    type="text" 
                    rows="4" 
                    name="text" 
                    class="border-2 border-[rgb(138,138,138)] text-black p-1 focus:border-black rounded-sm transition-all duration-300 outline-none mb-2"
                    v-model="review_data.text"
                />
                <input type="submit"  class="bg-[#454545] text-white p-2 w-full block hover:bg-[#505050] rounded transition-colors duration-200 select-none font-bold cursor-pointer">
            </form>
        </div>
        </BaseCard>

    <BaseCard v-for="review in reviews" :key="review.id" class="mt-4">
      <template #title>{{ review.user.name }}</template>
      {{ review.text }}
    </BaseCard>

    
  </BaseContainer>
</template>