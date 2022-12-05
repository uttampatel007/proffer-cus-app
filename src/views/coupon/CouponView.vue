<template>
    <ion-page>
        <div class="container-fixed">
            <div class="brand-header">
                <BrandTitle />
            </div>
        </div>
        <ion-content>
            <div class="container" v-if="couponData">
                <div>
                    <h6>Coupons</h6>
                </div>
                <div class="card-listing" v-for="coupon in couponData" :key="coupon.id"
                    @click="openModal(coupon.id, coupon.coupon_type_label, coupon.business_name, coupon.business_logo)">
                    <CouponListCard 
                        :couponType="coupon.coupon_type_label" 
                        :couponTagLine="coupon.tag_line"
                        :couponImage="coupon.coupon_image"
                        :couponCode="coupon.coupon_code"
                        :BusinessName="coupon.business_name" 
                        :BusinessAddress="coupon.business_address"
                        :BusinessLogo="coupon.business_logo" />
                </div>
            </div>
        </ion-content>
    </ion-page>
</template>

<script setup>
import { ref } from 'vue';
import {
    IonPage,
    IonContent, 
    modalController,
    onIonViewWillEnter
} from '@ionic/vue';

import BrandTitle from "../../components/BrandTitle.vue";
import CouponListCard from "../../components/CouponListCard.vue";
import Coupon from '../../services/coupon/coupon';


const couponData = ref([])

async function loadCoupon() {
    var response = []
    // get response
    response = await new Coupon().getCoupon()
    
    if (response.code === 200) {
        couponData.value = response.data
    }
}

async function openModal(couponId, couponType, BusinessName, BusinessLogo) {
    const modal = await modalController.create({
        component: require('@/components/CouponDetailModal.vue').default,
        componentProps: {
            "couponId": couponId, "couponType": couponType, 
            "BusinessName": BusinessName,
            "BusinessLogo": BusinessLogo
        },
        initialBreakpoint: 1,
        showBackdrop: true,
        canDismiss: true,
        handle: true,
        keyboardClose: true,
    });
    return await modal.present();
}

onIonViewWillEnter(() => {
    loadCoupon()
});
loadCoupon()

</script>

<style>
.brand-header {
    display: flex;
    justify-content: space-between;
}

.brand-header .location-header {
    margin-top: 15px;
}

#searchbar {
    padding-left: 0px;
    padding-right: 0px;
}

.container-fixed {
    padding: 0px 10px 0px 10px;
    /* background-color: black;
    color: white; */
    border-bottom: 1px solid #6b6a6a30;
}

.container {
    padding: 10px;
}

#filter-modal {
    text-align: right;
}

.search-result {
    padding: 0px 0px 0px 0px;
    /* box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24); */
    transition: all 0.3s cubic-bezier(.25, .8, .25, 1);
    border-radius: 10px;
    /* position: absolute; */
    width: 95%;
    z-index: 2;
    background-color: white;
}

.search-result ul {
    list-style: none;
    padding-left: 0px;
}

.search-result ul li {
    padding-bottom: 15px;
    color: #6B6A6A;
}

.location-filter ion-item {
    --border-style: none;
    --padding-start: 0px;
    font-size: 15px;
    /* --background: black;
    --color: #fff; */

}

.location-filter ion-item ion-select {
    --placeholder-opacity: 100;
}

.location-filter ion-grid {
    --ion-grid-padding: 0px;
}
.location-filter ion-col {
    --ion-grid-column-padding: 0px;
}

.container .home-offer-list-header p {
    margin-top: 0px;
    margin-bottom: 10px;
}
</style>

<!-- .location-filter2 {
    display: flex;
    justify-content: space-between;
    padding: 10px 0px 10px 0px;
}
<div class="location-filter2">
    <div class="location">
     <ion-icon :icon="locationOutline" size="small"></ion-icon>
     {{ cityName }}, {{ stateName }}
    </div>
    <div class="filter">
     <ion-icon :icon="funnelOutline" size="small"></ion-icon>
     Filter
    </div>
 </div> -->
// const checkedCategories = ref([])

// const tryChecked = ref([])

// async function openFilterModal(){
//     const modalFilter = await modalController.create({
//         component: require('@/components/FilterModal.vue').default,
//         componentProps: {"checkedCat":checkedCategories.value},
//         initialBreakpoint: .90,
//         breakpoints: [0, 0.9, .90, 0.75],
//         canDismiss: true,
//         handle: true,
//         keyboardClose: true,
//     });
//     modalFilter.onDidDismiss()
//       .then((data) => {
//         console.log(data["data"], "data")
//         // const categories = data['data']; // Here's your selected user!
//         // loadCityOffers(categories);
//         // checkedCategories.value = categories;
//         if (!tryChecked.value.includes(data["data"])){
//             tryChecked.value.push(data["data"])
//         }
//         console.log(tryChecked.value)
//     });
//     return modalFilter.present();
// }