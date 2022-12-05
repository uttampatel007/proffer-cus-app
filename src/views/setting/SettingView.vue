<template>
    <ion-page>
        <div class="container-fixed">
            <div class="brand-header">
                <BrandTitle />
            </div>
        </div>
        <ion-content>
            <div class="container">
                <div>
                    <h6>Settings</h6>
                </div>
                <!-- <ion-list lines="full">
                    <div>
                        <h6>Settings</h6>
                    </div>
                    <ion-item>
                        <ion-note slot="start">
                            <ion-icon :icon="shieldCheckmarkOutline" size="large" />
                        </ion-note>
                        <ion-label>About</ion-label>
                    </ion-item>
                    <ion-item>
                        <ion-note slot="start">
                            <ion-icon :icon="mailOpenOutline" size="large" />
                        </ion-note>
                        <ion-label>Contacts</ion-label>
                    </ion-item>
                    <ion-item>
                        <ion-note slot="start">
                            <ion-icon :icon="shareSocialOutline" size="large" />
                        </ion-note>
                        <ion-label>Share</ion-label>
                    </ion-item>
                </ion-list> -->
                <ion-accordion-group>
                    <ion-accordion value="first">
                        <ion-item slot="header" lines="none">
                            <ion-note slot="start">
                                <ion-icon :icon="shieldCheckmarkOutline" size="large" />
                            </ion-note>
                            <ion-label>About</ion-label>
                        </ion-item>
                        <div class="ion-padding" slot="content">
                            {{about}}
                        </div>
                    </ion-accordion>
                    <ion-accordion value="second">
                        <ion-item slot="header">
                            <ion-note slot="start">
                                <ion-icon :icon="mailOpenOutline" size="large" />
                            </ion-note>
                            <ion-label>Contact</ion-label>
                        </ion-item>
                        <div class="ion-padding" slot="content">
                            {{contact}}
                        </div>
                    </ion-accordion>
                </ion-accordion-group>
                <ion-item slot="header" lines="none">
                    <ion-note slot="start">
                        <ion-icon :icon="shareSocialOutline" size="large" />
                    </ion-note>
                    <ion-label>Share</ion-label>
                </ion-item>
            </div>
        </ion-content>
    </ion-page>
</template>

<script setup>
import { ref } from 'vue';
import {
    IonPage,
    IonContent,
    IonIcon,
    // IonListHeader,
    // IonList,
    IonItem,
    IonNote,
    IonLabel,
    IonAccordion,
    IonAccordionGroup,
    // IonSearchbar, 
    // modalController, 
    onIonViewWillEnter
} from '@ionic/vue';
import {
    shieldCheckmarkOutline,
    mailOpenOutline, shareSocialOutline
} from 'ionicons/icons';

import BrandTitle from "../../components/BrandTitle.vue";
import AppData from "../../services/common/appData"

const contact = ref("")
const about = ref("")
const share = ref("")

async function loadAppData(){
    const response = await new AppData().getAppData()
    if (response.code == 200){
        for (const [, value] of Object.entries(response.data))
        {   
            if (value.key === "about"){
                about.value = value.value
            }
            else if (value.key === "contact"){
                contact.value = value.value
            }
            else if (value.key === "share"){
                share.value = value.value
            }
        }
    }
}

onIonViewWillEnter(() => {
    loadAppData()}
);
</script>

<style>
.item-background-color {
    --ion-item-background: #015f01d5;
}
</style>
