<template>
    <!-- <ion-modal ref="modal" trigger="detail-modal" :initial-breakpoint="0.85" :breakpoints="[0, 0.25, 0.5, 0.75]"> -->

    <ion-content class="ion-padding">
        <div class="detail-model-container">
            <!-- Offer title -->
            <h3>{{ couponDetail.tag_line }}</h3>
            <!-- Image -->
            <ion-grid>
                <ion-row>
                    <ion-col size="12" id="detail-image-col">
                        <div class="detail-image">
                            <ion-img :src=couponDetail.coupon_image>
                            </ion-img>
                        </div>
                    </ion-col>
                </ion-row>
            </ion-grid>
            <!-- Business Name and Address -->
            <div class="business-promo">
                <BusinessPromoBig :BusinessId="couponDetail.business" :BusinessLogo="props.BusinessLogo"
                    :BusinessName="props.BusinessName"
                    :redirectEnable="true" />
            </div>
            <div class="coupon-code-detail">
                <CouponCode :couponCode="couponDetail.coupon_code"/>
            </div>
            <div class="offer-info">
                <ul class="offer-info-list">
                    <li>Type : <span>{{ props.couponType }}</span></li>
                    <li>Valid Till: <span>{{ new Date(couponDetail.valid_until).toLocaleDateString("en-US", {
                            weekday:
                                'long', year: 'numeric', month: 'long', day: 'numeric'
                        })
                    }}</span></li>
                    <li>Description: <br> <span>{{ couponDetail.description }}</span></li>
                    <li>T & C: <br> <span>{{ couponDetail.t_and_c }}</span></li>
                </ul>
            </div>
        </div>
    </ion-content>
    <ion-fab slot="fixed" vertical="bottom" horizontal="end">
        <ion-fab-button @click="redirectHome()">
            <ion-icon :icon="chevronBackOutline"></ion-icon>
        </ion-fab-button>
    </ion-fab>
    <!-- </ion-modal> -->
</template>
  
<script setup>

import { ref, defineProps } from 'vue';
import {
    IonGrid, IonRow, IonFab, IonFabButton, IonIcon,
    IonContent, IonImg, IonCol,
} from '@ionic/vue';
import { modalController } from "@ionic/vue";
import { chevronBackOutline } from 'ionicons/icons';
import BusinessPromoBig from "../components/BusinessPromoBig.vue"
import CouponCode from './CouponCode.vue';
import Coupon from '../services/coupon/coupon';

const props = defineProps(["couponId", "couponType", "BusinessLogo", "BusinessName", "BusinessAddress"])
const couponDetail = ref({})

async function loadCouponDetail() {
    let response = await new Coupon().getCoupon(props.couponId)
    if (response.code === 200) {
        couponDetail.value = response.data
    }
}

async function redirectHome() {
    await modalController.dismiss()
}

loadCouponDetail()
</script>

<style>
/* ion-modal {
    --border-radius: 8px !important;
} */

.detail-model-container h3 {
    text-align: center;
}

#detail-image-col {
    width: 100%;
    max-width: 100%;
}

.detail-image {
    /* border: 0.01px solid black; */
    border-radius: 10px;
    overflow: hidden;
    width: 100%;
    padding-top: 100%;
    /* 1:1 Aspect Ratio */
    position: relative;
    /* width: auto;
    height: 100%; */
    /* height: 66px;
    width: 66px; */
    margin-bottom: 15px;
}

.detail-image ion-img {
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
}

.offer-info-list {
    list-style: none;
    padding-left: 0px;
    line-height: 30px;
    margin-bottom: 50px;
}

.offer-info-list li {
    text-align: justify;
}

.offer-info-list span {
    color: #6B6A6A;
    font-size: 14px;
}

.coupon-code-detail {
    margin-top: 15px;
}
</style>
