import { useState, useEffect } from 'react';
import { Alert, ScrollView } from 'react-native';
import { Dialog, Text, Button, ActivityIndicator } from 'react-native-paper';
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import MaterialCommunityIcons from '../utils/mat-com-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { common } from '../styles/common';
import HomeTab from '../tabs/home';
import BusinessesTab from '../tabs/businesses';
import ArticlesTab from '../tabs/articles';
import LoadingPortal from '../components/loading-portal';
import AppointmentsTab from '../tabs/appointements';
import VideoCallTab from '../tabs/VideoCallTab'; // Importez le nouveau composant

import { useAuthentication } from '../contexts/authentication';
import { useContent } from '../contexts/content';
import { getUserInfo } from '../services/user-management';
import {
  getFeaturedBusinesses,
  getFeaturedArticles,
  getBusinessesTags,
  getArticlesTags,
} from '../services/content';
import {
  deauthenticate,
  refreshTokenIfExpired,
  getUserId,
} from '../services/authentication';

const DashboardNavigator = () => {
  const {
    idToken,
    setIdToken,
    userInfo,
    setUserInfo,
    authenticated,
    setAuthenticated,
  } = useAuthentication();
  const {
    featuredBusinesses,
    setFeaturedBusinesses,
    featuredArticles,
    setFeaturedArticles,
    businessesTags,
    setBusinessesTags,
    setArticlesTags,
  } = useContent();

  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showLoading, setShowLoading] = useState(false);

  const Tab = createMaterialBottomTabNavigator();

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('idToken');
      setIdToken(null);
      setUserInfo(null);
      setFeaturedArticles(null);
      setFeaturedBusinesses(null);
      setBusinessesTags(null);
      setArticlesTags(null);
      await deauthenticate();
    } catch (error) {
      setErrorMessage(error?.response?.data?.error || null);
      setShowErrorDialog(true);
    }
  };

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      if (authenticated && idToken) {
        try {
          setShowLoading(true);

          const newIdToken = await refreshTokenIfExpired(idToken);
          if (idToken !== newIdToken) {
            setIdToken(newIdToken);
          }
          const [userInfo, featuredBusinesses, featuredArticles, businessesTags, articlesTags] = await Promise.all([
            getUserInfo(getUserId(newIdToken), newIdToken),
            getFeaturedBusinesses(newIdToken),
            getFeaturedArticles(newIdToken),
            getBusinessesTags(newIdToken),
            getArticlesTags(newIdToken),
          ]);
          if (isMounted) {
            setUserInfo(userInfo);
            setFeaturedBusinesses(featuredBusinesses);
            setFeaturedArticles(featuredArticles);
            setBusinessesTags(businessesTags);
            setArticlesTags(articlesTags);
            setShowLoading(false);
          }
        } catch (error) {
          console.error("Error", error);
          Alert.alert("Error");
          if (isMounted) {
            setShowLoading(false);
            setErrorMessage(error?.response?.data?.error || null);
            setShowErrorDialog(true);
            await logout();
          }
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [authenticated, idToken]);

  useEffect(() => {
    if (
      userInfo &&
      featuredBusinesses &&
      featuredArticles &&
      businessesTags &&
      showLoading
    ) {
      setShowLoading(false);
    }
  }, [userInfo, featuredBusinesses, featuredArticles, businessesTags]);

  if (showLoading) {
    return <LoadingPortal loadingMessage={'Fetching data...'} />;
  }

  if (
    !authenticated ||
    !userInfo ||
    !featuredBusinesses ||
    !featuredArticles ||
    !businessesTags
  ) {
    return <ActivityIndicator />;
  }

  return (
    <>
      <Tab.Navigator
        barStyle={[
          common.bgpurple,
          { borderTopWidth: 1, borderTopColor: '#E7E3F1' },
        ]}
      >
        <Tab.Screen
          name="HomeTab"
          component={HomeTab}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: () => (
              <MaterialCommunityIcons
                name="home-roof"
                color="#7844ac"
                size={26}
              />
            ),
          }}
          listeners={({ navigation }) => ({
            tabPress: (e) => {
              e.preventDefault();
              navigation.reset({
                index: 0,
                routes: [{ name: 'HomeTab' }],
              });
            },
          })}
        />
        <Tab.Screen
          name="BusinessesTab"
          component={BusinessesTab}
          options={{
            tabBarLabel: 'Specialists',
            tabBarIcon: () => (
              <MaterialCommunityIcons
                name="stethoscope"
                color="#7844ac"
                size={26}
              />
            ),
          }}
          listeners={({ navigation }) => ({
            tabPress: (e) => {
              e.preventDefault();
              navigation.reset({
                index: 0,
                routes: [{ name: 'BusinessesTab' }],
              });
            },
          })}
        />
        <Tab.Screen
          name="ArticlesTab"
          component={ArticlesTab}
          options={{
            tabBarLabel: 'Articles',
            tabBarIcon: () => (
              <MaterialCommunityIcons
                name="glasses"
                color="#7844ac"
                size={26}
              />
            ),
          }}
          listeners={({ navigation }) => ({
            tabPress: (e) => {
              e.preventDefault();
              navigation.reset({
                index: 0,
                routes: [{ name: 'ArticlesTab' }],
              });
            },
          })}
        />
        <Tab.Screen
          name="AppointmentsTab"
          component={AppointmentsTab}
          options={{
            tabBarLabel: 'Appointments',
            tabBarIcon: () => (
              <MaterialCommunityIcons
                name="calendar-outline"
                color="#7844ac"
                size={26}
              />
            ),
          }}
          listeners={({ navigation }) => ({
            tabPress: (e) => {
              e.preventDefault();
              navigation.reset({
                index: 0,
                routes: [{ name: 'AppointmentsTab' }],
              });
            },
          })}
        />
        <Tab.Screen
          name="VideoCallTab"
          component={VideoCallTab}
          options={{
            tabBarLabel: 'Video Call',
            tabBarIcon: () => (
              <MaterialCommunityIcons
                name="video"
                color="#7844ac"
                size={26}
              />
            ),
          }}
          listeners={({ navigation }) => ({
            tabPress: (e) => {
              e.preventDefault();
              navigation.reset({
                index: 0,
                routes: [{ name: 'VideoCallTab' }],
              });
            },
          })}
        />
      </Tab.Navigator>
    </>
  );
};

export default DashboardNavigator;
