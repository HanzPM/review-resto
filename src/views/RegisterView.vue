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
<style>
@import url('https://preview.redd.it/jkwvasp0pgz31.jpg?width=960&crop=smart&auto=webp&v=enabled&s=496fcbe3ebdc56368f2e13792db174264898b97a');
*{
    margin: 0;
    padding: 0;
    font-family: 'poppins',sans-serif;
}
section{
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    width: 100%;
}
.form-box{
    position: relative;
    width: 400px;
    height: 550px;
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
}
.inputbox label{
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
.inputbox ion-icon{
    position: absolute;
    right: 8px;
    color: #fff;
    font-size: 1.2em;
    top: 20px;
}
.wow{
    width: 100%;
    height: 40px;
    border-radius: 40px;
    background: #fff;
    border: none;
    outline: none;
    cursor: pointer;
    font-size: 1em;
    font-weight: 600;
}
.register{
    font-size: .9em;
    text-align: center;
    margin: 25px 0 10px;
}
</style>

<template>
  <section>
        <div class="form-box">
            <div class="form-value">
                <form :action="route.path" method="post"  @submit.prevent="onSubmit">
                    <h2 class="wew">Register</h2>
                    <div class="inputbox">
                        <input v-model="credentials.name" type="string" required>
                        <label for="">Username</label>
                    </div>
                    <div class="inputbox">
                        <input v-model="credentials.email" type="email" required>
                        <label for="">Email</label>
                    </div>
                    <div class="inputbox">
                      <input v-model="credentials.password" type="password" required>
                      <label for="">Password</label>
                    </div>
                    <div class="inputbox">
                        <input v-model="credentials.password_confirmation" type="password" required>
                        <label for="">Confirm Pasword</label>
                    </div>
                    <button type="submit" class="w-[100%] h-[40px] rounded-[40px] bg-white hover:bg-gray-300 font-bold transition-colors duration-[0.3s]">Confirm</button>
                    <div class="register">
                        <p>Don't have a account <RouterLink to="/" class="text-white hover:text-gray-300">Log In</RouterLink></p>
                    </div>
                </form>
            </div>
        </div>
    </section>
</template>