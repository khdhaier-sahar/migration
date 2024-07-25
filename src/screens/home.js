// React, Paper and Third-Party Imports
import {
   View,
   Dimensions,
   TouchableOpacity,
   FlatList,
   ScrollView,
} from "react-native";
import { Text, Button } from "react-native-paper";
import MaterialCommunityIcons from "../utils/mat-com-icons";

import { common } from "../styles/common";
import BusinessCard from "../components/business-card";
import LargeCard from "../components/article-card";

import { useAuthentication } from "../contexts/authentication";
import { useContent } from "../contexts/content";

const HomeScreen = ({ navigation }) => {
   const { userInfo } = useAuthentication();
   const { featuredBusinesses, featuredArticles } = useContent();

   return (
      <ScrollView
         contentContainerStyle={[common.pmd, common.bgpurple, common.grow]}
      >
         <Text variant="headlineSmall">
            Welcome&nbsp;
            <Text variant="headlineSmall" style={{ color: "#7844ac" }}>
               {userInfo.firstName}
            </Text>
            ,
         </Text>
         <View >
            <View style={[common.mtmd]}>
               <Text variant="bodyMedium">
                  Need an online appointment? Our specialists are ready
                  to assist you.
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
                  onPress={() => navigation.navigate("BusinessesTab")}
               >
                  Book Appointment
               </Button>
            </View>
         </View>
         <View style={common.mtxlg}>
            <View style={common.redge}>
               <Text variant="titleMedium">Featured Specialists</Text>
               <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => navigation.navigate("BusinessesTab")}
               >
                  <MaterialCommunityIcons
                     size={24}
                     style={common.purple}
                     name="dots-horizontal"
                  />
               </TouchableOpacity>
            </View>
            <FlatList
               horizontal
               data={featuredBusinesses}
               keyExtractor={(item) => item.businessId}
               renderItem={({ item }) => (
                  <View style={[common.mrmd, common.mtnr]}>
                     <BusinessCard
                        item={item}
                        onPress={(item) => navigation.navigate("Specialist", item)}
                        showAddress={false}
                     />
                  </View>
               )}
               showsHorizontalScrollIndicator={false}
               contentContainerStyle={[common.mtsm, common.plnr, common.pbnr]}
            />
         </View>
         <View style={common.mtxlg}>
            <View style={common.redge}>
               <Text variant="titleMedium">Featured Articles</Text>
               <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => navigation.navigate("ArticlesTab")}
               >
                  <MaterialCommunityIcons
                     size={24}
                     style={common.purple}
                     name="dots-horizontal"
                  />
               </TouchableOpacity>
            </View>
            <FlatList
               horizontal
               data={featuredArticles}
               keyExtractor={(item) => item.postId}
               renderItem={({ item }) => (
                  <View
                     style={[
                        common.mrmd,
                        common.mtnr,
                        { width: Dimensions.get("window").width - 80 },
                     ]}
                  >
                     <LargeCard
                        item={item}
                        onPress={(item) => navigation.navigate("Article", item)}
                     />
                  </View>
               )}
               showsHorizontalScrollIndicator={false}
               contentContainerStyle={[common.mtsm, common.plnr, common.pbnr]}
            />
         </View>
      </ScrollView>
   );
};


export default HomeScreen;
