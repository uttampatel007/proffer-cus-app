import RequestMaker from "../common/requestMaker";


export default class AppData {

    async getAppData(){
        let endpoint = "app_data/".concat();
        let response = await new RequestMaker().GET(endpoint);
        return response
    }

}