<script lang="ts" setup>
const currentCode = useState<number>("currentCode", () => 0);
const props = defineProps<{
  prefName: string;
  prefCode: number;
}>();
const isChecked = ref(false);

//他のチェックボックスが選択された時、自身のチェックを解除
watch(currentCode, () => {
  if (currentCode.value != props.prefCode) {
    isChecked.value = false;
  }
});
</script>

<template>
  <div class="flex-child">
    <input
      type="checkbox"
      v-bind:id="prefCode.toString"
      v-model="isChecked"
      v-bind:value="prefCode.toString"
    />
    <label v-bind:for="prefCode.toString">{{ prefName }}</label>
  </div>
</template>

<style scoped>
.flex-child {
  flex: none;
}
</style>
