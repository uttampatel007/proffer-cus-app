<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>{{businessName}}</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">
            <ion-header collapse="condense">
                <ion-toolbar>
                    <ion-title size="large">Tab 1</ion-title>
                </ion-toolbar>
            </ion-header>
            <ion-fab vertical="bottom" horizontal="end" slot="fixed">
                <ion-fab-button @click="() => router.push('/tabs/tab3')">
                    <ion-icon :icon="add"></ion-icon>
                </ion-fab-button>
            </ion-fab>
        </ion-content>
    </ion-page>
</template>

<script setup>
import { ref } from 'vue';
import router from "../router";
// import { Geolocation } from '@capacitor/geolocation';
import {
    IonPage, IonHeader, IonToolbar, IonTitle,
    IonContent, IonFab, IonFabButton, IonIcon,
} from '@ionic/vue';
import {add,} from 'ionicons/icons';
import TokenService from "../utils/TokenService"

const businessName = ref("")
// const printCurrentPosition = async () => {
//   const coordinates = await Geolocation.getCurrentPosition();

//   console.log('Current position:', coordinates);
// };
async function loadHomePage(){
    const user = await TokenService.getUser()
    console.log(user.business[0].name)
    businessName.value = user.business[0].name
}

loadHomePage()
</script>
