<script setup>
import {useRouter} from "vue-router";
import request from "../utils/request.js";
import api from "../utils/api.js";
import {onBeforeMount, ref} from "vue";
import {NCard, NGradientText, NSpace} from "naive-ui";

const router = useRouter();
const id = ref(router.currentRoute.value.query.id);
const name = ref(router.currentRoute.value.query.name);
const researchers = ref([]);

function fetchProjectDetail() {
  request.get(api.listProjectResearcher, {
    params: {
      projectId: id.value
    }
  }).then((res) => {
    res.data.forEach((researcherId) => {
      request.get(api.listResearcherByID, {
        params: {
          id: researcherId
        }
      }).then((res) => {
        researchers.value.push(res.data)
      })
    })
  });
}

onBeforeMount(() => {
  fetchProjectDetail();
});
</script>

<template>


  <div class="h-full">
    <h2 class="text-5xl">
      <n-gradient-text :size="60" type="success">
        {{ name }}
      </n-gradient-text>
    </h2>
    <div class="text-2xl">
      <div>项目成员：
        <n-space class="my-2">
          <n-card v-for="researcher in researchers" :key="researcher.Researcherid" size="small"
                  class="transition ease-in-out delay-800 hover:-translate-y-2  hover:scale-115 hover:shadow-xl bg-emerald-50 hover:bg-emerald-200 overflow-hidden"
          >
            <h2 class="text-xl" style="margin-top: 5px">{{ researcher.Name }}</h2>
            <p class="my-2">职称 ： {{ researcher.Title }}</p>
            <p class="my-2">研究方向 ： {{ researcher.Researchdirection }}</p>
            <p class="my-2">性别 ： {{ researcher.Gender }}</p>
            <p class="my-2">电邮 ： {{ researcher.Emailaddress }}</p>
          </n-card>
        </n-space>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>