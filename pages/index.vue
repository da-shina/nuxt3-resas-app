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
//console.log("error", error.value);
//console.log("data", data.value);

const currentPrefCode = ref<number>(0);
const currentPopulationData = ref<any>(null);

watch(currentPrefCode.value, async () => {
  const { data, pending, error } = await useFetch(
    runtimeConfig.public.API_BASE_URL + "population/composition/perYear",
    {
      headers: {
        "X-API-KEY": runtimeConfig.API_KEY,
      },
      query: {
        prefCode: currentPrefCode.value,
        cityCode: "-",
      },
    }
  );
  console.log("prefCode", currentPrefCode.value);
  console.log("error", error.value);
  console.log("data", data.value);
  //currentPopulationData = data.value.result.data;
});
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
        @click="currentPrefCode = item.prefCode"
      />
    </ul>
    <h2>人口構成</h2>
    <PopulationPane
      v-if="currentPopulationData"
      :prefCode="currentPrefCode"
      :populationData="currentPopulationData"
    />
  </div>
</template>

<style scoped></style>
