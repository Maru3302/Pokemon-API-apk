import React, { useEffect, useState } from 'react';
import { View, Text, Image, Button, ScrollView, TouchableOpacity, Modal, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import styles from '../styles/GenScreenstyles';

export default function GenerationScreen({ route, navigation }) {
  const { generation } = route.params;
  const [pageState,setPageState] = useState(1);
  const [pokemonType, setPokemonType] = useState('');
  const [pokemonList, setPokemonList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const totalPages = Math.ceil(pokemonList.length / itemsPerPage);
  const [showSortOptions, setShowSortOptions] = useState(false);
  const [showPageOptions, setShowPageOptions] = useState(false);
  const [sortBy, setSortBy] = useState('pokedex');
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);

    axios.get(`https://pokeapi.co/api/v2/generation/${generation}/`)
      .then(async (response) => {
        const pokemonSpecies = response.data.pokemon_species;
        const pokemonListWithImages = [];
        

        for (let i = 0; i < pokemonSpecies.length; i++) {
          const pokemon = pokemonSpecies[i];
          const pokemonId = pokemon.url.match(/\/\d+/)[0].substr(1);
          const pokemonImageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;

          const pokemonDetails = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`);
          const pokedexNumber = pokemonDetails.data.id;

          pokemonListWithImages.push({
            name: pokemon.name,
            imageUrl: pokemonImageUrl,
            pokedexNumber,
            type: pokemonDetails.data.types.map((type) => type.type.name),
          });
        }

        if (sortBy === 'pokedex') {
          pokemonListWithImages.sort((a, b) => a.pokedexNumber - b.pokedexNumber);
        } else if (sortBy === 'name') {
          pokemonListWithImages.sort((a, b) => a.name.localeCompare(b.name));
        }

        setPokemonList(pokemonListWithImages);
        setLoading(false);
        
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
      
  }, [generation, sortBy]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedPokemonList = pokemonList.slice(startIndex, endIndex);

  const getTypeImage = (type) => {
    switch (type) {
      case 'normal':
        return require('../types/Normal.png');
      case 'fire':
        return require('../types/Fuego.png');
      case 'water':
        return require('../types/Agua.png');
      case 'grass':
        return require('../types/Planta.png');
      case 'rock':
        return require('../types/Roca.png');
      case 'ground':
        return require('../types/Tierra.png');
      case 'electric':
        return require('../types/Electro.png');
      case 'psychic':
        return require('../types/Psiquico.png');
      case 'fighting':
        return require('../types/Lucha.png');
      case 'dark':
        return require('../types/Siniestro.png');
      case 'steel':
        return require('../types/Metal.png');
      case 'fairy':
        return require('../types/Hada.png');
      case 'dragon':
        return require('../types/Dragon.png');
      case 'bug':
        return require('../types/Bicho.png');
      case 'ice':
        return require('../types/Hielo.png');
      case 'flying':
        return require('../types/Volador.png');
      case 'poison':
        return require('../types/Veneno.png');
      case 'ghost':
        return require('../types/Fantasma.png');
      default:
        return require('../types/Normal.png');
    }
  };

  const handlePagination = (direction) => {
    if (direction === 'prev' && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else if (direction === 'next' && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }
  async function buscarPokemon(nombre) {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${nombre.toLowerCase()}/`);
      return response.data;
    } catch (error) {
      console.error('No se pudo encontrar el Pokémon', error);
      return null;
    }
  }
  return (
    <ScrollView>
      {loading ? (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={{ marginTop: 10, fontSize: 16, color: 'white', }}>Cargando...</Text>
        </View>
      ) : (
        <View>
          <TouchableOpacity onPress={() => setShowSortOptions(true)}>
            <Text>Ordenar por: {sortBy === 'name' ? 'Nombre' : 'no. Pokedex'}</Text>
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.paginationContainer}>
      <TouchableOpacity onPress={() => handlePagination('prev')} disabled={currentPage === 1}>
    <Icon name="chevron-left" size={30} color="white" />
  </TouchableOpacity>
        <Text>
          <TouchableOpacity onPress={() => setShowPageOptions(true)}>
            <Text style={{ textDecorationLine: 'underline',color: 'white', }}> Página {currentPage} de {totalPages}</Text>
          </TouchableOpacity>
        </Text>
        <TouchableOpacity onPress={() => handlePagination('next')} disabled={currentPage === totalPages}>
    <Icon name="chevron-right" size={30} color="white" />
  </TouchableOpacity>
      </View>
      <View style={styles.pokemonCardContainer}>
      {paginatedPokemonList.map((item) => (
        <TouchableOpacity
          key={item.name}
          style={styles.pokemonCard}
          onPress={async () => {
            const pokemon = await buscarPokemon(item.name);
            if (pokemon) {
              navigation.navigate('PokemonDetailScreen', { pokemon });
            }
          }}
        >
        <Image
        source={{ uri: item.imageUrl }}
        style={styles.pokemonImage}
      />
      <View style={styles.typeContainer}>
        {item.type.map((typeName) => (
          <Image
            key={typeName}
            source={getTypeImage(typeName)}
            style={styles.typeName}
          />
        ))}
      </View>
      <Text style={styles.pokemonName}>{item.name}</Text>
    </TouchableOpacity>
      ))}
      </View>
      <Modal visible={showSortOptions} animationType="slide">
        <View style={styles.modalContainer}>
          <Text>Selecciona un orden a mostrar</Text>
          <View>
            <Button
              title="Nombre"
              onPress={() => {
                setSortBy('name');
                setShowSortOptions(false);
              }}
            />
            <Button
              title="Pokedex"
              onPress={() => {
                setSortBy('pokedex');
                setShowSortOptions(false);
              }}
            />
            <Button
              title="Cancelar"
              onPress={() => {
                setSortBy(sortBy);
                setShowSortOptions(false);
              }}
            />
          </View>
        </View>
      </Modal>
      <Modal visible={showPageOptions} animationType="slide">
        <View style={styles.modalContainer}>
          <Text>Selecciona una página</Text>
          <View>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                title={`${page}`}
                onPress={() => {
                  setCurrentPage(page);
                  setShowPageOptions(false);
                  setPageState(page);
                }}
              />
            ))}
            <Button
              title='Cancelar'
              onPress={() => {
                setCurrentPage(pageState);
                setShowPageOptions(false);
              }}
            />
          </View>
        </View>
      </Modal>
    </ScrollView>
    
  );
}
