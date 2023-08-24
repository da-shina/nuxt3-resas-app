<script lang="ts" setup>
const props = defineProps<{
  prefName: string;
  prefCode: number;
  populationData: any;
}>();

/*
const runtimeConfig = useRuntimeConfig();
const { data, pending, error } = await useFetch(
  runtimeConfig.public.API_BASE_URL + "population/composition/perYear",
  {
    headers: {
      "X-API-KEY": runtimeConfig.API_KEY,
    },
    query: {
      cityCode: "-",
      prefCode: props.prefCode,
    },
  }
);
console.log("props.prefCode", props.prefCode);
console.log("error", error.value);
console.log("data", data.value.result.data);
*/
</script>

<template>
  <h3>{{ prefName }} の人口推移</h3>
  <table>
    <tr>
      <td>{{ populationData }}</td>
    </tr>
  </table>
</template>
