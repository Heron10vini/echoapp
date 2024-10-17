import { createDrawerNavigator } from '@react-navigation/drawer';
import { Feather } from '@expo/vector-icons';
import { Image, SafeAreaView } from 'react-native';

import TabRoutes from './tab.routes';
import StackRoutes from './stack.routes';

import AeA from '../screens/generos/AcaoeAventura';
import TeS from '../screens/generos/ThrillereSuspense';
import Romance from '../screens/generos/Romance';
import GraphicNovel from '../screens/generos/GraphicNovel'
import Biografia from '../screens/generos/Biografia';
import Historia from '../screens/generos/História';
import Guias from '../screens/generos/Guias';
import Outro from '../screens/generos/Outro';

const Drawer = createDrawerNavigator();

export default function DrawerRoutes(){
    return(
        <Drawer.Navigator screenOptions={{
            headerTitle: () => (
            <SafeAreaView  style={{paddingTop: 30 }}>
              <Image
              source={require('../header/header.png')}
                style={{ width: 180, height: 120,}}
              />
            </SafeAreaView>
            ),
            headerTitleAlign: 'center'
        }}>
                
            <Drawer.Screen 
                name="home"
                component={TabRoutes}
                options={{
                    drawerIcon: ({ focused }) => (
                        <Image
                          source={require('../../assets/home.png')}
                          style={{ width: 40, height: 40, tintColor: focused ? 'black' : 'black' }} // Altere a cor com base no estado
                        />),
                    drawerLabel: "Todos" 
                }}
            />
            <Drawer.Screen name="acaoeaventura" component={AeA} options={{ drawerLabel: "Ação e Aventura"}}/>
            <Drawer.Screen name="thriller e suspense" component={TeS} options={{ drawerLabel: "Thriller e Suspense"}}/>
            <Drawer.Screen name="romance" component={Romance} options={{ drawerLabel: "Romance"}}/>
            <Drawer.Screen name="graphicnovel" component={GraphicNovel} options={{ drawerLabel: "Graphic Novel"}}/>
            <Drawer.Screen name="biografia" component={Biografia} options={{ drawerLabel: "Biografia"}}/>
            <Drawer.Screen name="historia" component={Historia} options={{ drawerLabel: "História"}}/>
            <Drawer.Screen name="guias" component={Guias} options={{ drawerLabel: "Guias"}}/>
            <Drawer.Screen name="outro" component={Outro} options={{ drawerLabel: "Outros"}}/>
        </Drawer.Navigator>
    )
}