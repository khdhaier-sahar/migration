import { Portal, Text, ActivityIndicator } from "react-native-paper";
import { View, StatusBar } from "react-native";
import { common } from "../styles/common";

const LoadingPortal = ({ loadingMessage }) => {
   return (
      <Portal>
         <View style={[common.ccenter, common.bgwhite]}>
            <ActivityIndicator size={38} animating={true} />
            <View style={[common.rcenter, common.mtsm]}>
               <Text variant="bodyMedium">{loadingMessage}</Text>
            </View>
         </View>
         <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      </Portal>
   );
};

export default LoadingPortal;