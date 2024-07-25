import { TouchableOpacity } from "react-native";
import { Text, Card } from "react-native-paper";
import { common } from "../styles/common"
import { removeHtmlTags } from "../utils/text-operations";

const ArticleCard = ({ item: { post }, onPress }) => {
   return (
      <Card style={common.bgwhite}>
         <TouchableOpacity activeOpacity={0.8} onPress={() => onPress(post)}>
            <Card.Cover
               source={{ uri: post.featuredImageURL }}
               style={[common.bradno]}
            />
            <Card.Content style={[common.mtmd, common.mbmd]}>
               <Text variant="titleMedium" numberOfLines={2}>
                  {post.title}
               </Text>
               <Text variant="bodyMedium" style={common.mtsm} numberOfLines={2}>
                  {removeHtmlTags(post.content)}
               </Text>
            </Card.Content>
         </TouchableOpacity>
      </Card>
   );
};

export default ArticleCard;