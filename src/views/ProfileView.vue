<script setup>
import { useAuthRepository } from "../composables/useAuthRepository";
import { useRestoRepository } from "../composables/useRestoRepository";
import { ref, onMounted } from "vue";
import NavBar from "../components/NavBar.vue";
import BaseContainer from "../components/BaseContainer.vue";
import { RouterLink } from "vue-router";
const repository = useAuthRepository();
const resto_repository = useRestoRepository();
const isLoading = ref(false);
const profileData = ref({});
const fetchUserProfile = async () => {
  isLoading.value = true;
  try {
    const { data } = await repository.profile();
    id.value = data.id;
    profileData.value = data;
  } catch (e) {
    console.error(e);
  }
  isLoading.value = false;
};
const resto_tumpal = ref(false);
const id = ref("");
const restos = ref([]);
const fetchResto = async (id) => {
  //   isLoading.value = true;
  try {
    const { data } = await resto_repository.index_resto_profile(id);
    restos.value = data;
  } catch (e) {
    console.error(e);
  }
  //   isLoading.value = false;
};
const isFetching = ref(false)
const restoShow = async (id) => {
  isFetching.value = true
  try{
    await fetchResto(id);
    
    resto_tumpal.value = true;
  } catch(e) {
    console.error(e)
  }
  isFetching.value = false
};
const destroy = async (id) => {
      isLoading.value = true;
    try {
      await resto_repository.destroy(id);
      window.location.reload()
    } catch (e) {
      console.error(e);
    }
      isLoading.value = false;
};
onMounted(() => {
  fetchUserProfile();
});
</script>

<template>
    <NavBar />
  <BaseContainer>
    <RouterLink
      :to="{ name: 'restos' }"
      class="inline-block p-2 px-4 bg-[#353535] text-white rounded hover:bg-[#303030]"
    >
     Back
    </RouterLink>
    <!-- {{ profileData }}
    {{ id }}
    <p v-if="resto_tumpal">
        {{ restos }}
    </p> -->
    <div class="flex flex-col items-center p-2">
      <div class="flex flex-col items-center">
        <div v-if="profileData.profile_picture" class="w-[120px] relative mt-6">
          <img :src="profileData" alt="" class="rounded-full" />
        </div>
        <div v-else class="w-[120px] relative mt-6">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            class="w-64-h-64 "
            alt=""
          />
        </div>

        <div class="relative mt-6 text-xl font-semibold text-white">
          {{ profileData.name }}
        </div>
      </div>
      <hr class="h-[2px] w-[40%] my-4 bg-[#dde5b6] border-0 dark:bg-gray-700" />
      <div class="flex flex-col items-center py-1 text-xl w-full text-white">
        <p class="mb-2">
          <span class="font-bold">Email: </span> {{ profileData.email }}
        </p>
        <p class="mb-2" v-if="profileData.phone_number">
          <span class="font-bold">Phone Number: </span>
          {{ profileData.phone_number }}
        </p>
        <p class="mb-2" v-else>
          <span class="font-bold">Phone Number: </span> -
        </p>
      </div>
      <hr class="h-[2px] w-[40%] my-4 bg-[#ffffff] border-0 dark:bg-gray-700" />
            </div>  
  </BaseContainer>
</template>