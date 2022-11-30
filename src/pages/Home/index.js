import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Dimensions,
  SafeAreaView,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import { colors } from '../../utils/colors';
import { fonts } from '../../utils/fonts';
import { storeData, getData, urlAPI } from '../../utils/localStorage';
import { Icon } from 'react-native-elements';
import MyCarouser from '../../components/MyCarouser';
import axios from 'axios';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import 'intl';
import 'intl/locale-data/jsonp/en';
import LottieView from 'lottie-react-native';
import { useIsFocused } from '@react-navigation/native';
import { MyGap } from '../../components';
import { ImageBackground } from 'react-native';

export default function Home({ navigation }) {
  const [user, setUser] = useState({});
  const [kategori, setKategori] = useState([]);

  const [produk, setProduk] = useState([]);
  const [cart, setCart] = useState(0);
  const [token, setToken] = useState('');

  const isFocused = useIsFocused();

  useEffect(() => {

    const unsubscribe = messaging().onMessage(async remoteMessage => {

      const json = JSON.stringify(remoteMessage);
      const obj = JSON.parse(json);

      // console.log(obj);

      // alert(obj.notification.title)



      PushNotification.localNotification({
        /* Android Only Properties */
        channelId: 'medizone', // (required) channelId, if the channel doesn't exist, notification will not trigger.
        title: obj.notification.title, // (optional)
        message: obj.notification.body, // (required)
      });
    });


    getDataKategori();

    if (isFocused) {
      __getDataUserInfo();
    }
    return unsubscribe;
  }, [isFocused]);



  const getDataKategori = () => {
    axios.post(urlAPI + '/1data_kategori.php').then(res => {


      setKategori(res.data);
    })
  }



  const __getDataUserInfo = () => {
    getData('user').then(users => {
      console.log(users);
      setUser(users);
      axios.post(urlAPI + '/1_cart.php', {
        fid_user: users.id
      }).then(res => {
        console.log('cart', res.data);

        setCart(parseFloat(res.data))
      })
      getData('token').then(res => {
        console.log('data token,', res);
        setToken(res.token);
        axios
          .post(urlAPI + '/update_token.php', {
            id: users.id,
            token: res.token,
          })
          .then(res => {
            console.error('update token', res.data);
          });
      });
    });
  }

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const ratio = 192 / 108;



  const __renderItemKategori = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate('Barang', {
        key: item.id,
        id_user: user.id,
        nama_kategori: item.nama_kategori
      })} style={{
        backgroundColor: colors.white,
        margin: 10,
        borderRadius: 10,
        width: windowWidth / 3.5,
        borderWidth: 1,
        elevation: 2,
        borderColor: colors.border,
        padding: 10,

      }}>

        <View style={{
          justifyContent: 'center',
          alignItems: 'center',

        }}>
          <Image style={{
            width: '100%',
            height: 80,
            resizeMode: 'contain'

          }} source={{
            uri: item.image
          }} />
        </View>
        <Text style={{
          textAlign: 'center',
          color: colors.black,
          fontFamily: fonts.secondary[600],
          fontSize: windowWidth / 30,
        }}>{item.nama_kategori}</Text>
      </TouchableOpacity>
    )
  }


  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.white,
      }}>

      <View

        style={{
          height: windowHeight / 10,

        }}>

        <Image source={require('../../assets/header.png')} style={{
          width: windowWidth,
          height: windowHeight / 10

        }} />


      </View>

      <ScrollView style={{
        backgroundColor: colors.background1
      }}>
        <MyGap jarak={10} />
        {/* <MyCarouser /> */}
        <Text style={{
          left: 10,
          color: colors.black,
          fontFamily: fonts.secondary[600],
          fontSize: windowWidth / 20,
        }}>Welcome {user.nama_lengkap} !</Text>
        {/* list Kategoti */}
        <View>
          <View style={{
            marginTop: 40,
            flexDirection: 'row',
            flex: 1,
            paddingHorizontal: 10,
            padding: 5,
            alignItems: 'center'
          }}>
            <Icon type='ionicon' name="grid-outline" color={colors.black} />
            <Text style={{
              left: 10,
              color: colors.black,
              fontFamily: fonts.secondary[600],
              fontSize: windowWidth / 25,
            }}>Categories</Text>
          </View>
          <View style={{
            flex: 1,

          }}>
            <FlatList style={{

            }} numColumns={3} data={kategori} renderItem={__renderItemKategori} />
          </View>
        </View>

      </ScrollView>

    </SafeAreaView>
  );
}
