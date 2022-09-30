import RequestMaker from "../common/requestMaker";

export default class World {
    async getCountryStates(){
        let endpoint = "world/country-state/";
        let response = await new RequestMaker().GET(endpoint);
        return response;
    }
    async getCity(state_id){
        let endpoint = "world/cities/".concat(state_id);
        let response = await new RequestMaker().GET(endpoint);
        return response;
    }
}