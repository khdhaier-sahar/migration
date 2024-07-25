import { createStackNavigator } from "@react-navigation/stack";

import ProfessionalsScreen from "../screens/professionals"
import SettingsScreen from "../screens/settings";
import ProfessionalSingleScreen from "../screens/professional-single";
import NavigationBar from "../components/navigation-bar";
import UserInformationScreen from "../screens/user-infomation";
import ChangePasswordScreen from "../screens/change-password";
import TermsAndConditionsScreen from "../screens/terms-and-conditions";
import BookingScreen from "../screens/booking";

const ProfessionalsTab = () => {
   const Stack = createStackNavigator();

   return (
      <Stack.Navigator
         initialRouteName="Home"
         screenOptions={{
            header: (props) => <NavigationBar {...props} />,
         }}
      >
         <Stack.Screen name="Professionals" component={ProfessionalsScreen} />
         <Stack.Screen name="Settings" component={SettingsScreen} />
         <Stack.Screen name="User Information" component={UserInformationScreen} />
         <Stack.Screen name="Change Password" component={ChangePasswordScreen} />
         <Stack.Screen name="Appointment Booking" component={BookingScreen} />
         <Stack.Screen
            name="Terms and Conditions"
            component={TermsAndConditionsScreen}
         />
         <Stack.Screen name="Professional" component={ProfessionalSingleScreen} />
      </Stack.Navigator>
   );
};

export default ProfessionalsTab;