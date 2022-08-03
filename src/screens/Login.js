import React, {useContext} from 'react';
import {SafeAreaView, StatusBar, StyleSheet, View} from 'react-native';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import {dimens} from '../constants';
// import {apiPost} from '@utils';
import {ButtonFormSubmit, Gap, InputText} from '../components';
import {Subheading, Title} from 'react-native-paper';
import {AuthContext} from '../context/AuthContext';

export const Login = () => {
  const {
    control,
    handleSubmit,
    formState: {errors, isSubmitting},
    setValue,
  } = useForm({mode: 'onChange'});
  const {state, login} = useContext(AuthContext);

  const onSubmit = async data => {
    await login();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <View style={{flex: 1, padding: dimens.standard}}>
        <Gap y={50} />

        <Title style={{marginTop: dimens.medium, textAlign: 'center'}}>
          Login Admin Griya Depo
        </Title>
        <Subheading style={{marginTop: dimens.small, textAlign: 'center'}}>
          Masukkan email dan password untuk melanjutkan.
        </Subheading>

        <Gap y={80} />

        {/* Email */}
        <Controller
          control={control}
          rules={{required: true}}
          render={({field: {onChange, onBlur, value}}) => (
            <InputText
              keyboardType="email-address"
              placeholder="Masukkan email Admin"
              label="Email"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={!!errors.email}
              errorMessage="Email harus diisi"
            />
          )}
          name="email"
          defaultValue={'admin@griyadepo.com'}
        />
        {/* Password */}
        <Controller
          control={control}
          rules={{required: true}}
          render={({field: {onChange, onBlur, value}}) => (
            <InputText
              passwordMode
              placeholder="Masukkan kata sandi"
              label="Kata sandi"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={!!errors.password}
              errorMessage="Kata sandi harus diisi"
            />
          )}
          name="password"
          defaultValue={'admingriyadepo'}
        />
      </View>
      {/* Submit button */}
      <ButtonFormSubmit
        isLoading={isSubmitting}
        text="Masuk"
        onPress={handleSubmit(onSubmit)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
});
