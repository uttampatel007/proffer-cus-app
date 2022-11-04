import RequestMaker from "../common/requestMaker";

export default class typeCate {
    async getBusinessType(){
        let endpoint = "business/type-category/";
        let response = await new RequestMaker().GET(endpoint);
        return response;
    }
    async getBusinessCategory() {
        let endpoint = "business/category/";
        let response = await new RequestMaker().GET(endpoint);
        return response;
    }
}