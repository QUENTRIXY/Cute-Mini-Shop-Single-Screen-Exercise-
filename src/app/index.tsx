
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

// Product data type
type Product = {
  productName: string;
  description: string;
  price: number;
  category: string;
};

export default function Index() {
  // Store the products from the API
  const [products, setProducts] = useState<Product[]>([]);

  // Track the loading status
  const [loading, setLoading] = useState(true);

  // Store any error message
  const [error, setError] = useState('');

  // Fetch products when the screen opens
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          'https://6af4076f55a1de7dcf037e66.mockapi.io/products'
        );

        if (!response.ok) {
          throw new Error('Failed to fetch products.');
        }

        const data: Product[] = await response.json();

        setProducts(data);
      } catch (err) {
        setError('Unable to load products. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Cute Mini Shop</Text>
      <Text style={styles.subtitle}>Our Available Products 💗</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#E879A8" />
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        products.map((product) => (
          <View key={product.productName} style={styles.card}>
            <Text style={styles.productName}>
              {product.productName}
            </Text>

            <Text style={styles.category}>
              {product.category}
            </Text>

            <Text style={styles.description}>
              {product.description}
            </Text>

            <Text style={styles.price}>
              Price: ₱{product.price.toFixed(2)}
            </Text>
          </View>
        ))
      )}
    </ScrollView>
  );
}

// Screen design
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5FA',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#D94F91',
    textAlign: 'center',
    marginTop: 40,
  },
  subtitle: {
    fontSize: 16,
    color: '#777',
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 15,
    marginBottom: 15,
    elevation: 3,
  },
  productName: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#333',
  },
  category: {
    fontSize: 13,
    color: '#D94F91',
    marginTop: 5,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginTop: 10,
  },
  price: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#D94F91',
    marginTop: 12,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});
