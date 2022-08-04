import React, {useContext, useEffect, useState} from 'react';
import {ButtonFormSubmit, Gap, Header, SkeletonLoading} from '../components';
import {color, dimens} from '../constants';
import {SafeAreaView, StatusBar, StyleSheet, ScrollView} from 'react-native';
import {Card, Divider, Subheading, Title, Paragraph} from 'react-native-paper';
import {StackScreenProps} from '@react-navigation/stack';
import {AppStackParamList} from '@routes/RouteTypes';
import {AuthContext} from '../context/AuthContext';
import {apiGet} from '../utils';
import dayjs from 'dayjs';

export const PostDetail = ({navigation, route}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();

  useEffect(() => {
    let isActive = true;

    const getInitialData = async () => {
      const {data} = await apiGet({
        url: 'post/show-data/' + route.params.id,
        params: {},
      });

      if (isActive) {
        setData(data);
        setIsLoading(false);
      }
    };

    if (isLoading) {
      getInitialData();
    }

    return () => {
      isActive = false;
    };
  }, [isLoading, route.params.id]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={color.bg_grey} barStyle="dark-content" />

      <Header title="Detail Post" />

      <ScrollView
        contentContainerStyle={{flexGrow: 1, padding: dimens.standard}}>
        {isLoading ? (
          <SkeletonLoading />
        ) : (
          <Card style={styles.contentContainer}>
            <Card.Cover source={{uri: 'https://picsum.photos/600'}} />

            <Gap y={dimens.medium} />
            <Title style={{textAlign: 'center'}}>{data.title}</Title>
            <Gap y={dimens.medium_14} />
            <Divider />
            <Gap y={dimens.tiny} />

            <Card.Content style={{paddingHorizontal: 0}}>
              <Subheading>Kategori: {data.get_category.name}</Subheading>
              <Gap y={dimens.tiny} />
              <Paragraph>{data.description}</Paragraph>

              <Gap y={dimens.big} />

              <Paragraph style={{color: color.green}}>
                Terakhir diperbarui{' '}
                {dayjs(data.updated_at).format('DD MMMM YYYY')}
              </Paragraph>
            </Card.Content>
            <Gap y={dimens.tiny} />
          </Card>
        )}
      </ScrollView>

      {/* button */}
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
