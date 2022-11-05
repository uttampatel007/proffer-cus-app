<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>proffer</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">
            <div class="business-form">
                <ion-title size="large">Register Address</ion-title>
                <br>
              
                <form class="" @submit.prevent="createBusinessAddress()">
                    <ion-item>
                        <ion-label position="stacked">Address Line 1</ion-label>
                        <ion-input required v-model="business_address.address_line1"></ion-input>
                    </ion-item>
                    <ion-item>
                        <ion-label position="stacked">Address Line 2</ion-label>
                        <ion-input required v-model="business_address.address_line2"></ion-input>
                    </ion-item>
                    <ion-item>
                        <ion-label position="stacked">Pin Code</ion-label>
                        <ion-input maxlength="6" required v-model="business_address.pin_code"></ion-input>
                    </ion-item>
                    <ion-item>
                        <ion-label position="stacked">Country</ion-label>
                        <ion-select required @ionChange="business_address.country = $event.target.value">
                            <ion-select-option v-for="item in country.arr" :key="item.country_id" :value="item.country_id">
                                {{item.name}}</ion-select-option>
                        </ion-select>
                    </ion-item>
                    <ion-item>
                        <ion-label position="stacked">State</ion-label>
                        <ion-select required @ionChange="getCity($event)">
                            <ion-select-option v-for="item in state.arr" :key="item.state_id" :value="item.state_id">
                                {{item.name}}</ion-select-option>
                        </ion-select>
                    </ion-item>
                    <ion-item>
                        <ion-label position="stacked">City</ion-label>
                        <ion-select required id="one" @ionChange="business_address.city = $event.target.value">
                            <ion-select-option v-for="ci in city.arr" :key="ci.city_id" :value="ci.city_id">
                                {{ci.name}}
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
    IonPage, IonHeader, IonToolbar,
    IonContent, IonTitle, IonItem, IonInput,
    IonLabel, IonSelect, IonSelectOption, IonButton,
} from '@ionic/vue';

import { ref, reactive, onMounted } from 'vue';
import World from '../../services/business/world';
import InputValidationText from '../../components/InputValidationText.vue'
import Business from "../../services/business/business"
import router from "../../router";
import TokenService from "../../utils/TokenService"

const validationMsg = ref("")
const country = reactive({ "arr": [] })
const state = reactive({ "arr": [] })
const city = reactive({ "arr": [] })

const business_address = reactive({
    "address_line1": "12",
    "address_line2": "21",
    "pin_code":"212312",
    "country": "101",
    "state": "4024",
    "city":"58151",
    "business":""
})

async function getCountryState() {
    const response = await new World().getCountryStates()
    // business_category.arr = response.data.business_category
    country.arr = response.data
    state.arr = response.data[0].states
}

const getCity = async ($event) => {
    business_address.state = $event.target.value
    business_address.city = ""
    // get cities of state
    const response = await new World().getCity(business_address.state)
    city.arr = response.data
}

async function createBusinessAddress(){
    const response = await new Business().createAddress(business_address)
    console.log(response)
    if (response.code === 200){
        validationMsg.value = ""

        await TokenService.updateAddress(response.data.address)
        router.push({
                path: '/tabs/tab1'
        })
    } else if (response.code === 400 ){
        console.log(response)
        router.push({
                path: '/tabs/tab1'
        })
    }
    else {
        validationMsg.value = response[0]
    }
}

onMounted(async () => {
    await getCountryState()
})
</script>

<style>
.business-form {
    width: 80%;
    text-align: center;
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    margin: 0 auto;
}
</style>