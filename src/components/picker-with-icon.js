import { useState } from "react";
import { View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import MaterialCommunityIcons from "../utils/mat-com-icons";
import { common } from "../styles/common";

const PickerWithIcon = ({ icon, data, onValueChange, noIcon }) => {
   const [selectedValue, setSelectedValue] = useState(null);

   return (
      <View style={[common.bgdpurple, common.tradnr, common.rvcenter]}>
         {!noIcon && (
            <MaterialCommunityIcons
               name={icon}
               size={24}
               color="#1c1c1c"
               style={common.mlmd}
            />
         )}
         <View style={{ flex: 1 }}>
            <Picker
               selectedValue={selectedValue}
               onValueChange={(value) => {
                  setSelectedValue(value);
                  onValueChange(value);
               }}
            >
               {data.map((item) => (
                  <Picker.Item
                     key={item.tagId || item.id || 0}
                     label={item.tag?.name || item.label}
                     value={item.tagId || item.value}
                     color="#1c1c1c"
                  />
               ))}
            </Picker>
         </View>
      </View>
   );
};

export default PickerWithIcon;