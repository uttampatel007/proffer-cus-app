<template>
    <div>
        <div class="card">
            <ion-grid>
                <ion-row>
                    <ion-col size="8">
                        <div>
                            <span class="offer-type">{{props.offerType}}</span>
                            <br>
                            <span class="offer-title">{{props.offerTagLine}}</span>
                            <br>
                            <span class="offer-validity">{{props.offerExpiryLine}}</span>
                            <div class="business-card-info" v-if="props.BusinessName">
                                <div class="divider"></div>
                                <div class="business-promo">
                                    <BusinessPromo 
                                        :BusinessName="props.BusinessName"
                                        :BusinessAddress="props.BusinessAddress"
                                        :BusinessLogo="props.BusinessLogo"
                                    />
                                </div>
                            </div>
                        </div>
                    </ion-col>
                    <ion-col id="col-card-img">
                        <div class="card-image" v-if="props.offerImage">
                            <ion-img
                                :src=props.offerImage>
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
    IonRow, IonCol, IonImg, IonGrid
} from '@ionic/vue';
import BusinessPromo from "../components/BusinessPromo.vue"

const props = defineProps([
    "offerType", "offerTagLine", "offerImage", "offerExpiryLine",
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

.offer-type {
    color: #6B6A6A;
    font-size: 10px;
}

.offer-validity {
    color: #6B6A6A;
    font-size: 13px;
}

/* .business-promo {
} */
</style>