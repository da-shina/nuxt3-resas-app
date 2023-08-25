<script lang="ts" setup>
const runtimeConfig = useRuntimeConfig();
const { data, pending, error } = await useFetch(
  "/api/v1/population/composition/perYear",
  {
    baseURL: runtimeConfig.public.API_BASE_URL,
    headers: {
      "X-API-KEY": runtimeConfig.API_KEY,
    },
    query: {
      cityCode: "-",
      prefCode: 1,
    },
  }
);
console.log("error", error.value);
console.log("data", data.value.result.data);
</script>

<template>
  <div>
    <h1>都道府県の人口構成</h1>
    <div class="flex">
      <table v-for="item1 in data.result.data">
        <caption>
          {{
            item1.label
          }}
        </caption>
        <tbody>
          <tr>
            <th>年</th>
            <th>人口</th>
            <th>率</th>
          </tr>
          <tr v-for="item in item1.data">
            <td>{{ item.year }}</td>
            <td>{{ item.value }}</td>
            <td>{{ item.rate }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.flex {
  display: flex;
}
.flex > * {
  flex: 1;
}
</style>
