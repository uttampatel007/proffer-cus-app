<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="home" href="/tabs/home">
          <ion-icon :icon="storefront" />
          <ion-label>Offers</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="coupon" href="/tabs/coupon">
          <ion-icon :icon="ticket" />
          <ion-label>Coupons</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="setting" href="/tabs/setting">
          <ion-icon :icon="settings" />
          <ion-label>Settings</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script >
import { defineComponent } from 'vue';
import {
  IonTabBar, IonTabButton, IonTabs,
  IonLabel, IonIcon, IonRouterOutlet, IonPage
} from '@ionic/vue';
import { ticket, settings, storefront } from 'ionicons/icons';

export default defineComponent({
  name: 'TabsPage',
  components: {
    IonPage, IonTabBar, IonTabButton, IonTabs,
    IonLabel, IonIcon, IonRouterOutlet
  },
  setup() {
    return {
      ticket,
      settings,
      storefront,
    }
  }
});
</script>

<style>
/* ion-tab-bar{
  --background:var(--ion-color-primary)
} */
</style>
