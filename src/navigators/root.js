import { createStackNavigator } from "@react-navigation/stack";
import { useAuthentication } from "../contexts/authentication";
import DashboardNavigator from "./dashboard";
import AuthenticationNavigator from "./authentication";

const RootNavigator = () => {
   const Stack = createStackNavigator();
   const { authenticated } = useAuthentication();

   return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
         {authenticated ? (
            <Stack.Screen name="Dashboard" component={DashboardNavigator} />
         ) : (
            <Stack.Screen
               name="Authentication"
               component={AuthenticationNavigator}
            />
         )}
      </Stack.Navigator>
   );
}

export default RootNavigator;