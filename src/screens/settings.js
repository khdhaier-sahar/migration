import { useState } from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { Text, Button, List, Card, Portal } from "react-native-paper";
import MaterialCommunityIcons from "../utils/mat-com-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { common } from "../styles/common";
import ErrorDialog from "../components/error-dialog";
import LoadingPortal from "../components/loading-portal";

import { useAuthentication } from "../contexts/authentication";
import { deauthenticate } from "../services/authentication";
import { useContent } from "../contexts/content";

const SettingsScreen = ({ navigation }) => {
   const { setIdToken, userInfo, setUserInfo, setAuthenticated } =
      useAuthentication();
   const {
      setFeaturedBusinesses,
      setFeaturedArticles,
      setBusinessesTags,
      setArticlesTags,
   } = useContent();

   const [showErrorDialog, setShowErrorDialog] = useState(false);
   const [errorMessage, setErrorMessage] = useState(null);
   const [showLoading, setShowLoading] = useState(false);

   const logout = async () => {
      try {
         setShowLoading(true);
         await AsyncStorage.removeItem("idToken");
         setIdToken(null);
         setUserInfo(null);
         setFeaturedArticles(null);
         setFeaturedBusinesses(null);
         setBusinessesTags(null);
         setArticlesTags(null);
         await deauthenticate();
         setAuthenticated(false);
      } catch (error) {
         setShowLoading(false);
         setErrorMessage(error?.response?.data?.error || null);
         setShowErrorDialog(true);
      }
   };

   if (showLoading) {
      return <LoadingPortal loadingMessage={"Logging out..."} />;
   }

   return (
      <ScrollView
         contentContainerStyle={[common.pmd, common.bgpurple, common.grow]}
      >
         <View>
            <View>
               <Text variant="titleMedium">Account Information</Text>
               <View style={common.mtmd}>
                  <Card style={[common.pnr, common.bgwhite]}>
                     <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={() => navigation.navigate("User Information")}
                     >
                        <List.Item
                           title="Update Information"
                           left={(props) => (
                              <List.Icon {...props} icon="account-outline" />
                           )}
                           right={(props) => (
                              <List.Icon {...props} icon="chevron-right" />
                           )}
                           style={common.lsep}
                        />
                     </TouchableOpacity>
                     <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={() => navigation.navigate("Change Password")}
                     >
                        <List.Item
                           title="Change Password"
                           left={(props) => <List.Icon {...props} icon="lock-outline" />}
                           right={(props) => (
                              <List.Icon {...props} icon="chevron-right" />
                           )}
                        />
                     </TouchableOpacity>
                     {userInfo.role === "business-owner" && (
                        <TouchableOpacity
                           activeOpacity={0.5}
                           onPress={() => navigation.navigate("Business Profile")}
                        >
                           <List.Item
                              title="Business Profile"
                              left={(props) => (
                                 <List.Icon {...props} icon="storefront-outline" />
                              )}
                              right={(props) => (
                                 <List.Icon {...props} icon="chevron-right" />
                              )}
                           />
                        </TouchableOpacity>
                     )}
                  </Card>
               </View>
            </View>
            <View style={common.mtlg}>
               <Text variant="titleMedium">General Information</Text>
               <View style={common.mtmd}>
                  <Card style={[common.pnr, common.bgwhite]}>
                     <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={() => navigation.navigate("Terms and Conditions")}
                     >
                        <List.Item
                           title="Terms and Conditions"
                           left={(props) => (
                              <List.Icon {...props} icon="clipboard-check-outline" />
                           )}
                           right={(props) => (
                              <List.Icon {...props} icon="chevron-right" />
                           )}
                        />
                     </TouchableOpacity>
                  </Card>
               </View>
            </View>
            <View style={common.mtlg}>
               <Button
                  icon={({ size, color }) => (
                     <MaterialCommunityIcons name="logout" size={size} color={color} />
                  )}
                  mode="contained"
                  onPress={logout}
               >
                  Logout
               </Button>
            </View>
         </View>
         <Portal>
            <ErrorDialog
               errorDialog={showErrorDialog}
               onDismiss={() => setShowErrorDialog(false)}
               errorMessage={errorMessage}
            />
         </Portal>
      </ScrollView>
   );
};

export default SettingsScreen;
