<template>
      <el-drawer
      v-model="drawer"
      title="Create Lab"
      :direction=direction>
      <span>Hi</span>
    </el-drawer>
  <div class="container">
    <h1 class="text-2xl font-bold mb-4">Lab Management</h1>
    <div class="flex justify-between items-center mb-4">
      <input v-model="searchQuery" class="border border-gray-300 rounded px-4 py-2 w-1/2" type="text"
        placeholder="Search Labs" />
      <button class="bg-primary-500 hover:bg-primary-600 text-white rounded px-4 py-2"
        @click="drawer = true">
        Create Lab
      </button>
    </div>
    <el-table :data="labs" border >
      <el-table-column prop="Name" label="Name" width="180" />
      <el-table-column prop="OfficeArea" label="Office Area" />
      <el-table-column prop="Address" label="Address" />
      <el-table-column prop="ResearchDirection" label="Research Direction" />
    </el-table>

  </div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue';
import request from '../utils/request';

onBeforeMount(() => {
  fetchLabList()
  console.log(labs.value)
})
const searchQuery = ref('')
const labs = ref([])
const drawer = ref(false)
const direction = ref('btt')

function createLabModalVisible() {
  console.log('createLabModalVisible')
}

function fetchLabList() {
  try {
    request.get('/listLabAll').then((res) => {
      labs.value = res.labList
      console.log(labs.value)
    })
  } catch (e) {
    console.log(e)
  }
}


</script>

<style>
/* Add any custom styles here */
</style>
