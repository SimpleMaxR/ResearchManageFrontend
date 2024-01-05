<script setup>
import {watch, ref} from "vue";
import service from "../utils/request.js";
import {MainStore} from "../store/index.js";
import {useRouter} from "vue-router";
import api from "../utils/api.js";

const router = useRouter();
const username = ref('')
const password = ref('')

function handleLogin() {
  const store = MainStore()
  service.post(api.login, {
    username: username.value,
    password: password.value
  }).then((res) => {
      store.username = username.value
      store.password = password.value
      store.userid = res.data.userid
      store.token = res.data.token
      store.role = res.data.role
      store.isLogin = true
      router.push('/')
  })
}

</script>

<template>
  <!-- component -->
  <section class="flex flex-col md:flex-row h-screen items-center">

    <div class="bg-indigo-600 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
      <img src="https://source.unsplash.com/1290x720/?acadamy" class="w-full h-full object-cover">
    </div>

    <div class="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:mx-0 md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
        flex items-center justify-center">

      <div class="w-full h-100">


        <h1 class="text-xl md:text-2xl font-bold leading-tight mt-12">使用分配的账户登录</h1>

        <div class="mt-6">
          <div>
            <label class="block text-gray-700">登录用户名</label>
            <input v-model="username" type="name" placeholder="" class="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none" autofocus autocomplete required>
          </div>

          <div class="mt-4">
            <label class="block text-gray-700">密码</label>
            <input v-model="password" type="password" placeholder="" minlength="6" class="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
                focus:bg-white focus:outline-none" required>
          </div>

          <!--          <div class="text-right mt-2">-->
          <!--            <a href="#" class="text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700">Forgot Password?</a>-->
          <!--          </div>-->

          <button @click="handleLogin" type="submit" class="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg
              px-4 py-3 mt-6">登录系统</button>
        </div>


      </div>
    </div>

  </section>
</template>

<style scoped>

</style>