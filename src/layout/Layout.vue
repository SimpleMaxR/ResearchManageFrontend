<template>
    <div class="flex flex-col h-screen p-6">
        <Header :user="user" 
            class="mb-6"
            style="border-radius: 16px;"
        />
        <div class="flex flex-row flex-grow">
            <SideMenu />
            <div class="h-full flex flex-col flex-grow bg-gray-50 p-5"
                style="border-radius: 16px;"
            >
                <RouterView />
            </div>
        </div>
    </div>
</template>

<script setup>
import SideMenu from "../components/SideMenu.vue";
import Header from "../components/Header.vue";
import { ref, defineProps, onMounted } from 'vue'

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