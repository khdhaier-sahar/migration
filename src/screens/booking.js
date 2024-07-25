import React, { useState, useEffect } from "react";
import { ScrollView, View, Text, Button, Platform, StyleSheet, TouchableHighlight } from "react-native";
import { IconButton } from "react-native-paper";
import moment from "moment";
import DateTimePicker from "@react-native-community/datetimepicker";
import { common } from "../styles/common";
import { updateBusiness } from "../services/content";
import { useAuthentication } from "../contexts/authentication";

const BookingScreen = ({ route }) => {
   const { idToken } = useAuthentication();

   const [selectedDate, setSelectedDate] = useState(new Date());
   const [showDatePicker, setShowDatePicker] = useState(false);
   const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
   const [timeSlots, setTimeSlots] = useState([]);

   const timetable = route.params.business.timeTable;

   const appointmentDuration = 60;

   const generateTimeSlots = (daySchedule, appointments) => {
      const slots = [];

      const commenceTime = moment(daySchedule.commence, "HH:mm");
      const finishTime = moment(daySchedule.finish, "HH:mm");

      let currentTime = moment(commenceTime);
      const endTimeClone = finishTime.clone();

      while (currentTime.isBefore(endTimeClone)) {
         const start = currentTime.format("HH:mm");
         const end = currentTime.add(appointmentDuration, "minutes").format("HH:mm");

         // Check if the time slot is available
         if (!appointments[moment(selectedDate).format("YYYY-MM-DD")] ||
            !appointments[moment(selectedDate).format("YYYY-MM-DD")][start]) {
            slots.push({ start, end });
         }
      }

      return slots;
   };

   const handleDateChange = (event, date) => {
      setShowDatePicker(Platform.OS === "ios");
      setSelectedDate(date);
   };

   const handleTimeSlotPress = (index) => {
      setSelectedTimeSlot(index);
      // Log the selected time slot and date
      console.log(`Selected Time Slot: ${timeSlots[index].start} - ${timeSlots[index].end}`);
      console.log(`Selected Date: ${moment(selectedDate).format("YYYY-MM-DD")}`);
   };

   const handleBookAppointment = () => {
      if (selectedTimeSlot !== null) {
         const selectedDayName = moment(selectedDate).format("dddd");
         const selectedDaySchedule = timetable.find((daySchedule) => daySchedule.day === selectedDayName);

         if (selectedDaySchedule && selectedDaySchedule.isOpen) {
            const selectedTimeSlotObject = timeSlots[selectedTimeSlot];
            addAppointmentToBusiness(moment(selectedDate).format("YYYY-MM-DD"), selectedTimeSlotObject);
         }
      }
   };

   const addAppointmentToBusiness = async (date, timeSlot) => {
      // Assuming business has an "appointments" property
      const business = { ...route.params.business };
      const appointments = business.appointments || {};

      if (!appointments[date]) {
         appointments[date] = {};
      }

      // Check if the time slot is available
      if (!appointments[date][timeSlot.start]) {
         // Add the appointment (for simplicity, storing user ID as 'user123')
         appointments[date][timeSlot.start] = "user123";
         console.log(`Appointment added: ${date} ${timeSlot.start} - user123`);

         // Update the business object
         business.appointments = appointments;

         try {
            await updateBusiness(route.params.businessId, business, idToken);
         } catch (error) {
            console.log(error)
         }
      } else {
         console.log(`Time slot not available: ${date} ${timeSlot.start}`);
      }
   };

   useEffect(() => {
      const selectedDayName = moment(selectedDate).format("dddd");
      const selectedDaySchedule = timetable.find((daySchedule) => daySchedule.day === selectedDayName);

      if (selectedDaySchedule && selectedDaySchedule.isOpen) {
         const slots = generateTimeSlots(selectedDaySchedule, route.params.business.appointments || {});
         setTimeSlots(slots);
         setSelectedTimeSlot(null); // Reset selected time slot
      } else {
         setTimeSlots([]);
      }
   }, [selectedDate]);

   return (
      <ScrollView contentContainerStyle={[common.pmd, common.bgpurple, common.grow]}>
         <Text>Select a date</Text>

         <View style={styles.dateContainer}>
            <View style={styles.dateContent}>
               <Text style={styles.dateLabelText}>
                  {moment(selectedDate).format("YYYY-MM-DD")}
               </Text>
               <IconButton icon="calendar" onPress={() => setShowDatePicker(true)} />
            </View>
         </View>

         {showDatePicker && (
            <DateTimePicker
               testID="dateTimePicker"
               value={selectedDate}
               mode="date"
               is24Hour={true}
               display="default"
               onChange={handleDateChange}
            />
         )}

         <Text>Select time in GMT</Text>

         {timeSlots.length > 0 && (
            <View style={[styles.timeSlotsContainer, common.grow]}>
               {timeSlots.map((slot, index) => (
                  <TouchableHighlight
                     key={index}
                     style={[
                        styles.timeSlot,
                        selectedTimeSlot === index && styles.selectedTimeSlot,
                     ]}
                     onPress={() => handleTimeSlotPress(index)}
                     underlayColor="#DDDDDD"
                  >
                     <Text>{`${slot.start} - ${slot.end}`}</Text>
                  </TouchableHighlight>
               ))}
            </View>
         )}

         <Button title="Book Appointment" onPress={handleBookAppointment} />
      </ScrollView>
   );
};

const styles = StyleSheet.create({
   dateContainer: {
      height: 56,
      borderWidth: 1,
      borderColor: "#DDDDDD",
      borderRadius: 5,
      marginBottom: 10,
   },
   dateContent: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: '100%',
      paddingHorizontal: 16,
   },
   dateLabelText: {
      fontSize: 16,
   },
   timeSlotsContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
   },
   timeSlot: {
      padding: 10,
      marginRight: 10,
      marginBottom: 10,
      borderWidth: 1,
      borderColor: "#DDDDDD",
      borderRadius: 5,
   },
   selectedTimeSlot: {
      backgroundColor: "blue",
      borderColor: "darkblue",
   },
});

export default BookingScreen;