
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
              height: 65,
              paddingBottom: 10,
              paddingTop: 8,
              borderTopColor: '#D5E9D9',
            },
            tabBarLabelStyle: {
              fontWeight: 'bold',
              fontSize: 13,
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
