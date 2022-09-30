<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>Auth</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">
            <ion-header collapse="condense">
                <ion-toolbar>
                    <ion-title size="large">Authentication</ion-title>
                </ion-toolbar>
            </ion-header>
            <div class="otp-form">
                <h2>Enter OTP</h2>
                <form @submit.prevent="verifyOtp()">
                    <ion-row>
                        <ion-col>
                            <ion-input id="1" maxlength="1" class="x" @keyup="handleKeyDown(2, $event)"
                                @keypress="onlyNumber($event)"></ion-input>
                            <ion-input id="2" maxlength="1" class="x" @keyup="handleKeyDown(3, $event)"
                                @keypress="onlyNumber($event)"></ion-input>
                            <ion-input id="3" maxlength="1" class="x" @keyup="handleKeyDown(4, $event)"
                                @keypress="onlyNumber($event)"></ion-input>
                            <ion-input id="4" maxlength="1" class="x" @keyup="handleKeyDown(5, $event)"
                                @keypress="onlyNumber($event)"></ion-input>
                        </ion-col>
                    </ion-row>
                    <InputValidationText :text=validationMsg /><br>
                    <ion-button type="submit" shape="round">Submit</ion-button>
                </form>
            </div>
        </ion-content>
    </ion-page>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonRow, IonCol, IonButton } from '@ionic/vue';
import CommonUtils from '../../utils/commonUtils'
import InputValidationText from '../../components/InputValidationText.vue'
import router from "../../router";
import OTPAuth from '../../services/auth/OTPAuth';
import TokenService from "../../utils/TokenService"

function onlyNumber($event) {
    new CommonUtils().onlyNumber($event)
}

const digits = reactive({})
const validationMsg = ref("")

function handleKeyDown(next, $event) {
    if (next == "5" && $event.key !== "Backspace") {
        if (digits[next] == null) {
            digits[next] = $event.target.value
        }
        // to stop further forward set focus        
        return
    }
    if (next == "2" && $event.key === "Backspace") {
        // remove all digits
        digits[next] = null

        // to stop further backward set focus   
        return
    }
    if ((new RegExp('^([0-9])$')).test($event.key)) {
        digits[next] = $event.target.value
        document.getElementById(next).setFocus()
    } else if ($event.key === "Backspace") {
        digits[next] = null
        document.getElementById(next - 2).setFocus()
    }
    // event.target.value
}

function makeOtp() {
    return Object.values(digits).map(digit => digit).join('')
}

async function verifyOtp() {
    // validate values in digits is 4
    const otp = makeOtp()
    if (otp.length !== 4) {
        validationMsg.value = "Otp should be 4 digit"
    }
    else {
        // call verify otp api
        const mobileNo = router.currentRoute.value.query.mobileNo
        const response = await new OTPAuth().verifyOTP(mobileNo, otp)
        if (response.code == 200) {
            validationMsg.value = ""
            // save token from response
            await TokenService.saveToken(response.data)
            const user = await TokenService.getUser()
            if (user.business.length === 0) {
                router.push({
                    name: "create-business"
                })
            } else if (user.business.length === 1) {
                router.push({
                    path: "/tabs/tab1"
                })
            } else {
                router.push({
                    path: "/tabs/tab2"
                })
            }

        } else {
            validationMsg.value = "OTP not matched!"
        }
    }
}

</script>

<style>
.otp-form {
    text-align: center;
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 90%;
    margin: 0 auto;
}

.x {
    display: inline-block;
    width: 50px;
    height: 50px;
    margin: 10px;
    border-bottom: 1px solid black;
    --padding-start: 7px;
}
</style>



<!-- 
Readings 
- keypress : event is sent to an element when the browser registers keyboard input.
- keydown : same as keypress except that modifier and 
            non-printing keys such as Shift, Esc, and delete 
            trigger keydown events but not keypress events.
- keyup: event is sent to an element when the user releases a key on the keyboard.
- oninput : event that triggers whenever the input changes.

The keydown event occurs when the key is pressed, 
followed immediately by the keypress event. 
Then the keyup event is generated when the key is released.

In order to understand the difference between keydown and keypress, 
it is useful to understand the difference between a "character" and a "key". 
A "key" is a physical button on the computer's keyboard 
while a "character" is a symbol typed by pressing a button. 
In theory, the keydown and keyup events represent keys being pressed or 
released, while the keypress event represents a character being typed. 
The implementation of the theory is not same in all browsers
-->