<script lang="ts" setup>
const runtimeConfig = useRuntimeConfig();
const { data, error, pending } = await useFetch("/api/v1/prefectures", {
  baseURL: runtimeConfig.public.API_BASE_URL,
  headers: {
    "X-API-KEY": runtimeConfig.API_KEY,
  },
});
//console.log("error", error.value);
//console.log("data", data.value);

const currentPrefCode = ref<any>(null);
const currentPopulationData = ref<any>(null);

watch(currentPrefCode, async () => {
  const { data, pending, error } = await useFetch(
    "/api/v1/population/composition/perYear",
    {
      baseURL: runtimeConfig.public.API_BASE_URL,
      headers: {
        "X-API-KEY": runtimeConfig.API_KEY,
      },
      query: {
        prefCode: currentPrefCode.value,
        cityCode: "-",
      },
      server: true,
    }
  );
  console.log("prefCode", currentPrefCode.value);
  console.log("error", pending.value);
  console.log("data", data.value);
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
