<script setup>
import { ref, onBeforeMount } from 'vue';
import request from '../utils/request';
import {NDrawer, NDrawerContent, NCard, NForm, NGrid, NGi, NFormItem, NInput, NButton, NDivider} from "naive-ui";
import api from "../utils/api.js";
import {copyProperties} from "../utils/util.js";


onBeforeMount(() => {
  fetchSecretarysList()
  // fetchSecretaryService()
  fetchLabSecretaryList()
})
const searchQuery = ref('')
const drawer = ref(false)
const direction = ref("bottom")

// 从后端接收的数据
const secretarys = ref([])
const secretarysService = ref([])
const labs = ref([])

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
const SecretaryToAddModel = ref({
  "id": null,
  "name": "",
  "office_area": "",
  "address": "",
  "research_direction": ""
})
function confirmAddLab() {
  console.log('confirmAddLab')
  console.log(SecretaryToAddModel.value)
  request.post('/createLab', SecretaryToAddModel.value).then((res) => {
    console.log(res)
    drawer.value = false
    fetchSecretarysList()
  })
}
function handleEmail(mail) {
  window.location.href = 'mailto:' + mail
}
function fetchLabSecretaryList() {
  try {
    request.get(api.listLabAll).then((res) => {
      labs.value = res.data // 保存全部 labs 数据
      labs.value.forEach((lab) => { // 为每个 lab 添加 secretarys 属性
        request.get(api.listSecretaryByLabID,{
          params:{
            labID: lab.LabID
          }
        }).then((res) => {
          lab.Secretarys = res.data
        })
      })
    })
  } catch (e) {
    console.log(e)
  }
}

function fetchSecretarysList() {
  try {
    request.get(api.listSecretaryAll).then((res) => {
      secretarys.value = res.data
    })
  } catch (e) {
    console.log(e)
  }
}
function fetchSecretaryService() {
  try {
    request.get(api.listSecretaryAll).then((res) => {
      secretarysService.value = res.data
      console.log(secretarysService.value)
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
      :placement="direction"
      class="mb-10 mx-32"
  >
    <n-drawer-content title="录入秘书">
      <!-- 新增实验室表单 -->
      <n-form ref="formRef" :model="SecretaryToAddModel" class="mt-5">
        <n-grid :cols="2" :x-gap="32">
          <n-gi>
            <n-form-item path="name" label="名称">
              <n-input v-model:value="SecretaryToAddModel.name" @keydown.enter.prevent/>
            </n-form-item>
          </n-gi>
          <n-gi>
            <n-form-item path="officeArea" label="办公室面积">
              <n-input v-model:value="SecretaryToAddModel.office_area" @keydown.enter.prevent/>
            </n-form-item>
          </n-gi>
          <n-gi>
            <n-form-item path="address" label="地址">
              <n-input v-model:value="SecretaryToAddModel.address" @keydown.enter.prevent/>
            </n-form-item>
          </n-gi>
          <n-gi>
            <n-form-item path="researchDirection" label="研究方向">
              <n-input v-model:value="SecretaryToAddModel.research_direction" @keydown.enter.prevent/>
            </n-form-item>
          </n-gi>
        </n-grid>
        <n-button @click="confirmAddLab">新增！</n-button>
      </n-form>
    </n-drawer-content>
  </n-drawer>
  <div class="h-full relative" id="container">
    <h1 class="text-6xl text-emerald-600 font-bold mb-4">秘书</h1>
    <div class="flex justify-between items-center mb-4">
<!--      <input v-model="searchQuery" class="border border-gray-300 rounded px-4 py-2 w-1/2" type="text"-->
<!--             placeholder="Search Labs" />-->

    </div>
    <div v-for="lab in labs" class="pb-4">
      <div class="flex justify-between">
        <div class="text-2xl pb-4">{{lab.Name}}</div>
<!--        <button class="bg-primary-500 hover:bg-primary-600 text-white rounded px-6 my-1.5"-->
<!--                @click="drawer = true">-->
<!--          录入秘书-->
<!--        </button>-->
      </div>

      <el-table :data="lab.Secretarys || []" border >
        <el-table-column prop="Secretaryid" label="秘书 ID" />
        <el-table-column prop="Name" label="姓名" />
        <el-table-column prop="Gender" label="性别" />
        <el-table-column prop="Age" label="年龄" />
        <el-table-column prop="Mobilephone" label="移动电话" />
        <el-table-column prop="Emailaddress" label="电邮" />
        <el-table-column fixed="right" label="Operations" width="120">
          <template  #default="{row}">
            <el-button link type="primary" size="small" @click="handleEmail(row.Emailaddress)">电邮</el-button>
<!--            <el-button link type="primary" size="small">编辑</el-button>-->
          </template>
        </el-table-column>
      </el-table>
      <n-divider/>
    </div>


  </div>
</template>

<style>
/* Add any custom styles here */
</style>
