// GenScreenStyles.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E32730',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E32730',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
  sortButton: {
    marginVertical: 10,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#E32730',
  },
  paginationButton: {
    width: 30,
    height: 30,
    marginHorizontal: 10,
  },
  pageText: {
    textDecorationLine: 'underline',
  },
  pokemonCardContainer:{
    justifyContent: 'center', 
    flexDirection: 'row', 
    flexWrap: 'wrap',
    alignSelf: 'center', 
    backgroundColor: '#E32730', 
  },
  pokemonCard: {
    width: '40%',
    margin: 10,
    alignItems: 'center',
    backgroundColor: '#63C2E8',
    borderRadius: 25,
  },
  pokemonImage: {
    width: '80%',
    aspectRatio: 1,
  },
  typeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 5,
  },
  typeName: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  pokemonName: {
    textAlign: 'center',
    marginTop: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalText: {
    margin: 30,
  },
});

export default styles;
