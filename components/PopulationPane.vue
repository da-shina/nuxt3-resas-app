<script lang="ts" setup>
const props = defineProps<{
  prefName: string;
  prefCode: number;
}>();

const runtimeConfig = useRuntimeConfig();
const { data, error, pending } = await useFetch(
  runtimeConfig.public.API_BASE_URL + "population/composition/perYear",
  {
    headers: {
      "X-API-KEY": runtimeConfig.API_KEY,
    },
    query: {
      cityCode: "-",
      prefCode: props.prefCode,
    },
    async onRequestError({ request, options, error }) {
      console.log("[fetch request error]", request, options, error);
    },
    async onResponseError({ request, response, options }) {
      console.log(
        "[fetch respons error]",
        request,
        response.status,
        response.body
      );
    },
  }
);
console.log("props.prefCode", props.prefCode);
console.log("error", error.value);
console.log("data", data.value);
</script>
<template>
  <h3>{{ prefName }} の人口推移</h3>
  <table>
    <tr>
      <td>{{ data }}</td>
    </tr>
  </table>
</template>
