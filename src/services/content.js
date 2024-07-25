import axios from "axios";
import {BASE_URL} from '../constants/index'
const getFeaturedBusinesses = async (idToken) => {
   const response = await axios.get(
      `${BASE_URL}/get-feat-businesses/`,
      {
         headers: {
            Authorization: `Bearer ${idToken}`,
         },
      }
   );
   return response.data;
};

const getFeaturedArticles = async (idToken) => {
   const response = await axios.get(
      `${BASE_URL}/get-feat-posts/`,
      {
         headers: {
            Authorization: `Bearer ${idToken}`,
         },
      }
   );
   return response.data;
};

const getBusinessesTags = async (idToken) => {
   const response = await axios.get(
      `${BASE_URL}/get-all-business-tags/`,
      {
         headers: {
            Authorization: `Bearer ${idToken}`,
         },
      }
   );
   return response.data;
};

const getArticlesTags = async (idToken) => {
   const response = await axios.get(
      `${BASE_URL}/get-all-post-tags/`,
      {
         headers: {
            Authorization: `Bearer ${idToken}`,
         },
      }
   );
   return response.data;
};

const getMatchingBusinesses = async (name, tag, city, idToken) => {
   const query = `name=${name}&tags=${tag || ""}&city=${city}`
   const response = await axios.get(
      `${BASE_URL}/get-matching-businesses?${query}`,
      {
         headers: {
            Authorization: `Bearer ${idToken}`,
         },
      }
   );
   return response.data;
};

const getArticlesByTag = async (tag, idToken) => {
   const response = await axios.get(
      `${BASE_URL}/get-posts-by-tag?tags=${tag}`,
      {
         headers: {
            Authorization: `Bearer ${idToken}`,
         },
      }
   );
   return response.data;
};

const getAllArticles = async (idToken) => {
   const response = await axios.get(
      `${BASE_URL}/get-all-posts/`,
      {
         headers: {
            Authorization: `Bearer ${idToken}`,
         },
      }
   );
   return response.data;
};

const getBusinessById = async (businessId, idToken) => {
   const response = await axios.get(
      `${BASE_URL}/get-business-by-id/${businessId}`,
      {
         headers: {
            Authorization: `Bearer ${idToken}`,
         },
      }
   );
   return response.data;
};

const getBusinessByOwnerId = async (ownerId, idToken) => {
   const response = await axios.get(
      `${BASE_URL}/get-business-by-owner-id/${ownerId}`,
      {
         headers: {
            Authorization: `Bearer ${idToken}`,
         },
      }
   );
   return response.data;
};

const updateBusiness = async (businessId, businessUpdate, idToken) => {
   const response = await axios.put(
      `${BASE_URL}/update-business/${businessId}`,
      businessUpdate,
      {
         headers: {
            Authorization: `Bearer ${idToken}`,
         },
      }
   );
   return response.data;
};

export {
   getFeaturedBusinesses,
   getFeaturedArticles,
   getBusinessesTags,
   getArticlesTags,
   getMatchingBusinesses,
   getArticlesByTag,
   getAllArticles,
   updateBusiness,
   getBusinessById,
   getBusinessByOwnerId
};