import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ImageBackground,
  SafeAreaView,
  Image,
  Animated,
  ActivityIndicator,
} from 'react-native';
import { colors } from '../../utils/colors';
import { fonts } from '../../utils/fonts';
import { color, asin } from 'react-native-reanimated';
import { getData, storeData } from '../../utils/localStorage';
import { PermissionsAndroid } from 'react-native';
import LottieView from 'lottie-react-native';
import axios from 'axios';

export default function Splash({ navigation }) {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const scaleLogo = new Animated.Value(10);
  const scaleRadius = new Animated.Value(100);

  Animated.timing(scaleLogo, {
    toValue: windowWidth / 1.3,
    duration: 1000,
  }).start();

  Animated.timing(scaleRadius, {
    toValue: 0,
    duration: 1000,
  }).start();


  useEffect(() => {

    const unsubscribe = getData('user').then(res => {
      // console.log(res);
      if (!res) {
        // console.log('beum login');

        setTimeout(() => {
          navigation.replace('GetStarted');
        }, 1500);
      } else {
        console.log('sudah login logon');

        setTimeout(() => {
          navigation.replace('MainApp');
        }, 1500);
      }
    });
  }, []);

  return (
    <ImageBackground source={require('../../assets/back.png')} style={styles.page}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}>

        <Animated.Image
          source={require('../../assets/logo.png')}
          style={{
            height: 80,
            resizeMode: 'contain',
            width: scaleLogo,


          }}
        />
        <Animated.Text style={{
          bottom: scaleRadius,
          marginVertical: 10,
          fontFamily: fonts.secondary[400],
          fontSize: windowWidth / 20,
          color: colors.white
        }}>Hosiptal Official App</Animated.Text>

        <ActivityIndicator size="large" color={colors.white} />

      </View>
    </ImageBackground >
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  image: {
    aspectRatio: 1,
    width: 250,
    height: 250,
  },
});
