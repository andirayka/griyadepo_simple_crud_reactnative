import React, {useEffect, useState} from 'react';
import {ButtonFormSubmit, Gap, Header, InputText} from '../components';
import {
  color,
  dimens,
  master_pilihanles,
  master_siswa,
  PilihanLesType,
} from '../constants';
import {Controller, useForm} from 'react-hook-form';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  ScrollView,
  Alert,
} from 'react-native';
import {Button, Menu, HelperText, Card} from 'react-native-paper';
import {StackScreenProps} from '@react-navigation/stack';
import {AppStackParamList} from '@routes/RouteTypes';
import {apiGet, apiPost, getSingleDocument} from '../utils';

export const AddPost = ({navigation, route}) => {
  const [isSelectingCategory, setIsSelectingCategory] = useState(false);
  const [categoryId, setCategoryId] = useState(null);
  const [categories, setCategories] = useState([]);
  const [errorCategory, setErrorCategory] = useState(false);
  const [errorImage, setErrorImage] = useState(false);
  const [postImage, setPostImage] = useState();

  const postId = route.params?.id;
  const postData = route.params?.postData;

  useEffect(() => {
    let isActive = true;

    const getInitialData = async () => {
      const {data} = await apiGet({
        url: 'category/get-all',
        params: {},
      });

      if (isActive) {
        setCategories(data);
        if (postData) {
          setCategoryId(postData.category_id);
        }
      }
    };

    getInitialData();

    return () => {
      isActive = false;
    };
  }, [postData]);

  const {
    control,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm({mode: 'onChange'});

  const onSubmit = async data => {
    if (!categoryId) {
      setErrorCategory(true);
      return;
    }
    if (!postImage && !postId) {
      setErrorImage(true);
      return;
    }

    let finalData = new FormData();
    if (!postId) {
      finalData.append('image', {
        uri: postImage.uri,
        type: postImage.type,
        name: postImage.name,
      });
    }
    finalData.append('category_id', categoryId);
    finalData.append('title', data.title);
    finalData.append('slug', data.slug);
    finalData.append('description', data.description);

    const {success} = await apiPost({
      url: postId ? `post/update-data/${postId}` : 'post/post-data',
      payload: finalData,
    });

    if (success) {
      Alert.alert(
        'Berhasil',
        postId ? 'Post telah diubah' : 'Post baru telah disimpan',
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

      <Header title={postId ? 'Ubah Post' : 'Tambah Post Baru'} />

      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={{flex: 1, padding: dimens.standard}}>
          {categories.length > 0 && (
            <View
              style={{
                marginBottom: dimens.standard,
              }}>
              <Menu
                visible={isSelectingCategory}
                onDismiss={() => {
                  setIsSelectingCategory(false);
                }}
                anchor={
                  <Button
                    mode="contained"
                    color="white"
                    labelStyle={{textAlign: 'left'}}
                    contentStyle={{
                      alignItems: 'flex-start',
                      justifyContent: 'flex-start',
                      padding: dimens.small_10,
                      paddingLeft: 0,
                    }}
                    uppercase={false}
                    onPress={() => {
                      setIsSelectingCategory(true);
                    }}>
                    {categoryId
                      ? 'Kategori: ' +
                        categories.find(({id}) => id == categoryId).name
                      : 'Pilih Kategori'}
                  </Button>
                }>
                {categories.map(category => {
                  return (
                    <Menu.Item
                      key={category.id}
                      onPress={() => {
                        setIsSelectingCategory(false);
                        setCategoryId(category.id);
                      }}
                      title={category.name}
                    />
                  );
                })}
              </Menu>
              {errorCategory && !categoryId && (
                <HelperText
                  style={{paddingLeft: 0, fontSize: dimens.medium_14}}
                  type="error">
                  Kategori harus diisi
                </HelperText>
              )}
            </View>
          )}

          <Controller
            control={control}
            rules={{required: true}}
            render={({field: {onChange, onBlur, value}}) => (
              <InputText
                placeholder="Masukkan judul"
                label="Judul"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={!!errors.judul}
                errorMessage="Judul harus diisi"
              />
            )}
            name="title"
            defaultValue={postData ? postData.title : ''}
          />
          <Controller
            control={control}
            rules={{required: true}}
            render={({field: {onChange, onBlur, value}}) => (
              <InputText
                placeholder="Masukkan slug"
                label="Slug"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={!!errors.slug}
                errorMessage="Slug harus diisi"
              />
            )}
            name="slug"
            defaultValue={postData ? postData.slug : ''}
          />
          <Controller
            control={control}
            rules={{required: true}}
            render={({field: {onChange, onBlur, value}}) => (
              <InputText
                passwordMode={false}
                placeholder="Masukkan deskripsi"
                label="Deskripsi"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={!!errors.deskripsi}
                errorMessage="Deskripsi harus diisi"
              />
            )}
            name="description"
            defaultValue={postData ? postData.description : ''}
          />

          {!postId && (
            <Button
              mode="contained"
              color="white"
              labelStyle={{textAlign: 'left'}}
              contentStyle={{
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                padding: dimens.small_10,
                paddingLeft: 0,
              }}
              uppercase={false}
              onPress={async () => {
                const res = await getSingleDocument();
                setPostImage(res);
              }}>
              {postImage ? `Gambar: ${postImage.name}` : 'Pilih gambar'}
            </Button>
          )}
          <Gap y={dimens.small_10} />
          {postImage && (
            <Card>
              <Card.Cover source={{uri: postImage.uri}} />
            </Card>
          )}
          {errorImage && !postImage && !postId && (
            <HelperText
              style={{paddingLeft: 0, fontSize: dimens.medium_14}}
              type="error">
              Gambar harus diisi
            </HelperText>
          )}
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
