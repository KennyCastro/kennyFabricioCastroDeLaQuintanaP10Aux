import React, { Component } from "react";
import {View, Text, StyleSheet, Alert} from "react-native"; 
import {TextInput, Button, Avatar, RadioButton, Appbar,DarkTheme} from "react-native-paper";
import {StackNavigationProp} from "@react-navigation/stack";
import axios, { AxiosResponse } from "axios";
import AppContext from "../../context/AppContext";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
interface itempost{
    title: string;
    url: string;
    content: string;
    image: string;
    createAt: Date;
    updateAt: Date;
    idUs: string;
    isload: boolean;
  }
interface Mystate {
    title: string;
    url: string;
    content: string;
    image: string;
    createAt?: Date;
    updateAt?: Date;
    idUs?: string;

    isload: boolean;

}
interface MyProps {
    navigation: StackNavigationProp<any, any>
}
class RegisterUsers extends Component<MyProps, Mystate> {
    static contextType = AppContext;
    constructor(props: any) {
        super(props);
        this.state = {
            isload: false,
            title: "", url: "", content: "", image: ""
        }
    }
    async checkandSendData() {
        var navigation:StackNavigationProp<any, any> = this.props.navigation;
        console.log(this.state);
        
        this.setState({
            idUs: this.context.userToken._id.toString()
        })
        console.log("aqui  "+this.state.idUs)
        var result: any = await axios.post<itempost, AxiosResponse<any>>("http://192.168.100.9:8000/api/post", this.state)
        .then((response) => {
            return response.data;
        });
       console.log(this.state.image);
        //console.log("debug2 "+this.state.username+" "+this.state.email+" "+this.state.tipo+" "+this.state.password);
        if (this.state.isload) {
            var data = new FormData();
            data.append("avatar", {
            name: "avatar.jpg", 
            uri: this.state.image, 
            type: "image/jpg"});
            console.log("http://192.168.100.9:8000/api/post/" + result.serverResponse._id+"/"+this.state.image)
            fetch("http://192.168.100.9:8000/api/post/" + result.serverResponse._id+"/"+this.state.image, {
                method: "POST",
                headers: { 
                    "Content-Type": "multipart/form-data"
                },
                body: data
            }).then((result) => {
                result.json();
            }).then((result) => {
                console.log(result);
                navigation.push("ListPost");
            });
            /*var result_img = await axios.post("http://192.168.0.106:8000/api/uploadportrait/" + result.serverResponse._id, data,{
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }).then((response) => {
                return response.data;
            });
            navigation.push("list");
            //console.log(result_img);
            */
        }else{
            //this.showAvatar();
            navigation.push("ListPost");
        }
        
        
    }
    onTakePicture(path: string) {
        //console.log(path);
        this.setState({
            image: path,
            isload: true
        })
    }
    showAvatar() {
        console.log("aquiiiiiu"+this.context.userToken._id)
        console.log(this.state);
        console.log(this.context.image)
        if (this.state.image != "" ) {
            return <Avatar.Image size={150} source={{uri: this.state.image}} />
        } else {
            return <Avatar.Image size={150} source={require('../../../assets/img/batman.png')} />
            
        }
    }

  


  render() {
   
    return (

        
        <KeyboardAwareScrollView style={{flex:1}}>
                <View>
                        <Appbar.Header theme={DarkTheme}>
                        <Appbar.Content title="Registro de Post Nuevos" subtitle={'Post'} />
                       
                    </Appbar.Header>
                    </View>  

                <View >
                    <TextInput style={styles.txtStyles}
                    label="title"
                    onChangeText={text => {  
                        this.setState({
                            title: text
                        })
                    }}/>
                    <TextInput style={styles.txtStyles}
                    label="url"
                    onChangeText={text => {   
                        this.setState({
                            url: text
                        })
                    }}/>
                    
                    <TextInput style={styles.txtStyles}
                    label="Content"
                    multiline = {true}
                    numberOfLines = {6}
                    onChangeText={text => {   
                        this.setState({
                            content: text
                        })
                    }}/>
                    
                    
                  
                   
                    <Button theme={DarkTheme} style={styles.txtStyles} icon="camera" mode="contained" onPress={() => {
                        //this.checkandSendData();
                        this.props.navigation.push("TakePicture", {onTake: (params: string) => {
                            this.onTakePicture(params);
                            console.log(params);
                        }});
                    }}>
                        Tomar Foto
                    </Button>
                    <View style={styles.avatarView}>
                        {this.showAvatar()}
                    </View>
                    <Button theme={DarkTheme} style={styles.txtStyles} icon="gnome" mode="contained" onPress={() => {
                        this.checkandSendData();
                    }}>
                        Create
                    </Button>
                </View>
            
            
           
            
           
          
            
        
    </KeyboardAwareScrollView>
        
    )
  }
}
const styles = StyleSheet.create({
    container: {
        padding: 10
    },
    txtStyles: {
        marginTop: 10
    },
    avatarView: {
        alignItems: "center"
    },
    container2:{
        alignContent:"center",
        marginLeft:10,
        padding:20
        
      }

}   
);
export default RegisterUsers;