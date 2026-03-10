import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, FlatList, Image, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useEffect, useState } from 'react';
import apiClient from '../service/api.service';
import { ApiResponse, Character } from '../types/api.types';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import RickCard from '../components/RickCard';
import { RootStackParamList } from '../types/navigation';

export default function App() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'RickList'>>();

  const filteredCharacters = characters.filter((characters) => characters.name.toLowerCase().includes(searchQuery.toLowerCase()));

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await apiClient.get<ApiResponse<Character>>('/character');
        setCharacters(response.data.results);
      } catch (err: any) {
        setError(err.message || 'Une erreur est survenue');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>Chargement...</Text>
        <StatusBar style="auto" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Erreur : {error}</Text>
        <StatusBar style="auto" />
      </View>
    );
  }


  return (
    <SafeAreaView style={styles.container}>
      <FlatList 
        data={filteredCharacters}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={
          <View>
            <TextInput
              placeholder="Rechercher un personnage..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              style={styles.searchInput}
            />
          </View>
        }

        renderItem={({ item }) => <RickCard character={item} 
        onPress={() => (
          navigation.navigate('RickDetail', { character: item })
        )}/>}
        contentContainerStyle={{ padding: 5 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  loadingText: {
    marginTop: 10,
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginBottom: 12,
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
});