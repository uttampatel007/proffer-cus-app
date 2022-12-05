<template>
    <div class="business-details" @click="redirect()">
        <div class="business-img">
            <ion-img :src=props.BusinessLogo>
            </ion-img>
        </div>
        <div class="business-data">
            <span class="business-title">{{props.BusinessName}}</span>
            <span v-if="props.BusinessAddress" class="business-address">{{props.BusinessAddress}}</span>
        </div>
    </div>
</template>

<script setup>
import {
    IonImg
} from '@ionic/vue';
import { defineProps } from 'vue';
import router from "../router";
import { modalController } from "@ionic/vue";

const props = defineProps([
    "BusinessId", "BusinessName", "BusinessAddress", "BusinessLogo", "redirectEnable"
])

async function redirect(){
    if (props.redirectEnable){
        router.push({"name":"businessProfile", "params":{"businessId":props.BusinessId}})
        await modalController.dismiss();
    }
}

</script>

<style>

.business-details {
    display: flex;
}
.business-details .business-data {
    padding-left: 5px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: left;
    
}

.business-img {
    width: 40px;
    height: 40px;
    min-height: 40px;
    min-width: 40px;
    /* border: 1px solid black; */
    border-radius: 50%;
    overflow: hidden;
}

.business-img ion-img {
    object-fit: cover;
    height: 100%;
    width: 100%;
}
.business-data .business-title {
    font-size: 12px;
}

.business-data .business-address {
    color: #6B6A6A;
    font-size: 10px;
}
</style>