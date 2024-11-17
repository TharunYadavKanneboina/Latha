// import React, { useState } from 'react';
// import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity, Image } from 'react-native';
// import { Picker } from '@react-native-picker/picker';
// import { Icon } from 'react-native-elements';
// import { useNavigation } from '@react-navigation/native';
// import axios from 'axios';

// const CreateAccount = () => {
//     const navigation = useNavigation();
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [userType, setUserType] = useState('');

//     const handleSubmit = async () => {
//         if (!username || !password || !userType) {
//             Alert.alert('Error', 'Please fill all the fields');
//             return;
//         }

//         const accountData = {
//             username,
//             password,
//             userType,
//         };

//         try {
//             const response = await axios.post('http://192.168.0.101:5000/create-account', accountData);
//             if (response.data.success) {
//                 Alert.alert('Success', 'Account created successfully!');
//                 setTimeout(() => {
//                     navigation.navigate('StudentInfo');

//                 }, 2000);
//             } else {
//                 Alert.alert('Error', response.data.message || 'Account creation failed.');
//             }
//         } catch (error) {
//             Alert.alert('Error', error.response?.data?.message || 'Failed to create account.');
//         }
//     };

//     return (
//         <View style={styles.mobileFrame}>
//             <View style={styles.mainHeader}>
//                 <TouchableOpacity onPress={() => navigation.navigate('ManagDashboard')}>
//                     <Image source={require('./assets/images/slides/main.png')} style={styles.logo} />
//                 </TouchableOpacity>
//                 <TouchableOpacity onPress={() => navigation.navigate('ManagDashboard')}>
//                     <Icon name="home" type="material" size={60} color="#000" />
//                 </TouchableOpacity>
//             </View>
//             <Text style={styles.label}>Username:</Text>
//             <TextInput
//                 style={styles.input}
//                 value={username}
//                 onChangeText={setUsername}
//                 placeholder="Enter your username"
//             />
//             <Text style={styles.label}>Password:</Text>
//             <TextInput
//                 style={styles.input}

//                 value={password}
//                 onChangeText={setPassword}
//                 secureTextEntry
//                 placeholder="Enter your password"
//             />
//             <Text style={styles.label}>User Type:</Text>
//             <Picker
//                 selectedValue={userType}
//                 onValueChange={(itemValue) => setUserType(itemValue)}
//                 style={styles.input}
//             >
//                 <Picker.Item label="Select User Type" value="" />
//                 <Picker.Item label="Student" value="student" />
//                 <Picker.Item label="Teacher" value="teacher" />
//             </Picker>
//             <TouchableOpacity style={styles.button} onPress={handleSubmit}>
//                 <Text style={styles.buttonText}>Create Account</Text>
//             </TouchableOpacity>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     mobileFrame: {
//         flex: 1,
//         backgroundColor: '#f0f0f0',
//         paddingTop: 0,
//         marginTop: -40,
//     },
//     mainHeader: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         backgroundColor: 'rgb(160, 180,182)',
//         paddingVertical: 10,
//         height: 95,
//         paddingHorizontal: 15,
//     },
//     logo: {
//         width: 50,
//     height: 60,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 5,
//     elevation: 2,
//     alignItems: 'center',
//     marginTop: 5,
//     },
//     label: {
//         fontSize: 16,
//         marginBottom: 8,
//         marginLeft: 10,
//         fontWeight: 'bold',
//     },
//     input: {
//         marginVertical: 10,
//         padding: 10,
//         borderColor: '#ccc',
//         borderRadius: 5,
//         backgroundColor: '#fff',
//         fontSize: 16,
//         color: '#333',
//     },
//     button: {
//         backgroundColor: 'rgb(160, 180,182)',
//         padding: 10,
//         borderRadius: 5,
//         alignItems: 'center',
//     },
//     buttonText: {
//         color: '#ffffff',
//         fontSize: 16,
//         fontWeight: 'bold',
//     },
// });

// export default CreateAccount;
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

// Header component
const Header = () => {
    const navigation = useNavigation();
    const screenWidth = Dimensions.get('window').width;

    return (
        <View style={styles.headerContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('ManagDashboard')}>
                <Image source={require('./assets/images/slides/main.png')} style={styles.logo} />
            </TouchableOpacity>
            <Text style={[styles.headerTitle, { fontSize: screenWidth > 400 ? 22 : 18 }]}>Create Account</Text>
            <TouchableOpacity onPress={() => navigation.navigate('ManagDashboard')}>
                <Icon name="home" type="material" size={screenWidth > 400 ? 35 : 30} color="#000" />
            </TouchableOpacity>
        </View>
    );
};

const CreateAccount = () => {
    const navigation = useNavigation();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('');

    const handleSubmit = async () => {
        if (!username || !password || !userType) {
            Alert.alert('Error', 'Please fill all the fields');
            return;
        }

        const accountData = { username, password, userType };

        try {
            const response = await axios.post('http://192.168.0.101:5000/create-account', accountData);
            if (response.data.success) {
                Alert.alert('Success', 'Account created successfully!');
                setTimeout(() => {
                    navigation.navigate('StudentInfo');
                }, 2000);
            } else {
                Alert.alert('Error', response.data.message || 'Account creation failed.');
            }
        } catch (error) {
            Alert.alert('Error', error.response?.data?.message || 'Failed to create account.');
        }
    };

    return (
        <View style={styles.container}>
            {/* Include the header here */}
            <Header />

            <Text style={styles.label}>Username:</Text>
            <TextInput
                style={styles.input}
                value={username}
                onChangeText={setUsername}
                placeholder="Enter your username"
            />

            <Text style={styles.label}>Password:</Text>
            <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                placeholder="Enter your password"
            />

            <Text style={styles.label}>User Type:</Text>
            <Picker
                selectedValue={userType}
                onValueChange={(itemValue) => setUserType(itemValue)}
                style={styles.input}
            >
                <Picker.Item label="Select User Type" value="" />
                <Picker.Item label="Student" value="student" />
                <Picker.Item label="Teacher" value="teacher" />
            </Picker>

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Create Account</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'rgb(160, 180, 182)',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        height: Dimensions.get('window').height * 0.1,
    },
    logo: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
    },
    headerTitle: {
        color: '#003153',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
        marginLeft: 10,
        fontWeight: 'bold',
    },
    input: {
        marginVertical: 10,
        padding: 10,
        borderColor: '#ccc',
        borderRadius: 5,
        backgroundColor: '#fff',
        fontSize: 16,
        color: '#333',
    },
    button: {
        backgroundColor: 'rgb(160, 180, 182)',
        padding: 12,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
        marginHorizontal: 20,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default CreateAccount;
