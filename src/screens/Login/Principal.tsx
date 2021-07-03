import React, { Component } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {createStackNavigator, CardStyleInterpolators} from "@react-navigation/stack";
import IndexScreen from "../users/IndexScreen";
import Order from "../Order";
import Reports from "../Reports";
import Icons from "react-native-vector-icons/FontAwesome";
import Icons2 from "react-native-vector-icons/MaterialIcons";
import Icons3 from "react-native-vector-icons/MaterialCommunityIcons";
import MyColors from "../../color/MyColors"
import DetailUser from "../users/DetailUser";

import DataState from "../../context/AppContext";
var Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
class Principal extends Component {
  render() {
    return (
      
        <NavigationContainer independent={true}>
          <Tab.Navigator
          screenOptions={({route}) => ({
            
            tabBarIcon: ({focused, color, size}) => {
              let iconName;
              switch (route.name) {
                case 'Home': {
                  if (focused) {
                    return <Icons name="home" size={23} color={MyColors.secondary}/>;
                  } else {
                    return <Icons name="home" size={23} color={MyColors.maincolor} />;
                  }
                }
                case 'Notifications': {
                  if (focused) {
                    return <Icons2 name="notifications" size={23} color={MyColors.secondary}/>;
                  } else {
                    return <Icons2 name="notifications" size={23} color={MyColors.maincolor} />;
                  }
                }
                case 'Profile': {
                  if (focused) {
                    return (
                      <Icons3 name="face-profile" size={23} color={MyColors.secondary} />
                    );
                  } else {
                    return (
                      <Icons3 name="face-profile" size={23} color={MyColors.maincolor} />
                    );
                  }
                }
              }
            },
          })}
          >
            <Tab.Screen name="Home" component={IndexScreen} />
            <Tab.Screen name="Notifications" component={Order} />
            <Tab.Screen name="Profile" component={DetailUser} />
          </Tab.Navigator>
        </NavigationContainer>
     )
  }
}
export default Principal;