<script setup>
  import { useRoute, useRouter } from 'vue-router';
  import { reactive, ref } from 'vue';
  import { useAuthRepository } from '@/composables';
  const route = useRoute();
  const router = useRouter();
  const repository = useAuthRepository();
  const credentials = reactive({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    device_name: 'browser'
  })
  const isLoading = ref(false)
  const onSubmit = () => {
    isLoading.value = true;
    try {
      repository.register(credentials);
      router.replace({name: 'login'})
    } 
    catch (e) {
        console.error(e)
    }
    isLoading.value = false;
  }
</script>

<template>
  <Loading v-if="isLoading"/>
  <main class="grid grid-cols-12 gap-4 overflow-hidden" v-else>
    <section class="col-span-6 bg-[#353535] h-screen shadow-lg">
        <form :action="route.path" method="post" class="w-[50%] mx-auto mt-20" @submit.prevent="onSubmit">
            <div class="mb-4">
              <label for="name" class="block text-white font-bold mb-2">Name</label>
              <input 
              type="text" 
              class="border p-2 w-full bg-gray-50 rounded outline-none focus:ring-2 focus:ring-blue-300 transition-all"
              placeholder="Someone"
              v-model="credentials.name" 
              required>
            </div>
            <div class="mb-4">
              <label for="email" class="block text-white font-bold mb-2">Email</label>
              <input 
              type="email" 
              class="border p-2 w-full bg-gray-50 outline-none focus:ring-4 focus:ring-[#606060] rounded"
              placeholder="someone@example.com"
              v-model="credentials.email" 
              required>
            </div>
            <div class="mb-4">
              <label for="password" class="block text-white font-bold mb-2">Password</label>
              <input 
              type="password" 
              class="border p-2 w-full bg-gray-50 outline-none focus:ring-4 focus:ring-[#606060] rounded"
              v-model="credentials.password" 
              required>
            </div>
            <div class="mb-4">
              <label for="password_confirmation" class="block text-white font-bold mb-2">Password Confirmation</label>
              <input 
              type="password" 
              class="border p-2 w-full bg-gray-50 outline-none focus:ring-4 focus:ring-[#606060] rounded"
              v-model="credentials.password_confirmation" 
              required>
            </div>
            <button type="submit" class="bg-[#454545] text-white p-2 w-full block hover:bg-[#505050] rounded transition-colors duration-200 select-none">Masuk</button>
            <p class="text-center mt-5 font-bold text-white">Already Have an Account ? <router-link class="text-blue-300 hover:text-blue-600 cursor-pointer" to="/" >Login</router-link></p>
          </form>
    </section>
  </main>
</template>