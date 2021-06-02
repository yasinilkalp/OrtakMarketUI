import apiService from "./ApiService";

const JwtService = {}

JwtService.signInRequest = async (url, data) => 
    await apiService.login(url, data).then(resp => resp).catch(err => err);

JwtService.refreshTokenRequest = async (url, data) =>
    await apiService.refreshToken(url, data).then(resp => resp).catch(err => err);

export default JwtService