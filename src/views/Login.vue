<template>  
    <!-- component -->
<div class="mx-auto my-36 flex h-[300px] w-[350px] flex-col border-2 bg-white text-black shadow-xl">
  <div class="mx-8 mt-7 mb-1 flex flex-row justify-start space-x-2">
    <div class="h-7 w-3 bg-[#0DE6AC]"></div>
    <div class="w-3 text-center font-sans text-xl font-bold">Login</div>
  </div>
  <div class="flex flex-col items-center">
    <input class="my-2 w-72 border p-2 focus:border-fuchsia-300" type="email" placeholder="Username" />
    <input class="my-2 w-72 border p-2" type="password" placeholder="Password" />
  </div>
  <div class="my-2 flex justify-center">
    <button class="w-72 border bg-[#0DE6AC] p-2 font-sans" @click="login()">Login</button>
  </div>
  <div class="mx-10 my-3 flex justify-between text-sm font-semibold">
    <div>Forget Password</div>
    <div class="underline underline-offset-2">Signup</div>
  </div>
</div>
</template>
<script setup>
import { useMainStore } from "../store/index.js";
import { useRouter } from "vue-router";
import { getCurrentInstance } from "vue";

const instance = getCurrentInstance();
const store = useMainStore();
const router = useRouter();

function login() {
    console.log('login')
    localStorage.setItem("token", "123");
    store.token = '123' // 模拟登录成功
    // router.push({ path: '/' })
    instance.proxy.$router.push("/")
}
</script>