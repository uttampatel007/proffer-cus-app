<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>MAA BUSINESS</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">
            <div class="business-form">
                <ion-title size="large">Register Business</ion-title>
                <br>

                {{business_details}}
                <br>
                <form class="" @submit.prevent="createBusinessDetails()">
                    <ion-item>
                        <ion-label position="stacked">Business Name</ion-label>
                        <ion-input required v-model="business_details.name"></ion-input>
                    </ion-item>
                    <ion-item>
                        <ion-label position="stacked">Email</ion-label>
                        <ion-input required type="email" v-model="business_details.email"></ion-input>
                        <!-- <ion-note slot="helper">Enter a valid email</ion-note>
                        <ion-note slot="error">Invalid email</ion-note> -->
                    </ion-item>
                    <ion-item>
                        <ion-label position="stacked">Type</ion-label>
                        <ion-select required @ionChange="business_details.type = $event.target.value">
                            <ion-select-option v-for="item in business_type.arr" :key="item.id" :value="item.id">
                                {{item.name}}</ion-select-option>
                        </ion-select>
                    </ion-item>
                    <ion-item>
                        <ion-label position="stacked">Category</ion-label>
                        <ion-select required @ionChange="business_details.category = $event.target.value">
                            <ion-select-option v-for="item in business_category.arr" :key="item.id" :value="item.id">
                                {{item.name}}
                            </ion-select-option>
                        </ion-select>
                    </ion-item>
                    <br>
                    <InputValidationText :text=validationMsg /><br>
                    <ion-button type="submit" shape="round">Next</ion-button>
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
import typeCate from '../../services/business/typeCate';
import InputValidationText from '../../components/InputValidationText.vue'
import Business from "../../services/business/business"
import router from "../../router";
import TokenService from "../../utils/TokenService"


const validationMsg = ref("")
const business_type = reactive({ "arr": [] })
const business_category = reactive({ "arr": [] })

const business_details = reactive({
    "name": "Try Name",
    "email": "emaul@gamil.com",
    "type": "1",
    "category": "2",
    "user":""
})

async function getTypeCategory() {
    const response = await new typeCate().getBusinessType()
    business_category.arr = response.data.business_category
    business_type.arr = response.data.business_type
}

async function createBusinessDetails(){
    const response = await new Business().createBusiness(business_details)
    if (response.code === 200){
        validationMsg.value = ""
        await TokenService.updateUserBusiness(response.data.business)
        router.push({
                name:"create-business-address",
        })
    } else {
        validationMsg.value = response[0]
    }
}

onMounted(async () => {
    await getTypeCategory()
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