import axios from "axios";
import {BASE_URL} from '../constants/index'
const addNewUser = async (newUser) => {
   const response = await axios.post(
      `${BASE_URL}/add-new-user`,
      {
         email: newUser.email,
         password: newUser.password,
         firstName: newUser.firstname,
         lastName: newUser.lastname,
         phoneNumber: newUser.phone,
         photoURL: null,
         street: null,
         city: null,
         zipCode: null,
         country: null,
         role: "user",
         appointments: {}
      }
   );
   return response.data.idToken;
};

const updateUser = async (userId, newUserInfo, idToken) => {
   await axios.put(
      `${BASE_URL}/update-user/${userId}`,
      newUserInfo,
      {
         headers: {
            Authorization: `Bearer ${idToken}`,
         },
      }
   );
};

const updateUserPassword = async (userId, password, idToken) => {
   await axios.put(
      `${BASE_URL}/update-user-password/${userId}`,
      {
         password: password
      },
      {
         headers: {
            Authorization: `Bearer ${idToken}`,
         },
      }
   );
};

const getUserInfo = async (userId, idToken) => {
   console.log("User id",userId)
   const response = await axios.get(
      `${BASE_URL}/get-user/${userId}`,
      {
         headers: {
            Authorization: `Bearer ${idToken}`,
         },
      }
   );
   return response.data;
};

export { addNewUser, getUserInfo, updateUser, updateUserPassword } 