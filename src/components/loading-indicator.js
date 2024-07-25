import { ActivityIndicator } from "react-native-paper";

const LoadingIndicator = () => {
   return (
      <ActivityIndicator size={38} animating={true} />
   );
};

export default LoadingIndicator;