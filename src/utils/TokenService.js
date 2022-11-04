import { Storage } from '@ionic/storage';

const store = new Storage();
store.create();

const TOKEN_KEY = "access_token";
const CUS_ADDRESS = "customer_address"

const TokenService = {
    async getToken() {
        return await store.get(TOKEN_KEY);
    },
    async getCity(){
        const address = await store.get(CUS_ADDRESS);
        return {"city_id":address.city.city_id, 
                "city_name":address.city.name,
                "state_name":address.state.name,
            };
    },
    async updateCusAddress(address){
        store.set(CUS_ADDRESS, address)
    },
}

export default TokenService