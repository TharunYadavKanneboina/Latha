import React, { useState, useEffect } from 'react';
import { View, Image, TextInput, TouchableOpacity, Text, Alert, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { Shadow } from 'react-native-shadow-2';

const ParentLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const images = [
    require('./assets/images/slides/acad1.jpg'),
    require('./assets/images/slides/att.jpg'),
    require('./assets/images/slides/bus.png'),
    require('./assets/images/slides/homeworkapp.jpg'),
  ];

  const navigation = useNavigation();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000);
    return () => clearInterval(intervalId);
  }, [images]);

  const handleLogin = () => {
    const validUsername = 'nova';
    const validPassword = 'nova123';

    if (!username || !password) {
      Alert.alert('Please enter both username and password.');
      return;
    }

    if (username === validUsername && password === validPassword) {
      navigation.navigate('ParentDashboard', { username });
    } else {
      Alert.alert('Invalid username or password. Please try again.');
    }
  };

  return (
    <LinearGradient colors={['#000000', '#ffffff']} style={styles.linearGradient}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
        <Shadow
    distance={10}
    offset={[0, 5]} // Moves shadow below the image
    startColor={'#00000030'} // Semi-transparent shadow color
    endColor={'#00000000'} // Fading effect at shadow edges
    radius={20}
    style={{ borderRadius: 140 }} // Matches the image's circular shape
>
          <Image source={images[currentIndex]} style={styles.image} />
          </Shadow>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            style={styles.input}
            placeholderTextColor="#aaa"
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
            placeholderTextColor="#aaa"
          />
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>LogIn</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    alignItems: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 250,
    height: 250,
    borderRadius: 140,
    borderWidth: 10,
    shadowColor:'red',
    shadowOffset:{width:6,height:6},
    shadowOpacity:1,
    shadowRadius:50,
    elevation:30,

  },
  inputContainer: {
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    padding: 10,
    margin: 10,
    width: 200,
    borderColor: '#003153',
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: 'black',
    shadowOffset: { width: 10, height: 10},
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 15,
  },
  button: {
    width: 200,
    backgroundColor: '#003153',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 30,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ParentLogin;
