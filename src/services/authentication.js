import { jwtDecode } from "jwt-decode";
import axios from "axios";
import {BASE_URL} from '../constants'
const authenticate = async (email, password) => {
   const response = await axios.post(
      `${BASE_URL}/sign-in`,
      {
         email: email,
         password: password,
      }
   );
   return response.data.idToken;
};

const deauthenticate = async () => {
   await axios.get(`${BASE_URL}/sign-out`);
};

const decodeFirebaseToken = (idToken) => {
   //console.log("FB TOKE",idToken)
   const decodedToken = jwtDecode(idToken);

   return decodedToken;
};

const isTokenAboutToExpire = (decodedToken, thresholdSeconds = 120) => {
   if (!decodedToken || !decodedToken.exp) {
      return false;
   }

   const currentTime = Math.floor(Date.now() / 1000);
   const tokenExpiration = decodedToken.exp;

   return tokenExpiration - currentTime < thresholdSeconds;
};

const refreshIdToken = async (idToken) => {
   const response = await axios.get(
      `${BASE_URL}/refresh-auth-token/`
   );
   return response.data.idToken;
};

const refreshTokenIfExpired = async (idToken) => {
   //console.log("MY TOKEN",idToken)
   const decodedToken = decodeFirebaseToken(idToken);
   if (isTokenAboutToExpire(decodedToken)) {
      return await refreshIdToken();
   }
   return idToken;
};

const getUserId = (idToken) => {
   const decodedToken = decodeFirebaseToken(idToken);
   return decodedToken.user_id;
};

const resetPassword = async (email) => {
   const response = await axios.post(
      `${BASE_URL}/reset-password/`,
      {
         email: email,
      }
   );
   return response.data.idToken;
};

export {
   authenticate,
   deauthenticate,
   refreshTokenIfExpired,
   getUserId,
   resetPassword
};