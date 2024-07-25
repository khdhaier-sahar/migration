import { View } from "react-native";
import { Avatar, Card, Text } from "react-native-paper";
import { common } from "../styles/common";
import MaterialCommunityIcons from "../utils/mat-com-icons";
import { useContent } from "../contexts/content";

const AppointmentCard = ({ date, time, user, business }) => {
   const { businessesTags } = useContent();
   const businessTag = businessesTags.find(
      (current) => current.tagId === business?.tags[0]
   );

   const formattedDate = new Date(date);
   const displayDate = formattedDate.toLocaleDateString("en-US", {
      weekday: "short",
      month: "long",
      year: "numeric",
      day: "numeric",
   });

   return (
      <Card style={[common.bgwhite, common.mbmd]}>
         <Card.Content>
            <View>
               <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <MaterialCommunityIcons
                     name="clock-outline"
                     size={20}
                     style={common.mrnr}
                  />
                  <Text variant="bodyMedium">{displayDate} at {time}</Text>
               </View>
            </View>
            <View style={{
               height: 1,
               backgroundColor: "#E7E3F1",
               marginVertical: 15
            }} />
            <View style={{ flexDirection: "row", alignItems: "center" }}>
               {user ? (
                  <Avatar.Icon size={60} icon="account-outline" style={{
                     backgroundColor: "#edddf6"
                  }} />
               ) : (
                  <Avatar.Image
                     size={60}
                     source={{ uri: business?.featuredImageURL }}
                  />
               )}
               <View style={common.mlmd}>
                  <Text variant="titleMedium">
                     {user ? `${user.firstName} ${user.lastName}` : business?.name}
                  </Text>
                  <Text variant="bodyMedium">
                     {user ? "Patient" : businessTag.tag.name}
                  </Text>
               </View>
            </View>
         </Card.Content>
      </Card>
   );
};


export default AppointmentCard;