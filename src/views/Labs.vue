<template>
  <div class="container">
    <h1 class="text-2xl font-bold mb-4">Lab Management</h1>
    <div class="flex justify-between items-center mb-4">
      <input
        v-model="searchQuery"
        class="border border-gray-300 rounded px-4 py-2 w-1/2"
        type="text"
        placeholder="Search Labs"
      />
      <button
        class="bg-blue-500 hover:bg-blue-600 text-white rounded px-4 py-2"
        @click="createLabModalVisible = true"
      >
        Create Lab
      </button>
    </div>
    <a-table :columns="columns" :data-source="data" @change="onChange"></a-table>
  </div>
</template>

<script setup>
import {ref } from 'vue';

const columns = ref([
  {
    title: 'Name',
    dataIndex: 'name',
    filters: [
      {
        text: 'Joe',
        value: 'Joe',
      },
      {
        text: 'Category 1',
        value: 'Category 1',
        children: [
          {
            text: 'Yellow',
            value: 'Yellow',
          },
          {
            text: 'Pink',
            value: 'Pink',
          },
        ],
      },
      {
        text: 'Category 2',
        value: 'Category 2',
        children: [
          {
            text: 'Green',
            value: 'Green',
          },
          {
            text: 'Black',
            value: 'Black',
          },
        ],
      },
    ],
    filterMode: 'tree',
    filterSearch: true,
    onFilter: (value, record) => record.name.includes(value),
    width: '30%',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: 'Address',
    dataIndex: 'address',
    filters: [
      {
        text: 'London',
        value: 'London',
      },
      {
        text: 'New York',
        value: 'New York',
      },
    ],
    onFilter: (value, record) => record.address.startsWith(value),
    filterSearch: true,
    width: '40%',
  },
])
const data = ref([
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: '4',
    name: 'Jim Red',
    age: 32,
    address: 'London No. 2 Lake Park',
  },
])

</script>

<style>
/* Add any custom styles here */
</style>
