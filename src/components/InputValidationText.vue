<template>
    <span class="validation-text">{{props.text}}</span>
</template>
  
<script setup>
import { defineProps } from 'vue';

const props = defineProps(['text'])

</script>
  
<style scoped>
.validation-text {
    color: red;
    margin-top: 5px;
    margin-bottom: 5px;
}
</style>
  