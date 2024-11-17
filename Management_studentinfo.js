import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Alert, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import axios from 'axios';

const StudentInfo = () => {
    const navigation = useNavigation();

    const [name, setName] = useState('');
    const [gender, setGender] = useState('');
    const [phone_no, setPhoneNo] = useState('');
    const [designation, setDesignation] = useState('');
    const [aadhar_no, setAadharNo] = useState('');
    const [father_name, setFatherName] = useState('');
    const [class_name, setClassName] = useState('');
    const [section, setSection] = useState('');
    const [class_teacher, setClassTeacher] = useState('');
    const [school_name, setSchoolName] = useState('');
    const [address, setAddress] = useState('');
    const [username, setUsername] = useState('');
    const [reports, setReports] = useState([]);

    const handleSubmit = async () => {
        if (!name.trim() || !gender.trim() || !phone_no.trim() || !designation.trim() || !aadhar_no.trim() || !father_name.trim() || !class_name.trim() || !section.trim() || !class_teacher.trim() || !school_name.trim() || !address.trim()) {
            Alert.alert('Error', 'Please fill all the fields');
            return;
        }

        const data = {
            name,
            gender,
            phone_no: parseInt(phone_no),
            designation,
            aadhar_no: parseInt(aadhar_no),
            father_name,
            class_name,
            section,
            class_teacher,
            school_name,
            address,
        };

        try {
            const response = await axios.post('http://192.168.0.101:5000/submit-complete-info', data);
            if (response.data.success) {
                setUsername(response.data.username); // Save username
                Alert.alert('Success', response.data.message);
                //fetchReports(response.data.username); // Fetch reports for the submitted username
            } else {
                Alert.alert('Error', response.data.message);
            }
        } catch (error) {
            console.error('Error saving student info:', error.response ? error.response.data : error.message);
            Alert.alert('Error', error.response?.data?.message || 'An error occurred while saving student info.');
        }
    };

    // const fetchReports = async (username) => {
    //     try {
    //         const response = await axios.get(`http://192.168.0.114:4000/student-reports/${username}`);
    //         if (response.data.success) {
    //             setReports(response.data.reports);
    //         }
    //     } catch (error) {
    //         console.error('Error fetching reports:', error);
    //     }
    // };

    return (
        <View style={styles.mobileFrame}>
            {/* Header Section */}
            <View style={[styles.mainHeader, { flexDirection: 'row', justifyContent: 'space-between' }]}>
                <TouchableOpacity onPress={() => navigation.navigate('ManagDashboard')}>
                    <Image source={require('./assets/images/slides/main.png')} style={styles.logo} />
                </TouchableOpacity>
                <View style={{ flex: 1 }} />
                <TouchableOpacity onPress={() => navigation.navigate('ManagDashboard')}>
                    <Icon name="home" type="material" size={60} color="#000" />
                </TouchableOpacity>
            </View>
            <ScrollView style={styles.container}>
                <Text style={styles.label}>Name:</Text>
                <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Enter student name" />
                <Text style={styles.label}>Gender:</Text>
                <TextInput style={styles.input} value={gender} onChangeText={setGender} placeholder="Enter gender" />
                <Text style={styles.label}>Phone Number:</Text>
                <TextInput style={styles.input} value={phone_no} onChangeText={setPhoneNo} placeholder="Enter phone number" keyboardType="numeric" />
                <Text style={styles.label}>Designation:</Text>
                <TextInput style={styles.input} value={designation} onChangeText={setDesignation} placeholder="Enter designation" />
                <Text style={styles.label}>Aadhar Number:</Text>
                <TextInput style={styles.input} value={aadhar_no} onChangeText={setAadharNo} placeholder="Enter Aadhar number" keyboardType="numeric" />
                <Text style={styles.label}>Father's Name:</Text>
                <TextInput style={styles.input} value={father_name} onChangeText={setFatherName} placeholder="Enter father's name" />
                <Text style={styles.label}>Class:</Text>
                <TextInput style={styles.input} value={class_name} onChangeText={setClassName} placeholder="Enter class" />
                <Text style={styles.label}>Section:</Text>
                <TextInput style={styles.input} value={section} onChangeText={setSection} placeholder="Enter section" />
                <Text style={styles.label}>Class Teacher:</Text>
                <TextInput style={styles.input} value={class_teacher} onChangeText={setClassTeacher} placeholder="Enter class teacher" />
                <Text style={styles.label}>School:</Text>
                <TextInput style={styles.input} value={school_name} onChangeText={setSchoolName} placeholder="Enter school" />
                <Text style={styles.label}>Address:</Text>
                <TextInput style={styles.input} value={address} onChangeText={setAddress} placeholder="Enter address" />
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
                {/* Reports Section */}
                {reports.length > 0 && (
                    <View>
                        <Text style={styles.title}>Your Behavior Reports</Text>
                        {reports.map(report => (
                            <View key={report.id} style={styles.reportCard}>
                                <Text>{report.report}</Text>
                                <Text>Date: {new Date(report.date).toLocaleDateString()}</Text>
                            </View>
                        ))}
                    </View>
                )}
                {reports.length === 0 && username && <Text>No reports found.</Text>}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        height: 200,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    reportCard: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 10,
    },
    mobileFrame: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        paddingTop: 0,
        marginTop: -70,
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
        marginLeft: 10,
        fontWeight: 'bold',
        marginTop: 10,
    },
    input: {
        marginVertical: 10,
        borderBottomWidth: -10,
        padding: 10,
        borderColor: '#ccc',
        borderRadius: 5,
        backgroundColor: '#fff',
        fontSize: 16,
        color: '#333',
    },
    button: {
        backgroundColor: 'rgb(160, 180,182)',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 40,
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
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    success: {
        color: 'green',
        marginTop: 10,
        textAlign: 'center',
    },
    emptyHeader: {
        height: 30,
        backgroundColor: 'rgb(160, 180, 182)',
        marginTop: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 2,
    },
});

export default StudentInfo;
