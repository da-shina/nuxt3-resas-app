<script lang="ts" setup>
    const props = defineProps<{
        prefName: string
        prefCode: number
    }>();
</script>
<template>
    <li>
        <input type="checkbox" v-bind:id="prefCode" v-model="isChecked" v-bind:value="prefCode">
        <label v-bind:for="prefCode">{{ prefName }}</label>
    </li>
</template>