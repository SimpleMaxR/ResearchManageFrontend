<template>
    <div class="flex flex-col h-screen bg-gray-50">
      <div class="absolute left-0 top-0 z-5">
        <div class="relative w-[100vw] h-[150px] -translate-y-1/2 bg-gradient-to-bl from-green-600 to-transparent rounded-full blur-[50px] opacity-50"></div>
      </div>
        <Header :user="user"
                class="fixed top-6 left-0 right-0 mx-auto w-[97%] z-10"
            style="border-radius: 12px; backdrop-filter: blur(5px); opacity: 96%"
        />
        <div class="flex flex-row flex-grow mt-24 bg-gray-50 max-h-[96%] overflow-hidden z-1">
            <SideMenu />
            <div class="max-h-full flex flex-col flex-grow bg-gray-50 mx-10 my-6 p-2 overflow-scroll scroll-auto">
                <RouterView />
                <!-- <LabQuickView></LabQuickView> -->
            </div>
        </div>
    </div>
</template>

<script setup>
import SideMenu from "../components/SideMenu.vue";
import Header from "../components/Header.vue";
import { ref, defineProps, onMounted } from 'vue'
import LabQuickView from "../components/LabQuickView.vue";

const props = defineProps(['user'])
const user = ref({})


onMounted(refreshUser)
defineExpose({ refreshUser })

function refreshUser() {
    let str = sessionStorage.getItem('user') || '{}'
    user.value = JSON.parse(str)
}

</script>

<style scoped>

</style>