import React, { useEffect } from "react";
import { Image, View } from "react-native";
import { Button, Card, Divider, IconButton, Text, TextInput } from 'react-native-paper';
import { productStyles } from "./ProductStyles";

export interface VariantProps {
  _id: string;
  variantTitle: string;
  imgSrc: any;
  stock: number;
  price: number;
  byWeight: boolean;
  availableForSale: boolean;
  addToCart : (quantity: number) => void;
}

const Product = (props: VariantProps) => {

  const [quantity, setQuantity] = React.useState("1");

  useEffect(() => {
    console.log(props.byWeight)
  }, [quantity])


    // if stock updated consle log id
    const handleQuantity = (text: React.SetStateAction<string>) => {
        setQuantity(text)
        // updateStok in BD
    }

  return(
    <View style={productStyles.root}>
      <Card style={productStyles.cardStyle}>
        <Image style={productStyles.image} source={{uri: props.imgSrc}}/>
        <Divider bold style={{backgroundColor: "#FFA500", marginTop: '4%'}}></Divider>

        <View 
        // put buttons and stock in a row
        style={{flexDirection: 'row',  marginTop: '4%', justifyContent: 'center'}}
        >
        <Text ellipsizeMode='tail' numberOfLines={2} variant="titleSmall" style={productStyles.productInfo}>
          {props.variantTitle}
        </Text>
        <IconButton 
            onPress={() => {console.log("pressed")}}
            mode="contained"
            iconColor="#FFA500"
            icon="information"
            />
        </View>

        <Text style={productStyles.productInfo}>{props.price} $ {props.byWeight? "/lb" : ""}</Text>
        
        <View 
        // put buttons and stock in a row
        style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: '4%'}}
        >
            <IconButton 
            onPress={() => {handleQuantity((parseFloat(quantity)-1).toString())}}
            disabled={parseFloat(quantity) <= 1}
            mode="contained"
            iconColor="#FFA500"
            icon="minus"
            />

            <TextInput
              underlineColor="#FFA500"
              activeUnderlineColor="transparent"
              style={{ borderColor: '#FFA500' , textAlign: 'center'}}
              keyboardType= "numeric"
              value = {quantity}
              onChangeText={text => handleQuantity(text)}
              disabled={props.stock <= 0}
              />

            <IconButton 
            onPress={() => {handleQuantity((parseFloat(quantity)+1).toString())}}
            disabled={parseInt(quantity) >= props.stock || props.stock <= 0}
            mode="contained"
            iconColor="#FFA500"
            icon="plus"
            />

            <IconButton 
            onPress={() => {props.addToCart(parseInt(quantity))}}
            disabled={parseInt(quantity) <= 0 || props.stock <= 0}
            mode="contained"
            iconColor="#FFA500"
            icon="cart-plus"
            />
        </View>
      <Text style={{color:"red", alignSelf:'center', marginTop: '4%'}}>{props.stock <= 0 ? "Out of stock" : ""}</Text>
      </Card>
    </View>
  )
}

export default Product