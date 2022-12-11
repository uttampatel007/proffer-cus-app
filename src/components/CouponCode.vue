<template>
    <div class="coupon-code" v-if="props.couponCode" @click="writeToClipboard">
        <span class="code">{{ props.couponCode }} </span>
        <span class="icon">
            <ion-icon :icon="copyOutline"></ion-icon>
        </span>
    </div>
    <div class="coupon-code code-fade" v-else>
        <span>No code required!</span>
    </div>
    <ion-toast :is-open="copyToast" @didDismiss="setOpen(false)" message="Coupon code copied to clipboard!"
        :duration="1500"></ion-toast>
</template>

<script setup>
import { defineProps, ref } from 'vue';
import { copyOutline } from 'ionicons/icons';
import { Clipboard } from '@capacitor/clipboard';
import {
    IonIcon,
    IonToast
} from '@ionic/vue';
const props = defineProps(["couponCode"])
const copyToast = ref(false)

const setOpen = () => copyToast.value = true;

const writeToClipboard = async () => {
    await Clipboard.write({
        string: props.couponCode
    });
    copyToast.value = true
};

</script>

<style>
.coupon-code {
    border: 1px solid #00000047;
    text-align: center;
    margin-top: 5px;
    padding: 5px;
    border-style: dashed;
    margin-bottom: 5px;
    border-radius: 5px;
}

.coupon-code .code {
    font-size: small;
    padding-right: 10px;
}

.coupon-code .icon {
    margin-top: 101px;
    vertical-align: middle;
}

.code-fade {
    color: #000000a5;
}
</style>