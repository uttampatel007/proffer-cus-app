import RequestMaker from "../common/requestMaker";
import TokenService from "../../utils/TokenService"


export default class Sale {
    async createSale(data){
        let business_id = await TokenService.getBusinessID()
        data.business = business_id 
        let endpoint = "sale/direct-sale/";
        let response = await new RequestMaker().POST(data, endpoint);
        return response;
    }
    async getSaleList(){
        let endpoint = "sale/direct-sale/";
        let response = await new RequestMaker().GET(endpoint);
        return response;
    }
}