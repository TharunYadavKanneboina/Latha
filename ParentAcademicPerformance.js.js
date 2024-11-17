import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { LineChart, PieChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const ParentAcademicPerformance = () => {
    const navigation = useNavigation();
    const [loginTabVisible, setLoginTabVisible] = useState(false);

    const handleLoginIconClick = () => {
        setLoginTabVisible(!loginTabVisible);
    };

    const handleLogoutButtonPress = () => {
        alert('You have been logged out.');
        setLoginTabVisible(false);
    };

    // Sample data for charts
    const lineChartData = {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
        datasets: [
            {
                data: [85, 88, 90, 85, 87],
                color: () => 'rgba(134, 65, 244, 1)', // optional
                strokeWidth: 2, // optional
            },
        ],
    };

    const pieChartData = [
        { name: 'Math', score: 10, color: 'rgba(75, 192, 192, 0.8)', legendFontColor: '#7F7F7F', legendFontSize: 15 },
        { name: 'Science', score: 20, color: 'rgba(54, 162, 235, 0.8)', legendFontColor: '#7F7F7F', legendFontSize: 15 },
        { name: 'History', score: 40, color: 'rgba(153, 102, 255, 0.8)', legendFontColor: '#7F7F7F', legendFontSize: 15 },
        { name: 'English', score: 30, color: 'rgba(255, 99, 132, 0.8)', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    ];

    return (
        <View style={styles.mobileFrame}>
            {/* Header Section */}
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

            {/* Main Content */}
            <View style={{ flex: 1, padding: 10 }}>
                <Text style={styles.chartTitle}>Performance in Subjects</Text>
                <PieChart
                    data={pieChartData}
                    width={screenWidth - 20}
                    height={200}
                    chartConfig={{
                        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    }}
                    accessor="score"
                    backgroundColor="transparent"
                    paddingLeft="15"
                    absolute
                />

                <Text style={styles.chartTitle}>Performance Over Time</Text>
                <LineChart
                    data={lineChartData}
                    width={screenWidth - 20}
                    height={220}
                    chartConfig={{
                        backgroundColor: '#e26a00',
                        backgroundGradientFrom: '#fb8c00',
                        backgroundGradientTo: '#ffa726',
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        style: {
                            borderRadius: 16,
                        },
                    }}
                    style={{
                        marginVertical: 8,
                        borderRadius: 16,
                    }}
                />
            </View>

            <View style={{ height: 50, backgroundColor: '#f8f8f8' }}>
                {/* Footer */}
            </View>

            {/* Login Tab */}
            {loginTabVisible && (
                <View id="loginTab" style={styles.loginTab}>
                    <TouchableOpacity onPress={handleLogoutButtonPress}>
                        <Text>Logout</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

// Styles
const styles = StyleSheet.create({
    mobileFrame: {
        flex: 1,
        backgroundColor: '#fff',
    },
    mainHeader: {
        backgroundColor: 'rgb(160, 180, 182)',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: 90,
        flexDirection: 'row',
        paddingHorizontal: 15,
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
    chartTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingVertical: 10,
    },
    loginTab: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        zIndex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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

export default ParentAcademicPerformance;
