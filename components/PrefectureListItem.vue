<template>
  <div class="prefecture-item">
    <v-checkbox
      :model-value="checked"
      :label="name"
      density="compact"
      hide-details
      @update:model-value="$emit('update:checked', $event)"
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  name: string
  checked: boolean
  value: string | number
}>()

defineEmits<{
  'update:checked': [value: boolean]
}>()
</script>

<style scoped>
.prefecture-item {
  display: inline-block;
  min-width: 120px;
  padding: 4px;
}
</style>
