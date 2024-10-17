import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image, SafeAreaView } from 'react-native';
import DrawerRoutes from './drawer.routes';
import StackRoutes from './stack.routes';
import DocumentDetail from '../screens/Posts';

const Stack = createNativeStackNavigator();

export default function Routes(){
    return(

        <NavigationContainer>
             <Stack.Navigator screenOptions={{title: '' }}>
                <Stack.Screen 
                    name="Drawer"
                    component={DrawerRoutes}
                    options={{headerShown: false}}
                />
                <Stack.Screen 
                    name="DocumentDetail"
                    component={DocumentDetail}
               />
                </Stack.Navigator>
        </NavigationContainer>
    )
}