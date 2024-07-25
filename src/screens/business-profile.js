import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import { Portal, Text, TextInput } from "react-native-paper";

import { common } from "../styles/common";
import ErrorDialog from "../components/error-dialog";
import PickerWithIcon from "../components/picker-with-icon";
import workhours from "../json-data/workhours.json";

const BusinessProfileScreen = () => {
   const [showErrorDialog, setShowErrorDialog] = useState(false);
   const [errorMessage, setErrorMessage] = useState(null);
   const [timeTable, setTimeTable] = useState([
      { day: "Monday", isOpen: false, commence: null, finish: null },
      { day: "Tuesday", isOpen: false, commence: null, finish: null },
      { day: "Wednesday", isOpen: false, commence: null, finish: null },
      { day: "Thursday", isOpen: false, commence: null, finish: null },
      { day: "Friday", isOpen: false, commence: null, finish: null },
      { day: "Saturday", isOpen: false, commence: null, finish: null },
      { day: "Sunday", isOpen: false, commence: null, finish: null }
   ]);

   const generateFinishTime = (commence, isOpen) => {
      if (!isOpen || !commence || commence === "closed") {
         return [];
      }

      const index = workhours.findIndex((item) => item.value === commence);

      if (index !== -1) {
         return workhours.slice(index + 1);
      }

      return workhours;
   };

   const generateCommenceTime = () => {
      const commencetable = workhours.slice(0, -1);
      return commencetable;
   };

   return (
      <ScrollView
         contentContainerStyle={[common.pmd, common.bgpurple, common.grow]}
      >
         <Text variant="titleMedium">Business Information</Text>
         <Text variant="bodyMedium" style={common.mtnr}>
            Here, you have the option to update your business profile information.
            Kindly ensure that you input accurate details.
         </Text>
         <View style={common.mtlg}>
            <TextInput
               label="Name"
               underlineColor="transparent"
               underlineColorAndroid="transparent"
            />
            <TextInput
               label="Biography"
               underlineColor="transparent"
               underlineColorAndroid="transparent"
               multiline
               numberOfLines={4}
               style={common.mtsm}
            />
            <TextInput
               label="Email"
               underlineColor="transparent"
               underlineColorAndroid="transparent"
               style={common.mtsm}
            />
            <TextInput
               label="Phone"
               underlineColor="transparent"
               underlineColorAndroid="transparent"
               style={common.mtsm}
            />
            <TextInput
               label="Address"
               underlineColor="transparent"
               underlineColorAndroid="transparent"
               style={common.mtsm}
            />
            <TextInput
               label="City"
               underlineColor="transparent"
               underlineColorAndroid="transparent"
               style={common.mtsm}
            />
            <Text variant="titleMedium" style={common.mtlg}>
               Business Hours
            </Text>
            <Text variant="bodyMedium" style={[common.mtnr, common.mbsm]}>
               Here, you have the option to update your business profile information.
               Kindly ensure that you input accurate details.
            </Text>
            {timeTable.map((day, index) => (
               <View
                  key={day.day}
                  style={[
                     { borderColor: "#f3f0fa", borderWidth: 2, borderRadius: 2 },
                     common.pmd,
                     common.mtsm,
                  ]}
               >
                  <Text variant="titleMedium" style={[common.pbsm]}>
                     {day.day}
                  </Text>
                  <View style={common.rvcenter}>
                     <View style={{ flex: 1, marginRight: 10 }}>
                        <PickerWithIcon
                           noIcon={true}
                           data={generateCommenceTime()}
                           onValueChange={(value) => {
                              setTimeTable((prevTimeTable) => {
                                 const newTimetable = [...prevTimeTable];
                                 newTimetable[index].commence = value;
                                 newTimetable[index].isOpen = value !== "closed";
                                 return newTimetable;
                              });
                           }}
                        />
                     </View>
                     {day.isOpen ? (
                        <View style={{ flex: 1 }}>
                           <PickerWithIcon
                              noIcon={true}
                              data={generateFinishTime(day.commence, day.isOpen)}
                              onValueChange={(value) =>
                                 setTimeTable((prevTimeTable) => {
                                    const newTimetable = [...prevTimeTable];
                                    newTimetable[index].finish = value;
                                    return newTimetable;
                                 })
                              }
                           />
                        </View>
                     ) : null}
                  </View>
               </View>
            ))}
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
};

export default BusinessProfileScreen;
