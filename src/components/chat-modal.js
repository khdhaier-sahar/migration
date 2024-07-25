import ChatWootWidget from "@chatwoot/react-native-widget";

const ChatModal = ({ user, websiteToken, baseUrl, language, hideSelf }) => {
   const customAttributes = {
      accountId: 1,
      pricingPlan: "paid",
      status: "active"
   };

   return (
      <ChatWootWidget
         websiteToken={websiteToken}
         locale={language}
         colorScheme="light"
         baseUrl={baseUrl}
         closeModal={hideSelf}
         isModalVisible={true}
         user={user}
         customAttributes={customAttributes}
      />
   );
};

export default ChatModal;