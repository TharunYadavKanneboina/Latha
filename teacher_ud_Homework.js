import React, { useState } from 'react';
import { Icon } from 'react-native-elements';

import {
  View, TextInput, Button, Alert, Text, StyleSheet, TouchableOpacity, FlatList, Modal, Image,
} from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { useNavigation } from '@react-navigation/native'; // Remove the duplicate useNavigation import

const TeacherHomeworkUpload = () => {
  const [classInput, setClassInput] = useState('');
  const [sectionInput, setSectionInput] = useState('');
  const [subjectInput, setSubjectInput] = useState('');
  const [descriptionInput, setDescriptionInput] = useState('');
  const [homeworkMedia, setHomeworkMedia] = useState([]);
  const [selectedFilesText, setSelectedFilesText] = useState('Choose File');
  const [isUploading, setIsUploading] = useState(false);
  const [homeworkList, setHomeworkList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [imageModalVisible, setImageModalVisible] = useState(false);
  const [selectedImageUri, setSelectedImageUri] = useState(null);
  const navigation = useNavigation(); // Corrected this to only use one useNavigation


  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*', // Accept any file type
        copyToCacheDirectory: true,
      });

      if (result.canceled) {
        Alert.alert('File selection canceled', 'Please select a valid file.');
        return;
      }

      if (result.assets && result.assets.length > 0) {
        const file = result.assets[0];
        setHomeworkMedia(prevMedia => [...prevMedia, file]);
        const fileNames = file.name || file.uri.split('/').pop();
        setSelectedFilesText(prevText => (prevText === 'No file chosen' ? fileNames : `${prevText}, ${fileNames}`));
      } else {
        Alert.alert('File selection error', 'No valid file was selected.');
      }
    } catch (err) {
      console.error('Error picking document:', err);
      Alert.alert('Error picking document', 'Please try again.');
    }
  };

  const validateAndUpload = async () => {
    if (!classInput || !sectionInput || !subjectInput || !descriptionInput || homeworkMedia.length === 0) {
      Alert.alert('Please fill all fields and select media files.');
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    homeworkMedia.forEach(file => {
      formData.append('homework_file', {
        uri: file.uri,
        name: file.name,
        type: file.mimeType || 'application/octet-stream',
      });
    });

    formData.append('class_name', classInput);
    formData.append('section', sectionInput);
    formData.append('subject', subjectInput);
    formData.append('description', descriptionInput);
    formData.append('date', date.toISOString().split('T')[0]);

    try {
      const response = await fetch('http://192.168.0.101:5000/api/upload-homework', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      });

      const result = await response.json();
      if (response.ok) {
        Alert.alert('Success', result.message || 'Files uploaded successfully!');
        setClassInput('');
        setSectionInput('');
        setSubjectInput('');
        setDescriptionInput('');
        setHomeworkMedia([]);
        setSelectedFilesText('No file chosen');
      } else {
        Alert.alert('Error', result.message || 'Upload failed. Please try again.');
      }
    } catch (error) {
      console.error('Error uploading files:', error);
      Alert.alert('Upload Error', 'There was an error uploading your files. Please try again.');
    }

    setIsUploading(false);
  };

  const fetchHomeworkList = async () => {
    setIsLoading(true);
    try {
      const formattedDate = date.toISOString().split('T')[0];
      const response = await fetch(`http://192.168.0.101:5000/api/homework-list?date=${formattedDate}`);
      const result = await response.json();
      if (response.ok) {
        setHomeworkList(result);
      } else {
        Alert.alert('Error fetching homework list', result.message || 'Please try again.');
      }
    } catch (error) {
      console.error('Error fetching homework list:', error);
      Alert.alert('Error fetching homework', 'There was an error fetching the homework list. Please try again.');
    }
    setIsLoading(false);
  };

  // Function to determine MIME type if missing
  const getMimeType = (fileData) => {
    // Check the file data format to identify the type
    if (fileData.startsWith('/9j')) return 'image/jpeg'; // Common base64 header for JPEG images
    if (fileData.startsWith('JVBER')) return 'application/pdf'; // Common header for PDF files
    return 'application/octet-stream'; // Default binary type if unknown
  };

  const viewDocument = async (base64Data, mimeType) => {
    try {
      const detectedMimeType = mimeType || getMimeType(base64Data);
      const fileExtension = detectedMimeType.split('/')[1];
      const fileUri = FileSystem.documentDirectory + `tempDocument.${fileExtension}`;

      await FileSystem.writeAsStringAsync(fileUri, base64Data, { encoding: FileSystem.EncodingType.Base64 });
      await Sharing.shareAsync(fileUri);
    } catch (error) {
      console.error('Error opening document:', error);
      Alert.alert('Error', 'There was a problem opening the document.');
    }
  };

  return (
    <View style={styles.mobileFrame}>
      {/* Header Section */}
      <View style={[styles.Header, { flexDirection: 'row', justifyContent: 'space-between' }]}>
        <TouchableOpacity onPress={() => navigation.navigate('TeacherDashboard')}>
          <Image source={require('./assets/images/slides/main.png')} style={styles.logo} />
        </TouchableOpacity>
        <View style={{ flex: 1 }} />
        <TouchableOpacity onPress={() => navigation.navigate('TeacherDashboard')}>
          <Icon name="home" type="material" size={60} color="#000" />
        </TouchableOpacity>
      </View>

      <View style={styles.emptyHeader} />
      <View style={[styles.mainHeader, { flexDirection: 'row', justifyContent: 'space-between' }]}>
        <Text style={styles.mainHeading}>Teacher Homework Upload</Text>
      </View>

      <TextInput style={styles.textInput} placeholder="Class" value={classInput} onChangeText={setClassInput} />
      <TextInput style={styles.textInput} placeholder="Section" value={sectionInput} onChangeText={setSectionInput} />
      <TextInput style={styles.textInput} placeholder="Subject" value={subjectInput} onChangeText={setSubjectInput} />
      <TextInput style={styles.textInput} placeholder="Description" value={descriptionInput} onChangeText={setDescriptionInput} />
      <TouchableOpacity onPress={pickDocument} style={styles.filePickerButton}>
        <Text style={styles.filePickerText}>{selectedFilesText}</Text>
      </TouchableOpacity>
      <Button title={isUploading ? 'Uploading...' : 'Upload Homework'}  color='#003153' onPress={validateAndUpload} disabled={isUploading} />

      <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.datePickerButton}>
        <Text style={styles.datePickerText}>Select Date: {date.toDateString()}</Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            const currentDate = selectedDate || date;
            setShowDatePicker(false);
            setDate(currentDate);
          }}
        />
      )}

      <Button title="Fetch Homework List" color='#003153' onPress={fetchHomeworkList} disabled={isLoading} />

      <FlatList
        data={homeworkList}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text>Class: {item.class_name}</Text>
            <Text>Section: {item.section}</Text>
            <Text>Subject: {item.subject}</Text>
            <Text>Description: {item.description}</Text>
            <Text>Upload Date: {new Date(item.date).toLocaleDateString()}</Text>

            {item.homework_file && (
              <TouchableOpacity onPress={() => viewDocument(item.homework_file, item.mimeType)}>
                <Text style={styles.documentText}>View Document</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />

      <Modal visible={imageModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <Image source={{ uri: selectedImageUri }} style={styles.fullImage} />
          <Button title="Close" onPress={() => setImageModalVisible(false)} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  Header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgb(160, 180,182)',
    paddingVertical: 10,
    height: 90,
    paddingHorizontal: 15,
    marginTop: 45,
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
  mobileFrame: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    paddingTop: 0, // set paddingTop to 0
    marginTop: -40, // set marginTop to -40 (or the height of your header)
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

  mainHeader: {
    marginBottom: 20,
    textAlign: 'center',
  },
  mainHeading: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
  },
  filePickerButton: {
    backgroundColor: 'rgb(160, 180, 182)',
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    width:150,
  },
  filePickerText: {
    color: '#FFF',
    textAlign:'center',
    fontStyle:'bold',
    

  },
  datePickerButton: {
    backgroundColor: 'rgb(160, 180, 182)',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    
  },
  datePickerText: {
    color: '#FFF',
  },
  listItem: {
    padding: 10,
    marginVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  documentText: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  fullImage: {
    width: '90%',
    height: '80%',
    resizeMode: 'contain',
  },
});

export default TeacherHomeworkUpload;
