import React, { Component } from "react";
import {createStackNavigator, StackNavigationProp} from "@react-navigation/stack"
import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import {View, Text,StyleSheet, Platform, FlatList, } from "react-native"; 
import Icons from "react-native-vector-icons/AntDesign";
import {Appbar, List, Avatar, FAB} from "react-native-paper"
import axios from "axios";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
/*import ListUsers from "./ListUsers";
import RegisterUsers from "./RegisterUsers";
import DetailUsers from "./DetailUsers";
import TakePicture from "./TakePicture";*/
import AppContext from "../../context/AppContext";
import {Types} from "../../context/ContantTypes";
import { KeyboardAwareFlatList } from "react-native-keyboard-aware-scroll-view";
const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';
var Stack = createStackNavigator();
interface ServerResponse {
  serverResponse:Array<IPost>
}
export interface IPost{
  _id: string;
  title: string;
  url: string;
  content: string;
  image: string;
  createAt: Date;
  updateAt: Date;
}
interface MyState{
  isPress: boolean
  datapost: Array<IPost>
}
interface MyProps {
  navigation: StackNavigationProp<any, any>
}

class ListPost extends Component<MyProps,MyState> {
  static contextType = AppContext
  constructor(props: any){
    super(props),
    this.state={
      isPress: false,
      datapost: [],
    }
  }

  async componentDidMount(){
    var result : Array<IPost> = await axios.get<ServerResponse>("http://192.168.100.9:8000/api/post").then((item) => {
      return item.data.serverResponse;
    }); 
    console.log(result);
    this.setState({
      datapost: result
    })
  }

  listItem(item: IPost) {
    const {dispatch}= this.context
    //var item : ItemUser = params.item
    //console.log(item.image+" este es la ruta de la imagennnn")
    if (item.image== null || item.image=="") {
      //console.log(item.image)
      return <List.Item
      title={item.title}
      description={item.content}
      onPress={() => {
          dispatch({type: Types.CHANGEITEMPOST , payload: item});
          this.props.navigation.push("DetailPost");
      }}
      left={props => <Avatar.Text size={50}  label={item.title.charAt(0)+item.title.charAt(1)} />}
      />
      
    } else {
      //console.log("sadasdasdasdasdasdasdasdas "+item.image+"aquyiiiiuhsdsdcsdc")
      var uriImg: string = "http://192.168.100.9:8000" + item.image;
      if(uriImg==null){
        uriImg=item.image 
      }
      return <List.Item
                title={item.title}
                description={item.content}
                onPress={() => {
                  dispatch({type: Types.CHANGEITEMPOST, payload: item});
                  this.props.navigation.push("DetailPost");
              }}
                left={props => <Avatar.Image size={48} source={{uri : uriImg}} />}
      />
    }
}







  changeSearchBarVisible(search: boolean){
    this.setState({
        isPress: !search,
      })
    console.log(this.state.isPress);
  }
  

  render() {
    var search = this.state.isPress;
    console.log(search);
    return (
      
        <View style={styles.content}>
            <View>
              <Appbar.Header theme={DarkTheme}>
                <Appbar.Content title="Lista de Post" subtitle={'Items'} />
                 <Appbar.Action icon="magnify"  onPress={() => {
                   this.changeSearchBarVisible(search);
                 }} />
                 <Appbar.Action icon={MORE_ICON} onPress={() => {<Text>hola</Text>}} />
             </Appbar.Header>
            </View>  
            {/*<Icons name="facebook-square" size={23} color="#0000ff"/>*/}

            <View>  
              <FlatList
                data={this.state.datapost}
                renderItem={({item}) => (
                  this.listItem(item)
                )}
                keyExtractor={(item) => item._id}
              />
            </View>

            <FAB
              style={styles.fab}
              
              icon="plus"
              
              onPress={() => this.props.navigation.push("RegisterPost")}
            />


        </View>

       

    )
  }
}
const styles= StyleSheet.create({
  content: {
    flex:1
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor:"#39A2DB"
  },
})
export default ListPost;






















/*class Clients extends Component<any, any> {
  test: any
  static contextType = AppContext
  constructor(props: any) {
    super(props);
    this.state = {
      dataUsers: []
    }
    
  }
  render() {
    const {searchbarVisible, changeSearchBarVisible} = this.context;
    return (
        <NavigationContainer independent={true}>
          <Stack.Navigator>
            <Stack.Screen name="list" component={ListUsers} options={() => (
              {header: () => <Appbar.Header>
                <Appbar.Content title="Gestor de Usuarios" subtitle={'Sistema de Roles'} />
                 <Appbar.Action icon="magnify" onPress={() => {
                   changeSearchBarVisible(!searchbarVisible);
                 }} />
                 <Appbar.Action icon={MORE_ICON} onPress={() => {}} />
             </Appbar.Header>}
            )}/> 
            <Stack.Screen name="RegisterUsers" component={RegisterUsers} options={() => (
              {header: (navigate) => <Appbar.Header>
                <Appbar.BackAction onPress={() => {
                  navigate.navigation.pop();
                  //this.props.navigation.pop();
                }} />
                <Appbar.Content title="Gestor de Usuarios" subtitle={'Sistema de Roles'} />
             </Appbar.Header>}
            )}/>
            <Stack.Screen name="DetailUsers" component={DetailUsers} options={() => (
              {header: (navigate) => <Appbar.Header>
                <Appbar.BackAction onPress={() => {
                  navigate.navigation.pop();
                  //this.props.navigation.pop();
                }} />
                <Appbar.Content title="Datos de Usuario" subtitle={'Sistema de roles'} />
             </Appbar.Header>}
            )}/>
            <Stack.Screen name="TakePicture" component={TakePicture}/>
          </Stack.Navigator>
        </NavigationContainer>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
})
export default Clients;*/