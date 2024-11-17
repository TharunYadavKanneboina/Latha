import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Video } from 'expo-av';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';


const ParentPhoto = () => {
  const [media, setMedia] = useState([]);
  const [error, setError] = useState(null);
  const navigation = useNavigation();


  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    try {
      const response = await fetch('http://192.168.0.101:5000/api/media');
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      const data = await response.json();
      console.log('Fetched media:', data); // Debugging fetched data
      setMedia(data);
    } catch (error) {
      console.error('Error fetching media:', error);
      setError('Error fetching media. Please try again later.');
    }
  };

  const renderMedia = (item) => {
    if (!item.attachments) return null; // Use the correct field name

    switch (item.mediaType) {
      case 'image/jpeg':
        return (
          <Image
            source={{ uri: item.attachments }} // Use the correct field
            style={styles.media}
            resizeMode="cover"
            onError={() => console.error('Image failed to load')}
          />
        );
      case 'video/mp4':
        return (
          <Video
            source={{ uri: item.attachments }} // Use the correct field
            style={styles.media}
            useNativeControls
            resizeMode="contain"
            isLooping
          />
        );
      default:
        return null;
    }
  };

  const displayMedia = () => {
    if (!media.length) {
      return <Text style={styles.noMediaText}>No media found.</Text>;
    }

    return media.map((item) => (
      <View key={item.id} style={styles.mediaContainer}>
        {renderMedia(item)}
        <Text style={styles.mediaTitle}>{item.eventName}</Text>
      </View>
    ));
  };

  return (
    <View style={styles.mobileFrame}>
      <View style={[styles.mainHeader, { flexDirection: 'row', justifyContent: 'space-between' }]}>
        <TouchableOpacity onPress={() => navigation.navigate('ParentDashboard')}>
          <Image source={require('./assets/images/slides/main.png')} style={styles.logo} />
        </TouchableOpacity>
        <View style={{ flex: 1 }} />
        <TouchableOpacity onPress={() => navigation.navigate('ParentDashboard')}>
          <Icon name="home" type="material" size={60} color="#000" />
        </TouchableOpacity>
      </View>
      <View style={styles.emptyHeader} />
      <View style={styles.galleryContainer}>
        <Text style={styles.galleryTitle}>Photo Gallery:</Text>
        {error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : (
          <ScrollView>
            {displayMedia()}
          </ScrollView>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mobileFrame: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    paddingTop: 0,
    marginTop: -40,
  },
  mainHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgb(160, 180,182)',
    paddingVertical: 10,
    height: 95,
    paddingHorizontal: 15,
    marginTop: 70,
  },
  emptyHeader: {
    height: 30,
    backgroundColor: 'rgb(160, 180,182)',
  },
  logo: {
    width: 50,
    height: 60,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 2,
    alignItems: 'center',
    marginTop: 5,
  },
  galleryContainer: {
    padding: 10,
    flex: 1,
    backgroundColor: '#fff',
  },
  galleryTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 10,
  },
  mediaContainer: {
    marginBottom: 10,
  },
  media: {
    width: '100%',
    height: 200,
  },
  mediaTitle: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 5,
  },
  noMediaText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
  },
});

export default ParentPhoto;
