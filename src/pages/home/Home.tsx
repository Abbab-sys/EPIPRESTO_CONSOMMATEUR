import React from "react";
import {BottomNavigation} from "react-native-paper";
import {STACK_KEY} from "../stacks/StacksKeys";
import {DashboardStack} from "../stacks/DashboardStack";
import {SearchPageStack} from "../stacks/SearchPageStack";
import {StoresPageStack} from "../stacks/StoresPageStack";
import {OrdersPageStack} from "../stacks/OrdersPageStack";
import {ChatsPageStack} from "../stacks/ChatsPageStack";
import {CartsPageStack} from "../stacks/CartPageStack";

export const Home = () => {

  const [index, setIndex] = React.useState(0);

  const [routes] = React.useState([
    {key: STACK_KEY.DASHBOARD_STACK_KEY, focusedIcon: 'home'},
    {key: STACK_KEY.SEARCH_STACK_KEY, focusedIcon: 'magnify'},
    {key: STACK_KEY.STORES_STACK_KEY, focusedIcon: 'hamburger'},
    {key: STACK_KEY.CART_STACK_KEY, focusedIcon: 'cart', unfocusedIcon: 'cart-outline'},
    {key: STACK_KEY.ORDERS_STACK_KEY, focusedIcon: 'basket'},
    {key: STACK_KEY.CHATS_STACK_KEY, focusedIcon: 'message'},
  ]);

  const renderScene = ({route, jumpTo}: any) => {
    const switchToTab = (key: STACK_KEY, params?: any) => {
      // const index = routes.findIndex((route) => route.key === key);
      jumpTo(key, params);
      // setIndex(index);
    }
    switch (route.key) {
      case STACK_KEY.DASHBOARD_STACK_KEY:
        return <DashboardStack switchToTab={switchToTab}/>;
      case STACK_KEY.SEARCH_STACK_KEY:
        return <SearchPageStack switchToTab={switchToTab}/>;
      case STACK_KEY.STORES_STACK_KEY:
        return <StoresPageStack switchToTab={switchToTab}/>;
      case STACK_KEY.CART_STACK_KEY:
        return <CartsPageStack switchToTab={switchToTab}/>; // TODO we could add in this stack access to produt details
      case STACK_KEY.ORDERS_STACK_KEY:
        return <OrdersPageStack switchToTab={switchToTab}/>;
      case STACK_KEY.CHATS_STACK_KEY:
        return <ChatsPageStack  switchToTab={switchToTab}/>;
    }
  }

  return (

    <BottomNavigation
      barStyle={{backgroundColor: '#FFAA55'}}
      navigationState={{index, routes}}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  )
}
