<template>
    <header class="flex justify-between items-center bg-gray-200 text-white p-4">

        <div class="text-black font-bold">You are in: {{ currentRoute }}</div>
        <div class="relative">
            <button class="bg-primary-500 hover:bg-primary-600 text-white font-bold py-2 px-4 rounded"
        @click="open = !open"
        >
            User
        </button>
        <div v-show="open" ref="userMenu" class="transition-all ease-in-out -translate-y-2 scale-95 delay-300 duration-100 transform 
        absolute right-0 w-48 py-1 bg-white rounded-md shadow-lg top-12 ring-1 ring-black ring-opacity-5 dark:bg-dark focus:outline-none"      
            @click.away="open = false" @keydown.escape="open = false"
            tabindex="-1" role="menu" aria-orientation="vertical" aria-label="User menu">
            <a href="#" role="menuitem"
                class="block px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100 dark:text-light dark:hover:bg-blue-600">
                我的信息
            </a>
            <a href="#" role="menuitem"
                class="block px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100 dark:text-light dark:hover:bg-blue-600">
                设置
            </a>
            <a href="#" role="menuitem"
                class="block px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100 dark:text-light dark:hover:bg-blue-600">
                登出
            </a>
        </div>
        </div>

    </header>
</template>

<!-- <script>
export default {
    data() {
        return {
            currentRoute: ''
        }
    },
    created() {
        this.currentRoute = this.$route.path
    }
}
</script> -->

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const currentRoute = ref('');
const open = ref(false);

onMounted(() => {
    currentRoute.value = route.path;
});

</script>

<style>
/* Add your custom styles here */
</style>
