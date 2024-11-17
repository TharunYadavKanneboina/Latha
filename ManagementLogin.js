
import React, { useState, useEffect } from 'react';
import { View, Image, TextInput, TouchableOpacity, Text, Alert, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const ManagementLogin = () => {
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
        navigation.navigate('ManagementDashboard'); // Adjust if you have this screen
    } else {
      Alert.alert('Invalid username or password. Please try again.');
    }
  };

  return (
    <LinearGradient colors={['#000000', '#ffffff']} style={styles.linearGradient}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={images[currentIndex]} style={styles.image} />
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
            <Text style={styles.buttonText}>Log In</Text>
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
  },
  button: {
    width: 200,
    backgroundColor: '#003153',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ManagementLogin ;
