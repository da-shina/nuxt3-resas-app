<script lang="ts" setup>
//import { Prefectures } from '~/types'
const runtimeConfig = useRuntimeConfig();
const { data, error, pending } = await useFetch(
  runtimeConfig.public.API_BASE_URL + "prefectures",
  {
    headers: {
      "X-API-KEY": runtimeConfig.API_KEY,
    },
  }
);
console.log("error", error.value);
console.log('data', data.value);

/*
  definePageMeta({
    key: 'index',
    show: false,
    currentItem: ref(null),
  })
  */
const currentItem = ref<any>(null);
const show = ref<boolean>(false);
</script>

<template>
  <div>
    <h1>都道府県の人口構成</h1>
    <h2>都道府県</h2>
    <p v-if="error">エラー：{{ error }}</p>
    <p v-else-if="pending">ロード中...</p>
    <ul v-else>
      <PrefectureListItem
        v-for="item in data.result"
        :key="item.prefCode"
        :prefCode="item.prefCode"
        :prefName="item.prefName"
        @click="
          currentItem = item;
          show = true;
        "
      />
    </ul>
    <h2>人口構成</h2>
    <LazyPopulationPane
      v-if="show && currentItem"
      :prefName="currentItem.prefName"
      :prefCode="currentItem.prefCode"
    />
  </div>
</template>

<style scoped></style>
