// src/screens/VideoCallScreen.js
import React, { useState } from 'react';
import AgoraUIKit from 'agora-rn-uikit';
import { View, Button, Text } from 'react-native';

const VideoCallScreen = () => {
  const [videoCall, setVideoCall] = useState(true);
  const connectionData = {appId: '838faec7ae194d5a8d5f0d9ece6a9851', channel: 'test'};
  const rtcCallbacks = {
    EndCall: () => setVideoCall(false)
  };

  return (
    <View style={{ flex: 1 }}>
      {videoCall ? (
        <AgoraUIKit connectionData={connectionData} rtcCallbacks={rtcCallbacks} />
      ) : (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>The call has ended.</Text>
          <Button title="Start Call" onPress={() => setVideoCall(true)} />
        </View>
      )}
    </View>
  );
};

export default VideoCallScreen;
