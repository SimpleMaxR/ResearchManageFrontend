<script setup>
import { ref, onBeforeMount } from 'vue';
import {NButton, NDrawer, NDrawerContent, NForm, NFormItem, NGi, NGrid, NInput} from 'naive-ui'
import request from '../utils/request';
import api from "../utils/api.js";

onBeforeMount(() => {
  fetchPartnerList()
  console.log(partners.value)
})
const searchQuery = ref('')
const partners = ref([])
const drawer = ref(false)
const direction = ref("bottom")

function executeSearch(event) {
  console.log('executeSearch: ' + searchQuery.value)
  event.target.blur()
}

function createLabModalVisible() {
  console.log('createLabModalVisible')
}

function fetchPartnerList() {
  try {
    request.get(api.listPartnerAll).then((res) => {
      partners.value = res.data
      console.log(partners.value)
    })
  } catch (e) {
    console.log(e)
  }
}


</script>

<template>


  <div class="container h-full scroll-auto relative" id="container"  >
    <h1 class="text-6xl text-emerald-600 font-bold mb-4">合作方</h1>
    <div class="flex justify-between items-center mb-4">
<!--      <input v-model="searchQuery" class="border border-gray-300 rounded px-4 py-2 w-1/2" type="text"-->
<!--             placeholder="请输入合作方编号"-->
<!--            @keyup.enter="executeSearch($event)"-->
<!--      />-->
    </div>
    <el-table :data="partners" border >
      <el-table-column prop="Partnerid" label="合作方编号" width="180" />
      <el-table-column prop="Name" label="姓名" />
      <el-table-column prop="Leaderid" label="负责人编号" />
      <el-table-column prop="Officephone" label="办公电话" />
    </el-table>
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
      <n-drawer-content title="录入合作方">
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

  </div>
</template>

<style>
/* Add any custom styles here */
</style>
