<template>
    <div>
        <div class="card">
            <ion-grid>
                <ion-row>
                    <ion-col size="8">
                        <div>
                            <span class="coupon-type">{{props.couponType}}</span>
                            <br>
                            <span class="coupon-title">{{props.couponTagLine}}</span>
                            <br>
                            <CouponCode :couponCode="props.couponCode"/>
                            <div class="business-card-info" v-if="props.BusinessName">
                                <div class="business-promo">
                                    <BusinessPromoBig
                                        :BusinessName="props.BusinessName"
                                        :BusinessLogo="props.BusinessLogo"
                                    />
                                </div>
                            </div>
                        </div>
                    </ion-col>
                    <ion-col id="col-card-img">
                        <div class="card-image" v-if="props.couponImage">
                            <ion-img
                                :src=props.couponImage>
                            </ion-img>
                        </div>
                    </ion-col>
                </ion-row>
            </ion-grid>

        </div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';

import {
    IonRow, IonCol, IonImg, IonGrid,
} from '@ionic/vue';
import CouponCode from './CouponCode.vue';

import BusinessPromoBig from "../components/BusinessPromoBig.vue"

const props = defineProps([
    "couponType", "couponTagLine", "couponImage", "couponCode",
    "BusinessName", "BusinessAddress", "BusinessLogo"
])

</script>

<style>
.divider {
    border: 0.4px solid #0000002e;
    margin-top: 5px;
    margin-bottom: 5px;
}

.card {
    border: 0.001px solid black;
    border-radius: 10px;
    height: 100%;
    width: 100%;
    margin-bottom: 8px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    transition: all 0.3s cubic-bezier(.25,.8,.25,1);
}

#col-card-img {
    display: flex;
    align-items: center;
}

.card-image {
    /* border: 0.1px solid black; */
    border-radius: 10px;
    overflow: hidden;
    width: 100%;
    padding-top: 100%;

    /* 1:1 Aspect Ratio */
    position: relative;
}

.card-image ion-img {
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
}

.coupon-type {
    color: #6B6A6A;
    font-size: 10px;
}
/* .business-promo {
} */
</style>