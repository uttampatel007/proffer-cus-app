import RequestMaker from "../common/requestMaker";


export default class Coupon {

    async getCoupon(couponId){
        let endpoint = ""
        if (couponId){
            endpoint = "coupon/".concat(couponId);
        }
        else {endpoint = "coupon/".concat();}
        let response = await new RequestMaker().GET(endpoint);
        return response
    }

}