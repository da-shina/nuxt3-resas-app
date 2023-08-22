<script lang="ts" setup>
    const props = defineProps<{
        prefName: string
        prefCode: number
    }>();
</script>
<template>
    <div>{{ prefName }}</div>
</template>