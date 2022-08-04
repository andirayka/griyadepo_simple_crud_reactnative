import React, {useEffect, useState} from 'react';
import {
  CardLabelValue,
  Gap,
  Header,
  SkeletonLoading,
  StandardDialog,
} from '../components';
import {color, dimens} from '../constants';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  ScrollView,
  View,
} from 'react-native';
import {
  Card,
  Divider,
  Subheading,
  Title,
  Paragraph,
  Button,
} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {apiGet, apiDelete} from '../utils';
import dayjs from 'dayjs';
import {useIsFocused} from '@react-navigation/native';

export const CategoryDetail = ({navigation, route}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [data, setData] = useState();
  const isFocus = useIsFocused();

  useEffect(() => {
    let isActive = true;

    const getInitialData = async () => {
      const {data} = await apiGet({
        url: 'category/show-data/' + route.params.id,
        params: {},
      });

      if (isActive) {
        setData(data);
        setIsLoading(false);
      }
    };

    if (isLoading || isFocus) {
      getInitialData();
    }

    return () => {
      isActive = false;
    };
  }, [isLoading, route.params.id, isFocus]);

  const deleteData = async () => {
    const {success} = await apiDelete({
      url: 'category/delete-data/' + route.params.id,
    });
    if (success) {
      setIsDeleting(false);
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={color.bg_grey} barStyle="dark-content" />

      <Header title="Detail Kategori" />

      <StandardDialog
        visible={!!isDeleting}
        title={`Apakah Anda yakin akan menghapus kategori ini?`}
        description="Data dihapus tidak bisa dikembalikan"
        action1Text="batal"
        onPressAction1={() => {
          setIsDeleting(false);
        }}
        action2Text="yakin"
        onPressAction2={() => {
          deleteData();
        }}
      />

      <ScrollView
        contentContainerStyle={{flexGrow: 1, padding: dimens.standard}}>
        {isLoading ? (
          <SkeletonLoading />
        ) : (
          <Card style={styles.contentContainer}>
            <Gap y={dimens.medium} />
            <Title style={{textAlign: 'center'}}>{data.name}</Title>
            <Gap y={dimens.medium_14} />
            <Divider />
            <Gap y={dimens.tiny} />

            <Card.Content style={{paddingHorizontal: 0}}>
              <CardLabelValue label="Kode" value={data.code} />
              <CardLabelValue
                label="Terakhir diubah"
                value={dayjs(data.updated_at).format('DD MMMM YYYY')}
              />
            </Card.Content>
            <Gap y={dimens.tiny} />
          </Card>
        )}
      </ScrollView>

      {/* Buttons */}
      {!isLoading && (
        <View style={{flexDirection: 'row', backgroundColor: 'white'}}>
          <Button
            labelStyle={{color: 'black'}}
            mode="outlined"
            onPress={() => {
              setIsDeleting(true);
            }}
            style={{flex: 1}}
            contentStyle={{padding: dimens.medium}}>
            <MaterialCommunityIcons
              name="delete"
              size={20}
              style={{color: color.red}}
            />
            Hapus
          </Button>
          <Button
            labelStyle={{color: 'black'}}
            mode="outlined"
            onPress={() => {
              navigation.navigate('AddCategory', {
                id: route.params.id,
                categoryData: data,
              });
            }}
            style={{flex: 1}}
            contentStyle={{padding: dimens.medium}}>
            <MaterialCommunityIcons
              name="book-edit-outline"
              size={20}
              style={{color: color.loading}}
            />
            Ubah
          </Button>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.bg_grey,
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    padding: dimens.standard,
  },
});
