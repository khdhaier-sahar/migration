import { createStackNavigator } from "@react-navigation/stack";

import BusinessSearchScreen from "../screens/business-search"
import SettingsScreen from "../screens/settings";
import BusinessScreen from "../screens/business";
import NavigationBar from "../components/navigation-bar";
import UserInformationScreen from "../screens/user-infomation";
import ChangePasswordScreen from "../screens/change-password";
import BusinessProfileScreen from "../screens/business-profile";
import TermsAndConditionsScreen from "../screens/terms-and-conditions";
import AppointmentBookingScreen from "../screens/appointment-booking";

const BusinessesTab = () => {
   const Stack = createStackNavigator();

   return (
      <Stack.Navigator
         initialRouteName="Home"
         screenOptions={{
            header: (props) => <NavigationBar {...props} />,
         }}
      >
         <Stack.Screen name="Specialists" component={BusinessSearchScreen} />
         <Stack.Screen name="Settings" component={SettingsScreen} />
         <Stack.Screen name="User Information" component={UserInformationScreen} />
         <Stack.Screen name="Change Password" component={ChangePasswordScreen} />
         <Stack.Screen name="Business Profile" component={BusinessProfileScreen} />
         <Stack.Screen
            name="Appointment Booking"
            component={AppointmentBookingScreen}
         />
         <Stack.Screen
            name="Terms and Conditions"
            component={TermsAndConditionsScreen}
         />
         <Stack.Screen name="Specialist" component={BusinessScreen} />
      </Stack.Navigator>
   );
};

export default BusinessesTab;