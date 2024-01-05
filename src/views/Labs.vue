<script setup>
import { ref, onBeforeMount } from 'vue';
import request from '../utils/request';
import {NDrawer, NDrawerContent, NCard, NForm, NGrid, NGi, NFormItem, NInput, NButton, NInputNumber} from "naive-ui";
import {NModal, NResult} from "naive-ui";
import api from "../utils/api.js";

onBeforeMount(() => {
  fetchLabList()
})
const searchQuery = ref('')
const labs = ref([])
const labToDelete = ref(null)
const drawer = ref(false)
const direction = ref("bottom")
const showEdit = ref(false)
const deleteConfirm = ref(false)

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
const labModel = ref({
  "id": null,
  "name": "",
  "address": "",
})

function handleClickDelete(row) {
  labToDelete.value = row;
  console.log(labToDelete.value)
  deleteConfirm.value = true
}

function confirmAddLab() {
  request.post(api.createLab, labModel.value).then((res) => {
    drawer.value = false
    fetchLabList()
  })
}

function submitChange(){
  request.put(api.updateLab, labModel.value).then((res) => {
    showEdit.value = false
    fetchLabList()
  })
}

function handleSearch() {
  console.log(searchQuery.value)
  request.get(api.listLabByName, {params: {name: searchQuery.value}}).then((res) => {
    labs.value = res.data
  })
}

function handleDelete() {
  console.log(labToDelete.value)
  request.delete(api.deleteLab, {data: {LabId: labToDelete.value.LabID}}).then((res) => {
    fetchLabList()
  })
}

function fetchLabList() {
  try {
    request.get(api.listLabAll).then((res) => {
      labs.value = res.data
    })
  } catch (e) {
    console.log(e)
  }
}


</script>

<template>
<!--  删除前提醒-->
  <n-modal v-model:show="deleteConfirm" title="确认" transform-origin="center">
    <n-result class="bg-gray-50 p-16" status="warning" title="确认删除吗">
      <template #footer>
        <n-button @click="deleteConfirm = false; handleDelete()">删！ (￣▽￣)و</n-button>
      </template>
    </n-result>
  </n-modal>


  <!-- 新建实验室弹窗 -->
  <n-drawer
      resizable
      v-model:show="drawer"
      :width="200"
      :height="600"
      :trap-focus="false"
      :block-scroll="false"
      :placement="direction"
      class="mb-10 mx-16"
  >
    <n-drawer-content title="新建实验室">
      <!-- 新增实验室表单 -->
      <n-form ref="formRef" :model="labModel" class="mt-5">
        <n-grid :cols="2" :x-gap="32">
          <n-gi>
            <n-form-item path="name" label="名称">
              <n-input v-model:value="labModel.name" @keydown.enter.prevent/>
            </n-form-item>
          </n-gi>
          <n-gi>
            <n-form-item path="officeArea" label="办公室面积">
              <n-input-number v-model:value="labModel.office_area" clearable :precision="1" />
            </n-form-item>
          </n-gi>
          <n-gi>
            <n-form-item path="address" label="地址">
              <n-input v-model:value="labModel.address" @keydown.enter.prevent/>
            </n-form-item>
          </n-gi>
          <n-gi>
            <n-form-item path="researchDirection" label="研究方向">
              <n-input v-model:value="labModel.research_direction" @keydown.enter.prevent/>
            </n-form-item>
          </n-gi>
        </n-grid>
        <n-button @click="confirmAddLab">新增！</n-button>
      </n-form>
    </n-drawer-content>
  </n-drawer>

  <!-- 编辑实验室弹窗 -->
  <n-modal v-model:show="showEdit" class="bg-gray-100 rounded-lg p-4">
    <n-card class="p-0 w-fit">
      <n-card-header>
        <span class="text-2xl">编辑实验室</span>
      </n-card-header>
      <n-form ref="formRef" :model="labModel" class="mt-5">
        <n-grid :cols="3" :x-gap="32">
          <n-gi>
            <n-form-item path="name" label="Name">
              <n-input v-model:value="labModel.Name" @keydown.enter.prevent/>
            </n-form-item>
          </n-gi>
          <n-gi>
            <n-form-item path="OfficeArea" label="Description">
              <n-input v-model:value="labModel.OfficeArea" @keydown.enter.prevent/>
            </n-form-item>
          </n-gi>
          <n-gi>
            <n-form-item path="Address" label="Address">
              <n-input v-model:value="labModel.Address" @keydown.enter.prevent/>
            </n-form-item>
          </n-gi>
          <n-gi>
            <n-form-item path="ResearchDirection" label="ResearchDirection">
              <n-input v-model:value="labModel.ResearchDirection" @keydown.enter.prevent/>
            </n-form-item>
          </n-gi>
        </n-grid>
        <n-button @click="submitChange">确认更改</n-button>
      </n-form>
    </n-card>
  </n-modal>

  <div class="relative" id="container">
    <h1 class="text-6xl text-emerald-600 font-bold mb-4">实验室管理</h1>
    <div class="flex justify-between items-center mb-4">
      <input v-model="searchQuery" class="border border-gray-300 rounded px-4 py-2 w-1/2" type="text"
        placeholder="Search Labs" @keyup.enter="handleSearch"/>
      <button class="bg-primary-500 hover:bg-primary-600 text-white rounded px-4 py-2"
        @click="drawer = true">
        新建实验室
      </button>
    </div>
    <el-table :default-sort="{ prop: 'LabID', order: 'descending' }" :data="labs" border >
      <el-table-column prop="LabID" label="实验室 ID" sortable/>
      <el-table-column prop="Name" label="名称" sortable/>
      <el-table-column prop="OfficeArea" label="主办公地" sortable/>
      <el-table-column prop="Address" label="地址" />
      <el-table-column prop="ResearchDirection" label="研究方向" />
      <el-table-column fixed="right" label="操作" width="120">
        <template  #default="{row}">
          <el-button link type="primary" size="small" @click="showEdit = true; labModel = row">Edit</el-button>
          <el-button link type="primary" size="small" @click="handleClickDelete(row)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>



<style>
/* Add any custom styles here */
</style>
