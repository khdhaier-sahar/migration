import { Text, Avatar, Card } from "react-native-paper";
import { View, TouchableOpacity } from "react-native";
import { common } from "../styles/common"
import { useContent } from "../contexts/content";

const SmallCard = ({ item: { business }, onPress }) => {
   const { professionalsTags } = useContent();

   const professionalTag = professionalsTags.find(
      item => item.tagId === business.tags[0]
   );

   return (
      <Card style={[common.bgwhite]} >
         <TouchableOpacity activeOpacity={0.8} onPress={() => onPress(business)}>
            <Card.Content style={[common.rvcenter, common.pvmd]}>
               <Avatar.Image
                  size={80}
                  source={{ uri: business.featuredImageURL }}
               />
               <View style={[common.mlmd, { flex: 1 }]}>
                  <Text variant="titleMedium">
                     {business.name}
                  </Text>
                  <Text variant="bodyMedium">
                     {professionalTag.tag.name}
                  </Text>
               </View>
            </Card.Content>
         </TouchableOpacity >
      </Card >
   );
};

export default SmallCard;