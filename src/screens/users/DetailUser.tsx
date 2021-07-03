import React, { Component } from "react";
import {View, Text, StyleSheet, Alert, FlatList} from "react-native";
import AppContext from "../../context/AppContext";
import { Avatar, Button, Card, Title, Paragraph , Chip, Searchbar, List} from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import axios from "axios";
import {Types} from "../../context/ContantTypes"; 
import { StackNavigationProp } from "@react-navigation/stack";
import {IPost} from "./ListPost"

export interface IRoles {
  _id: string,
  name: string,
  urn:  string,
  method: string
}
export interface ItemUser{
  _id: string,
  fullname: string,
  username: string,
  email: string,
  password?:string,
  registerdate?: string
  post?: string,
}



interface MyState {
  systemroles: Array<IRoles>
  systemusers: Array<ItemUser>
}
interface ServerResponse {
  serverResponse:Array<IRoles>
}
interface ServerResponsePutRoles {
  serverResponse: ItemUser
}
interface MyProps {
  navigation: StackNavigationProp<any, any>
}
class DetailUsers extends Component<MyProps, MyState> {
  static contextType = AppContext;
  constructor(props: any) {
    super(props);
    this.state = {
      systemroles: [],
      systemusers: []

    }
  }
  async componentDidMount() {
    const {dispatch} = this.context;
    var {_id} = this.context.userToken
    console.log(_id)
    var res: any = await axios.get<ServerResponse>("http://192.168.100.9:8000/api/users/"+_id.toString()).then((response)=>{
      return response.data.serverResponse
  });
  console.log(res);
    dispatch({type: Types.CHANGEITEMUSER, payload: res})
  }
   
  async text(itemuser: ItemUser){
    return new Promise(async (resolve, reject) => {
      console.log("Login");
      const item = await (itemuser.fullname.toString().charAt(0)+itemuser.fullname.toString().charAt(1))
      resolve(item);
    });
    
  }
  render() {
   
    var itemuser: ItemUser = this.context.itemuser;
    
    return (
      <KeyboardAwareScrollView style={{flex:1}}>
        <View style={styles.container}>
            <View>
              <Card>
             
                  <Card.Content>
                    <Title style={{textAlign:"center"}}> {itemuser.username}</Title>
                    <Paragraph >El nombre completo del usuario es {itemuser.fullname} </Paragraph>
                  </Card.Content>
                  <Card.Actions>
                    <Button icon="account-edit" onPress={() => {
                      this.props.navigation.push("UpdateUser");
                    }}>Edit</Button>
                    <Button icon="delete" onPress={() => {
                      Alert.alert("Borrar usuario", "Desea Borrar Al usuario " + itemuser.username, [
                        {text: "Confirmar", onPress: () => {

                        }},
                        {text: "Cancelar", onPress: () => {

                        }}
                      ])
                    }}>Borrar</Button>
                  </Card.Actions>
                </Card>
            </View>
            <View style={styles.cardViewContainer}>
              <Card>
                <Card.Content>
                    <Title>Roles</Title>
                      <Text style={{textAlign: "center"}}>No tiene roles asignados</Text>
                </Card.Content>
                  
                </Card>
            </View>

            <View style={styles.cardViewContainer}>
              <Card>
                <Card.Content>
                    <Title>Roles del Sistema</Title>
                    <View>
                    <Searchbar
                      placeholder="Search"
                      onChangeText= {() => {

                      }}
                      value=""
                    />
                    </View>
                    <View>
                    <Text style={{textAlign: "center"}}>No tiene roles asignados</Text>
                   
                      
                    </View>
                </Card.Content>
                  
                </Card>
                <Avatar.Text size={200} style={styles.images} label={"ke"}/>
            </View>
        </View>
        </KeyboardAwareScrollView>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1
  },
  cardViewContainer: {
    marginTop: 10
  },
  chipContainer: {
    justifyContent: "center",
    flexDirection: "row",
    flexWrap:"wrap"
  },
  images:{
      width: 370,
      height: 250,
      borderRadius: 10,
  }
});
export default DetailUsers;

































/*export interface IRoles {
  _id: string,
  name: string,
  urn:  string,
  method: string
}
export interface ItemUser{
  _id: string,
  username: string,
  email: string,
  registerdate: string,
  roles: Array<IRoles>,
  pathavatar?: string,
  uriavatar?: string
}
interface ServerResponse {
  serverResponse:Array<ItemUser>
}
interface MyState {
  dataUsers: Array<ItemUser>,
  completeList: Array<ItemUser>,
  searchKey: string
}
interface ItemData {
  item: ItemUser
}
interface MyProps {
    navigation: StackNavigationProp<any, any>
}
const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';
class ListUsers extends Component<MyProps, MyState> {
  static contextType = AppContext;
  constructor(props: any) {
    super(props);
    this.state = {
      dataUsers: [],
      searchKey : "",
      completeList: []
    }
  }
  async componentDidMount() {
    console.log(this.context);
    var result: Array<ItemUser> = await axios.get<ServerResponse>("http://192.168.0.106:8000/api/users").then((item) => {
      return item.data.serverResponse
    });
    this.setState({
      dataUsers: result,
      completeList: result,
    });
  }
  listItem(item: ItemUser) {
      const {dispatch} = this.context;
      //var item : ItemUser = params.item
      if (item.uriavatar == null) {
        return <List.Item
        title={item.username}
        description={item.email}
        onPress={() => {
            dispatch({type: Types.CHANGEITEMUSER, payload: item});
            this.props.navigation.push("DetailUsers");
        }}
        left={props => <List.Icon {...props} icon="incognito" />}
        />
      } else {
        var uriImg: string = "http://192.168.0.106:8000" + item.uriavatar;
        return <List.Item
                  title={item.username}
                  description={item.email}
                  onPress={() => {
                    dispatch({type: Types.CHANGEITEMUSER, payload: item});
                    this.props.navigation.push("DetailUsers");
                }}
                  left={props => <Avatar.Image size={48} source={{uri : uriImg}} />}
        />
      }
  }
  searchList(key: string) {
    this.setState({
      searchKey: key
    });
    var result: Array<ItemUser> = this.state.completeList.filter((item) => {
      var regx = new RegExp(key, "i");
      if (item.username.match(regx) != null) {
        return true;
      }
      return false;
    });
    if (result.length == 0) {
      // Buscar dentro del servidor
      //Consumir una API. y poder revisar ese resltado en la base de datos

    } else {
      this.setState({
        dataUsers: result
      }); 
    }
    
  }
  render() {
    var {searchbarVisible} = this.context;
    return (
        <View style={styles.container}>
          <View>
          {
            searchbarVisible && 
            <Searchbar
            placeholder="Buscar"
            value={this.state.searchKey}
            onChangeText={(msn) => {
              this.searchList(msn);
            }}
            />
          }
          </View>
          <View>
            <FlatList
              data={this.state.dataUsers}
              renderItem={({item}) => (
                this.listItem(item)
              )}
              keyExtractor={(item) => item._id}
            />
          </View>
          <FAB
            style={styles.fab}
            small={false}
            icon="plus"
            onPress={() => {
                this.props.navigation.push("RegisterUsers");
            }}
          />
        </View>
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
export default ListUsers;*/