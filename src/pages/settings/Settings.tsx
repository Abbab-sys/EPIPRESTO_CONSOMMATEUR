import React, { useContext } from 'react';
import {useTranslation} from 'react-i18next';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Divider, IconButton} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {onPressInterface, settingInterface as settingsInterface} from '../../interfaces/SettingsInterface';
import {SettingsItemInfo} from './SettingsItem';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ClientAuthenticationContext } from '../../context/ClientAuthenticationContext';

const SettingsItem = (setting: settingsInterface) => {
  const {t, i18n} = useTranslation('translation');
  const navigation = useNavigation();
  const {setClientId} = useContext(ClientAuthenticationContext);

  const handleOnPress = (onPress:onPressInterface) => {
    console.log(onPress);
    switch (onPress.type) {
      case 'navigation':
        console.log('navigation');
        navigation.navigate(onPress.object.routeName as never, onPress.object.params as never);
        break;
      case 'language':
        i18n.changeLanguage(onPress.object);
        break;
      case "logout" :
        setClientId('');
        AsyncStorage.setItem('@clientId', '').then(r =>
          console.log("client id cleared", r)
        );
        break;
      default:
        break;
    }
  };
  return (
    <TouchableOpacity onPress={() => handleOnPress(setting.onPress)} style={[settingsItemStyles.container, {borderTopWidth:setting.index === 0 ? 1 : 0}]}>
      <View style={settingsItemStyles.descritpionView}>
        <View style={settingsItemStyles.leftRightMargin} />
        <View style={settingsItemStyles.IconView}>
          {
          <IconButton
            icon={setting.icon}
            iconColor={ setting.name.includes("language.") ? null :'black'}
            size={20}
          />
    }
        </View>
        <View style={settingsItemStyles.iconTextMargin} />
        <View style={settingsItemStyles.descriptionView}>
          <View style={{flexDirection:"row", alignItems:'center', justifyContent:'space-between'}}>
            <Text style={settingsItemStyles.text}>{t(setting.name)}</Text>
            {setting.onPress.type === 'language' && setting.onPress.object === i18n.language ? <IconButton icon={'check'} iconColor={'black'} size={20} /> : null}
          </View>
        </View>
        <View style={settingsItemStyles.leftRightMargin} />
      </View>
    </TouchableOpacity>
  );
};

const settingsItemStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    // borderColor: 'black',
  },
  descritpionView: {
    flex: 40,
    flexDirection: 'row',
  },

  leftRightMargin: {
    flex: 25,
  },
  iconTextMargin: {
    flex: 15,
  },
  IconView: {
    flex: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  descriptionView: {
    flex: 503,
    justifyContent: 'center',
  },
  text : {
    fontFamily: 'Lato',
    fontStyle: 'normal',
    fontWeight: 'normal',
    includeFontPadding: false,
    color: '#000000',
  },
  divider: {
    borderWidth: 0.1,
  },

});
const renderItem = ({item}: {item: settingsInterface}) => {
  return <SettingsItem {...item} />;
};

const Settings = ({navigation, route}: any) => {
  console.log(route.params.items);

  const handlePress = () => {
    switch (route.params.title) {
      case "settings.title":
        navigation.goBack();
        break;
    
      default:
        navigation.navigate('Settings' as never, {items: SettingsItemInfo, title: "settings.title"} as never);
        break;
    }
  }
  const {t} = useTranslation('translation');
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleView}>
        <View style={styles.titleWrapper}>
        <TouchableOpacity
              style={styles.back_button}
              onPress={() => {
                handlePress();
              }}>
              <Image
                style={styles.back_button_icon}
                source={require('../../assets/images/back.png')}
              />
            </TouchableOpacity>
          <Text style={styles.title}>{t(route.params.title)}</Text> 
        </View>
      </View>
      <View style={styles.restMargin}>
        <FlatList
          data={route.params.items}
          keyExtractor={(item) => item.index.toString()}
          renderItem={renderItem}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  titleView: {
    flex: 95,
    marginLeft: 10,
  },
  marginTitle: {
    flex: 30,
  },
  
  titleWrapper: {
    flex: 95,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection : "row"
  },
  title: {
    flex: 1,
    fontFamily: 'Lato',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 36,
    includeFontPadding: false,
    textAlignVertical: 'center',
    textAlign: "center",
    marginRight : 50,
    color: '#000000',
  },
  marginBottom: {
    flex: 30,
  },
  divider: {
    borderWidth: 0.1,
  },
  restMargin: {
    flex: 634,
  },
  back_button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
  },
  back_button_icon: {
    width: 35,
    height: 35,
    tintColor: '#FFA500',
  },
});

export default Settings;

