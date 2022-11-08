import React, { useEffect } from "react";
import { Image, View } from "react-native";
import { Button, Card, Divider, IconButton, Modal, Portal, Text, TextInput } from 'react-native-paper';
import { productStyles } from "./ProductStyles";

export interface VariantProps {
  _id: string;
  variantTitle: string;
  imgSrc: any;
  stock: number;
  price: number;
  byWeight: boolean;
  availableForSale: boolean;
  taxable: boolean;
  relatedProduct: any;
  addToCart : (quantity: number) => void;
}

const Product = (props: VariantProps) => {

  console.log("product ", props.relatedProduct)

  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 20};

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
          {props.relatedProduct.title} - {props.variantTitle}
        </Text>
        <IconButton 
            onPress={() => {showModal()}}
            mode="contained"
            iconColor="#FFA500"
            icon="information"
            />
        </View>

        <Text style={productStyles.productInfo}>{props.price} $ {props.byWeight? "/lb" : ""}</Text>
        {(!props.availableForSale || props.stock <= 0) ? ( 
        <View>
        <Text style={{color:"red", alignSelf:'center', marginTop: '4%'}}>{props.stock <= 0 ? "Out of stock" : ""}</Text>
        </View>
        ) : (
        <View 
        // put buttons and stock in a row
        style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: '4%'}}
        >
            <IconButton 
            onPress={() => {handleQuantity((parseFloat(quantity)-1).toString())}}
            disabled={parseFloat(quantity) <= 1}
            mode="contained"
            icon="minus"
            />

            <TextInput
              activeUnderlineColor="transparent"
              style={{textAlign: 'center'}}
              keyboardType= "numeric"
              value = {quantity}
              onChangeText={text => handleQuantity(text)}
              disabled={props.stock <= 0}
              />

            <IconButton 
            onPress={() => {handleQuantity((parseFloat(quantity)+1).toString())}}
            disabled={parseInt(quantity) >= props.stock || props.stock <= 0}
            mode="contained"
            icon="plus"
            />

            <IconButton 
            onPress={() => {props.addToCart(parseInt(quantity))}}
            disabled={parseInt(quantity) <= 0 || props.stock <= 0}
            mode="contained"
            icon="cart-plus"
            />
        </View>
        )}
      </Card>
      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
      <Text>Afficher toute l'info du variant ici. Img a gauche et titre, tags, prix en lb et kg quand appplicable, taxable</Text>
      <Text>Description en bas de l'image et apres description affihcer les autres variants visibles?</Text>
      <View style={{flexDirection: 'row', justifyContent: 'flex-start', marginTop: '4%'}}>
        <Image style={{resizeMode:'contain',width:400 , height:400}} source={{uri: props.imgSrc}}/>
        <View>
          <Text>Title : {props.relatedProduct.title} - {props.variantTitle}</Text>
          <Text>{props.byWeight? "Price per lb:" : "Price:"} {props.price} $ </Text>
          {props.byWeight? <Text>Price per kg : {(props.price*2.20462).toFixed(2)} $</Text> : null}
          <Text>Tags : {props.relatedProduct.tags.map((tag: any) => tag).join(", ")}</Text>
          <Text>Taxable : {props.taxable? "Yes" : "No"}</Text>
          <Divider style={{backgroundColor: "transparent", marginTop: '10%'}}></Divider>
          <Text>Description : Ajouter field description dans la query</Text>
        </View>
      </View>
      <Text>Click outside this area to dismiss.</Text>
        </Modal>
      </Portal>
    </View>
  )
}

export default Product