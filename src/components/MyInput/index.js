import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon, ListItem, Button } from 'react-native-elements';
import { colors } from '../../utils/colors';
import { fonts } from '../../utils/fonts';
import { TextInput } from 'react-native-gesture-handler';

export default function MyInput({
  onFocus,
  label,
  iconname,
  onChangeText,
  value,
  keyboardType,
  secureTextEntry,
  borderColor = colors.textPrimary,
  backgroundColor = colors.white,
  styleInput,
  placeholder,
  labelColor = colors.textPrimary,
  autoFocus,
  multiline,
  label2,
  styleLabel,
  colorIcon = colors.textPrimary,
}) {
  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 5,
        }}>
        <Icon type="ionicon" name={iconname} color={colorIcon} size={16} />
        <Text
          style={{
            fontFamily: fonts.secondary[600],
            color: labelColor,
            left: 10,
            fontSize: 12,
            ...styleLabel,
          }}>
          {label}
        </Text>
      </View>
      {label2 && (
        <Text
          style={{
            fontFamily: fonts.secondary[600],
            color: colors.primary,
            left: 10,
            fontSize: 12,
            marginVertical: 1,
            ...styleLabel,
          }}>
          {label2}
        </Text>
      )}
      <TextInput
        multiline={multiline}
        autoFocus={autoFocus}
        onFocus={onFocus}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        value={value}
        onChangeText={onChangeText}
        autoCapitalize="none"
        style={{
          borderColor: borderColor,
          borderRadius: 10,
          borderWidth: 1,
          backgroundColor: colors.white,
          color: colors.black,
          paddingLeft: 10,
          fontSize: 12,
          fontFamily: fonts.primary[400],
          ...styleInput,
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({});
