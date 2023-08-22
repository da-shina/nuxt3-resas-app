<script lang="ts" setup>
  //import { Prefectures } from '~/types'
  const runtimeConfig = useRuntimeConfig();
  const { data: posts } = await useFetch(
    runtimeConfig.public.API_BASE_URL + "prefectures", {
      headers: {
        'X-API-KEY': runtimeConfig.API_KEY,
      },
    }
  );
  console.log(posts.value.result);
</script>

<template>
  <div>
    <h1>都道府県一覧</h1>
    <PrefectureListItem
      v-for="post in posts.value"
      :key="post.prefCode"
      :prefName="post.prefName"
    />
  </div>
</template>

<style scoped></style>
