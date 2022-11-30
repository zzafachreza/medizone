import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  SafeAreaView,
  RefreshControl,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { storeData, getData, urlAPI } from '../../utils/localStorage';
import axios from 'axios';
import { colors } from '../../utils/colors';
import { windowWidth, fonts, windowHeight } from '../../utils/fonts';
import { Icon } from 'react-native-elements';
const wait = timeout => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
};
export default function ({ navigation, route }) {
  const [refreshing, setRefreshing] = React.useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [myKey, setMykey] = useState('');

  const key = route.params.key;

  // const onRefresh = React.useCallback(() => {
  //   setRefreshing(true);
  //   getDataBarang();
  //   wait(2000).then(() => setRefreshing(false));
  // }, []);

  useEffect(() => {
    getDataBarang();
  }, []);

  const getDataBarang = (y) => {
    setLoading(true);
    axios.post(urlAPI + '/1data_dokter.php', {
      key: route.params.key,
      key2: y,
      id_user: route.params.id_user
    }).then(res => {
      setMykey('');
      console.warn('dokoter', res.data);
      setLoading(false);
      setData(res.data);
    });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Pinjam', item);
      }}
      style={{
        backgroundColor: colors.white,
        borderRadius: 10,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: colors.border,
        width: windowWidth / 2.2,
        margin: 5,

      }}>
      <Image source={{
        uri: item.image
      }} style={{
        alignSelf: 'center',
        // resizeMode: 'contain',
        width: '100%',
        height: 200,

      }} />


      <Text
        style={{
          padding: 5,
          height: 50,
          fontSize: windowWidth / 30,
          color: colors.black,
          borderRadius: 2,
          fontFamily: fonts.secondary[400],
        }}>
        {item.nama_dokter}
      </Text>






    </TouchableOpacity>
  );

  return (
    <SafeAreaView

      style={{
        flex: 1,
        backgroundColor: colors.white,
      }}>
      <Image source={require('../../assets/header.png')} style={{
        width: windowWidth,
        height: windowHeight / 10

      }} />

      <Text
        style={{
          textAlign: 'center',
          marginVertical: 10,
          fontSize: windowWidth / 20,
          color: colors.black,
          borderRadius: 2,
          fontFamily: fonts.secondary[600],
        }}>
        {route.params.nama_kategori}
      </Text>




      {loading && <View style={{
        flex: 1,
        marginTop: '50%',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <ActivityIndicator size="large" color={colors.primary} /></View>}
      {!loading && <FlatList
        style={{
          padding: 10,
        }}
        showsVerticalScrollIndicator={false}
        data={data}
        numColumns={2}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />}

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
