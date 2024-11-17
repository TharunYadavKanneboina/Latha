import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { PieChart } from 'react-native-chart-kit';

const AcademicReport = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedDetails, setSelectedDetails] = useState([]);

  // Academic data for homework, unit test, and annual test
  const academicData = [
    { 
      label: 'Homework', 
      value: 35, 
      details: [
        { date: '2024-11-01', topic: 'Mathematics - Algebra', status: 'Completed' },
        { date: '2024-11-03', topic: 'Science - Chemistry', status: 'Pending' },
        { date: '2024-11-05', topic: 'History - Ancient Civilizations', status: 'Completed' }
      ]
    },
    { 
      label: 'Unit Test', 
      value: 25, 
      details: [{ title: 'Unit Test Average Score', info: '80%' }]
    },
    { 
      label: 'Annual Test', 
      value: 40, 
      details: [{ title: 'Annual Test Overall Score', info: '85%' }]
    }
  ];

  const chartData = academicData.map((item, index) => ({
    name: item.label,
    population: item.value,
    color: index === 0 ? 'blue' : index === 1 ? 'orange' : 'purple',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  }));

  const showDetails = (index) => {
    setSelectedDetails(academicData[index].details);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Academic Report</Text>

      <PieChart
        data={chartData}
        width={Dimensions.get('window').width * 0.8}
        height={220}
        chartConfig={{
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
        onDataPointClick={({ index }) => {
          showDetails(index);
        }}
      />

      {/* Modal for displaying academic details */}
      <Modal
        transparent={true}
        visible={isModalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeText}>X</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Homework Details</Text>
            <ScrollView style={styles.tableContainer}>
              {selectedDetails.map((item, index) => (
                <View key={index} style={styles.tableRow}>
                  <Text style={styles.tableCell}>{item.date}</Text>
                  <Text style={styles.tableCell}>{item.topic}</Text>
                  <Text style={styles.tableCell}>{item.status}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    maxHeight: '60%',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  closeText: {
    fontSize: 20,
    color: '#000',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  tableContainer: {
    width: '100%',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tableCell: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
  },
});

export default AcademicReport;
