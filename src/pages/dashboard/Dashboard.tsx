import {useNavigation} from "@react-navigation/native";
import {useQuery} from "@apollo/client";
import React, {useContext} from "react";
import {useTranslation} from "react-i18next";
import {KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View} from "react-native";
import {ActivityIndicator, Searchbar} from "react-native-paper";
import {SafeAreaView} from "react-native-safe-area-context";
import {useIconButton} from "../../atoms/IconButton";
import {SettingsItemInfo} from "../settings/SettingsItem";
import {ClientAuthenticationContext} from "../../context/ClientAuthenticationContext";
import {GET_CLIENT_ACCOUNT_BY_ID, OrderStatus} from "../../graphql/queries/GetClientAccountById";
import Category, {CategoryProps} from "./subsections/Category";
import Order from "./subsections/Order";
import Shop from "./subsections/Shop";
import {STACK_KEY} from "../stacks/StacksKeys";
import {BottomNavigationContext} from "../../context/BottomNavigationContext";
import {useSearch} from "../../hooks/useSearch";

type Shop = {
  _id: string;
  name: string;
  isOpen: boolean
}

export type OrderData = {
  _id: string,
  orderNumber: string,
  logs: [
    {
      status: OrderStatus
    }
  ]
}

const Dashboard = () => {
  const {switchToTab} = useContext(BottomNavigationContext);

  const navigation = useNavigation();

  const {t} = useTranslation('translation')


  const {clientId} = useContext(ClientAuthenticationContext)

  const {data, loading, error} = useQuery(GET_CLIENT_ACCOUNT_BY_ID, {
    variables: {idClient: clientId, distance: 15},
  })

  const searchButton = useIconButton('cog', () => {
    navigation.navigate('Settings' as never, {items: SettingsItemInfo, title: "settings.title"} as never);
  });

  const accountButton = useIconButton('account', () => {
    navigation.navigate('Account' as never);
  });

  const categories: CategoryProps[] = [
    {
      color: '#86FFA8',
      categoryName: t('shopCategories.FRUITS_AND_VEGETABLES')
    },
    {
      color: '#FDB8B8',
      categoryName: t('shopCategories.FISH_AND_SEAFOOD')
    },
    {
      color: '#B9C7E2',
      categoryName: t('shopCategories.HEALTHY')
    },
    {
      color: '#40B03C',
      categoryName: t('shopCategories.KETO')
    },
    {
      color: '#D47828',
      categoryName: t('shopCategories.BAKERY')
    },
    {
      color: '#3459C7',
      categoryName: t('shopCategories.WORLD_PRODUCTS')
    },
    {
      color: '#B5191C',
      categoryName: t('shopCategories.BUTCHER')
    }
  ]



  const {search,searchText,setSearchText} = useSearch()
  return (
    <SafeAreaView style={{flex: 1}}>
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
            <Text style={{color: 'black'}}>
              {data ? (t('dashboard.hello') + " " + data.getClientAccountById.clientAccount.firstName) : ("")} 👋
            </Text>
          </View>
          <View>
            {accountButton.iconButton}
          </View>
        </View>
        {/*<View style={styles.searchBar}>*/}
        <Searchbar onSubmitEditing={()=>{
          search(searchText)
          switchToTab(STACK_KEY.SEARCH_STACK_KEY)
        }} onIconPress={() => {
          search(searchText)
          switchToTab(STACK_KEY.SEARCH_STACK_KEY)
        }} elevation={0} placeholder={t('dashboard.search')} onChangeText={setSearchText} value={searchText}/>
        {/*</View>*/}
        <View style={styles.categoriesContainer}>
          <Text style={styles.categoriesTitle}>
            {t('shopCategories.title')}
          </Text>
          <View style={{flex: 6}}>
            <ScrollView horizontal>
              {categories.map((category, index) => (
                <Category key={index} categoryIndex={index} color={category.color}
                          categoryName={category.categoryName}/>
              ))}
            </ScrollView>
          </View>
        </View>
        <View style={styles.nearbyShopsContainer}>
          <View style={{flex: 3, flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.subCategoriesTitle}>
              {t('dashboard.nearbyShops.title')}
            </Text>
            <View style={{marginTop: '1%'}}>
              <Text style={styles.seeAll} onPress={() => {
                switchToTab(STACK_KEY.STORES_STACK_KEY)
              }}>
                {t('dashboard.seeAll')}
              </Text>
            </View>
          </View>
          <View style={{flex: 10}}>
            {loading ? (
              <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <ActivityIndicator color="#FFAA55"/>
              </View>
            ) : error ? (
              <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text>{t('dashboard.nearbyShops.errors.notAvailable')}</Text>
              </View>
            ) : (!data || data.getClientAccountById.clientAccount.nearbyShops.length === 0) ? (
              <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text>{t('dashboard.nearbyShops.errors.noShops')}</Text>
              </View>
            ) : (
              <ScrollView horizontal>
                {
                  //The slice takes the first 5 nearby stores
                  data.getClientAccountById.clientAccount.nearbyShops.slice(0, 5).map((shop: Shop) => (
                    <Shop key={shop._id} shopName={shop.name} isOpen={shop.isOpen} idStore={shop._id}/>
                  ))
                }
              </ScrollView>
            )
            }
          </View>
        </View>
        <View style={styles.latestOrdersContainer}>
          <View style={{flex: 3, flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.subCategoriesTitle}>
              {t('dashboard.latestOrders.title')}
            </Text>
            <View style={{marginTop: '1%'}}>
              <Text style={styles.seeAll} onPress={() => {
                switchToTab(STACK_KEY.ORDERS_STACK_KEY)
              }}>
                {t('dashboard.seeAll')}
              </Text>
            </View>
          </View>
          <View style={{flex: 10}}>
            {loading ? (
              <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <ActivityIndicator color="#FFAA55"/>
              </View>
            ) : error ? (
              <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text>{t('dashboard.latestOrders.errors.notAvailable')}</Text>
              </View>
            ) : (!data || data.getClientAccountById.clientAccount.orders.length === 0) ? (
              <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text>{t('dashboard.latestOrders.errors.noOrders')}</Text>
              </View>
            ) : (
              <ScrollView horizontal>
                {
                  data.getClientAccountById.clientAccount.orders.slice(-5).reverse().map((order: OrderData) => {
                    return (<Order orderData={order} key={order._id}/>)
                  })
                }
              </ScrollView>
            )
            }
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
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
    // opacity: 0
  },
  searchBar: {
    flex: 50,
    width: '100%',
    marginBottom: '2%',
    marginTop: '1%',
    borderRadius: 20,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
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
