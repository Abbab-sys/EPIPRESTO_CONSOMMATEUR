import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { Searchbar } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useIconButton } from "../../atoms/IconButton";
import Category, { CategoryProps } from "./subsections/Category";
import Order, { OrderProps } from "./subsections/Order";
import Shop, { ShopProps } from "./subsections/Shop";

const categories: CategoryProps[] = [
  {
    color: '#86FFA8',
    categoryName: 'Fruits'
  },
  {
    color: '#FDB8B8',
    categoryName: 'Meat'
  },
  {
    color: '#B9C7E2',
    categoryName: 'Vegetables'
  },
  {
    color: '#86FFA8',
    categoryName: 'Fruits'
  },
  {
    color: '#FDB8B8',
    categoryName: 'Meat'
  },
  {
    color: '#B9C7E2',
    categoryName: 'Vegetables'
  },
]

const shops: ShopProps[] = [
  {
    shopName: 'Pizza Hut'
  },
  {
    shopName: 'Dominos'
  },
  {
    shopName: 'Double Pizza'
  },
  {
    shopName: 'Pizza Hut'
  },
  {
    shopName: 'Dominos'
  },
  {
    shopName: 'Double Pizza'
  },
]

const recentOrders: OrderProps[] = [
  {
    orderNum: 1000,
    orderStatus: 'WAITING_CONFIRMATION'
  },
  {
    orderNum: 1001,
    orderStatus: 'CONFIRMED'
  },
  {
    orderNum: 1002,
    orderStatus: 'IN_DELIVERY'
  },
  {
    orderNum: 1003,
    orderStatus: 'DELIVERED'
  },
  {
    orderNum: 1004,
    orderStatus: 'CLOSED'
  },
  {
    orderNum: 1005,
    orderStatus: 'WAITING_CONFIRMATION'
  },
  {
    orderNum: 1006,
    orderStatus: 'DELIVERED'
  }
]

const Dashboard = () => {

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (text: React.SetStateAction<string>) => {
    setSearchQuery(text)
  }

  const searchButton = useIconButton('magnify', () => {
    // TODO SEARCH BAR
  });

  const accountButton = useIconButton('account', () => {
    // TODO Account
  });

  return(
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.root}>
      <View style={styles.header}>
        <View style={styles.searchIcon}>
          {searchButton.iconButton}
        </View>
        <View style={styles.title}>
          <Text style={styles.epiprestoTitle}>
            EPIP
            <Text style={{color: "#FFAA55"}}>
              RESTO
            </Text>
          </Text>
          <Text>
            Hello, Djalil
          </Text>
        </View>
        <View>
          {accountButton.iconButton}
        </View>
      </View>
      <View style={styles.searchBar}>
        <Searchbar elevation={0} placeholder="Search" onChangeText={handleSearch} value={searchQuery}/>
      </View>
      <View style={styles.categoriesContainer}>
        <Text style={styles.categoriesTitle}>
          Categories
        </Text>
        <View style={{flex: 6}}>
          <ScrollView horizontal>
            {categories.map((category, index) => (
              <Category key={index} color={category.color} categoryName={category.categoryName}/>
              ))}
          </ScrollView>
        </View>
      </View>
      <View style={styles.nearbyShopsContainer}>
        <View style={{flex: 3, flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.subCategoriesTitle}>
            Nearby Shops
          </Text>
          <View style={{marginTop: '1%'}}>
            <Text style={styles.seeAll}>
              See All
            </Text>
          </View>
        </View>
        <View style={{flex: 10}}>
          <ScrollView horizontal>
            {shops.map((shop, index) => (
              <Shop key={index} shopName={shop.shopName} />
              ))}
          </ScrollView>
        </View>
      </View>
      <View style={styles.latestOrdersContainer}>
        <View style={{flex: 3, flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.subCategoriesTitle}>
            Latest Orders
          </Text>
          <View style={{marginTop: '1%'}}>
            <Text style={styles.seeAll}>
              See All
            </Text>
          </View>
        </View>
        <View style={{flex: 10}}>
          <ScrollView horizontal>
            {recentOrders.map((order, index) => (
              <Order key={index} orderNum={order.orderNum} orderStatus={order.orderStatus} />
              ))}
          </ScrollView>
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    margin: '2%'
  },
  header: {
    flex: 114,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor: 'blue'
  },
  searchIcon: {
    border: '1px solid #F1F1F1',
    boxShadow: 'inset 0px 4px 4px rgba(0, 0, 0, 0.25)',
    borderRadius: 10,
    opacity: 0
  },
  searchBar: {
    flex: 50,
    marginBottom: '2%',
    marginTop: '1%',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(242, 244, 248, 0.93)',
    elevation: 5,
  },
  epiprestoTitle: {
    fontFamily: 'Lato',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 36,
    color: '#000000'
  },
  title: {
    // flex: 1,
    flexDirection: 'column',
    alignItems: 'center'
  },
  categoriesTitle: {
    flex: 3,
    color: '#FFAA55',
    fontFamily: 'Lato',
    fontWeight: 'bold',
    fontSize: 20,
  },
  subCategoriesTitle: {
    // flex: 277,
    color: '#FFAA55',
    fontFamily: 'Lato',
    fontWeight: 'bold',
    fontSize: 20
  },
  nearbyShopsContainer: {
    // backgroundColor: '#F2F4F8'
    flex: 207,
    flexDirection: 'column'
  },
  seeAll: {
    color: '#000000',
    fontFamily: 'Lato',
    fontStyle: 'normal',
    fontSize: 15,
  },
  categoriesContainer: {
    flex: 131
  },
  latestOrdersContainer: {
    flex: 177
  }
})

export default Dashboard;