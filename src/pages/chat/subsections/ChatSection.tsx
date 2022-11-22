import React from "react"
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { Divider } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";

export interface ChatSectionProps {
  imageSrc?: any;
  orderNum: string;
  lastMessage: string;
  date: string | null;
  goToChat: any
}

const ChatSection = (props: ChatSectionProps) => {

  return(
    <SafeAreaView style={ChatSectionStyles.root}>
      <TouchableOpacity style={ChatSectionStyles.container} onPress={props.goToChat}>
        <View style={ChatSectionStyles.view}>
          {props.imageSrc ?
            (<Image style={ChatSectionStyles.image} source={{uri: props.imageSrc}}/>)
            :
            (<Icon style={ChatSectionStyles.icon} name="user" size={30} color='black'></Icon>)}
          <View style={ChatSectionStyles.innerView}>
            <Text style={ChatSectionStyles.contactNameText}>{props.orderNum}</Text>
            <View style={ChatSectionStyles.bottomTextContainer}>
              <Text style={ChatSectionStyles.lastMessageText}>{props.lastMessage}</Text>
            </View>
          </View>
          {props.date !== null && (<Text style={ChatSectionStyles.date}>{new Date(props.date).toLocaleDateString()}</Text>)}
        </View>
      </TouchableOpacity>
      <Divider bold style={ChatSectionStyles.divider}></Divider>
    </SafeAreaView>
  )
}

export default ChatSection

const ChatSectionStyles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#F2F4F8',
    borderRadius: 30
  },
  view: {
    flex: 1,
    flexDirection: "row",
    marginVertical: "4%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  innerView: {
    flex: 1,
    flexDirection: "column",
    marginLeft: '2%',
    justifyContent: 'space-evenly'
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 40/2,
    marginLeft: '2%'
  },
  contactNameText: {
    marginTop: "1%",
    marginHorizontal: "2%",
    fontWeight: 'bold',
    color: 'black'
  },
  lastMessageText: {
    marginBottom: "1%",
    marginHorizontal: "2%",
    alignSelf: 'flex-start',
    color: 'black'
  },
  date: {
    marginBottom: "1%",
    alignSelf: 'flex-end',
    marginRight: '3%'
  },
  bottomTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  icon: {
    marginLeft: "2%",
    alignSelf: "center"
  },
  divider: {
    backgroundColor: "#FFA500",
    width: "100%",
    marginVertical: '2%'
  }
});
