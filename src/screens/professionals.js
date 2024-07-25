// React, Paper and Third-Party Imports
import { useState } from "react";
import { View, FlatList } from "react-native";
import { TextInput, Button, Text, Card, Portal } from "react-native-paper";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

// Styles, Screens and Componenets Imports
import { common } from "../styles/common";
import PickerWithIcon from "../components/picker-with-icon";
import SmallCardWithDetails from "../components/small-card-details";
import ErrorDialog from "../components/error-dialog";
import LoadingIndicator from "../components/loading-indicator";

// Contexts, Services and Utilities Imports
import { useContent } from "../contexts/content";
import { useAuthentication } from "../contexts/authentication";
import { getMatchingProfessionals } from "../services/content";
import { refreshTokenIfExpired } from "../services/authentication";
import tunisianCities from "../json-data/tunisia-cities.json";

const ProfessionalsScreen = ({ navigation }) => {
   // Destructuring values from context hooks.
   const { featProfessionals, professionalsTags } = useContent();
   const { idToken, setIdToken } = useAuthentication();

   // State variables for managing component state.
   const [name, setName] = useState("");
   const [city, setCity] = useState("");
   const [tag, setTag] = useState("");
   const [showErrorDialog, setShowErrorDialog] = useState(false);
   const [errorMessage, setErrorMessage] = useState(null);
   const [showLoading, setShowLoading] = useState(false);
   const [showResultText, setShowResultText] = useState(false);
   const [resultCount, setResultCount] = useState(null);
   const [professionals, setProfessionals] = useState(featProfessionals);

   // Searches for professionals based on specified criteria.
   const searchProfessionals = async () => {
      try {
         setShowLoading(true);
         setShowResultText(false);

         const newIdToken = await refreshTokenIfExpired(idToken);
         if (idToken !== newIdToken) {
            setIdToken(newIdToken);
         }

         const professionals = await getMatchingProfessionals(
            name,
            tag,
            city,
            idToken
         );

         setProfessionals(professionals);
         setResultCount(professionals.length);
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
            data={professionals}
            keyExtractor={(item) => item.businessId}
            ListHeaderComponent={
               <View style={common.mbmd}>
                  <Text variant="titleMedium">Find Professionals</Text>
                  <Text variant="bodyMedium" style={[common.mtsm]}>
                     Discover your preferred professional and schedule your
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
                              ...professionalsTags
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
                        onPress={searchProfessionals}
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
                  <SmallCardWithDetails
                     item={item}
                     onPress={() => navigation.navigate("Professional", item)}
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

export default ProfessionalsScreen;
