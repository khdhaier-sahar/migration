// React, Paper and Third-Party Imports
import { useState } from "react";
import { View, FlatList } from "react-native";
import { TextInput, Button, Text, Card, Portal } from "react-native-paper";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

// Styles, Screens and Componenets Imports
import { common } from "../styles/common";
import PickerWithIcon from "../components/picker-with-icon";
import BusinessCard from "../components/business-card";
import ErrorDialog from "../components/error-dialog";
import LoadingIndicator from "../components/loading-indicator";

// Contexts, Services and Utilities Imports
import { useContent } from "../contexts/content";
import { useAuthentication } from "../contexts/authentication";
import { getMatchingBusinesses } from "../services/content";
import { refreshTokenIfExpired } from "../services/authentication";
import tunisianCities from "../json-data/tunisia-cities.json";

const BusinessSearchScreen = ({ navigation }) => {
   const { featuredBusinesses, businessesTags } = useContent();
   const { idToken, setIdToken } = useAuthentication();

   const [name, setName] = useState("");
   const [city, setCity] = useState("");
   const [tag, setTag] = useState("");
   const [showErrorDialog, setShowErrorDialog] = useState(false);
   const [errorMessage, setErrorMessage] = useState(null);
   const [showLoading, setShowLoading] = useState(false);
   const [showResultText, setShowResultText] = useState(false);
   const [resultCount, setResultCount] = useState(null);
   const [businesses, setBusinesses] = useState(featuredBusinesses);

   const searchBusinesses = async () => {
      try {
         setShowLoading(true);
         setShowResultText(false);

         const newIdToken = await refreshTokenIfExpired(idToken);
         if (idToken !== newIdToken) {
            setIdToken(newIdToken);
         }

         const businesses = await getMatchingBusinesses(
            name,
            tag,
            city,
            idToken
         );

         setBusinesses(businesses);
         setResultCount(businesses.length);
         setShowResultText(true);
         setShowLoading(false);
      } catch (error) {
         setShowLoading(false);
         setErrorMessage(error?.response?.data?.error || null);
         setShowErrorDialog(true);
      }
   };

   return (
      <>
         <FlatList
            data={businesses}
            keyExtractor={(item) => item.businessId}
            ListHeaderComponent={
               <View style={common.mbmd}>
                  <Text variant="titleMedium">Find Specialists</Text>
                  <Text variant="bodyMedium" style={[common.mtsm]}>
                     Discover your preferred specialist and schedule your
                     online appointment today.
                  </Text>
                  <Card style={[common.mtmd, common.pmd, common.bgwhite]}>
                     <TextInput
                        label="Name"
                        value={name}
                        onChangeText={(value) => setName(value)}
                        left={<TextInput.Icon icon={"account-outline"} size={24} />}
                        underlineColor="transparent"
                        underlineColorAndroid="transparent"
                     />
                     <View style={common.mtnr}>
                        <PickerWithIcon
                           icon="tag-outline"
                           data={[
                              { tag: { name: "All Tags" }, tagId: "" },
                              ...businessesTags
                           ]}
                           onValueChange={(value) => setTag(value)}
                        />
                     </View>
                     <View style={common.mtnr}>
                        <PickerWithIcon
                           icon="map-marker-outline"
                           data={[
                              { id: "", value: "", label: "All Cities" },
                              ...tunisianCities
                           ]}
                           onValueChange={(value) => setCity(value)}
                        />
                     </View>
                     <Button
                        icon={({ size, color }) => (
                           <MaterialIcons name="search" size={size} color={color} />
                        )}
                        mode="contained"
                        style={common.mtmd}
                        onPress={searchBusinesses}
                     >
                        Search
                     </Button>
                  </Card>
                  {showLoading && (
                     <View style={[common.mtxxlg, common.mbmd]}>
                        <LoadingIndicator />
                     </View>
                  )}
                  {showResultText && (
                     <Text variant="bodyMedium" style={[common.mtlg]}>
                        {resultCount} result found.
                     </Text>
                  )}
               </View>
            }
            renderItem={({ item }) => (
               <View style={[common.mbmd]}>
                  <BusinessCard
                     item={item}
                     onPress={() => navigation.navigate("Specialist", item)}
                     showAddress={true}
                  />
               </View>
            )}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={[common.pmd, common.bgpurple, common.grow]}
         />
         <Portal>
            <ErrorDialog
               errorDialog={showErrorDialog}
               onDismiss={() => setShowErrorDialog(false)}
               errorMessage={errorMessage}
            />
         </Portal>
      </>
   );
};

export default BusinessSearchScreen;