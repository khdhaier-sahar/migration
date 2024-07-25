import { createStackNavigator } from "@react-navigation/stack";

import AppointmentsScreen from "../screens/appointments";
import SettingsScreen from "../screens/settings";
import NavigationBar from "../components/navigation-bar";
import UserInformationScreen from "../screens/user-infomation";
import ChangePasswordScreen from "../screens/change-password";
import BusinessProfileScreen from "../screens/business-profile";
import TermsAndConditionsScreen from "../screens/terms-and-conditions";

const AppointmentsTab = () => {
   const Stack = createStackNavigator();

   return (
      <Stack.Navigator
         initialRouteName="Home"
         screenOptions={{
            header: (props) => <NavigationBar {...props} />,
         }}
      >
         <Stack.Screen name="Appointments" component={AppointmentsScreen} />
         <Stack.Screen name="Settings" component={SettingsScreen} />
         <Stack.Screen name="User Information" component={UserInformationScreen} />
         <Stack.Screen name="Change Password" component={ChangePasswordScreen} />
         <Stack.Screen name="Business Profile" component={BusinessProfileScreen} />
         <Stack.Screen
            name="Terms and Conditions"
            component={TermsAndConditionsScreen}
         />
      </Stack.Navigator>
   );
};

export default AppointmentsTab;