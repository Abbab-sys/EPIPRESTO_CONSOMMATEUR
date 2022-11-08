import React from "react";
import { Image, View } from "react-native";
import { Button, Card, Divider, Text } from 'react-native-paper';
import { StoreItemStyles } from "./StoreItemStyles";
import Icon from 'react-native-vector-icons/FontAwesome';

export interface ProductProps {
  _id: string;
  title: string;
  imgSrc: any;
  navigation: any;
}

const StoreItem = (props: ProductProps) => {

  return(
    <View style={StoreItemStyles.root}>
      <Card style={StoreItemStyles.cardStyle}>
        {props.imgSrc ? 
          (<Image style={StoreItemStyles.image} source={{uri: props.imgSrc}}/>) 
          : 
          (<Icon style={StoreItemStyles.icon} name="image" size={100}></Icon>)}
        <Divider bold style={{backgroundColor: "#FFA500", marginTop: '4%'}}></Divider>
        <Text ellipsizeMode='tail' numberOfLines={2} variant="titleSmall" style={StoreItemStyles.productName}>
          {props.title}
        </Text>
        <Button style={StoreItemStyles.buttonStyle}
        onPress={() => {props.navigation.navigate('UpdateProduct', {idProduct: props._id})}}>
          <Text style={StoreItemStyles.buttonText}>
            Modifier
          </Text>
        </Button>
      </Card>
    </View>
  )
}

export default StoreItem