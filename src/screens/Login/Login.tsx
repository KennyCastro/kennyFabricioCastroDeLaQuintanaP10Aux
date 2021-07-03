import React, { Component } from "react";
import {View, Text, StyleSheet, Image, ImageBackground, Alert} from "react-native"; 
import {TextInput, Button, Avatar, RadioButton} from "react-native-paper";
import {NavigationScreenProp} from "react-navigation";
const logo = require('../../../assets/img/git.png');
const background = require('../../../assets/img/wallpaper.jpg');
import axios, { AxiosResponse }  from "axios";
import {Types} from "../../context/ContantTypes";
import AppContext from "../../context/AppContext";
import { DarkTheme } from "@react-navigation/native";

interface MyProps {
    navigation: NavigationScreenProp<any,any>
    
}
interface DateUsers {
    _id: string,
    username: string,
    //email:string,
    password: string,
    token: string,
    tipo: string,
}
interface ServerResponse {
    serverResponse:Array<DateUsers>
}

interface ItemData {
    item: DateUsers
}
interface Mystate {
    //username: string,
    email: string,
    password: string,
}




class Login extends Component<MyProps,Mystate> {
    static contextType = AppContext;
    constructor(props: any){
        super (props)
        this.state={
            password: "", email:""
       }
    }

    async DataSend() {
        const {dispatch} = this.context;
        console.log(this.state);
        var result: any = await axios.post<DateUsers, AxiosResponse<any>>("http://192.168.100.9:8000/api/login", this.state)
        .then((response) => {
            return response.data;
        });
        console.log(result.serverResponse);
        if(result.serverResponse._id == undefined){
            Alert.alert("error")
        }else {
            dispatch({type: Types.SIGN_IN, payload: true})
            dispatch({type: Types.RESTORE_TOKEN, payload: result.serverResponse})
            this.principal();
        }
    }


    principal() {
        
        this.props.navigation.navigate("Principal");
          
    }




    render() {
        return (
    
            <ImageBackground style= {styles.container} source={background}>
                <View>
                    <Image style={styles.logo} source={logo}/>
                </View>

                <View style={styles.footer}>
                <Text style={styles.bien} ></Text>
              
            
                
                    <TextInput style={styles.txtStyles} 
                    label="Username o Email"
                    autoCompleteType= "email"
                    onChangeText={text => {  
                        this.setState({
                            email:text,
                           
                        })
                    }}/>
                    <TextInput style={styles.txtStyles} 
                    label="Password"
                    secureTextEntry
                    onChangeText={text => {  
                        this.setState({
                            password: text
                        })
                    }}
                    right={<TextInput.Icon name="eye" />}
                    />
    
                    <Button   style={styles.boton}  mode="contained" onPress={() =>{
                        this.DataSend();
                        //this.validar() //validamos si es un correo electronico lo que esta mandando, sino es un correo electronico se envia como "" 
                       // this.props.navigation.navigate("Principal");
                       
                    }
                        
                    }>
                        Ingresar
                    </Button>
                    </View>
            </ImageBackground>
        )
      }
    }
const styles = StyleSheet.create({
        container: {
            alignItems:"center",
            flex:1,
            
            
        },
        backgroundImage: {
            width: 420,
            height:750,
            opacity: 1, 
            
        },
        footer: {
            height: 350,
            width: 350,
            marginTop:150,
            position: "absolute",
          },
        txtStyles: {
            backgroundColor: "#FFFFFF70",
            marginBottom:30,
            borderRadius:15,
            
            
        },
       
      
        boton: {
           
            
            borderRadius:60,
            
         
        },
        bien: {
            fontSize: 30,
        
            fontFamily: '$gilroyMedium',
            marginLeft:90,
            height: 80,
            color: "#555555",
            fontWeight:"bold"
          
            
         
        }, 
        usu: {
           
            
           
            fontFamily: '$gilroyMedium',
            fontSize: 15,
         
        },
        logo: {
            alignContent: "center",
            width: 200,
            height: 200,
         

          },
      
    }   
);
export default Login;