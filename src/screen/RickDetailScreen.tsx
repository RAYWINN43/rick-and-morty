import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';

type RickDetailRouteProp = RouteProp<RootStackParamList, 'RickDetail'>;

interface Props {
  route: RickDetailRouteProp;
}

const RickDetailScreen: React.FC<Props> = ({ route }) => {
  const { character } = route.params;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      
      {character.image && (
        <Image
          source={{ uri: character.image }}
          style={styles.image}
          resizeMode="contain"
        />
      )}

      <Text style={styles.title}>{character.name}</Text>

      <Text style={styles.field}>Species: {character.species}</Text>
      <Text style={styles.field}>Gender: {character.gender}</Text>
      <Text style={styles.field}>Status: {character.status}</Text>
      <Text style={styles.field}>Origin: {character.origin.name}</Text>
      <Text style={styles.field}>Location: {character.location.name}</Text>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },

  content: {
    padding: 20,
  },

  image: {
    width: '100%',
    height: 300,
    marginBottom: 20,
    alignSelf: 'center',
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#222",
    textAlign: "center",
    marginBottom: 10,
  },

  field: {
    fontSize: 13,
    color: "#555",
    textAlign: "center",
    marginBottom: 10,
  },

  difficulte: {
    fontSize: 13,
    color: "#555",
    textAlign: "center",
    marginBottom: 35,
  },

   ingredients: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginBottom: 35,
  },

  recette: {
    fontSize: 16,
    fontWeight: "bold",
    textDecorationLine: "underline",
    color: "#222",
    marginBottom: 10,
  },

  preparation: {
    fontSize: 16,
    lineHeight: 24,
    color: "#333",
  },
});

export default RickDetailScreen;