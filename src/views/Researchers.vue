<script setup>
import {onBeforeMount, ref} from 'vue';
import request from '../utils/request';
import {
  NButton,
  NCard,
  NDivider,
  NDrawer,
  NDrawerContent,
  NForm,
  NFormItem,
  NGi,
  NGrid,
  NInput,
  NInputNumber,
  NModal, NResult,
  NSwitch
} from "naive-ui";
import api from "../utils/api.js";

onBeforeMount(() => {
  fetchResearcherList()
})

const searchQuery = ref('')
const addDrawer = ref(false)
const direction = ref("bottom")
const showEdit = ref(false)
const researcherToDelete = ref(null)
const deleteConfirm = ref(false)

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
const researcherAddModel = ref({
  "LabId":null,
  "ResearcherNumber": "",
  "Name":"",
  "Gender":"",
  "Title":"",
  "Age":null,
  "Email": "",
  "Leader": false,
  "StartDate": "",
  "Term": null,
  "Researchdirection": ""
})

const researcherModel = ref({
  "LabId": null,
  "Name": "",
  "Gender": "",
  "Title": "",
  "Age": null,
  "Researchdirection": "",
  "Leader": null,
  "ResearcherID": null
})

function handleClickDelete(row) {
  researcherToDelete.value = row;
  deleteConfirm.value = true
}


function confirmAdd() {
  request.post(api.createResearcher, researcherAddModel.value).then((res) => {
    console.log(res)
    addDrawer.value = false
    fetchResearcherList()
  })
}

function submitChange() {
  request.put(api.updateResearcher, researcherModel.value).then((res) => {
    showEdit.value = false
    fetchResearcherList()
  })
}

function handleDelete() {
  console.log(researcherToDelete.value)
  request.delete(api.deleteResearcher, {params: {id: researcherToDelete.value.Researcherid}}).then((res) => {
    fetchResearcherList()
  })
}

