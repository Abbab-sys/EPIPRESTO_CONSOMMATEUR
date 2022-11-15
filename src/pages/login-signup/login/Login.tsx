import React, {Fragment, useContext, useEffect, useState} from 'react';
import {KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useLazyQuery} from '@apollo/client';
import {LOGIN_CLIENT_BY_USERNAME, LoginClientByUsernameData} from "../../../graphql/queries/LoginClientByUsername";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootStackParamList} from "../../../navigation/Navigation";
import {ClientAuthenticationContext} from "../../../context/ClientAuthenticationContext";
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient'
import LoginInput from "../../../atoms/LoginInput";
import {useNavigation} from "@react-navigation/native";
import { useTranslation } from 'react-i18next';
import LanguageSelector from '../../../common/language-selection/LanguageSelector';


type LoginProps = NativeStackScreenProps<RootStackParamList, 'Login'>;

const Login: (props: LoginProps) => JSX.Element = () => {
  const {t} = useTranslation('translation')
  const navigation = useNavigation();
  const {setClientId} = useContext(ClientAuthenticationContext);

  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')

  const [loginByUsername, {data, error}] = useLazyQuery(LOGIN_CLIENT_BY_USERNAME, {
    fetchPolicy: "network-only",
  });

  const unwrappedData: LoginClientByUsernameData | undefined = data as LoginClientByUsernameData;

  const handleLogin = async () => {
    if (!identifier || !password) return;
    console.log("USERNAME: ", identifier)
    console.log("PASSWORD: ", password)
    await loginByUsername({
      variables: {
        username: identifier,
        password,
      },
    })
  }

  useEffect(() => {
      if (!unwrappedData) return;
      console.log(unwrappedData)
      setClientId(unwrappedData.loginClientByUsername.clientAccount._id);
      AsyncStorage.setItem('@clientId', unwrappedData.loginClientByUsername.clientAccount._id).then(r =>
        console.log("client id saved", r)
      );
    }
    , [unwrappedData?.loginClientByUsername.code]);

  const handleCreateAccount = () => {
    navigation.navigate('SignUp' as never)
  }

  console.log(error)

  return (
    <Fragment>
      <SafeAreaView style={styles.upperUnsafeAreaView}/>

      <SafeAreaView style={styles.container}>
        <LinearGradient
          colors={['#FDFDFD', '#FECFA0', '#FFAA55']}
          style={styles.linearGradient}
        >
          <KeyboardAvoidingView style={{flex: 1}} behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <View style={styles.titleWrapper}>
              <View style={styles.topMargin}></View>
              <View style={styles.title}>
                <Text style={styles.epiprestoTitle}>
                  {t('login.epip')}
                  <Text style={{color: "#FFAA55"}}>
                    {t('login.resto')}
                  </Text>
                </Text>
              </View>
              <View style={styles.descriptionContainer}>
                <Text numberOfLines={2} style={styles.description}>
                  {t('login.subtitle')}
                </Text>
              </View>
              <View style={styles.languageSelector}>
                <LanguageSelector />
              </View>
            </View>

            <View style={styles.inputs}>
              <LoginInput placeholder={t('login.usernameOrEmail.placeholder')}
                          label={t('login.usernameOrEmail.placeholder')}  setValue={setIdentifier}
                          value={identifier}></LoginInput>
              <LoginInput placeholder={t('login.password.placeholder')}
                          label={t('login.password.placeholder')} setValue={setPassword} value={password}></LoginInput>
            </View>

            <View style={styles.loginButtonContainer}>
              <TouchableOpacity style={styles.nextButton} onPress={handleLogin}>
                <Text style={styles.nextButtonText}>{t('login.buttonTitle')}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.bottomTextContainer}>
              <View style={styles.bottomTextWrapper}>
                <Text style={styles.bottomText}>
                  <Text style={styles.new}>{t('login.newUser')}</Text>
                  <Text onPress={handleCreateAccount} style={styles.create}>{t('login.createAccount')}</Text>
                </Text>
              </View>
            </View>
          </KeyboardAvoidingView>
        </LinearGradient>
      </SafeAreaView>
      <SafeAreaView style={styles.lowerUnsafeAreaView}/>
    </Fragment>
  )
};
const styles = StyleSheet.create({
  upperUnsafeAreaView: {
    flex: 0,
    backgroundColor: '#FDFDFD',
  },
  lowerUnsafeAreaView: {
    flex: 0,
    backgroundColor: '#FFAA55',
  },
  container: {
    flex: 1,
  },
  linearGradient: {
    flex: 1,
  },
  titleWrapper: {
    flex: 313,
    justifyContent: 'center',
  },
  topMargin: {
    flex: 60,
  },
  title: {
    flex: 45,
    alignSelf: 'center',
  },
  epiprestoTitle: {
    fontSize: 48,
    fontFamily: 'Lato',
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 48,
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: {width: 0, height: 4},
    textShadowRadius: 4,
  },
  descriptionContainer: {
    flex: 96,
  },
  description: {
    flex: 1,
    flexWrap: 'wrap',
    alignContent: 'center',
    fontFamily: "Lato",
    fontSize: 20,
    fontWeight: "500",
    fontStyle: "normal",
    lineHeight: 26,
    textAlign: "center",
    color: "#000000",
    margin: '5%',
  },
  languageSelector: {
    flex: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputs: {
    flex: 258,
    justifyContent: 'flex-start',
    alignSelf: 'center',
    width: '100%',

  },

  nextButtonText: {
    fontFamily: "Lato",
    fontSize: 22,
    fontWeight: "600",
    fontStyle: "normal",
    lineHeight: 26,
    textAlign: "center",
    letterSpacing: -0.02,
    alignSelf: "center",
    color: "#000000"
  },
  loginButtonContainer: {
    flex: 106,
    justifyContent: 'center',
  },
  nextButton: {
    borderRadius: 12,
    backgroundColor: "#FDFDFD",
    alignSelf: "center",
    justifyContent: "center",
    width: '36%',
    height: '58%',
  },
  bottomTextContainer: {
    flex: 131,
  },
  bottomTextWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  bottomText: {
    borderRadius: 12,
  },
  new: {
    fontFamily: "Lato",
    fontSize: 15,
    fontWeight: "300",
    fontStyle: "normal",
    lineHeight: 26,
    textAlign: "center",
    color: "#000000"
  },
  create: {
    fontFamily: "Lato",
    fontSize: 15,
    fontWeight: "700",
    fontStyle: "normal",
    lineHeight: 26,
    textAlign: "center",
    color: "#000000"
  }


})

export default Login;
