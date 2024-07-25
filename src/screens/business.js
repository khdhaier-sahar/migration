import { useState } from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { Avatar, Text, Snackbar, Button } from "react-native-paper";
import MaterialCommunityIcons from "../utils/mat-com-icons";
import * as Clipboard from "react-native-clipboard";
import { common } from "../styles/common"

const BusinessScreen = ({ navigation, route }) => {
   const [showSnack, setShowSnack] = useState(false);

   const copyToClipboard = async (text) => {
      await Clipboard.setStringAsync(text);
      setShowSnack(true);
      setTimeout(() => {
         setShowSnack(false);
      }, 2000);
   };

   return (
      <View style={[common.bgpurple, { flex: 1 }]}>
         <ScrollView contentContainerStyle={[common.pmd, common.bgpurple]}>
            <View style={[common.cvcenter, common.mtlg, common.mbsm]}>
               <Avatar.Image
                  size={128}
                  source={{ uri: route.params.business.featuredImageURL }}
               />
               <View style={[common.cvcenter, common.mtsm]}>
                  <Text variant="headlineSmall">
                     {route.params.business.name}
                  </Text>
                  <Text variant="bodyMedium">
                     Psychologist
                  </Text>
                  <Button
                     icon={({ size, color }) => (
                        <MaterialCommunityIcons
                           name="calendar-outline"
                           size={size}
                           color={color}
                        />
                     )}
                     mode="contained"
                     style={common.mtmd}
                     onPress={() => navigation.navigate(
                        "Appointment Booking",
                        route.params
                     )}
                  >
                     Book Appointment
                  </Button>
               </View>
            </View>
            <View style={[common.sep, common.mtlg]} />
            <View style={common.mtlg}>
               <Text variant="titleMedium">
                  Biography
               </Text>
               <Text variant="bodyMedium" style={common.mtmd}>
                  {route.params.business.description}
               </Text>
            </View>
            <View style={common.mtlg}>
               <Text variant="titleMedium">Contact</Text>
               <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => copyToClipboard(route.params.business.email)}
                  style={[common.mtmd, common.mbnr, common.bgdpurple]}
               >
                  <View style={[common.rvcenter, common.pmd]}>
                     <MaterialCommunityIcons
                        name="email-outline"
                        size={24} />
                     <Text style={[common.mlmd, common.mrmd]}>
                        {route.params.business.email}
                     </Text>
                  </View>
               </TouchableOpacity>
               <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => copyToClipboard(route.params.business.phoneNumber)}
                  style={[common.mbnr, common.bgdpurple]}
               >
                  <View style={[common.rvcenter, common.pmd]}>
                     <MaterialCommunityIcons
                        name="phone-outline"
                        size={24} />
                     <Text style={[common.mlmd, common.mrmd]}>
                        {route.params.business.phoneNumber}
                     </Text>
                  </View>
               </TouchableOpacity>
               <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => copyToClipboard(route.params.business.address)}
                  style={common.bgdpurple}
               >
                  <View style={[common.rvcenter, common.pmd]}>
                     <MaterialCommunityIcons
                        name="map-marker-outline"
                        size={24}
                     />
                     <Text style={[common.mlmd, common.mrmd]}>
                        {route.params.business.address}
                     </Text>
                  </View>
               </TouchableOpacity>
            </View>
         </ScrollView>
         <Snackbar
            visible={showSnack}
            onDismiss={() => setShowSnack(false)}
         >
            <View style={common.row}>
               <MaterialCommunityIcons
                  name="content-copy"
                  size={24}
                  color="#fff"
               />
               <Text style={[common.mlmd, common.white]}>
                  Text copied to the clipboard.
               </Text>
            </View>
         </Snackbar>
      </View>
   );
}

export default BusinessScreen;