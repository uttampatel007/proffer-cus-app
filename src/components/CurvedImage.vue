<template>
    <div class="intro-div">
        <ion-img src="/assets/images/banner.jpg"></ion-img>
    </div>
</template>

<script setup>
import { IonImg } from '@ionic/vue';

</script>

<style>
.intro-div {
border-radius: 0 0 50% 50%/0 0 15% 15%;
overflow: hidden;
}

.intro-div ion-img {
width: fit-content;
}
</style>