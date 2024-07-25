import { useState } from "react";
import { View, ScrollView } from "react-native"
import { Text, TextInput, Button, Portal, HelperText } from "react-native-paper"
import MaterialCommunityIcons from "../utils/mat-com-icons";

import { common } from "../styles/common";
import ErrorDialog from "../components/error-dialog";
import LoadingIndicator from "../components/loading-indicator";

import { useAuthentication } from "../contexts/authentication";
import { getUserId } from "../services/authentication";
import { updateUser } from "../services/user-management";
import { isName, isPhone, isEmail } from "../utils/validation";

const UserInformationScreen = () => {
   const { idToken, userInfo, setUserInfo } = useAuthentication();

   const [showErrorDialog, setShowErrorDialog] = useState(false);
   const [errorMessage, setErrorMessage] = useState(null);
   const [showLoading, setShowLoading] = useState(false);
   const [formData, setFormData] = useState({
      name: `${userInfo.firstName} ${userInfo.lastName || ""}`,
      phone: userInfo.phoneNumber,
      email: userInfo.email,
   });
   const [formHelpers, setFormHelpers] = useState({
      name: false,
      phone: false,
      email: false,
   });

   const isFormValid = () => {
      const isNameValid = isName(formData.name);
      const isPhoneValid = isPhone(formData.phone);
      const isEmailValid = isEmail(formData.email);

      setFormHelpers({
         name: !isNameValid,
         phone: !isPhoneValid,
         email: !isEmailValid,
      });

      return isNameValid && isPhoneValid && isEmailValid;
   };

   const updateUserInfo = async () => {
      if (isFormValid()) {
         try {
            setShowLoading(true);

            let newUserInfo = { ...userInfo };
            newUserInfo.firstName = formData.name.split(" ")[0];
            newUserInfo.lastName =
               formData.name.split(" ").slice(1).join(" ") || null;
            newUserInfo.phoneNumber = formData.phone;
            newUserInfo.email = formData.email;

            await updateUser(getUserId(idToken), newUserInfo, idToken);

            setUserInfo(newUserInfo);
            setShowLoading(false);
         } catch (error) {
            console.log(error)
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
         <Text variant="titleMedium">Update Your Information</Text>
         <Text variant="bodyMedium" style={common.mtnr}>
            Here, you have the option to update your user information. Kindly ensure
            that you input accurate details.
         </Text>
         <View style={common.mtlg}>
            <TextInput
               label="Full Name"
               value={formData.name}
               onChangeText={(value) =>
                  setFormData({ ...formData, name: value })
               }
               left={<TextInput.Icon icon={"account-outline"} size={24} />}
               underlineColor="transparent"
               underlineColorAndroid="transparent"
            />
            {formHelpers.name && (
               <HelperText type="error">
                  The provided name is either empty or invalid.
               </HelperText>
            )}
            <TextInput
               label="Phone number"
               value={formData.phone}
               onChangeText={(value) =>
                  setFormData({ ...formData, phone: value })
               }
               left={<TextInput.Icon icon={"phone-outline"} size={24} />}
               underlineColor="transparent"
               underlineColorAndroid="transparent"
               style={common.mtsm}
            />
            {formHelpers.phone && (
               <HelperText type="error">
                  The provided phone number is either empty or invalid.
               </HelperText>
            )}
            <TextInput
               label="Email"
               value={formData.email}
               onChangeText={(value) =>
                  setFormData({ ...formData, email: value })
               }
               left={<TextInput.Icon icon={"email-outline"} size={24} />}
               underlineColor="transparent"
               underlineColorAndroid="transparent"
               style={common.mtsm}
            />
            {formHelpers.email && (
               <HelperText type="error">
                  The provided email is either empty or invalid.
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
               //loading={showLoading}
               mode="contained"
               style={common.mtlg}
               onPress={updateUserInfo}
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

export default UserInformationScreen;