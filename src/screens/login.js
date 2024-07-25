import { useState, useEffect } from "react";
import { View, ScrollView, TouchableOpacity, StatusBar } from "react-native";
import {
   Text,
   TextInput,
   Avatar,
   Button,
   HelperText,
} from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import { common } from "../styles/common";
import ErrorDialog from "../components/error-dialog";
import LoadingPortal from "../components/loading-portal";

import { useAuthentication } from "../contexts/authentication";
import { authenticate } from "../services/authentication";
import { isEmail, isPassword } from "../utils/validation";

const LoginScreen = ({ navigation }) => {
   const { idToken, setIdToken, setAuthenticated } = useAuthentication();

   const [showErrorDialog, setShowErrorDialog] = useState(false);
   const [errorMessage, setErrorMessage] = useState(null);
   const [showLoading, setShowLoading] = useState(false);
   const [showLoginScreen, setShowLoginScreen] = useState(false);
   const [email, setEmail] = useState("sahar@gmail.com");
   const [showEmailHelper, setShowEmailHelper] = useState(false);
   const [password, setPassword] = useState("123456789");
   const [showPasswordHelper, setShowPasswordHelper] = useState(false);

   const isFormValid = () => {
      const isEmailValid = isEmail(email);
      const isPasswordValid = isPassword(password);
      setShowEmailHelper(!isEmailValid);
      setShowPasswordHelper(!isPasswordValid);
      return isEmailValid && isPasswordValid;
   };

   useEffect(() => {
      if (idToken) {
         console.log("ID Token found, setting authenticated to true.");
         setShowLoading(false);
         setAuthenticated(true);
      }
   }, [idToken]);

   useEffect(() => {
      (async () => {
         try {
            console.log("Checking for stored ID token...");
            const idToken = await AsyncStorage.getItem("idToken");
            if (idToken) {
               console.log("ID Token found:", idToken);
               setIdToken(idToken);
               setShowLoading(true);
            } else {
               console.log("No ID Token found, showing login screen.");
               setShowLoginScreen(true);
            }
         } catch (error) {
            console.error("Error retrieving ID Token:", error);
            setErrorMessage(error?.response?.data?.error || null);
            setShowErrorDialog(true);
            setShowLoading(false);
         }
      })();
   }, []);

   const login = async () => {
      if (isFormValid()) {
         try {
            console.log("Form is valid, attempting to log in...");
            setShowLoading(true);
            const idToken = await authenticate(email, password);
            console.log("Login successful, ID Token received:", idToken);
            await AsyncStorage.setItem("idToken", idToken);
            setIdToken(idToken);
         } catch (error) {
            console.error('Erreur lors de la requête : ', error);
            if (error.response) {
               // Erreur provenant du serveur avec un statut de réponse
               console.error('Réponse serveur : ', error.response.data);
            } else if (error.request) {
               // La requête a été faite mais pas de réponse reçue
               console.error('Aucune réponse reçue : ', error.request);
            } else {
               // Erreur de configuration ou autre
               console.error('Erreur inattendue : ', error.message);
            }
            setErrorMessage(error?.response?.data?.error || null);
            setShowErrorDialog(true);
            setShowLoading(false);
         }
      } else {
         console.log("Form is not valid, showing helper texts.");
      }
   };
   

   if (!showLoginScreen) {
      return <LoadingPortal loadingMessage={"Loading..."} />;
   }

   if (showLoading) {
      return <LoadingPortal loadingMessage={"Logging in..."} />;
   }

   return (
      <ScrollView
         contentContainerStyle={[common.pmd, common.bgwhite, common.grow]}
      >
         <View style={[common.ccenter]}>
            <View style={[common.rcenter]}>
               <Avatar.Image size={100} source={require("../../assets/14999.png")} />
            </View>
            <View style={[common.rcenter, common.mtlg]}>
               <Text variant="headlineSmall">Welcome back</Text>
            </View>
            <View style={[common.rcenter, common.mtnr]}>
               <Text variant="bodyMedium">Login to continue</Text>
            </View>
            <View style={common.mtxxlg}>
               <TextInput
                  label="E-mail"
                  value={email}
                  onChangeText={(value) => setEmail(value)}
                  left={<TextInput.Icon icon={"email-outline"} size={24} />}
                  underlineColor="transparent"
                  underlineColorAndroid="transparent"
               />
               {showEmailHelper && (
                  <HelperText type="error">
                     The provided email address is either empty or invalid.
                  </HelperText>
               )}
               <TextInput
                  label="Password"
                  value={password}
                  onChangeText={(value) => setPassword(value)}
                  secureTextEntry={true}
                  left={<TextInput.Icon icon={"lock-outline"} size={24} />}
                  underlineColor="transparent"
                  underlineColorAndroid="transparent"
                  style={common.mtsm}
               />
               {showPasswordHelper && (
                  <HelperText type="error">
                     The provided password is either empty or invalid.
                  </HelperText>
               )}
            </View>
            <Button
               icon={({ size, color }) => (
                  <MaterialIcons name="arrow-forward" size={size} color={color} />
               )}
               mode="contained"
               style={common.mtmd}
               onPress={login}
            >
               Login
            </Button>
            <View style={[common.rcenter, common.mtlg]}>
               <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => navigation.navigate("Forgot password")}
               >
                  <Text variant="bodyMedium">Forgot password?</Text>
               </TouchableOpacity>
            </View>
         </View>
         <View style={[common.rcenter, common.mblg]}>
            <View style={[common.rcenter, common.mtlg]}>
               <Text variant="bodyMedium">Don"t have an account?</Text>
               <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => navigation.navigate("Signup")}
                  style={common.mlnr}
               >
                  <Text variant="bodyMedium" style={[common.bold, common.purple]}>
                     Sign up
                  </Text>
               </TouchableOpacity>
            </View>
         </View>
         <ErrorDialog
            errorDialog={showErrorDialog}
            onDismiss={() => setShowErrorDialog(false)}
            errorMessage={errorMessage}
         />
         <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      </ScrollView>
   );
};

export default LoginScreen;
