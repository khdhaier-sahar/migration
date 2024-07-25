// src/tabs/VideoCallTab.js
import { createStackNavigator } from "@react-navigation/stack";
import VideoCallScreen from "../screens/VideoCallScreen";
import SettingsScreen from "../screens/settings";
import NavigationBar from "../components/navigation-bar";
import UserInformationScreen from "../screens/user-infomation";
import ChangePasswordScreen from "../screens/change-password";
import TermsAndConditionsScreen from "../screens/terms-and-conditions";

const VideoCallTab = () => {
   const Stack = createStackNavigator();

   return (
      <Stack.Navigator
         initialRouteName="VideoCall"
         screenOptions={{
            header: (props) => <NavigationBar {...props} />,
         }}
      >
         <Stack.Screen name="VideoCall" component={VideoCallScreen} />
         <Stack.Screen name="Settings" component={SettingsScreen} />
         <Stack.Screen name="User Information" component={UserInformationScreen} />
         <Stack.Screen name="Change Password" component={ChangePasswordScreen} />
         <Stack.Screen
            name="Terms and Conditions"
            component={TermsAndConditionsScreen}
         />
      </Stack.Navigator>
   );
};

export default VideoCallTab;
