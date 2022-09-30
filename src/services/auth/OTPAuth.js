import RequestMaker from "../common/requestMaker";

export default class OTPAuth {
    async generateOTP(mobile_no) {
        let endpoint = "auth/generate-otp/";
        let data = { "mobile_no": mobile_no.toString() };
        let response = await new RequestMaker().POST(data, endpoint);
        return response
    }
    async verifyOTP(mobile_no, otp) {
        let endpoint = "auth/verify-otp/";
        let data = { "mobile_no": mobile_no, "otp":otp};
        let response = await new RequestMaker().POST(data, endpoint);
        return response
    }
}
