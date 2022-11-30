import React, { useRef, useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { colors } from '../../utils/colors';
import { fonts, windowHeight, windowWidth } from '../../utils/fonts';
import { MyButton, MyGap } from '../../components';
import 'intl';
import 'intl/locale-data/jsonp/en';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { Modalize } from 'react-native-modalize';
import { showMessage } from 'react-native-flash-message';
import { getData, storeData, urlAPI } from '../../utils/localStorage';
import axios from 'axios';
import { useIsFocused } from '@react-navigation/native';
import { Alert } from 'react-native';

export default function ListDetail({ navigation, route }) {
  const item = route.params;
  navigation.setOptions({
    headerShown: false,
  });

  const isFocused = useIsFocused();
  const [user, setUser] = useState({});
  const [kirim, setKirim] = useState(route.params);


  useEffect(() => {
    if (isFocused) {
      // modalizeRef.current.open();
      getData('user').then(res => {
        console.log('data user', res);
        setUser(res);
        setKirim({
          ...kirim,
          fid_user: res.id,
          fid_dokter: route.params.id
        })
      });

    }
  }, [isFocused]);

  const modalizeRef = useRef();

  const onOpen = () => {
    modalizeRef.current?.open();
  };

  const addToCart = () => {


    // axios
    //   .post(urlAPI + '/1add_cart.php', kirim)
    //   .then(res => {
    //     console.log(res);

    //     showMessage({
    //       type: 'success',
    //       message: 'Berhasil ditambahkan ke keranjang',
    //     });
    //     navigation.replace('MainApp');
    //     modalizeRef.current.close();
    //   });
  };

  return (

    <SafeAreaView style={{
      flex: 1,
      backgroundColor: colors.white
    }}>
      <View style={{
        flex: 1
      }}>
        <Image source={require('../../assets/header.png')} style={{
          width: windowWidth,
          height: windowHeight / 10

        }} />

        <View style={{
          width: windowWidth / 2,
          alignSelf: 'center',
          marginTop: 10,
          borderWidth: 1,
          borderColor: colors.border,
          elevation: 2,
          borderRadius: 10,
          overflow: 'hidden'
        }}>
          <Image source={{
            uri: item.image
          }} style={{
            width: '100%',
            height: windowWidth / 1.7,

          }} />
        </View>


        <Text
          style={{
            textAlign: 'center',
            fontSize: windowWidth / 20,
            color: colors.black,
            borderRadius: 2,
            fontFamily: fonts.secondary[600],
          }}>
          {route.params.nama_dokter}
        </Text>

        <Text
          style={{
            textAlign: 'center',
            marginVertical: 5,
            fontSize: windowWidth / 20,
            color: colors.black,
            borderRadius: 2,
            fontFamily: fonts.secondary[400],
          }}>
          {route.params.nama_kategori}
        </Text>


        <View style={{
          flexDirection: 'row',
          marginVertical: 5,
          marginHorizontal: 10,
        }}>
          <Text
            style={{
              flex: 0.6,
              fontSize: windowWidth / 25,
              color: colors.black,
              fontFamily: fonts.secondary[400],
            }}>
            Date
          </Text>
          <Text
            style={{
              flex: 0.1,
              fontSize: windowWidth / 25,
              color: colors.black,
              fontFamily: fonts.secondary[400],
            }}>
            :
          </Text>
          <Text
            style={{
              flex: 1,
              fontSize: windowWidth / 25,
              color: colors.black,
              fontFamily: fonts.secondary[400],
            }}>
            {item.tanggal}
          </Text>
        </View>
        <View style={{
          flexDirection: 'row',
          marginVertical: 5,
          marginHorizontal: 10,
        }}>
          <Text
            style={{
              flex: 0.6,
              fontSize: windowWidth / 25,
              color: colors.black,
              fontFamily: fonts.secondary[400],
            }}>
            Day
          </Text>
          <Text
            style={{
              flex: 0.1,
              fontSize: windowWidth / 25,
              color: colors.black,
              fontFamily: fonts.secondary[400],
            }}>
            :
          </Text>
          <Text
            style={{
              flex: 1,
              fontSize: windowWidth / 25,
              color: colors.black,
              fontFamily: fonts.secondary[400],
            }}>
            {item.hari}
          </Text>
        </View>
        <View style={{
          flexDirection: 'row',
          marginVertical: 5,
          marginHorizontal: 10,
        }}>
          <Text
            style={{
              flex: 0.6,
              fontSize: windowWidth / 25,
              color: colors.black,
              fontFamily: fonts.secondary[400],
            }}>
            Time
          </Text>
          <Text
            style={{
              flex: 0.1,
              fontSize: windowWidth / 25,
              color: colors.black,
              fontFamily: fonts.secondary[400],
            }}>
            :
          </Text>
          <Text
            style={{
              flex: 1,
              fontSize: windowWidth / 25,
              color: colors.black,
              fontFamily: fonts.secondary[400],
            }}>
            {item.jam}
          </Text>
        </View>

        <Text
          style={{
            marginVertical: 10,
            textAlign: 'center',
            fontSize: windowWidth / 25,
            color: colors.black,
            borderRadius: 2,
            fontFamily: fonts.secondary[600],
          }}>
          $ {item.harga} / hour per appointment
        </Text>
      </View>
      <View style={{
        padding: 10,
      }}>
        <MyButton onPress={() => {
          console.log('kirim tok server', kirim.id);
          axios.post(urlAPI + '/1update_status.php', {
            id_janji: item.id
          }).then(res => {
            console.log(res.data);
            Alert.alert('Medizone', 'Your Appointment has canceled ');
            navigation.goBack();
          })

        }} Icons="close-outline" title="Cancel appointment" warna={colors.danger} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
