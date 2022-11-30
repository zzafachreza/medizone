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
import { MyButton, MyGap, MyPicker } from '../../components';
import 'intl';
import 'intl/locale-data/jsonp/en';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { Modalize } from 'react-native-modalize';
import { showMessage } from 'react-native-flash-message';
import { getData, storeData, urlAPI } from '../../utils/localStorage';
import axios from 'axios';
import { useIsFocused } from '@react-navigation/native';
import { Calendar, CalendarList, Agenda, LocaleConfig } from 'react-native-calendars';

import DatePicker from 'react-native-datepicker'
import { TextInput } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TouchableNativeFeedback } from 'react-native';
import { Platform } from 'react-native';
import { Button } from 'react-native';
import { ActivityIndicator } from 'react-native';
import { Alert } from 'react-native';

export default function Pilihan({ navigation, route }) {

  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
    let jam = selectedDate.toLocaleString().split(", ");
    console.log(jam[1])
    setSend({
      ...send,
      jam: jam[1]
    })
  };

  const showMode = (currentMode) => {

    setMode(currentMode);
    setShow(true)
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  const item = route.params;
  navigation.setOptions({
    headerShown: false,
  });

  const isFocused = useIsFocused();
  const [user, setUser] = useState({});
  const [kirim, setKirim] = useState(route.params);

  const [send, setSend] = useState({
    tanggal: new Date(),
    jam: '',
    hari: 'Monday'
  })
  useEffect(() => {
    if (isFocused) {
      // modalizeRef.current.open();
      getData('user').then(res => {
        console.log('data user', res);
        setUser(res);
        setSend({
          ...send,
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
          flexDirection: 'row',
          paddingHorizontal: 10,
        }}>

          <View style={{
            width: windowWidth / 5,
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
              height: windowWidth / 4,

            }} />
          </View>

          <View style={{
            justifyContent: 'center',
            padding: 10,
          }}>
            <Text
              style={{
                fontSize: windowWidth / 25,
                color: colors.black,
                borderRadius: 2,
                fontFamily: fonts.secondary[600],
              }}>
              {route.params.nama_dokter}
            </Text>

            <Text
              style={{
                marginVertical: 5,
                fontSize: windowWidth / 25,
                color: colors.black,
                borderRadius: 2,
                fontFamily: fonts.secondary[400],
              }}>
              {route.params.nama_kategori}
            </Text>
          </View>
        </View>




        <Text
          style={{
            marginVertical: 5,
            marginHorizontal: 10,
            fontSize: windowWidth / 20,
            color: colors.black,
            borderRadius: 2,
            fontFamily: fonts.secondary[600],
          }}>
          Select Schedule
        </Text>


        <View style={{
          padding: 10,
        }}>
          <Text
            style={{
              marginVertical: 5,
              fontSize: windowWidth / 28,
              color: colors.black,
              borderRadius: 2,
              fontFamily: fonts.secondary[400],
            }}>
            Select Date
          </Text>
          <DatePicker
            style={{ width: '100%' }}
            date={send.tanggal}
            mode="date"
            placeholder="select date"
            format="YYYY-MM-DD"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"

            customStyles={{
              dateIcon: {
                position: 'absolute',
                right: 0,
                top: 0,
                marginLeft: 0
              },
              dateInput: {
                height: 50,
                borderRadius: 10,
                borderColor: colors.border
              }
              // ... You can check the source to find the other keys.
            }}
            onDateChange={(date) => {
              setSend({
                ...send,
                tanggal: date
              })
            }}
          />

          <MyPicker onValueChange={x => {
            setSend({
              ...send,
              hari: x
            })
          }} label="Select Day" data={[
            {
              label: 'Monday',
              value: 'Monday'
            },
            {
              label: 'Tuesday',
              value: 'Tuesday'
            },
            {
              label: 'Wednesday',
              value: 'Wednesday'
            },
            {
              label: 'Thursday',
              value: 'Thursday'
            },
            {
              label: 'Friday',
              value: 'Friday'
            },
            {
              label: 'Saturday',
              value: 'Saturday'
            },
            {
              label: 'Sunday',
              value: 'Sunday'
            }
          ]} iconname="create" />


          <Text
            style={{
              marginVertical: 5,
              fontSize: windowWidth / 28,
              color: colors.black,
              borderRadius: 2,
              fontFamily: fonts.secondary[400],
            }}>
            Select Time
          </Text>
          <TouchableNativeFeedback onPress={showTimepicker}>
            <View style={{
              height: 50,
              borderWidth: 1,
              borderColor: colors.border,
              borderRadius: 10,
              justifyContent: 'center',
              paddingLeft: 10,
            }}>
              <Text
                style={{
                  fontSize: windowWidth / 28,
                  color: colors.black,
                  fontFamily: fonts.secondary[400],
                }}>
                {send.jam}
              </Text>
            </View>
          </TouchableNativeFeedback>
          {/* <MyButton warna={colors.price} onPress={showDatepicker} title="Show date picker!" />
          <MyButton warna={colors.price} onPress={showTimepicker} title="Show time picker!" />
          <Text>selected: {date.toLocaleString()}</Text> */}
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour={true}
              onChange={onChange}
            />
          )}
        </View>

      </View>
      <View style={{
        padding: 10,
      }}>
        <View style={{
          flexDirection: 'row'
        }}>
          <Text
            style={{
              flex: 0.1,
              marginVertical: 20,
              fontSize: windowWidth / 25,
              color: colors.black,
              fontFamily: fonts.secondary[400],
            }}>
            Note
          </Text>
          <Text
            style={{
              flex: 0.1,
              marginVertical: 20,
              fontSize: windowWidth / 25,
              color: colors.black,
              fontFamily: fonts.secondary[400],
            }}>
            :
          </Text>
          <Text
            style={{
              flex: 1,
              marginVertical: 20,
              fontSize: windowWidth / 25,
              color: colors.black,
              fontFamily: fonts.secondary[400],
            }}>
            You will be only charged after the appointment, to be paid in cashier
          </Text>
        </View>
        {loading && <ActivityIndicator color={colors.primary} size="large" />}

        {!loading && <MyButton onPress={() => {
          console.log('kirim tok server', send);
          setLoading(true)
          axios
            .post(urlAPI + '/1add_transaksi.php', send)
            .then(res => {
              console.log(res.data);
              setTimeout(() => {
                Alert.alert('Your Appointment has succesfully been scheduled!');
                navigation.replace('MainApp')
              }, 1000)

            });


        }} Icons="calendar-outline" title="Book appointment" warna={colors.tertiary} />}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
