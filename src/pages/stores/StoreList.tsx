import React, { useContext, useEffect, useState } from "react";
import { ActivityIndicator, Button, FlatList, PermissionsAndroid, Platform, SafeAreaView, View } from "react-native";
import { IconButton, Searchbar, Text } from 'react-native-paper';
import { StoreListStyles } from "./StoreListStyles";
import StoreItem, { ProductProps } from "./subsections/StoreItem";
import Geolocation from 'react-native-geolocation-service';
// import { GET_STORE_PRODUCTS_BY_ID } from "../../graphql/queries";
import { InMemoryCache, useLazyQuery, useQuery } from "@apollo/client";
import {  useIsFocused, useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/Navigation";

type StoreListProps = NativeStackScreenProps<RootStackParamList, 'StoreList'>;

const StoreList = (props: StoreListProps) => {
  const navigation = useNavigation();

  const lol = requestPermissions();

  async function requestPermissions() {
    if (Platform.OS === 'ios') {
      const auth = await Geolocation.requestAuthorization("whenInUse");
      if(auth === "granted") {
         // do something if granted...
      }
    }
  
    if (Platform.OS === 'android') {
      console.log("android");
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      console.log(PermissionsAndroid.RESULTS.GRANTED);
      if (PermissionsAndroid.RESULTS.GRANTED) {
        console.log("3");
        Geolocation.getCurrentPosition(
          (position) => {
            console.log(position);
          },
          (error) => {
            // See error code charts below.
            console.log(error.code, error.message);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
      }
    }
  }
  
  const isFocused = useIsFocused()

  // useEffect(() => {
  //   if(!isFocused) return
  //   getItems()
  //   console.log(data)
  // }, [isFocused])

  // const {storeId, setStoreId} = useContext(VendorContext)

  const [searchQuery, setSearchQuery] = useState('');

  const [products, setProducts] = useState<ProductProps[]>([])

  // const [getItems, { loading, error, data, fetchMore }] = useLazyQuery(
  //   GET_STORE_PRODUCTS_BY_ID, 
  //   {
  //     variables: {
  //       idStore: "",
  //       offset: 0,
  //       first: 20,
  //       searchText: searchQuery
  //     },
  //     onCompleted(data){
  //       setProducts(data.getStoreById.store.products)
  //     }
  //   }
  // )

  // const handleSearch = (text: React.SetStateAction<string>) => {
  //   setSearchQuery(text)
  //   getItems()
  // }

  // useEffect(() => {
  //   console.log("DATA: ", data)
  //   if(data && data.getStoreById) {
  //     setProducts(data.getStoreById.store.products)
  //     // console.log("PRODUCTS: ", products)
  //   }
  // }, [data])

  return(
    <SafeAreaView style={StoreListStyles.root}>
      <View style={StoreListStyles.view}>
        <Text variant="headlineMedium" style={StoreListStyles.headline}>
          INVENTORY
        </Text>
      </View>
      <View>
        <Searchbar style={{marginVertical: 10}} placeholder="Search" onChangeText={()=>{}} value={searchQuery}/>
      </View>
      <SafeAreaView style={{flex: 1}}>
        {/* {loading ? (
            <View style={StoreListStyles.innerContainer}>
              <ActivityIndicator size="large" color="#FFA500"></ActivityIndicator>
            </View>
          ) : error ? (
            <View style={StoreListStyles.innerContainer}>
              <Text style={StoreListStyles.errorText}>OOPS UNE ERREUR EST SURVENUE</Text>
            </View>)
          : (
            products.length === 0 ? 
              (<Text>YOUR RESEARCH DOES NOT MATCH ANY ITEM</Text>)
              : 
              (
                <FlatList
                  numColumns={2}
                  data={products}
                  renderItem={({item}) => 
                    <StoreItem
                      _id={item._id}
                      title={item.title}
                      imgSrc={item.imgSrc}
                      navigation={navigation} /> 
                  }
                  keyExtractor={item => item._id}
                  onEndReachedThreshold={0.8}
                  onEndReached={() => 
                    {
                      console.log("END REACHED")
                      fetchMore({
                        variables: {
                          offset: products.length
                        },
                        updateQuery(previousQueryResult, { fetchMoreResult }) {
                          const newEntries = fetchMoreResult.getStoreById.store.products
                          console.log("PREVIOUS: ", previousQueryResult)
                          console.log("NEW: ", newEntries)
                          setProducts(oldProducts => [...oldProducts, ...newEntries])
                        },
                      })
                    }
                  }
                />
              )
          ) } */}
      </SafeAreaView>
      <View style={{position:'absolute', bottom: 0, alignSelf:'flex-end'}}>
        <IconButton 
          onPress={() => {()=>{};}}
          mode="contained"
          containerColor="black"
          iconColor="#FFA500"
          icon="tag-plus"
          size={40}/>
      <IconButton 
          onPress={() => {()=>{};}}
          mode="contained"
          containerColor="black"
          iconColor="#FFA500"
          icon="store-check"
          size={40}/>
      </View>
    </SafeAreaView>
  )
}

export default StoreList