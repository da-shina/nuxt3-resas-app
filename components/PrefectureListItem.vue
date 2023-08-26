<script lang="ts" setup>
const props = defineProps<{
  prefName: string;
  prefCode: number;
}>();
const isChecked = ref(false);
</script>

<template>
  <div class="flex-child">
    <input
      type="checkbox"
      v-bind:id="prefCode"
      v-model="isChecked"
      v-bind:value="prefCode"
    />
    <label v-bind:for="prefCode">{{ prefName }}</label>
  </div>
</template>

<style scoped>
.flex-child {
  flex: none;
}
</style>
