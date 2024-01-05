<script setup>
import { ref, onBeforeMount } from 'vue';
import request from '../utils/request';
import {MainStore} from "../store/index.js";
import {NGradientText} from "naive-ui";
import {NStatistic, NNumberAnimation} from "naive-ui";
import api from "../utils/api.js";

const store = MainStore()
const overview = ref({
  labCount: 0,
  researcherCount: 0,
  projectCount: 0,
})

onBeforeMount(() => {
  request.get(api.overview).then((res) => {
    overview.value = res
  })
})
</script>

<template>
<div>
  <h2 class="text-6xl">👏🏻欢迎使用
    <n-gradient-text :size="60" type="success">
      科研管理系统
    </n-gradient-text>
  </h2>
  <iframe class="text-xl" scrolling="no" src="https://widget.tianqiapi.com/?style=tu&skin=pitaya" frameborder="0" width="300" height="25" allowtransparency="true"></iframe>

  <n-statistic class="text-xl pt-10" label="系统共储存了" tabular-nums>
    <div>
      <n-number-animation ref="numberAnimationInstRef" :from="0" :to="overview.labCount" duration="5000" /> 个研究室
    </div>
    <div><n-number-animation ref="numberAnimationInstRef" :from="0" :to="overview.researcherCount" duration="5000" /> 位研究员</div>
    <div><n-number-animation ref="numberAnimationInstRef" :from="0" :to="overview.projectCount" duration="5000" /> 个项目</div>
    <template>
      位研究员
    </template>
  </n-statistic></div>

</template>

<style scoped>

</style>