import React, {useState, useEffect} from 'react';
import {
  CardKeyValue,
  // CardKeyValue,
  EmptyData,
  FABList,
  Gap,
  Header,
  OneLineInfo,
  SkeletonLoading,
} from '../components';
import {color, dimens} from '../constants';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {Card, Paragraph} from 'react-native-paper';
import dayjs from 'dayjs';
import {useIsFocused} from '@react-navigation/core';
import {apiGet} from '../utils';

export const Categories = ({navigation}) => {
  const [listData, setListData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const isFocus = useIsFocused();

  useEffect(() => {
    let isActive = true;

    const getInitialData = async () => {
      const {data} = await apiGet({
        url: 'category/get-all',
        params: {},
      });

      if (isActive) {
        setListData(data);
        setIsLoading(false);
        setIsRefreshing(false);
      }
    };

    if (isRefreshing || isLoading || isFocus) {
      getInitialData();
    }

    return () => {
      isActive = false;
    };
  }, [isRefreshing, isLoading, isFocus]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={color.bg_grey} barStyle="dark-content" />

      <Header
        noBackButton
        withFilter
        title="Daftar Kategori"
        onPressFilter={() => {
          alert('fitur filter');
        }}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={() => {
              setIsRefreshing(true);
            }}
          />
        }>
        {isLoading || isRefreshing ? (
          <SkeletonLoading type="content" />
        ) : listData.length < 1 ? (
          <EmptyData />
        ) : (
          <>
            <OneLineInfo info="Klik item untuk melihat detail" />

            {listData.map((item, index) => {
              return (
                <ListItem
                  key={index}
                  item={item}
                  onPress={() => {
                    navigation.navigate('CategoryDetail', {id: item.id});
                  }}
                />
              );
            })}
          </>
        )}

        <Gap y={72} />
      </ScrollView>

      {/* Add button */}
      <FABList
        label="Buat Kategori"
        onPress={() => {
          navigation.navigate('AddCategory');
        }}
      />
    </SafeAreaView>
  );
};

const ListItem = ({onPress, item}) => {
  return (
    <Card style={{marginTop: dimens.standard}} onPress={onPress}>
      <Card.Title title={item.name} />
      <Card.Content>
        <CardKeyValue keyName="Kode" value={item.code} />
        <CardKeyValue
          keyName="Terakhir diperbarui"
          value={dayjs(item.updated_at).format('DD MMMM YYYY')}
        />
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.bg_grey,
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: dimens.standard,
    paddingTop: dimens.small,
  },
  chipStatus: {
    marginTop: dimens.small,
    marginRight: dimens.small,
  },
});
