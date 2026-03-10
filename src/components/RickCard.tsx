import React, { useState } from 'react';
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {Character} from '../types/api.types';
import {CharacterLocationRef} from '../types/api.types';

interface RickCardProps {
  character: Character;
  onPress?: () => void;
}

const RickCard = ({ character, onPress }: RickCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    const newStatus = !isFavorite;
    setIsFavorite(newStatus);

    if (newStatus) {
      Alert.alert(
        'Succès',
        `${character.name} a été ajouté aux favoris`,
        [{ text: 'OK', style: 'default' }]
      );
    }
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: character.image }} style={styles.Image} />

      <View style={styles.textContainer}>
        <View style={styles.titleRow}>
          <Text style={styles.title} numberOfLines={2}>{character.name}</Text>
          

          <TouchableOpacity onPress={toggleFavorite} style={styles.favoriteBtn}>
            <Text style={{ fontSize: 18 }}>{isFavorite ? '❤️' : '🤍'}</Text>
          </TouchableOpacity>
        </View>
        <Text style={{ fontSize: 14, color: '#555' }}>{character.species}</Text>
        <Text style={{ fontSize: 14, color: '#555' }}>{character.gender}</Text>
        <Text style={{ fontSize: 14, color: '#555' }}>{character.location.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    margin: 10,
    padding: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  Image: {
    width: 90,
    height: 130,
    borderRadius: 6,
    resizeMode: 'cover',
  },
  textContainer: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A2E',
    marginBottom: 4,
    lineHeight: 22,
    paddingRight: 8,
  },
  favoriteBtn: {
    padding: 4,
  },
});

export default RickCard;