<template>
    <ion-page>
        <div class="container-fixed">
            <div class="brand-header">
                <BrandTitle />
                <div @click="redirectAddress" class="location-header">
                    <ion-icon :icon="locationOutline" size="small"></ion-icon>
                    {{ cityName }}, {{ stateName }}
                </div>
            </div>
            <!-- search bar -->
            <!-- <ion-searchbar id="searchbar" enterkeyhint="enter" mode="ios" @ionFocus="() => showSearch = true"
                placeholder="Search Shop/Business" @ionChange="handleSearch($event)" :debounce="600"></ion-searchbar> -->

            <!-- search results -->
            <div class="search-result" v-if="showSearch">
                <!-- <p>Recent searches</p> -->
                <div v-for="business in businessSearchResult.results" :key="business.id">
                    <BusinessPromo :BusinessId="business.id" :BusinessLogo="business.logo" :BusinessName="business.name"
                        :redirectEnable="true" />
                    <br>
                </div>
                <div v-if="noResult">
                    <p>{{ noResult }}</p>
                </div>
            </div>
            <!-- location filter -->
            <div>
                <div class="location-filter">
                    <ion-grid>
                        <ion-row class="ion-justify-content-between">
                            <ion-col>
                                <ion-item>
                                    <ion-icon :icon="funnelOutline" size="small" color="white"></ion-icon>
                                    <ion-select placeholder="Category" :multiple="true"
                                        @ionChange="getCatValues($event)">
                                        <ion-select-option v-for="cat in categories" :key="cat.id" :value=cat.id>{{
                                                cat.name
                                        }}
                                        </ion-select-option>
                                    </ion-select>
                                </ion-item>
                            </ion-col>
                            <!-- <ion-col>
                                <ion-item>
                                    <ion-icon :icon="funnelOutline" size="small"></ion-icon>
                                    <ion-select placeholder="Offer Type" :multiple="true"
                                        @ionChange="getCatValues($event)">
                                        <ion-select-option v-for="cat in categories" :key="cat.id" :value=cat.id>{{
                                                cat.name
                                        }}
                                        </ion-select-option>
                                    </ion-select>
                                </ion-item>
                            </ion-col> -->
                        </ion-row>
                    </ion-grid>

                </div>

            </div>
        </div>
        <ion-content>
            <div class="container" v-if="offerData">
                <div>
                    <h6>Offers</h6>
                </div>
                <!-- <div class="home-offer-list-header">
                    <p>Offers</p>
                </div> -->
                <!-- card listing -->
                <div class="card-listing" v-for="offer in offerData" :key="offer.id"
                    @click="openModal(offer.id, offer.offer_type_label, offer.business_address, offer.business_name, offer.business_logo)">
                    <OfferListCard :offerType="offer.offer_type_label" :offerTagLine="offer.tag_line"
                        :offerExpiryLine="offer.offer_expiry_line" :offerImage="offer.offer_image"
                        :BusinessName="offer.business_name" :BusinessAddress="offer.business_address"
                        :BusinessLogo="offer.business_logo" />
                </div>
            </div>
        </ion-content>
    </ion-page>
</template>

<script setup>
import { reactive, ref } from 'vue';
import {
    IonPage, IonIcon,
    IonItem, IonSelect, IonSelectOption,
    IonContent, IonGrid, IonCol, IonRow,
    // IonSearchbar, 
    modalController, onIonViewWillEnter
} from '@ionic/vue';
import { locationOutline, funnelOutline } from 'ionicons/icons';

import BrandTitle from "../../components/BrandTitle.vue";
import OfferListCard from "../../components/OfferListCard.vue";
import Offer from "../../services/offer/offer";
// import Business from "../../services/business/business"
import TokenService from "../../utils/TokenService";
import BusinessPromo from "../../components/BusinessPromo.vue";
import typeCate from '../../services/business/typeCate';
import router from '../../router';

const showSearch = ref(false)
const offerData = ref([])
const cityName = ref("")
const stateName = ref("")
const cityId = ref(null)
const noResult = ref("")

const redirectAddress = function () {
    router.push({ "name": "customerAddress" })
}

const categories = ref([])

async function loadFilterCategory() {
    const response = await new typeCate().getBusinessCategory()
    if (response.code === 200) {
        categories.value = response.data
    }
}

async function getCatValues($event) {
    loadCityOffers($event.detail.value)
}

async function loadCityOffers(categories) {
    // get city id from local storage
    const address = await TokenService.getCity()
    cityId.value = address['city_id']
    cityName.value = address["city_name"]
    stateName.value = address["state_name"]

    var response = []
    // get response
    if (categories) {
        response = await new Offer().getCityOffer(cityId.value, categories)
    } else {
        response = await new Offer().getCityOffer(cityId.value)
    }

    if (response.code === 200) {
        offerData.value = response.data
    }
}

async function openModal(offerId, offerType, BusinessAddress, BusinessName, BusinessLogo) {
    const modal = await modalController.create({
        component: require('@/components/OfferDetailModal.vue').default,
        componentProps: {
            "offerId": offerId, "offerType": offerType, "BusinessName": BusinessName,
            "BusinessAddress": BusinessAddress, "BusinessLogo": BusinessLogo
        },
        initialBreakpoint: 1,
        showBackdrop: true,
        canDismiss: true,
        handle: true,
        keyboardClose: true,
    });
    return await modal.present();
}

const businessSearchResult = reactive({ "results": [] })

// async function handleSearch($event) {
//     if ($event.target.value.trim().length > 0) {
//         const response = await new Business().searchBusiness(
//             $event.target.value, cityId.value)
//         businessSearchResult.results = response
//         showSearch.value = true
//         if (response.length < 1) {
//             noResult.value = "No results found"
//         }
//     }
//     else {
//         businessSearchResult.results = []
//         showSearch.value = false
//         noResult.value = ""
//     }
// }

loadFilterCategory()
onIonViewWillEnter(() => {
    loadCityOffers()
});
loadCityOffers()

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