<script setup>
import { useRestoRepository } from "@/composables";
import { ref, onMounted } from "vue";
import BaseCard from "../components/BaseCard.vue";
import BaseContainer from "../components/BaseContainer.vue";
import NavBar from "../components/NavBar.vue";

const repository = useRestoRepository();

const isLoading = ref(true);

const restos = ref([]);

const fetchRestos = async () => {
  isLoading.value = true;
  try {
    const { data } = await repository.index();
    restos.value = data;
  } catch (e) {
    console.error(e);
  }
  isLoading.value = false;
};
onMounted(() => fetchRestos());
const excerpt = (text, maxLenght = 10, indicator = "...") => {
  let textCopy = text;
  if (textCopy.length > maxLenght) {
    textCopy = textCopy.substring(0, maxLenght) + indicator;
  }
  return textCopy;
};
const destroy = async (id) => {
      isLoading.value = true;
    try {
      await repository.destroy(id);
      window.location.reload()
    } catch (e) {
      console.error(e);
    }
      isLoading.value = false;
};
</script>

<template>
    <NavBar/>
  <BaseContainer>
    <div class="grid grid-cols-12 gap-4">
      <div v-for="resto in restos" :key="resto.id" class="col-span-6 relative">
        <BaseCard :to="{ name: 'restos-show', params: { id: resto.id } }" c>
          <template #title>{{ resto.name }}</template>
          {{ excerpt(resto.description, 40) }}
        </BaseCard>
        <button class="p-3 right-5 top-0 absolute text-white font-lg font-bold bg-[#454545] mt-5 hover:bg-[#505050] rounded
          " type="submit" @click="destroy (resto.id)" >Delete Resto</button>
      </div>
    </div>
  </BaseContainer>
</template>