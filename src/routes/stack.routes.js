import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image, SafeAreaView } from 'react-native';
import DocumentDetail from '../screens/Posts';
import TabRoutes from './tab.routes';

const Stack = createNativeStackNavigator();

export default function StackRoutes(){
    return(
        <Stack.Navigator screenOptions={{ title: ''}}>
                
            <Stack.Screen 
                name="DocumentDetail"
                component={DocumentDetail}
            />
        </Stack.Navigator>
    )
}