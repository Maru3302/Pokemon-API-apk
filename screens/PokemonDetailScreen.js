import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import FavoritosButton from "../styles/FavoritosButton";
import Icon from "react-native-vector-icons/FontAwesome";
import ImageBack from "../assets/BackGroundImage.jpg";
import { useFonts } from "expo-font";

export default function PokemonDetailScreen({ route, navigation }) {
  const { pokemon } = route.params;
  const pokemonImageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;

  const [pokemonType, setPokemonType] = useState("");
  const [cardBackgroundColor, setCardBackgroundColor] = useState("white");
  const [abilities, setAbilities] = useState([]);
  const [moves, setMoves] = useState([]);
  const [abilityDescriptions, setAbilityDescriptions] = useState({});
  const [movesDescriptions, setMovesDescriptions] = useState({});

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.id}/`)
      .then((response) => response.json())
      .then((data) => {
        const type = data.types[0].type.name;
        setPokemonType(type);

        switch (type) {
          case "fire":
            setCardBackgroundColor("#FF9C54");
            break;
          case "water":
            setCardBackgroundColor("#4D90D5");
            break;
          case "ice":
            setCardBackgroundColor("#74CEC0");
            break;
          case "grass":
            setCardBackgroundColor("#5DB056");
            break;
          case "ground":
            setCardBackgroundColor("#D97746");
            break;
          case "rock":
            setCardBackgroundColor("#C7B78B");
            break;
          case "electric":
            setCardBackgroundColor("#F3D23B");
            break;
          case "steel":
            setCardBackgroundColor("#5A8EA1");
            break;
          case "dark":
            setCardBackgroundColor("#060809");
            break;
          case "fighting":
            setCardBackgroundColor("#4F1A2A");
            break;
          case "normal":
            setCardBackgroundColor("#9099A1");
            break;
          case "psychic":
            setCardBackgroundColor("#F97176");
            break;
          case "fairy":
            setCardBackgroundColor("#EC8FE6");
            break;
          case "dragon":
            setCardBackgroundColor("#0A6DC4");
            break;
          case "poison":
            setCardBackgroundColor("#EC8FE6");
            break;
          case "ice":
            setCardBackgroundColor("#74CEC0");
            break;
          case "bug":
            setCardBackgroundColor("#90C12C");
            break;
          case "flying":
            setCardBackgroundColor("#8FA8DD");
            break;
          case "ghost":
            setCardBackgroundColor("#5269AC");
            break;
          default:
            setCardBackgroundColor("white");
        }

        const abilitiesArray = data.abilities.map((ability) => ability.ability);
        setAbilities(abilitiesArray);

        const getDescription = async (abilityName, lang = "es") => {
          try {
            const response = await fetch(
              `https://pokeapi.co/api/v2/ability/${abilityName}`
            );
            const data = await response.json();

            if (data && data.names && data.flavor_text_entries) {
              let abilityInfo = {};
              for (const entry of data.names) {
                if (entry.language.name === lang) {
                  abilityInfo.name = entry.name;
                  break;
                }
              }

              for (const entry of data.flavor_text_entries) {
                if (entry.language.name === lang) {
                  abilityInfo.description =
                    entry.flavor_text || "No description available";
                  break;
                }
              }

              return abilityInfo;
            } else {
              console.log("No data found for the ability.");
              return {
                name: "Unknown",
                description: "No description available",
              };
            }
          } catch (error) {
            console.error(`Error fetching ability information: ${error}`);
            return {
              name: "Error",
              description: "Error fetching ability information",
            };
          }
        };

        const getMoveDetails = async (moveName, lang = "es") => {
          try {
            const response = await fetch(
              `https://pokeapi.co/api/v2/move/${moveName}`
            );
            const data = await response.json();
        
            if (data && data.names && data.flavor_text_entries) {
              let moveInfo = {};
              for (const entry of data.names) {
                if (entry.language.name === lang) {
                  moveInfo.name = entry.name;
                  break;
                }
              }
        
              for (const entry of data.flavor_text_entries) {
                if (entry.language.name === lang) {
                  moveInfo.description =
                    entry.flavor_text || "No hay descripción disponible";
                  break;
                }
              }
        
              return moveInfo;
            } else {
              console.log("No se encontraron datos para el movimiento.");
              return {
                name: "Desconocido",
                description: "No hay descripción disponible",
              };
            }
          } catch (error) {
            console.error(`Error al obtener información del movimiento: ${error}`);
            return {
              name: "Error",
              description: "Error al obtener información del movimiento",
            };
          }
        };
        
        abilitiesArray.forEach((ability) => {
          getDescription(ability.name, "es");
        });
        const movesArray = data.moves.map((move) => move.move);
        setMoves(movesArray.slice(0, 6));

        const abilityDescriptionsPromises = abilitiesArray.map(
          async (ability) => {
            const description = await getDescription(ability.name, "es");
            return { name: ability.name, description };
          }
        );

        const moveDescriptionsPromises = movesArray.map(async (move) => {
          const description = await getMoveDetails(move.name, "es");
          return { name: move.name, description };
        });

        Promise.all(abilityDescriptionsPromises).then((descriptions) => {
          const descriptionsObject = {};
          descriptions.forEach((desc) => {
            descriptionsObject[desc.name] = desc.description;
          });
          setAbilityDescriptions(descriptionsObject);
        });

        Promise.all(moveDescriptionsPromises).then((descriptions) => {
          const descriptionsObject = {};
          descriptions.forEach((desc) => {
            descriptionsObject[desc.name] = desc.description;
          });
          setMovesDescriptions(descriptionsObject);
        });
      })
      .catch((error) => console.error(error));
      
  }, [pokemon.id]);

  const [fontsLoaded, fontError] = useFonts({
    PokeFont: require("../assets/Fonts/PocketMonk-15ze.ttf"),
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }
  const getTypeImage = (type) => {
    switch (type) {
      case "normal":
        return require("../types/Normal.png");
      case "fire":
        return require("../types/Fuego.png");
      case "water":
        return require("../types/Agua.png");
      case "grass":
        return require("../types/Planta.png");
      case "rock":
        return require("../types/Roca.png");
      case "ground":
        return require("../types/Tierra.png");
      case "electric":
        return require("../types/Electro.png");
      case "psychic":
        return require("../types/Psiquico.png");
      case "fighting":
        return require("../types/Lucha.png");
      case "dark":
        return require("../types/Siniestro.png");
      case "steel":
        return require("../types/Metal.png");
      case "fairy":
        return require("../types/Hada.png");
      case "dragon":
        return require("../types/Dragon.png");
      case "bug":
        return require("../types/Bicho.png");
      case "ice":
        return require("../types/Hielo.png");
      case "flying":
        return require("../types/Volador.png");
      case "poison":
        return require("../types/Veneno.png");
      case "ghost":
        return require("../types/Fantasma.png");
      default:
        return require("../types/Normal.png");
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
    },
    card: {
      flex: 1,
      padding: '20%',
      borderRadius: 10,
      backgroundColor: cardBackgroundColor,
      alignItems: "center",
      position: "relative",
    },
    image: {
      width: 200,
      height: 200,
      marginTop: 100,
    },
    pokeName: {
      fontSize: 32,
      fontFamily: "PokeFont",
      color: "#F74780",
      position: "absolute",
      top: "1.5%",
      padding: "2.2%",
      left: "1.5%",
    },
    pokeNameShadow: {
      fontSize: 32,
      fontFamily: "PokeFont",
      color: "black",
      position: "absolute",
      top: "2%",
      padding: "2%",
      left: "2%",
    },
    typeImage: {
      width: 50,
      height: 50,
      position: "absolute",
      top: 10,
      right: 10,
    },
    abilities: {
      fontSize: 16,
      marginTop: 5,
      textAlign:'center',
    },
    boldText: {
      fontFamily: "PokeFont",
      fontSize: 20,
    },
    infoText: {
      fontFamily: "PokeFont",
      fontSize: 15,
    },
    backgroundImage: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "200%",
      maxHeight: "35%",
    },
    contain: {
      flex:1,
      flexDirection: "row",
      justifyContent: "space-around",
      width: '150%',
      alignItems: "center",
      marginBottom: '10%',
    },
    section: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
    },
  });
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.card}>
          <Image source={ImageBack} style={styles.backgroundImage} />
          <Image source={{ uri: pokemonImageUrl }} style={styles.image} />
          <Text style={styles.pokeNameShadow}>{pokemon.name}</Text>
          <Text style={styles.pokeName}>{pokemon.name}</Text>
          <Image source={getTypeImage(pokemonType)} style={styles.typeImage} />

          <View style={styles.contain}>
            <View style={styles.section}>
              <Text style={styles.infoText}>
                {pokemonType.charAt(0).toUpperCase() + pokemonType.slice(1)}
              </Text>
            </View>

            <View style={styles.section}>
              <Icon name="arrows-v" size={15} color="black" />
              <Text style={styles.infoText}>
                Altura: {pokemon.height / 10} m
              </Text>
            </View>

            <View style={styles.section}>
              <Icon name="balance-scale" size={15} color="black" />
              <Text style={styles.infoText}>
                Peso: {pokemon.weight / 10} kg
              </Text>
            </View>
          </View>

          {moves.map((move, index) => (
            <View key={index} style={{ flex: 1, width: "100%" }}>
              <Text style={[styles.abilities, styles.boldText]}>
                {movesDescriptions[move.name]?.name || move.name}
              </Text>
              <Text style={styles.abilities}>
                {movesDescriptions[move.name]?.description ||
                  "No hay descripción disponible"}
              </Text>
            </View>
          ))}

          <TouchableOpacity>
            <FavoritosButton />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
