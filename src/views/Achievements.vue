<script setup>
import { ref, onBeforeMount } from 'vue';
import request from '../utils/request';
import {
  NDrawer,
  NDrawerContent,
  NCard,
  NForm,
  NGrid,
  NGi,
  NFormItem,
  NInput,
  NButton,
  NDivider,
  NInputNumber, NModal, NSpace
} from "naive-ui";
import api from "../utils/api.js";

onBeforeMount(() => {
  fetchAchievementList()
})
const searchQuery = ref('')
const addDrawer = ref(false)
const direction = ref("bottom")
const showEdit = ref(false)

// 从后端接收到的数据
const offices = ref([])
const projects = ref([])

// 表单校验规则
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
const AchievementAddModel = ref({
  "baseproject": null,
  "name": "",
  "obtain": 0,
  "basesubtopic": "",
  "type": 1
})

const AchievementModel = ref({
  "Officeid": null,
  "LabID": null,
  "Area": null,
  "Address": "",
  "Managerid": null,
})

function confirmAdd() {
  request.post(api.createAchievement, AchievementAddModel.value).then((res) => {
    console.log(res)
    addDrawer.value = false
    fetchAchievementList()
  })
}

function submitChange() {
  request.put(api.updateOffice, AchievementModel.value).then((res) => {
    showEdit.value = false
    fetchAchievementList()
  })
}

function handleShowDetail(row) {
  console.log(row)
}

function fetchAchievementList() {
  try {
    request.get(api.listProjectAll).then((res) => {
      projects.value = res.data
      projects.value.forEach((project) => {
        request.get(api.listAchievementByProject,{
          params:{
            projectId: project.Projectid
          }
        }).then((res)=>{
          project.Achievement = res.data
        })
      })
    })
  } catch (e) {
    console.log(e)
  }
}


</script>

<template>
<!-- 新建弹窗  -->
  <n-drawer
      resizable
      v-model:show="addDrawer"
      :width="200"
      :height="600"
      :trap-focus="false"
      :block-scroll="false"
      :placement="direction"
      class="mb-10 mx-16"
  >
    <n-drawer-content title="录入办公室">
      <!-- 新增办公室表单 -->
      <n-form ref="formRef" :model="AchievementAddModel" class="mt-5">
        <n-grid :cols="2" :x-gap="32">
          <n-gi>
            <n-form-item path="Address" label="成果名称">
              <n-input v-model:value="AchievementAddModel.name" @keydown.enter.prevent/>
            </n-form-item>
          </n-gi>
          <n-gi>
            <n-form-item path="Address" label="日期">
              <n-input v-model:value="AchievementAddModel.obtain" @keydown.enter.prevent/>
            </n-form-item>
          </n-gi>
          <n-gi>
            <n-form-item path="ManagerId" label="子课题 ID">
              <n-input-number v-model:value="AchievementAddModel.basesubtopic" :show-button="false"/>
            </n-form-item>
          </n-gi>
          <n-gi>
            <n-form-item path="Area" label="类型">
              <n-input-number v-model:value="AchievementAddModel.type" clearable :precision="0" />
            </n-form-item>
          </n-gi>
        </n-grid>
        <n-button @click="confirmAdd">新增！</n-button>
      </n-form>
    </n-drawer-content>
  </n-drawer>
  
  
  <!--  编辑弹窗 -->
  <n-modal v-model:show="showEdit" class="bg-gray-100 rounded-lg p-4">
    <n-card class="p-0 w-fit">
        <span class="text-2xl">编辑项目</span>
      <n-form ref="formRef" :model="AchievementModel" class="mt-5">
        <n-grid :cols="3" :x-gap="32">
          <n-gi>
            <n-form-item path="Officeid" label="Officeid">
              <n-input-number v-model:value="AchievementModel.Officeid" :show-button="false"/>
            </n-form-item>
          </n-gi>
          <n-gi>
            <n-form-item path="LabId" label="LabID">
              <n-input-number v-model:value="AchievementModel.LabID" :show-button="false"/>
            </n-form-item>
          </n-gi>
          <n-gi>
            <n-form-item path="Area" label="Area">
              <n-input-number v-model:value="AchievementModel.Area" precision="1"/>
            </n-form-item>
          </n-gi>
          <n-gi>
            <n-form-item path="Address" label="Address">
              <n-input v-model:value="AchievementModel.Address" @keydown.enter.prevent/>
            </n-form-item>
          </n-gi>
          <n-gi>
            <n-form-item path="ManagerId" label="ManagerId">
              <n-input-number v-model:value="AchievementModel.Managerid" :show-button="false"/>
            </n-form-item>
          </n-gi>
        </n-grid>
        <n-button @click="submitChange">确认更改</n-button>
      </n-form>
    </n-card>
  </n-modal>

  <div class="relative" id="container">
    <h1 class="text-6xl text-emerald-600 font-bold mb-4">成果管理</h1>
    <div class="flex justify-between items-center mb-4">
    </div>

    <div v-for="project in projects" class="pb-4">
      <div class="flex justify-between">
        <div class="text-2xl pb-4">{{project.Name}}</div>
        <button class="bg-primary-500 hover:bg-primary-600 text-white rounded px-6 my-1.5"
                @click="addDrawer = true; AchievementAddModel.baseproject = project.Projectid; console.log(AchievementAddModel)">
          录入成果
        </button>
      </div>

      <n-space class="my-2">
        <n-card v-for="Achievement in project.Achievement" :key="Achievement.Achievementid" size="small" :bordered="true" class="transition ease-in-out delay-800 hover:-translate-y-3 hover:scale-105 hover:shadow-xl overflow-hidden"
        >
          <h2 class="text-xl" style="margin-top: 5px">{{Achievement.Name}}</h2>
          <template #cover>
            <img src="https://source.unsplash.com/300x300/?AI">
          </template>
          <p class="my-2">日期： {{Achievement.Obtaine}}</p>
        </n-card>
      </n-space>
      <n-divider/>
    </div>



  </div>
</template>

<style>
/* Add any custom styles here */
</style>
