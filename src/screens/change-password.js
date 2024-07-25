import { useState } from "react";
import { View, ScrollView } from "react-native"
import { Text, TextInput, Button, Portal, HelperText } from "react-native-paper"
import MaterialCommunityIcons from "../utils/mat-com-icons";

import { common } from "../styles/common";
import ErrorDialog from "../components/error-dialog";
import LoadingIndicator from "../components/loading-indicator";

import { useAuthentication } from "../contexts/authentication";
import { getUserId } from "../services/authentication";
import { updateUserPassword } from "../services/user-management";
import { isPassword, arePasswordsMatching } from "../utils/validation";

const ChangePasswordScreen = () => {
   const { idToken } = useAuthentication();

   const [showErrorDialog, setShowErrorDialog] = useState(false);
   const [errorMessage, setErrorMessage] = useState(null);
   const [showLoading, setShowLoading] = useState(false);
   const [formData, setFormData] = useState({
      password: "",
      confirmPassword: ""
   });
   const [formHelpers, setFormHelpers] = useState({
      password: false,
      confirmPassword: false
   });

   const isFormValid = () => {
      const isPasswordValid = isPassword(formData.password);
      const passwordMatching = arePasswordsMatching(
         formData.password,
         formData.confirmPassword
      );

      setFormHelpers({
         password: !isPasswordValid,
         confirmPassword: !passwordMatching,
      });

      return isPasswordValid && passwordMatching;
   };

   const changeUserPassword = async () => {
      if (isFormValid()) {
         try {
            setShowLoading(true);

            await updateUserPassword(
               getUserId(idToken),
               formData.password,
               idToken
            );

            setShowLoading(false);
         } catch (error) {
            setShowLoading(false);
            setErrorMessage(error?.response?.data?.error || null);
            setShowErrorDialog(true);
         }
      }
   };

   return (
      <ScrollView
         contentContainerStyle={[common.pmd, common.bgpurple, common.grow]}
      >
         <Text variant="titleMedium">Change Password</Text>
         <Text variant="bodyMedium" style={common.mtnr}>
            Here, you can securely update your primary password. Please ensure the
            confidentiality of your password.
         </Text>
         <View style={common.mtlg}>
            <TextInput
               label="New password"
               secureTextEntry={true}
               left={<TextInput.Icon icon={"lock-outline"} size={24} />}
               underlineColor="transparent"
               underlineColorAndroid="transparent"
               value={formData.password}
               onChangeText={(value) =>
                  setFormData({
                     ...formData,
                     password: value
                  })
               }
            />
            {formHelpers.password && (
               <HelperText type="error">
                  The provided password is either empty or invalid.
               </HelperText>
            )}
            <TextInput
               label="Confirm password"
               secureTextEntry={true}
               left={<TextInput.Icon icon={"lock-outline"} size={24} />}
               underlineColor="transparent"
               underlineColorAndroid="transparent"
               style={common.mtsm}
               value={formData.confirmPassword}
               onChangeText={(value) =>
                  setFormData({
                     ...formData,
                     confirmPassword: value
                  })
               }
            />
            {formHelpers.confirmPassword && (
               <HelperText type="error">
                  The provided confirm password is either empty or invalid.
               </HelperText>
            )}
            <Button
               icon={({ size, color }) => (
                  <MaterialCommunityIcons
                     name="content-save-outline"
                     size={size}
                     color={color}
                  />
               )}
               onPress={changeUserPassword}
               mode="contained"
               style={common.mtlg}
            >
               Save
            </Button>
            {showLoading && (
               <View style={[common.mtxxlg, common.mbmd]}>
                  <LoadingIndicator />
               </View>
            )}
         </View>
         <Portal>
            <ErrorDialog
               errorDialog={showErrorDialog}
               onDismiss={() => setShowErrorDialog(false)}
               errorMessage={errorMessage}
            />
         </Portal>
      </ScrollView>
   );

}

export default ChangePasswordScreen;