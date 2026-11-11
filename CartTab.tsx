
import { useContext } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { CartContext } from './CartContext';

export default function CartTab() {
  const context = useContext(CartContext);

  if (!context) {
    return <Text>Cart context is unavailable.</Text>;
  }

  const { cart, removeFromCart } = context;

  const totalPrice = cart.reduce(
    (total, product) => total + product.price,
    0
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>My Shopping Cart 🛒</Text>
      <Text style={styles.subtitle}>
        Your Pretty Accessories 💚
      </Text>

      {cart.length === 0 ? (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyText}>
            Your cart is empty! 🌿
          </Text>
          <Text style={styles.description}>
            Go to the Shop tab and add some cute accessories.
          </Text>
        </View>
      ) : (
        <>
          {cart.map((product, index) => (
            <View key={`${product.id}-${index}`} style={styles.card}>
              <Text style={styles.productName}>
                {product.productName}
              </Text>

              <Text style={styles.category}>
                {product.category}
              </Text>

              <Text style={styles.price}>
                ₱{product.price.toFixed(2)}
              </Text>

              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => removeFromCart(index)}
              >
                <Text style={styles.removeText}>Remove</Text>
              </TouchableOpacity>
            </View>
          ))}

          <View style={styles.totalCard}>
            <Text style={styles.totalLabel}>Total Amount</Text>
            <Text style={styles.totalPrice}>
              ₱{totalPrice.toFixed(2)}
            </Text>
          </View>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAF5EC',
    padding: 20,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#285C3A',
    textAlign: 'center',
    marginTop: 25,
  },
  subtitle: {
    fontSize: 14,
    color: '#668B70',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 20,
  },
  emptyCard: {
    backgroundColor: '#FFFFFF',
    padding: 25,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#397A4D',
  },
  description: {
    fontSize: 14,
    color: '#687A6C',
    textAlign: 'center',
    marginTop: 10,
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#D5E9D9',
    elevation: 3,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#285C3A',
  },
  category: {
    fontSize: 13,
    color: '#4F8B62',
    marginTop: 5,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#397A4D',
    marginTop: 10,
  },
  removeButton: {
    backgroundColor: '#EAF5EC',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  removeText: {
    color: '#397A4D',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  totalCard: {
    backgroundColor: '#D5E9D9',
    padding: 20,
    borderRadius: 15,
    marginTop: 5,
    marginBottom: 25,
  },
  totalLabel: {
    fontSize: 16,
    color: '#285C3A',
    fontWeight: 'bold',
  },
  totalPrice: {
    fontSize: 25,
    color: '#285C3A',
    fontWeight: 'bold',
    marginTop: 8,
  },
});
