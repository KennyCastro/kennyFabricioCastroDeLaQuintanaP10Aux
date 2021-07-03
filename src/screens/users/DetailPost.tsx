import React, { Component } from "react";
import {View, Text, StyleSheet, Alert, FlatList, TouchableHighlight, ImageBackgroundBase} from "react-native";
import AppContext from "../../context/AppContext";
import Icons from "react-native-vector-icons/Feather"
import MyColors from "../../color/MyColors";
import {createStackNavigator, StackNavigationProp} from "@react-navigation/stack"
//import {IRoles, ItemUser, IClients, IPedido, IRecibo, ISimpleProducts} from "./TopTab/ClientsRegulars"
import { Avatar, Button, Card, Title, Paragraph , Chip, Searchbar, List, Switch, FAB, Portal, Provider as ProviderFAB, DefaultTheme, withTheme} from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import axios from "axios";
import {Types} from "../../context/ContantTypes"; 
import { Value } from "react-native-reanimated";
import { DarkTheme } from "@react-navigation/native";
import {IPost} from "./ListPost"





interface ServerResponse {
  serverResponse: Array<IPost>
}
interface MyProps {
  navigation: StackNavigationProp<any, any>
}
class DetailUsers extends Component<MyProps, any> {
  static contextType = AppContext;
  
  constructor(props: any) {
    super(props);
    this.state={
      isEnable: false,
      open: false,
      systemPedido: [],
    }
   
  }
  async componentDidMount() {
    var direccion: string = "http://192.168.100.9:8000/pedido/pedidos/"+this.context.itemclient._id;
    var result: Array<IPost> = await axios.get<ServerResponse>(direccion).then((item) => {
      return item.data.serverResponse
    });
    if(result==undefined){
      result=[];
    }
    console.log("Hasta aqui llegue " +result+ "tambien aqui")
    this.setState({
      systemPedido: result,
      
    });
  }

  
  
  image(itempost: IPost){
      if(itempost.image != null) {
        console.log(itempost.image);
        return <Card.Cover style= {styles.images} source={{ uri: 'http://192.168.100.9:8000' + itempost.image }} />
      } else {
       return <Avatar.Text size={178} style={styles.images} label={itempost.title.charAt(0)+itempost.title.charAt(1)} />
      }

  }


 

 


  ExistsPedidos(){
    
  }
 
  render() {
    var itempost: IPost = this.context.itempost;

    return (
      <View style={{flex:1}}>
      <KeyboardAwareScrollView >
          <View style={styles.container}>
              <View> 
                <Card >
                  <View style= {styles.Cabecera} >
                    {this.image(itempost)}
                      <View style={styles.contacto}>
                        <Text style={styles.textoCabecera1}>Titulo: {itempost.title}</Text>
                        <Text style={styles.textoCabecera2}>Descripción: {itempost.content}</Text>
                     
                        
                       
                      </View>
                      
                  </View>
                  <View>
                  <Card.Content>
                      {/*<Title>{itemuser.username}</Title>*/}
                      {/*<Paragraph style={styles.segundaCabecera}>Probabilidad de captar cliente: 90 %</Paragraph>*/}
                      <Paragraph style={styles.segundaCabecera}>Fecha de creación: {itempost.createAt}</Paragraph>
                    </Card.Content>

                    <Card.Actions style={{justifyContent:"center"}}>
                    <Button icon="account-edit" theme={DarkTheme} onPress={() => {

                    }}>Edit</Button>
                    <Button icon="delete" theme={DarkTheme} onPress={() => {
                      Alert.alert("Borrar Post", "Desea Borrar el post? " + itempost.title, [
                        {text: "Confirmar", onPress: () => {

                        }},
                        {text: "Cancelar", onPress: () => {

                        }}
                      ])
                    }}>Borrar</Button>
                  </Card.Actions>
                  </View>
  
                           

               </Card>
                  
                      
                         
                 
              </View>
           
          </View>
        </KeyboardAwareScrollView>
      
             
            
               

          </View>
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

 
  Cabecera:{
    
  },
  images:{
    width: 350,
    height: 270,
    marginLeft: 10,
    marginTop: 20,
    borderRadius: 20,
  },
  contacto:{
    marginTop: 20,
    marginLeft: 20,
  },
  textoCabecera1: {
      fontSize: 28,
      textAlign:"center",
  },
  textoCabecera2: {
    marginTop: 10,
    fontSize: 20,
    textAlign: "justify"
  },
 
 
  
  segundaCabecera:{
    marginTop: 20,
    fontSize: 15,
    marginBottom:"58%",
    fontFamily: "sans-serif-medium",
    textAlign: "center",
  },

});




export default DetailUsers;











/*interface MyState {
  systemroles: Array<IRoles>
}
interface ServerResponse {
  serverResponse:Array<IRoles>
}
interface ServerResponsePutRoles {
  serverResponse: ItemUser
}
class DetailUsers extends Component<any, MyState> {
  static contextType = AppContext;
  constructor(props: any) {
    super(props);
    this.state = {
      systemroles: []
    }
  }
  async componentDidMount() {
    var result: Array<IRoles> = await axios.get<ServerResponse>("http://192.168.0.106:8000/api/roles").then((item) => {
      return item.data.serverResponse
    });
    this.setState({
      systemroles: result
    });
  }
  renderRoles(itemuser: ItemUser) {
    const {dispatch} = this.context;
    if (itemuser.roles.length == 0) {
      return <View>
        <Text>
          El usuario {itemuser.username} , no tiene roles asignados
        </Text>
      </View>
    }
    return (<View style={styles.chipContainer}>
        {
          itemuser.roles.map(item => {
            return <Chip icon="information" onPress={async () => {
              var result: ItemUser = await axios.put<ServerResponsePutRoles>("http://192.168.0.106:8000/api/removerol/" + this.context.itemuser._id, {idRol: item._id}).then((item) => {
                return item.data.serverResponse;
              });
              dispatch({type: Types.CHANGEITEMUSER, payload: result});
            }}>{item.name} {item.method}</Chip>
          })
        }
    </View>);
  }
  listItem(item: IRoles) {
    const {dispatch} = this.context;
    
    //var item : ItemUser = params.item
      return <List.Item
      title={item.name}
      description={item.method}
      onPress={async () => {
        var result: ItemUser = await axios.put<ServerResponsePutRoles>("http://192.168.0.106:8000/api/addrol/" + this.context.itemuser._id, {idRol: item._id}).then((item) => {
          return item.data.serverResponse;
        });
          dispatch({type: Types.CHANGEITEMUSER, payload: result});
      }}
      left={props => <List.Icon {...props} icon="incognito" />}
      />
}
  render() {
    var itemuser: ItemUser = this.context.itemuser;
    return (
      <KeyboardAwareScrollView style={{flex:1}}>
        <View style={styles.container}>
            <View>
              <Card>
                <Card.Cover source={{ uri: 'http://192.168.0.106:8000' + itemuser.uriavatar }} />
                  <Card.Content>
                    <Title>{itemuser.username}</Title>
                    <Paragraph>El nombre de usuario es{itemuser.email} </Paragraph>
                  </Card.Content>
                  <Card.Actions>
                    <Button icon="account-edit" onPress={() => {

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
                      {this.renderRoles(itemuser)}
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
                    <FlatList
                        data={this.state.systemroles}
                        renderItem={({item}) => (
                          this.listItem(item)
                        )}
                        keyExtractor={(item) => item._id}
                      />
                      
                    </View>
                </Card.Content>
                  
                </Card>
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
  }
});
export default DetailUsers;*/