<template>
    <ion-page>
        <ion-content :fullscreen="true">
            <CurvedImage />
            <div class="brand-heading">
                <BrandTitle />
            </div>
            <div class="address-form">
                <ion-label>Select City</ion-label>
                <form class="" @submit.prevent="createBusinessAddress()">
                    <ion-item>
                        <ion-label position="stacked">State</ion-label>
                        <ion-select aria-required="required" @ionChange="getCity($event)">
                            <ion-select-option v-for="item in state.arr" :key="item.state_id"
                                :value='{ "state_id": item.state_id, "name": item.name }'>
                                {{ item.name }}
                            </ion-select-option>
                        </ion-select>
                    </ion-item>
                    <ion-item>
                        <ion-label position="stacked">City</ion-label>
                        <ion-select aria-required="required" id="one"
                            @ionChange="business_address.city = $event.target.value">
                            <ion-select-option v-for="ci in city.arr" :key="ci.city_id"
                                :value='{ "city_id": ci.city_id, "name": ci.name }'>
                                {{ ci.name }}
                            </ion-select-option>
                        </ion-select>
                    </ion-item>
                    <br>
                    <InputValidationText :text=validationMsg /><br>
                    <ion-button type="submit" shape="round">NEXT</ion-button>
                </form>
            </div>
        </ion-content>
    </ion-page>
</template>

<script setup>
import {
    IonPage, IonContent, IonItem,
    IonLabel, IonSelect, IonSelectOption, IonButton,
} from '@ionic/vue';
import { ref, reactive, onMounted } from 'vue';

import router from "../../router";
import World from '../../services/business/world';
import TokenService from "../../utils/TokenService"

import InputValidationText from '../../components/InputValidationText.vue'
import CurvedImage from "../../components/CurvedImage.vue"
import BrandTitle from "../../components/BrandTitle.vue"


const validationMsg = ref("")
const country = reactive({ "arr": [] })
const state = reactive({ "arr": [] })
const city = reactive({ "arr": [] })

const business_address = reactive({
    "state": null,
    "city": null,
})

async function getCountryState() {
    const response = await new World().getCountryStates()
    country.arr = response.data
    state.arr = response.data[0].states
}

const getCity = async ($event) => {
    business_address.state = $event.target.value
    business_address.city = ""
    // get cities of state
    const response = await new World().getCity(business_address.state.state_id)
    city.arr = response.data
}

async function createBusinessAddress() {
    if (business_address.state === null) {
        validationMsg.value = "Please select state!"
    }
    else if (business_address.city === null || business_address.city === "") {
        validationMsg.value = "Please select city!"
    }
    else {
        console.log(business_address.city)
        // save cus address in local storage

        localStorage.setItem('business_address_city', business_address.city.name)
        localStorage.setItem('business_address_state', business_address.state.name)

        await TokenService.updateCusAddress({
            "state": { "state_id": business_address.state.state_id, "name": business_address.state.name },
            "city": { "city_id": business_address.city.city_id, "name": business_address.city.name }
        })
        router.push("/tabs/home")
    /// done
    }
}

onMounted(async () => {
    if (localStorage.getItem('business_address_state') && localStorage.getItem('business_address_city')) {
      router.push("/tabs/home");
    } 
    await getCountryState()

})
</script>

<style>
.address-form {
    text-align: center;
    padding-top: 40px;
}

.brand-heading {
    text-align: center;
}
</style>