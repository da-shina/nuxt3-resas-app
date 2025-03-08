<script setup lang="ts">
import type { Prefectures } from '~/types'

const selectedPrefectures = useState<Set<number>>("selectedPrefectures", () => new Set());

//APIより都道府県リストを取得
const { data: prefecturesData } = await useAsyncData<{ result: Prefectures[] }>("prefectures", () =>
  $fetch<{ result: Prefectures[] }>("/api/prefectures")
);

const handlePrefectureChange = (prefCode: number, checked: boolean): void => {
  const newSet = new Set(selectedPrefectures.value);
  if (checked) {
    newSet.add(prefCode);
  } else {
    newSet.delete(prefCode);
  }
  selectedPrefectures.value = newSet;
};
</script>

<template>
  <div>
    <h1>都道府県の人口構成</h1>
    <h2>都道府県</h2>
    <div class="prefecture-grid">
      <PrefectureListItem
        v-for="item in prefecturesData?.result"
        :key="item.prefCode"
        :name="item.prefName"
        :checked="selectedPrefectures.has(item.prefCode)"
        :value="item.prefCode"
        @update:checked="(checked: boolean) => handlePrefectureChange(item.prefCode, checked)"
      />
    </div>
    <PopulationPane :selected-prefectures="Array.from(selectedPrefectures)" />
  </div>
</template>

<style scoped>
.prefecture-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 4px;
  padding: 8px;
}
</style>