function fetchResearcherList() {
  try {
    request.get(api.listLabAll).then((res) => {
      res.data = res.data.sort((a, b) => {
        return a.LabID - b.LabID
      })
      labs.value = res.data
      labs.value.forEach((lab) => {
        request.get(api.listResearcherByLabID, {
          params: {
            labid: lab.LabID
          }
        }).then((res) => {
          lab.Researcher = res.data
        })
      })
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

  <!-- 新建科研人员弹窗 -->
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
    <n-drawer-content title="录入科研人员">
      <!-- 新增科研人员表单 -->
      <n-form ref="formRef" :model="researcherAddModel" class="mt-5">
        <n-grid :cols="3" :x-gap="32">
          <n-gi>
            <n-form-item path="Name" label="Name">
              <n-input v-model:value="researcherAddModel.Name"/>
            </n-form-item>
          </n-gi>
          <n-gi>
            <n-form-item path="Number" label="Number">
              <n-input v-model:value="researcherAddModel.ResearcherNumber"/>
            </n-form-item>
          </n-gi>
          <n-gi>
            <n-form-item path="Gender" label="Gender">
              <n-input v-model:value="researcherAddModel.Gender"/>
            </n-form-item>
          </n-gi>
          <n-gi>
            <n-form-item path="Title" label="Title">
              <n-input v-model:value="researcherAddModel.Title"/>
            </n-form-item>
          </n-gi>
          <n-gi>
            <n-form-item path="Age" label="Age">
              <n-input-number v-model:value="researcherAddModel.Age" precision="0"/>
            </n-form-item>
          </n-gi>
          <n-gi>
            <n-form-item path="Email" label="Email">
              <n-input v-model:value="researcherAddModel.Email"/>
            </n-form-item>
          </n-gi>
          <n-gi>
            <n-form-item path="StartDate" label="StartDate">
              <n-input v-model:value="researcherAddModel.StartDate"/>
            </n-form-item>
          </n-gi>
          <n-gi>
            <n-form-item path="Term" label="Term">
              <n-input-number v-model:value="researcherAddModel.Term" precision="0" clearable/>
            </n-form-item>
          </n-gi>
          <n-gi>
            <n-form-item path="Researchdirection" label="Researchdirection">
              <n-input v-model:value="researcherAddModel.Researchdirection"/>
            </n-form-item>
          </n-gi>
          <n-gi>
            <n-form-item path="Leader" label="Leader">
              <n-switch v-model:value="researcherAddModel.Leader" />
            </n-form-item>
          </n-gi>
        </n-grid>
        <n-button @click="confirmAdd">新增！</n-button>
      </n-form>
    </n-drawer-content>
  </n-drawer>

  <!--  编辑科研人员弹窗 -->
  <n-modal v-model:show="showEdit" class="bg-gray-100 rounded-lg p-4">
    <n-card class="p-0 w-fit">
      <span class="text-2xl">编辑人员信息</span>
      <n-form ref="formRef" :model="researcherModel" class="mt-5">
        <n-grid :cols="3" :x-gap="32">
          <n-gi>
            <n-form-item path="Name" label="Name">
              <n-input v-model:value="researcherModel.Name"/>
            </n-form-item>
          </n-gi>
          <n-gi>
            <n-form-item path="LabId" label="LabId">
              <n-input-number v-model:value="researcherModel.LabId" :show-button="false"/>
            </n-form-item>
          </n-gi>
          <n-gi>
            <n-form-item path="Gender" label="Gender">
              <n-input v-model:value="researcherModel.Gender"/>
            </n-form-item>
          </n-gi>
          <n-gi>
            <n-form-item path="Title" label="Title">
              <n-input v-model:value="researcherModel.Title"/>
            </n-form-item>
          </n-gi>
          <n-gi>
            <n-form-item path="Age" label="Age">
              <n-input-number v-model:value="researcherModel.Age" precision="0" :show-button="false"/>
            </n-form-item>
          </n-gi>
          <n-gi>
            <n-form-item path="Researchdirection" label="Researchdirection">
              <n-input v-model:value="researcherModel.Researchdirection"/>
            </n-form-item>
          </n-gi>
          <n-gi>
            <n-form-item path="Leader" label="Leader">
              <n-switch v-model:value="researcherModel.Leader" />
            </n-form-item>
          </n-gi>
          <n-gi>
            <n-form-item path="ResearcherID" label="ResearcherID">
              <n-input-number v-model:value="researcherModel.ResearcherID" :disabled="showEdit" :show-button="false"/>
            </n-form-item>
          </n-gi>
        </n-grid>
        <n-button @click="submitChange">确认更改</n-button>
      </n-form>
    </n-card>
  </n-modal>

  <div class="relative" id="container">
    <h1 class="text-6xl text-emerald-600 font-bold mb-4">科研人员</h1>
    <div class="flex justify-between items-center mb-4">
    </div>

    <div v-for="lab in labs" class="pb-4">
      <div class="flex justify-between">
        <div class="text-2xl pb-4">{{ lab.Name }}</div>
        <button class="bg-primary-500 hover:bg-primary-600 text-white rounded px-6 my-1.5"
                @click="addDrawer = true; researcherAddModel.LabId = lab.LabID; console.log(researcherAddModel)">
          录入人员
        </button>
      </div>

      <el-table :data="lab.Researcher || []" border>
        <el-table-column prop="Researcherid" label="研究员 ID"/>
        <el-table-column prop="ResearcherNumber" label="研究员工号"/>
        <el-table-column prop="Name" label="姓名"/>
        <el-table-column prop="Gender" label="性别"/>
        <el-table-column prop="Title" label="职称"/>
        <el-table-column prop="Age" label="年龄"/>
        <el-table-column prop="Emailaddress" label="电邮"/>
        <el-table-column prop="Startdate" label="就任日期"/>
        <el-table-column prop="Term" label="任期"/>
        <el-table-column prop="Researchdirection" label="研究方向"/>
        <el-table-column fixed="right" label="Operations" width="120">
          <template #default="{row}">
            <el-button link type="primary" size="small"
                       @click="showEdit = true; researcherModel = row; researcherModel.LabId = row.LabID; researcherModel.ResearcherID = row.Researcherid;">Edit
            </el-button>
            <el-button link type="danger" size="small"
                       @click="handleClickDelete(row)">Delete
            </el-button>
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
