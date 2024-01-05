<template>
    <div class="flex flex-col h-screen bg-gray-50">
        <Header :user="user"
                class="fixed top-6 left-0 right-0 mx-auto w-[97%] z-10"
            style="border-radius: 12px; backdrop-filter: blur(5px); opacity: 96%"
        />
        <div class="flex flex-row flex-grow mt-24 bg-gray-50 max-h-[96%] overflow-hidden">
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