<script lang="ts" setup>
const currentCode = useState("currentCode", () => 0);
const currentName = useState("currentName", () => "");
const prefData = ref<any>(null);

//現在の都道府県コードが変更された際、APIから該当の都道府県の人口構成を取得
watch(currentCode, async () => {
  const runtimeConfig = useRuntimeConfig();
  const { data, error } = await useFetch<any>("/api/population", {
    query: {
      prefCode: currentCode.value,
      cityCode: "-",
    },
  });
  prefData.value = data.value.result;
});
</script>

<template>
  <div v-if="prefData">
    <h2>{{ currentName }} の人口構成</h2>
    <p>※実績値と推計値の区切り年：{{ prefData.boundaryYear }}</p>
    <div class="flex">
      <table v-for="level_1 in prefData.data">
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
  </div>
</template>

<style scoped>
.flex {
  display: flex;
}
.flex > table {
  flex: 1;
  border: solid 1px;
}
td,
th {
  text-align: right;
}
</style>
