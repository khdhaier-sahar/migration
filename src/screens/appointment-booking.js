import { useState, useEffect } from "react";
import {
   ScrollView,
   View,
   Platform,
   StyleSheet,
   TouchableHighlight,
} from "react-native";
import {
   IconButton,
   Text,
   Card,
   Button,
   Portal,
   Dialog,
} from "react-native-paper";
import moment from "moment";
import DateTimePicker from "@react-native-community/datetimepicker";
import { common } from "../styles/common";
import { updateBusiness, getBusinessById } from "../services/content";
import { getUserId } from "../services/authentication";
import { updateUser } from "../services/user-management";
import { useAuthentication } from "../contexts/authentication";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import cloneDeep from "lodash/cloneDeep";
import LoadingPortal from "../components/loading-portal";
import ErrorDialog from "../components/error-dialog";
import LoadingIndicator from "../components/loading-indicator";

const AppointmentBookingScreen = ({ navigation, route }) => {
   const { idToken, userInfo, setUserInfo } = useAuthentication();

   const [showLoading, setShowLoading] = useState(false);
   const [showSuccessDialog, setShowSuccessDialog] = useState(false);
   const [showErrorDialog, setShowErrorDialog] = useState(false);
   const [errorMessage, setErrorMessage] = useState(null);
   const [selectedDate, setSelectedDate] = useState(new Date());
   const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
   const [showDatePicker, setShowDatePicker] = useState(false);
   const [timeSlots, setTimeSlots] = useState([]);
   const [business, setBusiness] = useState(null);

   const appointmentDuration = 60;

   const generateTimeSlots = (
      daySchedule,
      businessAppointments,
      userAppointments
   ) => {
      const slots = [];
      const commenceTime = moment(daySchedule.commence, "HH:mm");
      const finishTime = moment(daySchedule.finish, "HH:mm");
      const currentDate = moment();
      const slotDate = moment(selectedDate).format("YYYY-MM-DD");

      while (commenceTime.isBefore(finishTime)) {
         const slotStart = commenceTime.format("HH:mm");
         const slotEnd = commenceTime
            .add(appointmentDuration, "minutes")
            .format("HH:mm");

         const isBusinessBooked = businessAppointments?.[slotDate]?.[slotStart];
         const isUserBooked = userAppointments?.[slotDate]?.[slotStart];

         const isToday = currentDate.isSame(slotDate, "day");
         const isAfterCurrentTime =
            isToday && slotStart > currentDate.format("HH:mm");

         if (
            !isBusinessBooked &&
            !isUserBooked &&
            (isToday ? isAfterCurrentTime : true)
         ) {
            slots.push({ start: slotStart, end: slotEnd });
         }
      }

      return slots;
   };

   const bookAppointment = async () => {
      const newBusiness = cloneDeep(business);
      const slotDate = moment(selectedDate).format("YYYY-MM-DD");
      const slotStart = timeSlots[selectedTimeSlot].start;

      if (!newBusiness.appointments[slotDate]) {
         newBusiness.appointments[slotDate] = {};
      }
      newBusiness.appointments[slotDate][slotStart] = getUserId(idToken);

      const newUserInfo = cloneDeep(userInfo);
      if (!newUserInfo.appointments[slotDate]) {
         newUserInfo.appointments[slotDate] = {};
      }
      newUserInfo.appointments[slotDate][slotStart] = route.params.businessId;

      try {
         setShowLoading(true);

         await updateBusiness(route.params.businessId, newBusiness, idToken);
         await updateUser(getUserId(idToken), newUserInfo, idToken);
         setUserInfo(newUserInfo);

         setShowLoading(false);
         setShowSuccessDialog(true);
      } catch (error) {
         setErrorMessage(error?.response?.data?.error || null);
         setShowErrorDialog(true);
         setShowLoading(false);
      }
   };

   useEffect(() => {
      (async () => {
         try {
            const fetchedBusiness = await getBusinessById(
               route.params.businessId,
               idToken
            );
            setBusiness(fetchedBusiness);
         } catch (error) {
            setErrorMessage(error?.response?.data?.error || null);
            setShowErrorDialog(true);
         }
      })();
   }, []);

   useEffect(() => {
      if (business) {
         const selectedDayName = moment(selectedDate).format("dddd");
         const selectedDaySchedule = business.timeTable.find(
            (daySchedule) => daySchedule.day === selectedDayName
         );

         if (selectedDaySchedule && selectedDaySchedule.isOpen) {
            const slots = generateTimeSlots(
               selectedDaySchedule,
               business.appointments || {},
               userInfo.appointments || {}
            );
            setTimeSlots(slots);
            setSelectedTimeSlot(null);
         } else {
            setTimeSlots([]);
         }
      }
   }, [selectedDate, business]);

   const closeSuccessDialog = () => {
      navigation.navigate("AppointmentsTab");
      setShowSuccessDialog(false);
   };

   if (showLoading) {
      return <LoadingPortal loadingMessage={"Booking appointment..."} />;
   }

   if (!business) {
      return (
         <ScrollView
            contentContainerStyle={[common.pmd, common.bgpurple, common.grow]}
         >
            <View style={common.ccenter}>
               <LoadingIndicator />
            </View>
         </ScrollView>
      );
   }

   return (
      <ScrollView
         contentContainerStyle={[common.pmd, common.bgpurple, common.grow]}
      >
         <Card style={[common.pmd, common.bgwhite]}>
            <Text variant="titleMedium">Appointment Date</Text>
            <Text variant="bodyMedium" style={[common.mtnr]}>
               Please select the preferred date for scheduling an appointment.
            </Text>
            <View
               style={[
                  common.mtmd,
                  {
                     height: 56,
                     backgroundColor: "#f3f0fa",
                     borderRadius: 5,
                  },
               ]}
            >
               <View style={[common.redge, common.phmd, { height: "100%" }]}>
                  <Text variant="bodyMedium">
                     {moment(selectedDate).format("YYYY-MM-DD")}
                  </Text>
                  <IconButton
                     icon="calendar"
                     onPress={() => setShowDatePicker(true)}
                  />
               </View>
            </View>
            {showDatePicker && (
               <DateTimePicker
                  testID="dateTimePicker"
                  value={selectedDate}
                  mode="date"
                  is24Hour={true}
                  minimumDate={new Date()}
                  display="default"
                  onChange={(event, date) => {
                     setShowDatePicker(Platform.OS === "ios");
                     setSelectedDate(date);
                  }}
               />
            )}
         </Card>
         <Card style={[common.mtmd, common.pmd, common.bgwhite, common.pbnr]}>
            {timeSlots.length > 0 ? (
               <>
                  <Text variant="titleMedium">Time Slot</Text>
                  <Text variant="bodyMedium" style={[common.mtnr]}>
                     Please choose a time slot from the available options.
                  </Text>
                  <View
                     style={[
                        common.row,
                        common.mtmd,
                        common.grow,
                        { flexWrap: "wrap" },
                     ]}
                  >
                     <View style={styles.timeSlotContainer}>
                        {timeSlots.map((slot, index) => (
                           <TouchableHighlight
                              key={index}
                              style={[
                                 styles.timeSlot,
                                 selectedTimeSlot === index && styles.selectedTimeSlot,
                              ]}
                              onPress={() => setSelectedTimeSlot(index)}
                              underlayColor="#f3f0fa"
                           >
                              <Text variant="bodyMedium">
                                 {`${slot.start} - ${slot.end}`}
                              </Text>
                           </TouchableHighlight>
                        ))}
                     </View>
                  </View>
               </>
            ) : (
               <Text variant="bodyMedium" style={common.pbsm}>
                  Unfortunately, there are no available time slots for booking on the
                  selected date. Kindly consider choosing an alternative date.
               </Text>
            )}
         </Card>
         <Button
            mode="contained"
            style={common.mtlg}
            onPress={bookAppointment}
            icon={({ size, color }) => (
               <MaterialIcons name="arrow-forward" size={size} color={color} />
            )}
            disabled={selectedTimeSlot === null}
         >
            Confirm Booking
         </Button>
         <Portal>
            <Dialog
               visible={showSuccessDialog}
               onDismiss={closeSuccessDialog}
               style={[common.bgwhite, common.radlg]}
            >
               <Dialog.Title>Appointment Booked!</Dialog.Title>
               <Dialog.Content>
                  <Text variant="bodyMedium">
                     Congratulations! Your appointment has been successfully scheduled.
                  </Text>
               </Dialog.Content>
               <Dialog.Actions>
                  <Button onPress={closeSuccessDialog}>View Appointments</Button>
               </Dialog.Actions>
            </Dialog>
         </Portal>
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

const styles = StyleSheet.create({
   timeSlotContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
   },
   timeSlot: {
      flexBasis: "48%",
      height: 56,
      marginBottom: 10,
      borderRadius: 5,
      backgroundColor: "#f3f0fa",
      alignItems: "center",
      justifyContent: "center",
   },
   selectedTimeSlot: {
      borderWidth: 2,
      borderColor: "#7844ac",
   },
});

export default AppointmentBookingScreen;