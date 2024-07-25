import { ScrollView } from "react-native"
import { Text } from "react-native-paper"
import { common } from "../styles/common";
import termsAndConditions from "../json-data/terms-and-conditions.json";

const PrivacyPolicyScreen = () => {
   return (
      <ScrollView
         contentContainerStyle={[common.pmd, common.bgpurple, common.grow]}
      >
         <Text variant="titleMedium">Privacy Policy</Text>
         <Text style={common.mtsm}>{termsAndConditions.introduction}</Text>
         <Text variant="titleMedium" style={common.mtsm}>
            1. Purpose
         </Text>
         <Text style={common.mtnr}>{termsAndConditions.purpose}</Text>
         <Text variant="titleMedium" style={common.mtsm}>
            2. Eligibility
         </Text>
         <Text style={common.mtnr}>
            {termsAndConditions.userEligibility}
         </Text>
         <Text variant="titleMedium" style={common.mtsm}>
            3. Professionals
         </Text>
         <Text style={common.mtnr}>
            {termsAndConditions.findingProfessionals}
         </Text>
         <Text variant="titleMedium" style={common.mtsm}>
            4. Information
         </Text>
         <Text style={common.mtnr}>
            {termsAndConditions.informationalContent}
         </Text>
         <Text variant="titleMedium" style={common.mtsm}>
            5. Privacy
         </Text>
         <Text style={common.mtnr}>{termsAndConditions.privacy}</Text>
         <Text variant="titleMedium" style={common.mtsm}>
            6. User Account
         </Text>
         <Text style={common.mtnr}>{termsAndConditions.userAccount}</Text>
         <Text variant="titleMedium" style={common.mtsm}>
            7. Prohibited Activities
         </Text>
         <Text style={common.mtnr}>
            {termsAndConditions.prohibitedActivities}
         </Text>
         <Text variant="titleMedium" style={common.mtsm}>
            8. Emergency
         </Text>
         <Text style={common.mtnr}>
            {termsAndConditions.emergencySituations}
         </Text>
         <Text variant="titleMedium" style={common.mtsm}>
            9. Updates and Changes
         </Text>
         <Text style={common.mtnr}>
            {termsAndConditions.updatesAndChanges}
         </Text>
         <Text variant="titleMedium" style={common.mtsm}>
            10. Intellectual Property
         </Text>
         <Text style={common.mtnr}>
            {termsAndConditions.intellectualProperty}
         </Text>
         <Text variant="titleMedium" style={common.mtsm}>
            11. Termination
         </Text>
         <Text style={common.mtnr}>{termsAndConditions.termination}</Text>
         <Text variant="titleMedium" style={common.mtsm}>
            12. Contact
         </Text>
         <Text style={common.mtnr}>
            {termsAndConditions.contactInformation}
         </Text>
         <Text variant="titleMedium" style={common.mtsm}>
            10. Acknowledgment
         </Text>
         <Text style={common.mtnr}>
            {termsAndConditions.acknowledgment}
         </Text>
      </ScrollView>
   );

}

export default PrivacyPolicyScreen;