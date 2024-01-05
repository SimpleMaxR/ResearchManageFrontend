<template>
    <header class="flex justify-between items-center bg-gray-100 text-white p-4">

        <div class="text-black text-2xl font-bold">科研管理系统</div>
        <div class="relative">
            <button class="bg-primary-500 hover:bg-primary-600 text-white font-bold py-2 px-4 rounded"
        @click="open = !open"
        >
            用户管理
        </button>
        <div v-show="open" ref="userMenu" class="transition-all ease-in-out -translate-y-2 scale-95 delay-300 duration-100 transform 
        absolute right-0 w-48 py-1 bg-white rounded-md shadow-lg top-12 ring-1 ring-black ring-opacity-5 dark:bg-dark focus:outline-none"      
            @click.away="open = false" @keydown.escape="open = false"
            tabindex="-1" role="menu" aria-orientation="vertical" aria-label="User menu">
            <a @click="handleLogout" role="menuitem"
                class="block px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100 dark:text-light dark:hover:bg-blue-600">
                登出
            </a>
        </div>
        </div>

    </header>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { MainStore } from "../store/index.js";

const store = MainStore();
const router = useRouter();

const open = ref(false);

function handleLogout() {
  store.isLogin = false
  store.username = ''
  store.password = ''
  store.userID = ''
  store.token = ''
  store.role = ''
  router.push('/login')
}

</script>

<style>
.backdrop-blur-lg::before {
  backdrop-filter: blur(10px); /* 背景层的高斯模糊效果 */
}
</style>
