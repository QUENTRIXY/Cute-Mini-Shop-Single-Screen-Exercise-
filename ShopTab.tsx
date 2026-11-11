
import { useContext, useEffect, useState } from 'react';
import {
    ActivityIndicator,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { CartContext, Product } from './CartContext';

export default function ShopTab() {
  const context = useContext(CartContext);

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [addingId, setAddingId] = useState<string | null>(null);

  // Load products from Activity 5 MockAPI
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          'https://6af4076f55a1de7dcf037e66.mockapi.io/products'
        );

        if (!response.ok) {
          throw new Error('Failed to load products.');
        }

        const data: Product[] = await response.json();
        setProducts(data);
      } catch (error) {
        console.log('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (!context) {
    return <Text>Cart context is unavailable.</Text>;
  }

  const handleAddToCart = (product: Product) => {
    setAddingId(product.id);

    setTimeout(() => {
      context.addToCart(product);
      setAddingId(null);
    }, 1000);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Cute Hair Accessories 🌿</Text>
      <Text style={styles.subtitle}>
        Find Your Pretty Hair Essentials 🎀
      </Text>

      {loading ? (
        <ActivityIndicator size="large" color="#4F8B62" />
      ) : products.length === 0 ? (
        <Text style={styles.message}>No products available.</Text>
      ) : (
        products.map((product) => (
          <View key={product.id} style={styles.card}>
            <Text style={styles.productName}>
              {product.productName}
            </Text>

            <Text style={styles.category}>{product.category}</Text>

            <Text style={styles.description}>
              {product.description}
            </Text>

            <Text style={styles.price}>
              ₱{product.price.toFixed(2)}
            </Text>

            <TouchableOpacity
              style={styles.button}
              onPress={() => handleAddToCart(product)}
              disabled={addingId === product.id}
            >
              <Text style={styles.buttonText}>
                {addingId === product.id
                  ? 'Adding to cart...'
                  : 'Add to Cart +'}
              </Text>
            </TouchableOpacity>
          </View>
        ))
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
    fontSize: 19,
    fontWeight: 'bold',
    color: '#285C3A',
  },
  category: {
    fontSize: 13,
    color: '#4F8B62',
    marginTop: 5,
  },
  description: {
    fontSize: 14,
    color: '#687A6C',
    marginTop: 10,
  },
  price: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#397A4D',
    marginTop: 12,
  },
  button: {
    backgroundColor: '#4F8B62',
    padding: 12,
    borderRadius: 10,
    marginTop: 12,
  },
  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  message: {
    textAlign: 'center',
    color: '#397A4D',
    marginTop: 20,
  },
});
