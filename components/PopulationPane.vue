<script lang="ts" setup>
const currentCode = useState("currentCode", () => 0);
const currentName = useState("currentName", () => "");
const prefData = ref<any>(null);

watch(currentCode, async () => {
  const runtimeConfig = useRuntimeConfig();
  const { data } = await useFetch("/api/population", {
    query: {
      prefCode: currentCode.value,
      cityCode: "-",
    },
  });
  prefData.value = data;
});
</script>

<template>
  <h2>{{ currentName }} の人口推移</h2>
  <div class="flex" v-if="prefData">
    <table v-for="level_1 in prefData.result.data">
      <caption>
        {{
          level_1.label
        }}
      </caption>
      <tbody>
        <tr>
          <th>年</th>
          <th>人口</th>
          <th>率</th>
        </tr>
        <tr v-for="level_2 in level_1.data">
          <td>{{ level_2.year }}</td>
          <td>{{ level_2.value }}</td>
          <td>{{ level_2.rate }}</td>
        </tr>
      </tbody>
    </table>
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
