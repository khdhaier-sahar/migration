import { useState } from "react";
import { View, FlatList, Dimensions, TouchableOpacity } from "react-native";
import { Text, Chip, Portal } from "react-native-paper";

import { common } from "../styles/common";
import ArticleCard from "../components/article-card";
import ErrorDialog from "../components/error-dialog";
import LoadingIndicator from "../components/loading-indicator";

import { useAuthentication } from "../contexts/authentication";
import { useContent } from "../contexts/content";
import { refreshTokenIfExpired } from "../services/authentication";
import { getArticlesByTag, getAllArticles } from "../services/content";
import { UppercaseWord } from "../utils/text-operations";

const ArticleSearchScreen = ({ navigation }) => {
   const { idToken, setIdToken } = useAuthentication();
   const { featuredArticles, articlesTags } = useContent();

   const [showErrorDialog, setShowErrorDialog] = useState(false);
   const [errorMessage, setErrorMessage] = useState(null);
   const [showResultText, setShowResultText] = useState(false);
   const [resultCount, setResultCount] = useState(0);
   const [showLoading, setShowLoading] = useState(false);
   const [articles, setArticles] = useState(featuredArticles);

   const searchArticlesByTag = async (tagId) => {
      try {
         setShowLoading(true);
         setShowResultText(false);

         const newIdToken = await refreshTokenIfExpired(idToken);
         if (idToken !== newIdToken) {
            setIdToken(newIdToken);
         }

         const articles =
            tagId === ""
               ? await getAllArticles(idToken)
               : await getArticlesByTag(tagId, idToken);

         setArticles(articles);
         setResultCount(articles.length);
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
            data={articles}
            keyExtractor={(item) => item.postId}
            ListHeaderComponent={
               <View style={common.mbmd}>
                  <Text variant="titleMedium">Popular Tags</Text>
                  <Text variant="bodyMedium" style={[common.mtsm]}>
                     Explore different topics through tag filtering.
                  </Text>
                  <FlatList
                     horizontal
                     data={[{ tag: { name: "All" }, tagId: "" }, ...articlesTags]}
                     showsHorizontalScrollIndicator={false}
                     keyExtractor={(item) => item.tagId}
                     renderItem={({ item }) => (
                        <TouchableOpacity
                           activeOpacity={0.8}
                           onPress={() => searchArticlesByTag(item.tagId)}
                        >
                           <Chip style={common.mhnr}>
                              {UppercaseWord(item.tag.name)}
                           </Chip>
                        </TouchableOpacity>
                     )}
                     contentContainerStyle={[common.mtmd]}
                  />
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
               <View
                  style={[
                     common.mbmd,
                     { width: Dimensions.get("window").width - 30 },
                  ]}
               >
                  <ArticleCard
                     item={item}
                     onPress={() => navigation.navigate("Article", item.post)}
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

export default ArticleSearchScreen;