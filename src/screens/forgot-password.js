import { useState } from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import {
   Button,
   Text,
   TextInput,
   Avatar,
   IconButton,
   Dialog,
   HelperText,
} from "react-native-paper";

import { common } from "../styles/common";
import ErrorDialog from "../components/error-dialog";
import LoadingPortal from "../components/loading-portal";

import { isEmail } from "../utils/validation";
import { resetPassword } from "../services/authentication";

const ForgotPasswordScreen = ({ navigation }) => {
   const [email, setEmail] = useState("");
   const [showEmailHelper, setShowEmailHelper] = useState(false);
   const [showResetDialog, setShowResetDialog] = useState(false);
   const [showErrorDialog, setShowErrorDialog] = useState(false);
   const [errorMessage, setErrorMessage] = useState(null);
   const [showLoading, setShowLoading] = useState(false);

   const isEmailValid = () => {
      const isEmailValid = isEmail(email);
      setShowEmailHelper(!isEmailValid);
      return isEmailValid;
   };

   const sendResetPassword = async () => {
      if (isEmailValid()) {
         try {
            setShowLoading(true);
            await resetPassword(email);
            setShowLoading(false);
            setShowResetDialog(true);
         } catch (error) {
            setErrorMessage(error?.response?.data?.error || null);
            setShowErrorDialog(true);
            setShowLoading(false);
         }
      }
   };

   if (showLoading) {
      return <LoadingPortal loadingMessage={"Resetting password..."} />;
   }

   return (
      <ScrollView
         contentContainerStyle={[common.pmd, common.bgwhite, common.grow]}
      >
         <IconButton
            icon="arrow-left"
            size={24}
            onPress={() => navigation.navigate("Login")}
            style={[common.mlno, common.mtno]}
         />
         <View style={common.ccenter}>
            <View style={[common.rcenter]}>
               <Avatar.Image size={100} source={require("../../assets/47632.png")} />
            </View>
            <View style={[common.rcenter, common.mtlg]}>
               <Text variant="headlineSmall">Forgot password?</Text>
            </View>
            <View style={[common.rcenter, common.mtnr]}>
               <Text variant="bodyMedium">
                  Type your e-mail to reset your password
               </Text>
            </View>
            <View style={common.mtxxlg}>
               <TextInput
                  label="Email"
                  value={email}
                  onChangeText={(value) => setEmail(value)}
                  left={<TextInput.Icon icon={"email-outline"} size={24} />}
                  underlineColor="transparent"
                  underlineColorAndroid="transparent"
               />
               {showEmailHelper && (
                  <HelperText type="error">
                     The provided email address is either empty or does not adhere to a
                     valid format.
                  </HelperText>
               )}
            </View>
            <Button
               mode="contained"
               style={common.mtmd}
               onPress={() => sendResetPassword()}
            >
               Reset password
            </Button>
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
         <Dialog
            visible={showResetDialog}
            onDismiss={() => setShowResetDialog(false)}
            style={[common.bgwhite, common.radlg]}
         >
            <Dialog.Title>Reset email has been successfully sent.</Dialog.Title>
            <Dialog.Content>
               <Text variant="bodyMedium">
                  An email containing instructions for resetting your password has
                  been sent. Kindly review your email inbox for further details.
               </Text>
               <Text variant="bodyMedium" style={common.mtsm}>
                  If you have not received the email to reset your password, please do
                  not hesitate to reach out to us at support@auzy.help. We are here to
                  assist you.
               </Text>
            </Dialog.Content>
         </Dialog>
         <ErrorDialog
            errorDialog={showErrorDialog}
            onDismiss={() => setShowErrorDialog(false)}
            errorMessage={errorMessage}
         />
      </ScrollView>
   );
};

export default ForgotPasswordScreen;
