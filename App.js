import Expo, { Permissions, Audio } from 'expo';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import ExpoTHREE, { THREE } from 'expo-three';
import ThreeComponent from './screens/main/three-component';


export default class App extends React.Component {

  render() {
    // Create an `Expo.GLView` covering the whole screen, tell it to call our
    // `_onGLContextCreate` function once it's initialized.
    return (
      <View style={{flex:1}}>
        <ThreeComponent></ThreeComponent>
        <Text style={{
          textAlign: "center",
          fontSize: 30,
          margin: 20
        }}>
          THREEJS TEST
        </Text>
        <Button
          title="Press Me!"
          onPress={this.taco}
        ></Button>
      </View>
    );
  }



  // This is called by the `Expo.GLView` once it's initialized

  taco = () => {

  }

  _onGLContextCreate = async gl => {

    // Based on https://threejs.org/docs/#manual/introduction/Creating-a-scene
    // In this case we instead use a texture for the material (because textures
    // are cool!). All differences from the normal THREE.js example are
    // indicated with a `NOTE:` comment.


    let recording = new Expo.Audio.Recording();
    const { status } = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
    if(status == 'granted'){
      try {
        // await recording.prepareToRecordAsync();
        recording.getStatusAsync();
        Expo.Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
          interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_MIX_WITH_OTHERS,
          interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
          shouldDuckAndroid: false
        });
        recording.prepareToRecordAsync();
        // await recording.startAsync();
        // console.log("Recording started");
        // await recording.stopAndUnloadAsync()
        // console.log("Recording stopped");
      } catch (error) {

      }
    } else{

    }

  };
}
