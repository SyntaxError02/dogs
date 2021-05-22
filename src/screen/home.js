import React, {useState, useEffect} from 'react';

import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';

function Dogs(props) {
  const [dogs, setDogs] = useState('');
  const [prevImgs, setPrevImg] = useState({});

  useEffect(() => {
    async function prefetch() {
      try {
        let response = await axios.get('https://dog.ceo/api/breeds/list/all');
        const arrRes = Object.keys(response.data.message);
        setDogs(arrRes);
      } catch (error) {}
    }
    prefetch();
  }, []);

  function allClicked(breed, img) {
    setPrevImg({...prevImgs, [breed]: img});
  }

  return (
    <SafeAreaView>
      <ScrollView>
        {dogs.length
          ? dogs.map((breed, index) => {
              return (
                <View key={index}>
                  <TouchableOpacity
                    style={styles.singAsset}
                    onPress={() =>
                      props.navigation.navigate('SDogs', {
                        breed: breed,
                        breedIndex: index,
                        dogs: dogs,
                        prevImgs: prevImgs,
                        allClicked: allClicked,
                      })
                    }>
                    <View style={styles.trContent}>
                      <Text style={styles.dataNme}> {breed} </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            })
          : null}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  nav: {
    display: 'none',
  },
  trContent: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#003E6B',
    paddingTop: 30,
    paddingBottom: 37,
    paddingLeft: 18,
    paddingRight: 18,
    marginTop: 12,
    marginLeft: 19,
    marginRight: 19,
    borderRadius: 3,
  },

  dataNme: {
    color: '#FFFFFF',
    fontSize: 23,
    fontWeight: 'normal',
    letterSpacing: 1,
    opacity: 1,
  },
});

export default Dogs;
