<script setup>
import { reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAuthRepository } from "@/composables";
const repository = useAuthRepository();
const route = useRoute();
const router = useRouter();
const credentials = reactive({
  email: "",
  password: "",
  device_name: "browser",
});
const isLoggingIn = ref(false);
const onSubmit = async () => {
  isLoggingIn.value = true;

  try {
    const { data } = await repository.login(credentials);
    if (data) {
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("user", JSON.stringify(data.user));
      router.replace({ name: "restos" });
    }
  } catch (e) {
    console.error(e);
  }
  isLoggingIn.value = false;  
};
</script>

<template>
  <main class="grid grid-cols-12 gap-4 min-h-screen">
    <section class="col-span-6 bg-[#353535] h-full shadow-xl">
      <form
        method="post"
        :action="route.path"
        class="p-40"
        @submit.prevent="onSubmit"
      >
        <div class="mb-4">
          <label for="email" class="block text-white font-bold mb-2">Email</label>
          <input
            v-model="credentials.email"
            type="email"
            required
            placeholder="someone@email.com"
            class="border p-2 w-full bg-gray-50 outline-none focus:ring-4 focus:ring-[#606060] rounded"
          />
        </div>
        <div class="mb-4">
          <label for="password" class="block text-white font-bold mb-2">Password</label>
          <input
            v-model="credentials.password"
            type="password"
            required
            class="border p-2 w-full bg-gray-50 outline-none focus:ring-4 focus:ring-[#606060] rounded"
          />
        </div>
        <button
          type="submit"
          class="bg-[#454545] text-white p-2 w-full block hover:bg-[#505050] rounded transition-colors duration-200 select-none"
        >
          Masuk 
        </button>
        <div class="p-8 absolute top-[365px] font-bold text-white ">Don't have an acoount ? <RouterLink  class="text-blue-300 hover:text-blue-600 cursor-pointer" to="register">Register Now</RouterLink></div>
      </form>
    </section>
  </main>
</template>