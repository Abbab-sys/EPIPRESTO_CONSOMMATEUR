import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {Image, SafeAreaView, View} from 'react-native';
import {
  Button,
  Card,
  Divider,
  HelperText,
  IconButton,
  Modal,
  Portal,
  Text,
  TextInput,
} from 'react-native-paper';
import {productStyles} from './ProductStyles';

/*
 * Name: Product
 * Description: This file is used to display the product information.
 * Author: Ryma Messedaa
 */

export interface VariantProps {
  _id: string;
  displayName: string;
  imgSrc: any;
  stock: number;
  price: number;
  byWeight: boolean;
  availableForSale: boolean;
  taxable: boolean;
  relatedProduct: any;
  relatedStoreIsPaused: boolean;
  addToCart: (quantity: number) => void;
}

const Product = (props: VariantProps) => {
  const {t} = useTranslation('translation');

  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {
    backgroundColor: 'white',
    padding: 20,
    elevation: 4,
    margin: '2%',
    borderRadius: 30,
  };

  const [quantity, setQuantity] = React.useState('1');

  useEffect(() => {}, [quantity]);

  // Handle quantity change in input
  const handleQuantity = (text: React.SetStateAction<string>) => {
    setQuantity(text);
  };

  return (
    <View style={productStyles.root}>
      <Card
        style={productStyles.cardStyle}
        onPress={() => {
          showModal();
        }}>
        <View style={{alignItems: 'flex-end'}}>
          <IconButton
            onPress={() => {
              showModal();
            }}
            mode="contained"
            iconColor="grey"
            icon="information"
            style={{backgroundColor: 'F2F4F8', margin: 0}}
          />
        </View>
        <Image style={productStyles.image} source={{uri: props.imgSrc}} />
        <View
          // put buttons and stock in a row
          style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Text
            ellipsizeMode="tail"
            numberOfLines={2}
            variant="titleSmall"
            style={productStyles.productInfo}>
            {props.displayName}
          </Text>
        </View>

        <Text style={productStyles.productInfo}>
          {props.price} $ {props.byWeight ? '/lb' : ''}
        </Text>
        {props.stock <= 0 || props.relatedStoreIsPaused ? (
          <View>
            {props.stock <= 0 ? (
              <Text
                style={{color: 'red', alignSelf: 'center', marginTop: '4%'}}>
                {t('store.addProduct.outOfStock')}
              </Text>
            ) : null}
          </View>
        ) : (
          <View>
            <View
              // put buttons and stock in a row
              style={{flexDirection: 'row', justifyContent: 'center'}}>
              <IconButton
                onPress={() => {
                  handleQuantity((parseFloat(quantity) - 1).toString());
                }}
                disabled={parseFloat(quantity) <= 1}
                mode="contained"
                icon="minus"
                iconColor="black"
                style={{backgroundColor: '#F2F4F8'}}
              />

              <TextInput
                activeUnderlineColor="transparent"
                underlineColor="transparent"
                style={{textAlign: 'center', backgroundColor: '#F2F4F8'}}
                keyboardType="numeric"
                value={quantity}
                onChangeText={text => handleQuantity(text)}
                disabled={props.stock <= 0}
              />

              <Text style={{marginVertical: 15}}>
                {props.byWeight ? 'lb(s)' : ''}
              </Text>

              <IconButton
                onPress={() => {
                  handleQuantity((parseFloat(quantity) + 1).toString());
                }}
                disabled={
                  parseFloat(quantity) >= props.stock || props.stock <= 0
                }
                mode="contained"
                icon="plus"
                iconColor="black"
                style={{backgroundColor: '#F2F4F8'}}
              />
            </View>

            <Button
              icon="cart-plus"
              mode="contained"
              onPress={() => {
                props.addToCart(parseFloat(quantity));
              }}
              disabled={parseFloat(quantity) <= 0 || props.stock <= 0}
              style={{backgroundColor: '#FFAA55'}}>
              {t('store.addProduct.button')}
            </Button>
          </View>
        )}
      </Card>

      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}>
          <SafeAreaView>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                marginTop: '4%',
              }}>
              <Image
                style={{
                  resizeMode: 'contain',
                  width: '40%',
                  marginRight: '2%',
                  height: '100%',
                }}
                source={{uri: props.imgSrc}}
              />
              <Divider
                bold
                style={{
                  backgroundColor: '#FFAA55',
                  width: 1,
                  height: '100%',
                  marginRight: '2%',
                }}></Divider>
              <View style={{flex: 1}}>
                <Text style={{fontWeight: 'bold'}}>
                  {t('product.title')}
                  <Text>{props.displayName}</Text>
                </Text>

                <Text style={{fontWeight: 'bold'}}>
                  {props.byWeight
                    ? t('product.pricePerLb')
                    : t('product.price')}
                  <Text>{props.price} $</Text>
                </Text>

                {props.byWeight ? (
                  <Text style={{fontWeight: 'bold'}}>
                    {t('product.pricePerKg')}
                    <Text>{(props.price * 2.20462).toFixed(2)} $</Text>
                  </Text>
                ) : null}

                <Text style={{fontWeight: 'bold'}}>
                  {t('product.brand')}
                  <Text>{props.relatedProduct.brand}</Text>
                </Text>

                <Text style={{fontWeight: 'bold'}}>
                  {t('product.tags')}
                  <Text>
                    {props.relatedProduct.tags
                      .map((tag: any) => tag)
                      .join(', ')}
                  </Text>
                </Text>

                <Text style={{fontWeight: 'bold'}}>
                  {t('product.taxable')}
                  <Text>
                    {props.taxable ? t('product.yes') : t('product.no')}
                  </Text>
                </Text>

                <Text style={{fontWeight: 'bold'}}>
                  {t('product.description')}
                  <Text>{props.relatedProduct.description}</Text>
                </Text>
              </View>
            </View>
            <Divider
              style={{
                backgroundColor: 'transparent',
                marginTop: '2%',
              }}></Divider>
            <HelperText type="info">{t('product.closeModal')}</HelperText>
          </SafeAreaView>
        </Modal>
      </Portal>
    </View>
  );
};

export default Product;
