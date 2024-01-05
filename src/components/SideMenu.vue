<template>
    <a-menu
      id="dddddd"
      v-model:openKeys="openKeys"
      v-model:selectedKeys="selectedKeys"
      class=" h-[98%] w-64 bg-gray-50 font-medium p-3 mt-2" mode="inline"
      :items="items"
      @click="handleClick"
    ></a-menu>
</template>
<script setup>
import {reactive, ref, watch, h, onBeforeMount} from 'vue';
  import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons-vue';
  import { useRouter } from 'vue-router';
  import { MainStore } from "../store/index.js";

  const store = MainStore();
const router = useRouter();
  const selectedKeys = ref(['/Dashboard']);
  const openKeys = ref(['/Dashboard']);
  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }
  const items = ref([])
  const items1 = ref([
    getItem('工作台', 'Dashboard', () => h(SettingOutlined)),
    getItem('实验室管理', 'sub1', () => h(AppstoreOutlined), [
      getItem('实验室', 'Labs'),
      getItem('办公室', 'Office'),
      getItem('秘书', 'Secretary'),
      getItem('合作方', 'Partners'),
      getItem('质量检测方', 'QM'),
      // getItem('查看实验室', 'g2', null, [getItem('Option 3', '3'), getItem('Option 4', '4')], 'group'),
    ]),
    getItem('研究员', 'sub2', () => h(AppstoreOutlined), [
      getItem('研究员管理', 'Researchers'),
      getItem('成果管理', 'Achievements'),
    ]),
    getItem('项目管理', 'Projects', () => h(AppstoreOutlined)),

  ]);

  const items2 = ref([
  getItem('工作台', 'Dashboard'),
  getItem('成果管理', 'Achievements'),
  getItem('项目管理', 'Projects'),
  getItem('实验室', 'Labs'),
]);
  const handleClick = selected => {
    router.push({
      name: selected.key,
    })
  };

  watch(openKeys, val => {
    console.log('openKeys', val);
  });

  onBeforeMount(() => {
    if (store.role == 0) {
      items.value = items1.value
    } else {
      items.value = items2.value
    }
  });
  </script>