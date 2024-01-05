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
  NInputNumber, NModal
} from "naive-ui";
import api from "../utils/api.js";

onBeforeMount(() => {
  fetchOfficesList()
})
const searchQuery = ref('')
const addDrawer = ref(false)
const direction = ref("bottom")
const showEdit = ref(false)

// 从后端接收到的数据
const offices = ref([])
const labs = ref([])

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
const officeAddModel = ref({
  "LabId": null,
  "Area": 0,
  "Address": "",
  "ManagerId": "",
})

const officeModel = ref({
  "Officeid": null,
  "LabID": null,
  "Area": null,
  "Address": "",
  "Managerid": null,
})

function confirmAdd() {
  request.post(api.createOffice, officeAddModel.value).then((res) => {
    console.log(res)
    addDrawer.value = false
    fetchOfficesList()
  })
}

function submitChange() {
  request.put(api.updateOffice, officeModel.value).then((res) => {
    showEdit.value = false
    fetchOfficesList()
  })
}

function handleShowDetail(row) {
  console.log(row)
}

function fetchOfficesList() {
  try {
    request.get(api.listLabAll).then((res) => {
      labs.value = res.data
      labs.value.forEach((lab) => {
        request.get(api.listOfficeByLabID,{
          params:{
            labid: lab.LabID
          }
        }).then((res)=>{
          lab.Office = res.data
        })
      })
    })
  } catch (e) {
    console.log(e)
  }
}


</script>

<template>
  <!-- 新建办公室弹窗 -->
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
      <n-form ref="formRef" :model="officeAddModel" class="mt-5">
        <n-grid :cols="2" :x-gap="32">
          <n-gi>
            <n-form-item path="Address" label="地址">
              <n-input v-model:value="officeAddModel.Address" @keydown.enter.prevent/>
            </n-form-item>
          </n-gi>
          <n-gi>
            <n-form-item path="ManagerId" label="管理者 ID">
              <n-input-number v-model:value="officeAddModel.ManagerId" :show-button="false"/>
            </n-form-item>
          </n-gi>
          <n-gi>
            <n-form-item path="Area" label="办公室面积">
              <n-input-number v-model:value="officeAddModel.Area" clearable :precision="1" />
            </n-form-item>
          </n-gi>
        </n-grid>
        <n-button @click="confirmAdd">新增！</n-button>
      </n-form>
    </n-drawer-content>
  </n-drawer>

<!--  编辑办公室弹窗 -->
  <n-modal v-model:show="showEdit" class="bg-gray-100 rounded-lg p-4">
    <n-card class="p-0 w-fit">
      <n-card-header>
        <span class="text-2xl">编辑办公室</span>
      </n-card-header>
      <n-form ref="formRef" :model="officeModel" class="mt-5">
        <n-grid :cols="3" :x-gap="32">
          <n-gi>
            <n-form-item path="Officeid" label="Officeid">
              <n-input-number v-model:value="officeModel.Officeid" :show-button="false"/>
            </n-form-item>
          </n-gi>
          <n-gi>
          <n-form-item path="LabId" label="LabID">
              <n-input-number v-model:value="officeModel.LabID" :show-button="false"/>
            </n-form-item>
          </n-gi>
          <n-gi>
            <n-form-item path="Area" label="Area">
              <n-input-number v-model:value="officeModel.Area" precision="1"/>
            </n-form-item>
          </n-gi>
          <n-gi>
            <n-form-item path="Address" label="Address">
              <n-input v-model:value="officeModel.Address" @keydown.enter.prevent/>
            </n-form-item>
          </n-gi>
          <n-gi>
            <n-form-item path="ManagerId" label="ManagerId">
              <n-input-number v-model:value="officeModel.Managerid" :show-button="false"/>
            </n-form-item>
          </n-gi>
        </n-grid>
        <n-button @click="submitChange">确认更改</n-button>
      </n-form>
    </n-card>
  </n-modal>

  <div class="relative" id="container">
    <h1 class="text-6xl text-emerald-600 font-bold mb-4">办公室</h1>
    <div class="flex justify-between items-center mb-4">
    </div>

    <div v-for="lab in labs" class="pb-4">
      <div class="flex justify-between">
        <div class="text-2xl pb-4">{{lab.Name}}</div>
        <button class="bg-primary-500 hover:bg-primary-600 text-white rounded px-6 my-1.5"
                @click="addDrawer = true; officeAddModel.LabId = lab.LabID; console.log(officeAddModel)">
          录入办公室
        </button>
      </div>

      <el-table :data="lab.Office || []" border >
        <el-table-column prop="Officeid" label="办公室 ID" />
        <el-table-column prop="LabID" label="所属实验室 ID" />
        <el-table-column prop="Area" label="平方" />
        <el-table-column prop="Address" label="地址" />
        <el-table-column prop="Managerid" label="负责人 ID" />
        <el-table-column fixed="right" label="Operations" width="120">
          <template  #default="{row}">
            <el-button link type="primary" size="small" @click="showEdit = true; officeModel = row">Edit</el-button>
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
