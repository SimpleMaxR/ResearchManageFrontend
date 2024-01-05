<script setup>
import { ref, onBeforeMount } from 'vue';
import request from '../utils/request';
import {NDrawer, NDrawerContent, NCard, NForm, NGrid, NGi, NFormItem, NInput, NButton} from "naive-ui";
import api from "../utils/api.js";
import {useRouter} from "vue-router";

const router = useRouter()

onBeforeMount(() => {
  fetchProjectList()
})
const searchQuery = ref('')
const projects = ref([])
const drawer = ref(false)
const direction = ref("bottom")

function createLabModalVisible() {
  console.log('createLabModalVisible')
}

const rules = {
  stampModel: {
    name: {
      required: true,
      message: "请输入姓名",
      trigger: "blur",
    }
  }
}
const formRef = ref(null);
const labToAddModel = ref({
  "id": null,
  "name": "",
  "office_area": "",
  "address": "",
  "research_direction": ""
})

function handleSearch() {
  console.log(searchQuery.value)
  request.get(api.listProjectByName, {params: {name: searchQuery.value}}).then((res) => {
    projects.value = res.data
  })
}

function confirmAddLab() {
  console.log('confirmAddLab')
  console.log(labToAddModel.value)
  request.post('/createLab', labToAddModel.value).then((res) => {
    console.log(res)
    drawer.value = false
    fetchProjectList()
  })
}

function handleShowDetail(row) {
  router.push({
    name: 'ProjectDetail',
    query: {
      id: row.Projectid,
      name: row.Name
    }}
  )
}

function fetchProjectList() {
  try {
    request.get(api.listProjectAll).then((res) => {
      projects.value = res.data
    })
  } catch (e) {
    console.log(e)
  }
}


</script>

<template>
  <n-drawer
      resizable
      v-model:show="drawer"
      :width="200"
      :height="600"
      :trap-focus="false"
      :block-scroll="false"
      to= "#container"
      :placement="direction"
      show-mask="transparent"
      class="mb-10"
  >
    <n-drawer-content title="录入项目">
      <!-- 新增实验室表单 -->
      <n-form ref="formRef" :model="labToAddModel" class="mt-5">
        <n-grid :cols="2" :x-gap="32">
          <n-gi>
            <n-form-item path="name" label="名称">
              <n-input v-model:value="labToAddModel.name" @keydown.enter.prevent/>
            </n-form-item>
          </n-gi>
          <n-gi>
            <n-form-item path="officeArea" label="办公室面积">
              <n-input v-model:value="labToAddModel.office_area" @keydown.enter.prevent/>
            </n-form-item>
          </n-gi>
          <n-gi>
            <n-form-item path="address" label="地址">
              <n-input v-model:value="labToAddModel.address" @keydown.enter.prevent/>
            </n-form-item>
          </n-gi>
          <n-gi>
            <n-form-item path="researchDirection" label="研究方向">
              <n-input v-model:value="labToAddModel.research_direction" @keydown.enter.prevent/>
            </n-form-item>
          </n-gi>
        </n-grid>
        <n-button @click="confirmAddLab">新增！</n-button>
      </n-form>
    </n-drawer-content>
  </n-drawer>
  <div class="h-full relative" id="container">
    <h1 class="text-6xl text-emerald-600 font-bold mb-4">项目管理</h1>
    <div class="flex justify-between items-center mb-4">
      <input v-model="searchQuery" class="border border-gray-300 rounded px-4 py-2 w-1/2" type="text"
        placeholder="Search" @keyup.enter="handleSearch"/>
<!--      <button class="bg-primary-500 hover:bg-primary-600 text-white rounded px-4 py-2"-->
<!--        @click="drawer = true">-->
<!--        录入实验室-->
<!--      </button>-->
    </div>
    <el-table :data="projects" style="max-width: 100%" >
      <el-table-column prop="Projectid" label="项目 ID" />
      <el-table-column prop="Projectleader" label="负责人 ID" />
      <el-table-column prop="Name" label="项目名" />
      <el-table-column prop="Researchcontent" label="研究内容" />
      <el-table-column prop="Totalfunds" label="经费" />
      <el-table-column prop="Startdate" label="开始日期" />
      <el-table-column prop="Enddate" label="截止日期" />
      <el-table-column prop="Qualitymonitorsid" label="质量检测方" />
      <el-table-column prop="Clientid" label="客户" />
      <el-table-column fixed="right" label="Operations" width="120">
        <template  #default="{row}">
          <el-button link type="primary" size="small" @click="handleShowDetail(row)">Detail</el-button>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>



<style>
/* Add any custom styles here */
</style>
