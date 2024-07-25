import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../screens/home";
import SettingsScreen from "../screens/settings";
import BusinessScreen from "../screens/business";
import ArticleSingleScreen from "../screens/article";
import NavigationBar from "../components/navigation-bar";
import UserInformationScreen from "../screens/user-infomation";
import ChangePasswordScreen from "../screens/change-password";
import BusinessProfileScreen from "../screens/business-profile";
import TermsAndConditionsScreen from "../screens/terms-and-conditions";
import AppointmentBookingScreen from "../screens/appointment-booking";

const HomeTab = () => {
   const Stack = createStackNavigator();

   return (
      <Stack.Navigator
         initialRouteName="Home"
         screenOptions={{
            header: (props) => <NavigationBar {...props} />,
         }}
      >
         <Stack.Screen name="Home" component={HomeScreen} />
         <Stack.Screen name="Settings" component={SettingsScreen} />
         <Stack.Screen name="Specialist" component={BusinessScreen} />
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
         <Stack.Screen name="Article" component={ArticleSingleScreen} />
      </Stack.Navigator>
   );
};

export default HomeTab;