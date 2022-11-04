import RequestMaker from "../common/requestMaker";
import TokenService from "../../utils/TokenService"


export default class Business {
    async createBusiness(data){
        let user = await TokenService.getUser()
        data.user = user.id
        let endpoint = "business/register/";
        let response = await new RequestMaker().POST(data, endpoint);
        return response;
    }
    async createAddress(data) {
        let user = await TokenService.getUser()
        data.business = user.business[0].id
        let endpoint = "business/register/address/";
        let response = await new RequestMaker().POST(data, endpoint);
        return response;
    }
    async getBusiness() {
        let business_id = await TokenService.getBusinessID()
        let endpoint = "business/".concat(business_id);
        let response = await new RequestMaker().GET(endpoint);
        return response;
    }
    async searchBusiness(name, cityId) {
        let endpoint = "business/search/";
        let params = {"name":name, "city_id":cityId};
        let response = await new RequestMaker().GET(endpoint, params);
        return response;
    }
}