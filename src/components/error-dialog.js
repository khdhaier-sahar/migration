import { Dialog, Text } from "react-native-paper";
import { common } from "../styles/common"

const ErrorDialog = ({ errorDialog, onDismiss, errorMessage }) => {
   return (
      <Dialog
         visible={errorDialog}
         onDismiss={() => onDismiss()}
         style={[common.bgwhite, common.radlg]}
      >
         <Dialog.Title>Sorry, an error occurred.</Dialog.Title>
         <Dialog.Content>
            {errorMessage ? (
               <Text variant="bodyMedium">{errorMessage}</Text>
            ) : (
               <Text variant="bodyMedium">
                  An unexpected error has occurred, unable to continue.
               </Text>
            )}
         </Dialog.Content>
      </Dialog>
   );
};

export default ErrorDialog;