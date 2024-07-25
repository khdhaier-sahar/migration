import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { Text, Portal, SegmentedButtons } from "react-native-paper";
import { useAuthentication } from "../contexts/authentication";
import { getBusinessById, getBusinessByOwnerId } from "../services/content";
import { common } from "../styles/common";
import moment from "moment";
import uuid from "react-native-uuid";
import LoadingIndicator from "../components/loading-indicator";
import ErrorDialog from "../components/error-dialog";
import AppointmentCard from "../components/appointment-card";
import { getUserId } from "../services/authentication";
import { getUserInfo } from "../services/user-management";

const AppointmentsScreen = () => {
   const { idToken, userInfo } = useAuthentication();

   const [businesses, setBusinesses] = useState({});
   const [users, setUsers] = useState({});
   const [appointments, setAppointments] = useState([]);
   const [showLoading, setShowLoading] = useState(true);
   const [showHistory, setShowHistory] = useState(false);
   const [showErrorDialog, setShowErrorDialog] = useState(false);
   const [errorMessage, setErrorMessage] = useState(null);

   const sortAppointments = (appointments) => {
      appointments.sort((a, b) => {
         const dateTimeA = moment(`${a.date} ${a.time}`, "YYYY-MM-DD HH:mm");
         const dateTimeB = moment(`${b.date} ${b.time}`, "YYYY-MM-DD HH:mm");
         return dateTimeA.diff(dateTimeB);
      });
      return appointments;
   };

   const flattenAppointments = (appointments, key) => {
      return Object.entries(appointments).flatMap(([date, appointments]) =>
         Object.entries(appointments).map(([time, id]) => ({
            date,
            time,
            [key]: id,
         }))
      );
   };

   const fetchAndSetBusiness = async (businessId) => {
      try {
         const business = await getBusinessById(businessId, idToken);
         setBusinesses((businesses) => ({
            ...businesses,
            [businessId]: business,
         }));
      } catch (error) {
         setErrorMessage(error?.response?.data?.error || null);
         setShowErrorDialog(true);
      }
   };

   const fetchAndSetUser = async (userId) => {
      try {
         const userInfo = await getUserInfo(userId, idToken);
         setUsers((users) => ({
            ...users,
            [userId]: userInfo,
         }));
      } catch (error) {
         setErrorMessage(error?.response?.data?.error || null);
         setShowErrorDialog(true);
      }
   };

   const fetchUserAppointments = async () => {
      const userAppointments = flattenAppointments(
         userInfo.appointments,
         "businessId"
      );

      return Promise.all(
         userAppointments.map(async (userAppointment) => {
            await fetchAndSetBusiness(userAppointment.businessId);
            return userAppointment;
         })
      )
   };

   const fetchBusinessAppointments = async () => {
      try {
         const userId = getUserId(idToken);
         const userBusiness = await getBusinessByOwnerId(userId, idToken);

         const businessAppointments = flattenAppointments(
            userBusiness?.[0]?.business?.appointments || {},
            "userId"
         );

         return Promise.all(
            businessAppointments.map(async (businessAppointment) => {
               await fetchAndSetUser(businessAppointment.userId);
               return businessAppointment;
            })
         );
      } catch (error) {
         setErrorMessage(error?.response?.data?.error || null);
         setShowErrorDialog(true);
         return [];
      }
   };

   useEffect(() => {
      (async () => {
         setShowLoading(true);

         const userAppointments = await fetchUserAppointments();
         let appointments = [...userAppointments];

         if (userInfo.role === "business-owner") {
            const businessAppointments = await fetchBusinessAppointments();
            appointments = [...appointments, ...businessAppointments];
         }

         setAppointments(sortAppointments(appointments));
         setShowLoading(false);
      })();
   }, [userInfo, idToken]);

   return (
      <ScrollView
         contentContainerStyle={[common.pmd, common.bgpurple, common.grow]}
      >
         <View style={common.mbmd}>
            <SegmentedButtons
               value={showHistory}
               onValueChange={setShowHistory}
               buttons={[
                  {
                     value: false,
                     label: "Upcoming",
                     style: {
                        borderColor: "#edddf6",
                     },
                  },
                  {
                     value: true,
                     label: "History",
                     style: {
                        borderColor: "#edddf6",
                     },
                  },
               ]}
            />
         </View>
         {showLoading && (
            <View style={common.ccenter}>
               <LoadingIndicator />
            </View>
         )}
         {!showLoading &&
            appointments
               .filter(({ date, time }) => {
                  const appointment = moment(`${date} ${time}`, "YYYY-MM-DD HH:mm");
                  const currentDate = moment();
                  return showHistory
                     ? appointment.isBefore(currentDate)
                     : appointment.isAfter(currentDate);
               })
               .map(({ date, time, businessId, userId }) => (
                  <AppointmentCard
                     key={uuid.v4()}
                     date={date}
                     time={time}
                     user={userId ? users[userId] : null}
                     business={businessId ? businesses[businessId] : null}
                  />
               ))}
         {!showLoading && !appointments.length && (
            <Text>No appointments found.</Text>
         )}
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

export default AppointmentsScreen;