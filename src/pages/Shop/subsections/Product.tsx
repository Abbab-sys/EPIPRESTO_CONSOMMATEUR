import React, { useEffect } from "react";
import { Image, View } from "react-native";
import { Button, Card, Divider, Text, TextInput } from 'react-native-paper';
import { productStyles } from "./ProductStyles";

export interface VariantProps {
  _id: string;
  variantTitle: string;
  imgSrc: any;
  stock: number;
  updateSelf : (stock: number) => void;
}

const Variant = (props: VariantProps) => {

  const [stock, setStock] = React.useState((props.stock).toString());

  useEffect(() => {
    console.log(props._id)
    props.updateSelf(parseInt(stock))
  }, [stock])


    // if stock updated consle log id
    const handleStock = (text: React.SetStateAction<string>) => {
        setStock(text)
        // updateStok in BD
    }

  return(
    <View style={productStyles.root}>
      <Card style={productStyles.cardStyle}>
        <Image style={productStyles.image} source={{uri: props.imgSrc}}/>
        <Divider bold style={{backgroundColor: "#FFA500", marginTop: '4%'}}></Divider>
        <Text ellipsizeMode='tail' numberOfLines={2} variant="titleSmall" style={productStyles.productName}>
          {props.variantTitle}
        </Text>
        
        <View 
        // put buttons and stock in a row
        style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: '4%'}}
        >
            <Button style={productStyles.buttonStyle} mode="contained" onPress={() => handleStock((parseFloat(stock)-1).toString())}>
                <Text style={productStyles.buttonText}>-</Text>
            </Button>
            <TextInput
              underlineColor="#FFA500"
              activeUnderlineColor="transparent"
              style={{backgroundColor: '#FFFFFF', borderColor: '#FFA500' , textAlign: 'center'}}
              keyboardType= "numeric"
              value = {stock}
              onChangeText={text => handleStock(text)}
              />
            <Button style={productStyles.buttonStyle} mode="contained" onPress={() => handleStock((parseFloat(stock)+1).toString())}>
                <Text style={productStyles.buttonText}>+</Text>
            </Button>
        </View>
      </Card>
    </View>
  )
}

export default Variant