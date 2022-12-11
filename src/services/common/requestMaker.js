// Request gateway file

import axios from "axios";
import TokenService from "../../utils/TokenService"


const ENDPOINT = process.env.VUE_APP_ROOT_API;
// const ENDPOINT = "https://nccbuddy.pythonanywhere.com/"

export default class RequestMaker {

    async POST(data, endpoint) {
        let URL = ENDPOINT.concat(endpoint);
        let response_data = null
        let error_data = null
        let headers = null
        
        // get token to pass in header
        const token = await TokenService.getToken()
        if (token !== null) {
            headers = {"headers":{"Authorization": "Token ".concat(token)}}
        }

        try {
            await axios.post(URL, data, headers).then(
                response => (response_data = response.data)
            ).catch(
                err => { error_data = err.response.data }
            )
            return response_data ? response_data : error_data
        } catch (error) {
            console.log(error);
        }
    }

    async GET(endpoint, params) {
        let URL = ENDPOINT.concat(endpoint);
        let response_data = null
        let error_data = null
        let config = {}

        // get token to pass in header
        const token = await TokenService.getToken()
        if (token !== null) {
            config = {"headers":{"Authorization": "Token ".concat(token)}}
        }
        if (params) {
            config["params"] = params
        }
        try {
            await axios.get(URL, config).then(
                response => (response_data = response.data)
            ).catch(
                err => { error_data = err.response.data }
            )
            return response_data ? response_data : error_data
        } catch (error) {
            console.log(error);
        }
        
    }

}
