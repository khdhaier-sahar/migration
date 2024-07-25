import { useEffect, useState } from "react";
import { View, ScrollView, Image, Dimensions } from "react-native";
import { Text, Portal } from "react-native-paper";
import HTML from "react-native-render-html";
import { common } from "../styles/common";
import ErrorDialog from "../components/error-dialog";
import { timestampToDate } from "../utils/text-operations";

const ArticleScreen = ({ route }) => {
   const [aspectRatio, setAspectRatio] = useState(null);
   const [showErrorDialog, setShowErrorDialog] = useState(false);
   const [errorMessage, setErrorMessage] = useState(null);

   useEffect(() => {
      Image.getSize(
         route.params.featuredImageURL,
         (originalWidth, originalHeight) => {
            const ratio = originalWidth / originalHeight;
            setAspectRatio(ratio);
         },
         (error) => {
            setErrorMessage(error || null);
            setShowErrorDialog(true);
         }
      );
   }, []);

   const tagsStyles = {
      body: {
         lineHeight: 21,
         fontSize: 14.5,
      },
      h4: {
         marginBottom: 0,
      },
      h3: {
         marginBottom: 5,
      }
   };

   return (
      <ScrollView
         contentContainerStyle={[common.pmd, common.bgpurple, common.grow]}
      >
         <Text variant="headlineSmall">
            {route.params.title}
         </Text>
         <Text variant="bodySmall" style={common.mtnr}>
            {timestampToDate(route.params.timestamp)}
         </Text>
         <View style={common.mtlg}>
            <Image
               source={{ uri: route.params.featuredImageURL }}
               style={[
                  { resizeMode: "contain" },
                  common.radsm,
                  { aspectRatio }
               ]}
            />
         </View>
         <View style={common.mtnr}>
            <HTML
               source={{ html: route.params.content }}
               tagsStyles={tagsStyles}
               contentWidth={Dimensions.get("window").width}
            />
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

export default ArticleScreen;