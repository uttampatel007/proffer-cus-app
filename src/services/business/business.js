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
}