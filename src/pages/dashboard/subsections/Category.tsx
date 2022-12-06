import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {SafeAreaView, StyleSheet, Text, TouchableOpacity} from 'react-native';

/*
 * Name: Category
 * Description: This file is used to display a category for the categories section in the dashboard page.
 * Author:  Adam Naoui-Busson, Khalil Zriba, Zouhair Derouich
 */

export interface CategoryProps {
  color: string;
  categoryName: string;
  categoryIndex?: number;
}

const Category = (props: CategoryProps) => {
  const categoryStyles = StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: props.color,
      elevation: 4,
      borderRadius: 10,
      minWidth: 100,
      margin: 10,
      padding: 5,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      color: '#000000',
      fontFamily: 'Lato',
      fontStyle: 'normal',
    },
  });

  const navigation = useNavigation();
  const navigateToShopList = () => {
    navigation.navigate(
      'Stores' as never,
      {
        shopCategory: props.categoryName,
        index: props.categoryIndex,
        goBack: () => {
          navigation.navigate('Dashboard' as never);
        },
      } as never,
    );
  };

  return (
    <TouchableOpacity onPress={navigateToShopList} style={categoryStyles.root}>
      <SafeAreaView>
        <Text numberOfLines={2} style={categoryStyles.text}>
          {props.categoryName}
        </Text>
      </SafeAreaView>
    </TouchableOpacity>
  );
};

export default Category;
