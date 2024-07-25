import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/login";
import SingupScreen from "../screens/singup";
import ForgotPasswordScreen from "../screens/forgot-password";

const AuthenticationNavigator = () => {
   const Stack = createStackNavigator();

   return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
         <Stack.Screen name="Login" component={LoginScreen} />
         <Stack.Screen name="Signup" component={SingupScreen} />
         <Stack.Screen
            name="Forgot password"
            component={ForgotPasswordScreen}
         />
      </Stack.Navigator>
   );
};

export default AuthenticationNavigator;