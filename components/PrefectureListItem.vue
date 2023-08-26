<script lang="ts" setup>
const currentCode = useState("currentCode", () => 0);
const props = defineProps<{
  prefName: string;
  prefCode: number;
}>();
const isChecked = ref(false);

//他のチェックボックスが選択された時、自身のチェックを解除
watch(currentCode, () => {
  if (currentCode.value != props.prefCode.value) {
    isChecked.value = false;
  }
});
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
