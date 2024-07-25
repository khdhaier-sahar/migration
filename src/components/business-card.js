import { Text, Avatar, Card } from "react-native-paper";
import { View, TouchableOpacity } from "react-native";
import { common } from "../styles/common";
import { useContent } from "../contexts/content";

const BusinessCard = ({ item, onPress, showAddress = false }) => {
   const { businessesTags } = useContent();

   const businessTag = businessesTags.find(
      (current) => current.tagId === item.business.tags[0]
   );

   return (
      <Card style={[common.bgwhite]}>
         <TouchableOpacity activeOpacity={0.8} onPress={() => onPress(item)}>
            <Card.Content
               style={[
                  common.rvcenter,
                  common.pvmd,
                  showAddress && { alignItems: "flex-start" },
               ]}
            >
               <Avatar.Image
                  size={80}
                  source={{ uri: item.business.featuredImageURL }}
               />
               <View style={[common.mlmd, { flex: 1 }]}>
                  <Text variant="titleMedium">{item.business.name}</Text>
                  <Text variant="bodyMedium">{businessTag.tag.name}</Text>
                  {showAddress && (
                     <View style={{ marginTop: 10 }}>
                        <Text variant="bodyMedium">{item.business.address}</Text>
                     </View>
                  )}
               </View>
            </Card.Content>
         </TouchableOpacity>
      </Card>
   );
};

export default BusinessCard;
