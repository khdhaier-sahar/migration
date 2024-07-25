import { useState } from "react";
import { Appbar } from "react-native-paper";
import { getHeaderTitle } from "@react-navigation/elements";
import { common } from "../styles/common";
import ChatModal from "./chat-modal";
import { useAuthentication } from "../contexts/authentication";

const NavigationBar = ({ navigation, route, options, back }) => {
   const { userInfo } = useAuthentication();
   const [showChatModal, setShowChatModal] = useState(false);

   return (
      <Appbar.Header style={[common.bgpurple, common.sep]}>
         {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
         <Appbar.Content
            title={getHeaderTitle(options, route.name)}
            titleStyle={{ color: "#7844ac", fontSize: 18 }}
         />
         <Appbar.Action
            icon="chat-processing-outline"
            color="#7844ac"
            size={26}
            onPress={() => setShowChatModal(true)}
         />
         <Appbar.Action
            icon="account-settings-outline"
            color="#7844ac"
            size={26}
            onPress={() => navigation.navigate("Settings")}
         />
         {showChatModal && (
            <ChatModal
               user={{
                  identifier: userInfo.email,
                  name: `${userInfo.firstName} ${userInfo.lastName}`,
                  avatar_url: "",
                  email: userInfo.email,
                  identifier_hash: "",
               }}
               websiteToken={process.env.REACT_APP_CHATWOOT_WEBSITE_TOKEN}
               baseUrl={process.env.REACT_APP_CHATWOOT_BASE_URL}
               language="en"
               hideSelf={() => setShowChatModal(false)}
            />
         )}
      </Appbar.Header>
   );
};

export default NavigationBar;
