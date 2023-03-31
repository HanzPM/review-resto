<script setup>
import BaseContainer from '../components/BaseContainer.vue';
import { useRoute, useRouter } from 'vue-router';
import { reactive, ref } from 'vue';
import { useRestoRepository } from '../composables/useRestoRepository';
import Navbar from '../components/Navbar.vue';
import NavBar from '../components/Navbar.vue';

const router = useRouter();
const route = useRoute();
const repository = useRestoRepository();
const resto = reactive({
    name: '',
    address: '',
    description: ''
});
const isLoading =  ref(false)
const onSubmit = () => {
    isLoading.value = true;
    try {
        repository.store(resto);
        router.replace({name: 'restos'})
    } catch (e) {
        console.error(e);
    }
    isLoading.value = false;
}
</script>
<style scoped>
@import url('https://preview.redd.it/jkwvasp0pgz31.jpg?width=960&crop=smart&auto=webp&v=enabled&s=496fcbe3ebdc56368f2e13792db174264898b97a');
*{
    margin: 0;
    padding: 0;
    font-family: 'poppins',sans-serif;
}
.screen{
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    width: 100%;
    background-color: #111111;
}
.slebew{
    position: relative;
    width: 400px;
    height: 450px;
    background: transparent;
    border: 2px solid rgba(255,255,255,0.5);
    border-radius: 20px;
    backdrop-filter: blur(5px);
    display: flex;
    justify-content: center;
    align-items: center;

}
.wew{
    font-size: x-large;
    color: #fff;
    text-align: center;
}
.inputbox{
    position: relative;
    margin: 30px 0;
    width: 310px;
    border-bottom: 2px solid #fff;
    box-shadow: #ffffff86;
    box-shadow: 6px;
}
.inputbox label{
    font-weight: 700;
    position: absolute;
    top: 50%;
    left: 5px;
    transform: translateY(-50%);
    color: #fff;
    font-size: 1em;
    pointer-events: none;
    transition: .5s;
}
input:focus ~ label,
input:valid ~ label{
top: -5px;
}
.inputbox input {
    width: 100%;
    height: 50px;
    background: transparent;
    border: none;
    outline: none;
    font-size: 1em;
    padding:0 35px 0 5px;
    color: #fff;
}

</style>
<template>
    <NavBar />
    <RouterLink
      :to="{ name: 'restos' }"
      class="inline-block ml-12 font-bold  p-2 px-4  bg-[#353535] text-white rounded hover:bg-[#303030]"
    >
     Back
    </RouterLink>
  <section class="bg-[#111111]">
        <div class="slebew">
            <div class="form-value">
                <form :action="route.path" @submit.prevent="onSubmit">
                    <div class="inputbox">
                        <input name="name" v-model="resto.name" type="text" required>
                        <label for="">Name</label>
                    </div>
                    <div class="inputbox">
                      <input name="address" v-model="resto.address" type="text" required>
                      <label for="">Address</label>
                    </div>
                    <div class="inputbox">
                      <input name="descrition" v-model="resto.description" type="text" required>
                      <label for="">Description</label>
                    </div>
                    <input type="submit" class="bg-[#454545] text-white p-2 w-full block hover:bg-[#505050] rounded transition-colors duration-200 select-none font-bold cursor-pointer">
                </form>
            </div>
        </div>
    </section>
</template>