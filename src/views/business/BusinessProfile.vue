<template>
    <ion-page>
        <div class="container-fixed">
            <BrandTitle />
        </div>
        <ion-content>
            <div class="container">
                <div class="business-card">
                    <ion-grid>
                        <ion-row>
                            <ion-col id="col-business-card-img">
                                <div class="business-card-image">
                                    <ion-img :src=businessData.logo>
                                    </ion-img>
                                </div>
                            </ion-col>
                            <ion-col size="8">
                                <div>
                                    <h6 class="bus-name">{{ businessData.name }}</h6>
                                    <span class="bus-address">{{ businessAddress.address_line1 }},<br>
                                        {{ businessAddress.address_line2 }},<br>
                                        {{ businessCity.name }}<br>
                                        {{ businessState.name }}</span>
                                </div>
                            </ion-col>
                        </ion-row>
                    </ion-grid>
                </div>
                <div class="business-data">
                    <ul>
                        <li>Category: <span>{{ businessCategory.name }}</span></li>
                        <li>Type: <span>{{ businessType.name }}</span></li>
                        <li>Mobile no: <span>{{ businessData.mobile_no }}</span></li>
                        <li>Email: <span>{{ businessData.email }}</span></li>
                    </ul>
                </div>
                <div class="active-offers">
                    <h5>Active offers</h5>
                    <div class="divider-dark"></div>
                    <div class="card-listing" v-for="offer in businessOffers" :key="offer.id"
                        @click="openModal(offer.id, offer.offer_type_label, offer.business_address, offer.business_name, offer.business_logo)">
                        <OfferListCard :offerType="offer.offer_type_label" :offerTagLine="offer.tag_line"
                            :offerImage="offer.offer_image"/>
                    </div>
                </div>
            </div>
        </ion-content>
    </ion-page>
</template>

<script setup>
import {
    IonPage, IonContent, IonImg, IonGrid, IonRow, IonCol,
} from '@ionic/vue';
import BrandTitle from "../../components/BrandTitle.vue"
import OfferListCard from "../../components/OfferListCard.vue"
import Offer from "../../services/offer/offer"
import { useRoute } from 'vue-router';
import { ref } from 'vue';
import { modalController } from "@ionic/vue";

const businessData = ref({})
const businessOffers = ref([])
const businessAddress = ref([])
const businessCity = ref({})
const businessState = ref({})
const businessCategory = ref({})
const businessType = ref({})

async function getProfileData() {
    const route = useRoute();
    const businessId = route.params["businessId"]
    const response = await new Offer().getBusinessProfile(businessId)
    if (response.code === 200) {
        businessData.value = response.data.business_data
        businessAddress.value = response.data.business_data.address[0]
        businessCity.value = response.data.business_data.address[0].city
        businessState.value = response.data.business_data.address[0].state
        businessCategory.value = response.data.business_data.category
        businessType.value = response.data.business_data.type

        businessOffers.value = response.data.active_offers
    }
}
getProfileData()

async function openModal(offerId, offerType, BusinessAddress, BusinessName, BusinessLogo) {
    const modal = await modalController.create({
        component: require('@/components/OfferDetailModal.vue').default,
        componentProps:{
            "offerId":offerId, "offerType":offerType, "BusinessName":BusinessName, 
            "BusinessAddress":BusinessAddress, "BusinessLogo":BusinessLogo
        },
        initialBreakpoint: 1,
        canDismiss: true,
        handle: true,
        keyboardClose: true,
        showBackdrop: true,
    });
    return modal.present();
}
</script>

<style>
.container-fixed {
    padding: 0px 10px 10px 10px;
}

.container {
    padding: 10px;
}

.business-card-image {
    border: 0.01px solid black;
    border-radius: 10px;
    overflow: hidden;
    width: 100%;
    padding-top: 100%;

    /* 1:1 Aspect Ratio */
    position: relative;
}

.business-card-image ion-img {
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
}

.bus-name {
    margin: 0px 0px 5px 0px;
}

.bus-address {
    color: #6B6A6A;
    font-size: 1em;
}

.business-data ul {
    list-style: none;
    padding-left: 0px;
}

.business-data ul li {
    line-height: 22px;
}

.business-data ul li span {
    color: #6B6A6A;
}

.divider-dark {
    border: 0.4px solid #0000002e;
    margin-top: 5px;
    margin-bottom: 5px;
}
</style>