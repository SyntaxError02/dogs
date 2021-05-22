import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './screen/home';
import SDogs from './screen/sdogs';

const Stack = createStackNavigator();

function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Dogs"
          component={Home}
          options={{
            title: 'Dogs',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="SDogs"
          component={SDogs}
          options={{
            title: 'SDogs',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
