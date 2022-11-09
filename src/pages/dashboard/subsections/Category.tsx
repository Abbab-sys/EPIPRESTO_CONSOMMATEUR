import React from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";

export interface CategoryProps {
  color: string;
  categoryName: string;
  //navigation: () => {}
} 

const Category = (props: CategoryProps) => {

  const categoryStyles = StyleSheet.create({
    root: {
      // flex: 1,
      backgroundColor: props.color,
      elevation: 4,
      borderRadius: 10,
      width: 110,
      margin: 10,
      justifyContent: 'center',
      alignItems: 'center'
    },
    text: {
      color: '#000000',
      fontFamily: 'Lato',
      fontStyle: 'normal',
    }
  })

  return(
    <SafeAreaView style={categoryStyles.root}>
      <Text style={categoryStyles.text}>
        {props.categoryName}
      </Text>
    </SafeAreaView>
  )

}


export default Category;