

<!-- CURRENTLY NOT IN USE -->

<!-- FILTER MODAL -->


<template>
    <ion-modal ref="modal" trigger="filter-modal" :initial-breakpoint="0.85" :breakpoints="[0, 0.25, 0.85, 0.75]">
    <ion-content class="ion-padding">
        <div class="category">
            <h5>Filter by category</h5>
            <ion-item v-for="cat in categories" :key="cat.id">
                <ion-label>{{ cat.name }} {{cat.checked}}</ion-label>
                <ion-checkbox slot="start" :checked="cat.checked" @ionChange="manageChecks($event, cat)"></ion-checkbox>
            </ion-item>
            <ion-button @click="emitCategory()" shape="round" size="small">Apply</ion-button>
        </div>
    </ion-content>
    </ion-modal>
</template>
  
<script setup>
import {
    IonLabel, IonItem, IonButton,
    IonContent, IonCheckbox, IonModal
} from '@ionic/vue';
import { ref } from 'vue';
import typeCate from '../services/business/typeCate';
// import { modalController } from "@ionic/vue";

const categories = ref([])
// const props = defineProps(["checkedCat"])

async function loadCategory() {
    const response = await new typeCate().getBusinessCategory()
    if (response.code === 200) {
        categories.value = response.data
        // if (props.checkedCat.length !== 0){
        //     selectedCategories.value = props.checkedCat;
        //     categories.value.forEach(
        //         elem => props.checkedCat.includes(elem.id) ? elem.checked=true : elem.checked=false
        //     )
        // }
    }
}

// const selectedCategories = ref([])

// async function manageChecks($event, cat) {
//     var index = categories.value.indexOf(cat)

//     if ($event.target.checked) {
//         selectedCategories.value.push(cat.id)
//         categories.value[index].checked = true

//         // await modalController.dismiss(cat.id);
//     }
//     else {
//         // selectedCategories.value = selectedCategories.value.filter(e => e !== cat.id)
//     }
// }


async function emitCategory() {
    // await modalController.dismiss(selectedCategories.value);
}


loadCategory()

// onBeforeUnmount(() => { emitCategory() });


</script>

<style>
ion-modal {
    --border-radius: 8px !important;
}

.category ion-item {
    --inner-border-width: 0px 0px 0px 0px !important;
    --padding-start: 0px;
}

.category ion-item ion-checkbox::part(container) {
    border-radius: 6px;
    border: 1px solid;
}
</style>