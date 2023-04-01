<script setup>
    import { ref } from 'vue';
    import { RouterLink, useRouter } from 'vue-router';
    import { useAuthRepository } from '../composables/useAuthRepository';

    const userData = JSON.parse(localStorage.getItem('user'));
    const dropdown = ref(false)
    const repository_auth = useAuthRepository();
    const router = useRouter()
    
    const logout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('access_token');
        repository_auth.logout();
        router.replace({name: 'login'})
    }
    const dropdownShow = () => {
        dropdown.value = true
    }
    const dropdownHide = () => {
        dropdown.value = false
    }
</script>

<template>    
        <div class="relative flex justify-between w-full bg-[#111111] p-6 mb-8 items-center shadow-xl shadow-black select-none">
            <div>
                <h1 class="text-4xl text-white font-bold">Vasilio</h1>
            </div>
            <div class="flex justify-around items-center">
                <router-link to="/restos" class="ml-2    px-2 font-bold text-white border-b-2 border-spacing-x-[-1px] border-transparent hover:border-gray-600 hover:text-gray-300  hover:border-spacing-x-3 transition-all duration-[0.3s] overflow-hidden">Home</router-link>
                <router-link to="" class="ml-2 px-2 mr-6 font-bold text-white border-b-2 border-spacing-x-[-1px] border-transparent hover:border-gray-600 hover:text-gray-300  hover:border-spacing-x-3 transition-all duration-[0.3s]">About</router-link>
                <div v-if="userData">
                    <button v-if="dropdown" @click="dropdownHide" class="dropdown-toggle self-end bg-[#353535] px-2 py-2 text-white font-semibold rounded-md">
                        Hi, {{ userData.name }}
                        <ul v-if="dropdown" class="dropdown-group absolute z-10 mt-2 right-5 rounded-lg w-[15%] bg-[#6b6b6b] text-white ">
                            <li class="p-2 border-b-2 border-b-[#5a5a5a] hover:bg-[#7777] hover:rounded-t-lg">
                                <router-link to="profile">Profile</router-link>
                            </li>
                            <li @click="logout" class="p-2 border-b-2 border-b-[#5a5a5a] hover:bg-[#7777]">
                                Logout
                            </li>
                            <li class="p-2 border-b-[#10101010] hover:bg-[#7777] hover:rounded-b-lg">
                                <router-link to="create" >Create Your Resto</router-link>
                            </li>
                        </ul>
                    </button>
                    <button v-else @click="dropdownShow" class="dropdown-toggle bg-[#353535] px-2 py-2 text-white font-semibold rounded-md">
                        Hi, {{ userData.name }}
                        <ul v-if="dropdown" class="dropdown-group absolute mt-2 right-5 rounded-sm w-[15%] bg-white text-black">
                            <li class="p-2  border-b-blue-300">
                                <router-link to="profile">Profile</router-link>
                            </li>
                            <li @click="logout" class="p-2 border-b-blue-300">
                                Logout
                            </li>
                            <li class="p-2 ">
                                <router-link to="create-resto" >Create Your Resto</router-link>
                            </li>
                        </ul>
                    </button>
                </div>
                <div v-else>
                    <router-link to="/" >Login</router-link>
                </div>
            </div>
        </div>

</template>