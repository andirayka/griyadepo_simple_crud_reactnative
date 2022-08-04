import React, {useEffect, useState} from 'react';
import {ButtonFormSubmit, Gap, Header, InputText} from '../components';
import {color, dimens} from '../constants';
import {Controller, useForm} from 'react-hook-form';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  ScrollView,
  Alert,
} from 'react-native';
import {apiPost} from '../utils';

export const AddCategory = ({navigation, route}) => {
  const categoryId = route.params?.id;
  const categoryData = route.params?.categoryData;

  const {
    control,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm({mode: 'onChange'});

  const onSubmit = async data => {
    let finalData = new FormData();
    finalData.append('name', data.name);
    finalData.append('code', data.code);

    const {success} = await apiPost({
      url: categoryId
        ? `category/update-data/${categoryId}`
        : 'category/post-data',
      payload: finalData,
    });

    if (success) {
      Alert.alert(
        'Berhasil',
        categoryId ? 'Kategori telah diubah' : 'Kategori baru telah disimpan',
        [
          {
            text: 'Oke',
            onPress: () => {
              navigation.goBack();
            },
            style: 'default',
          },
        ],
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={color.bg_grey} barStyle="dark-content" />

      <Header title={categoryId ? 'Ubah Kategori' : 'Tambah Kategori Baru'} />

      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={{flex: 1, padding: dimens.standard}}>
          <Controller
            control={control}
            rules={{required: true}}
            render={({field: {onChange, onBlur, value}}) => (
              <InputText
                placeholder="Masukkan nama"
                label="Nama kategori"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={!!errors.name}
                errorMessage="Nama kategori harus diisi"
              />
            )}
            name="name"
            defaultValue={categoryData ? categoryData.name : ''}
          />
          <Controller
            control={control}
            rules={{required: true}}
            render={({field: {onChange, onBlur, value}}) => (
              <InputText
                placeholder="Masukkan kode"
                label="Kode"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={!!errors.code}
                errorMessage="Kode harus diisi"
              />
            )}
            name="code"
            defaultValue={categoryData ? categoryData.code : ''}
          />

          <Gap y={dimens.small_10} />
        </View>
      </ScrollView>

      {/* Submit button */}
      <ButtonFormSubmit
        isLoading={isSubmitting}
        text="Simpan"
        onPress={handleSubmit(onSubmit)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.bg_grey,
    flex: 1,
  },
});
