
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import { CartProvider } from './CartContext';
import CartTab from './CartTab';
import ShopTab from './ShopTab';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <CartProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,

            tabBarActiveTintColor: '#397A4D',
            tabBarInactiveTintColor: '#9BAF9F',

            tabBarStyle: {
              backgroundColor: '#FFFFFF',
              height: 80,
              paddingBottom: 12,
              paddingTop: 10,
              borderTopColor: '#D5E9D9',
              borderTopWidth: 1,
              elevation: 8,
            },

            tabBarItemStyle: {
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            },

            tabBarLabelStyle: {
              fontWeight: 'bold',
              fontSize: 16,
              marginTop: 3,
            },
          }}
        >
          <Tab.Screen
            name="Shop"
            component={ShopTab}
            options={{
              tabBarLabel: 'Shop 🌿',
            }}
          />

          <Tab.Screen
            name="Cart"
            component={CartTab}
            options={{
              tabBarLabel: 'Cart 🛒',
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
}
