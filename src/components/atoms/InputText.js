import {color, dimens} from '../../constants';
import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {HelperText, TextInput} from 'react-native-paper';

export const InputText = props => {
  const [showPassword, setShowPassword] = useState(false);
  const {errorMessage, error, onPressButton, passwordMode} = props;

  // Change view with button, and make textinput disabled
  if (onPressButton) {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.container}
        onPress={onPressButton}>
        <TextInput disabled {...props} style={styles.textInputStyle} />

        {error && (
          <HelperText
            style={{paddingLeft: 0, fontSize: dimens.medium_14}}
            type="error">
            {errorMessage}
          </HelperText>
        )}
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        {...props}
        style={styles.textInputStyle}
        secureTextEntry={!showPassword && passwordMode}
        right={
          passwordMode && (
            <TextInput.Icon
              name={!showPassword ? 'eye' : 'eye-off'}
              onPress={() => setShowPassword(!showPassword)}
            />
          )
        }
      />

      {error && (
        <HelperText
          style={{paddingLeft: 0, fontSize: dimens.medium_14}}
          type="error">
          {errorMessage}
        </HelperText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: dimens.standard,
  },
  textInputStyle: {
    backgroundColor: 'white',
    color: color.btn_black,
  },
});
