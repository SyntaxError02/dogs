import React, {useState, useEffect} from 'react';

import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';

function SDogs(props) {
  const {
    breed,
    breedIndex: bIndex,
    dogs: allDogs,
    allClicked,
    prevImgs,
  } = props.route.params;
  const [dogName, setDogName] = useState(breed);
  const [imgs, setImgs] = useState(prevImgs[dogName] || []);
  const [isLoading, setLoading] = useState(false);
  const [dogs, setDogs] = useState(allDogs);
  const [breedIndex, setBreedIndex] = useState(bIndex);

  useEffect(() => {
    async function preFet() {
      await fetchDogs();
    }
    preFet();
  }, []);


  async function _onRefresh() {
    setLoading(true);
    await updateDogs();
    setLoading(false);
  }

  async function fetchDogs() {
    try {
      if (!prevImgs[dogName]) {
        let response = await axios.get(
          `https://dog.ceo/api/breed/${dogName}/images`,
        );
        let dogimgs = response?.data?.message;
        if (dogimgs?.length) {
          let randomDogs = [];
          for (let index = 0; index < 4; index++) {
            let rDogimg = dogimgs[Math.floor(Math.random() * dogimgs.length)];

            randomDogs.push(rDogimg);
          }
          allClicked(dogName, randomDogs);
          setImgs(randomDogs);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function updateDogs(breed) {
    try {
      if (!prevImgs[breed]) {
        let response = await axios.get(
          `https://dog.ceo/api/breed/${breed}/images`,
        );
        let dogimgs = response?.data?.message;
        if (dogimgs?.length) {
          let randomDogs = [];
          for (let index = 0; index < 4; index++) {
            let rDogimg = dogimgs[Math.floor(Math.random() * dogimgs.length)];

            randomDogs.push(rDogimg);
          }
          allClicked(breed, randomDogs);
          setImgs(randomDogs);
        }
      }
    } catch (error) {}
  }

  return (
    <SafeAreaView style={styles.fPage}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={_onRefresh} />
        }>
        <View>
          <Text style={styles.dataNme}>{dogName}</Text>
        </View>
        <View style={styles.dogView}>
          <Image style={styles.imgStyle} source={{uri: `${imgs[0]}`}} />
          <Image style={styles.imgStyle} source={{uri: `${imgs[1]}`}} />
          <Image style={styles.imgStyle} source={{uri: `${imgs[2]}`}} />
          <Image style={styles.imgStyle} source={{uri: `${imgs[3]}`}} />
        </View>
        <TouchableOpacity
          style={styles.singAsset}
          onPress={async () => {
            const newName = dogs[breedIndex + 1];
            setDogName(newName);
            setBreedIndex(breedIndex + 1);
            updateDogs(newName);
          }}>
          <View style={styles.trContent}>
            <Text style={styles.nxtBreed}> show next breed</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.singAsset}
          onPress={async () => {
            const newName = dogs[breedIndex - 1];
            setDogName(newName);
            setBreedIndex(breedIndex - 1);
            updateDogs(newName);
          }}>
          <View style={styles.trContent}>
            <Text style={styles.nxtBreed}> show previous breed</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fPage: {
    display: 'flex',
    flex: 1,
    margin: 0,
    paddingTop: 10,
    flexDirection: 'row',
    paddingLeft: 1,
    paddingRight: 1,
    opacity: 1,
  },
  dogView: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  nav: {
    display: 'none',
  },
  imgStyle: {
    height: 200,
    width: '40%',
    marginLeft: 1,
    marginTop: 5,
  },
  dataNme: {
    color: 'black',
    fontSize: 28,
    marginBottom: 10,
    fontWeight: 'normal',
    textAlign: 'center',
    letterSpacing: 1,
    opacity: 1,
  },
  nxtBreed: {
    color: '#ffff',
    fontSize: 23,
    fontWeight: 'normal',
    letterSpacing: 1,
    opacity: 1,
    textAlign: 'center',
  },
  trContent: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#003E6B',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 18,
    paddingRight: 18,
    marginTop: 12,
    marginLeft: 19,
    marginRight: 19,
    borderRadius: 3,
  },
});

export default SDogs;
