import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Text, StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import 'react-native-gesture-handler';
import { Shadow } from 'react-native-shadow-2';

import ParentLogin from './ParentLogin';


import TeacherLogin from './TeacherLogin';
import ManagementLogin from './ManagementLogin';




import ManagementDashboard from './ManagementDashboard';

import ParentDashboard from './Parentdashboard';
import TeacherDashboard from './Teacherdashboard';
import ParentEventCalendar from './ParentEventCalendar';
import ParentHomeworkScreen from './ParentHomeworkScreen';
import ParentTimetable from './ParentTimetable';
import ParentAttendance from './ParentAttendance';
import ParentResources from './ParentResources';
import ParentPhoto from './ParentPhoto';
import ParentBehavioralReport from './ParentBehavioralReport';

import ParentMessage from './ParentMessage.js';

import Teachertimetable from './teacher_timetable.js';
import TeacherAttendance from './teacher_ud_attendence.js';
import TeacherMessage from './teacher_msg.js';
import TeacherEventCalendar from './teacher_calender.js';
import TeacherEventMediaUpload from './teacher_photo.js';
import TeacherResorces from './teacher_resorces.js';
import TeacherBehaviour from './teacher_ud_behaviour.js';
import TeacherAcademicPerformanceEntry from './teacher_acodamicperformence.js';
import TeacherHomeworkUpload from './teacher_ud_Homework.js';
import ParentAcademicPerformance from './ParentAcademicPerformance.js.js';
import CreateAccount from './Managment_creat_Account.js';
import StudentInfo from './Management_studentinfo.js';
import ManagementFeeUpload from './Managment_Fee.js';
import ManagmentAttendanceView from './Managment_AttendenceRecords.js';
import ManagmentEventMediaUpload from './Managment_EventMedia.js';
import ManagmentEventCalendar from './Managment_event_Calender.js';
import ManageUploadTimetable from './Managment_Timetable.js';
import ManagementAcademicPerformance from './Managment_Acodamic_Performence.js';
import Studenticon from './Studenticon.js';
import StudenticonTeacher from './SrudenticonTeacher.js';
import StudenticonManagement from './StudenticonManagement.js';
import TeacherDetails from './teacherDetails.js';

const Stack = createStackNavigator();

const HomeScreen = ({ navigation }) => {
    return (
        <View style={{ flex: 1 }}>
        <LinearGradient
            colors={['#000000', '#ffffff']}
            style={styles.linearGradient}
        >
           
                <View style={styles.mobileFrame}>
                    <Shadow
                        distance={15}
                        offset={[5, 5]}
                        startColor={'#00000030'}
                        radius={20}
                        style={styles.logoContainer}
                    >
                        <Image
                            source={require('./assets/images/slides/file.png')}
                            style={styles.logo}
                        />
                    </Shadow>

                    <View style={styles.loginOptions}>
          

                            <TouchableOpacity
                                style={styles.loginButtonBox}
                                onPress={() => navigation.navigate('ParentLogin')}
                            >
                                
                                <Text style={styles.loginButtonText}>Parent Login</Text>
                                
                            </TouchableOpacity>
                            
                          
                      
                        
                            <TouchableOpacity
                                style={styles.loginButtonBox}
                                onPress={() => navigation.navigate('TeacherLogin')}
                            >
                                <Text style={styles.loginButtonText}>Teacher Login</Text>
                            </TouchableOpacity>
                        
                        
                            <TouchableOpacity
                                style={styles.loginButtonBox}
                                onPress={() => navigation.navigate('ManagementLogin')}
                            >
                                <Text style={styles.loginButtonText}>Management Login</Text>
                            </TouchableOpacity>
                        
                    </View>
                </View>
           
        </LinearGradient>
    </View>
);
};


const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown:false }} />
                <Stack.Screen name="ParentLogin" component={ParentLogin} options={{ headerShown:false }}/>
                <Stack.Screen name="TeacherLogin" component={TeacherLogin}  options={{ headerShown:false }}/>
                <Stack.Screen name="ManagementLogin" component={ManagementLogin} options={{ headerShown:false }} />
                <Stack.Screen name="ManagementDashboard" component={ManagementDashboard} options={{ headerShown:false }} />
                <Stack.Screen name="ParentDashboard" component={ParentDashboard} options={{ headerShown:false }}/>
                <Stack.Screen name="TeacherDashboard" component={TeacherDashboard} options={{ headerShown:false }} />
                <Stack.Screen name="ParentEventCalendar" component={ParentEventCalendar} options={{ headerShown:false }} />
                <Stack.Screen name="ParentMessage" component={ParentMessage} options={{ headerShown:false }} />
                <Stack.Screen name="ParentHomeworkScreen" component={ParentHomeworkScreen} options={{ headerShown:false }} />
                <Stack.Screen name="ParentTimetable" component={ParentTimetable} options={{ headerShown:false }} />
                <Stack.Screen name="ParentAttendance" component={ParentAttendance} options={{ headerShown:false }} />
                <Stack.Screen name="ParentResources" component={ParentResources} options={{ headerShown:false }} />
                <Stack.Screen name="ParentPhoto" component={ParentPhoto} options={{ headerShown:false }} />
                <Stack.Screen name="ParentBehavioralReport" component={ParentBehavioralReport} options={{ headerShown:false }} />
                <Stack.Screen name="ParentAcademicPerformance" component={ParentAcademicPerformance} options={{ headerShown:false }} />
                <Stack.Screen name="TeacherHomeworkUpload" component={TeacherHomeworkUpload} options={{ headerShown: false }} />
        <Stack.Screen name="Teachertimetable" component={Teachertimetable} options={{ headerShown: false }} />
        <Stack.Screen name="TeacherAttendance" component={TeacherAttendance} options={{ headerShown: false }} />
        <Stack.Screen name="TeacherMessage" component={TeacherMessage} options={{ headerShown: false }} />
        <Stack.Screen name="TeacherEventCalendar" component={TeacherEventCalendar} options={{ headerShown: false }} />
        <Stack.Screen name="TeacherEventMediaUpload" component={TeacherEventMediaUpload} options={{ headerShown: false }} />
        <Stack.Screen name="TeacherResorces" component={TeacherResorces} options={{ headerShown: false }} />
        <Stack.Screen name="TeacherBehaviour" component={TeacherBehaviour} options={{ headerShown: false }} />
        <Stack.Screen name="TeacherAcademicPerformanceEntry" component={TeacherAcademicPerformanceEntry} options={{ headerShown: false }} />      
        <Stack.Screen name="CreateAccount" component={CreateAccount} options={{ headerShown: false }} />
        <Stack.Screen name="StudentInfo" component={StudentInfo} options={{ headerShown: false }} />
        <Stack.Screen name="ManagementFeeUpload" component={ManagementFeeUpload} options={{ headerShown: false }} />
        <Stack.Screen name="ManagmentAttendanceView" component={ManagmentAttendanceView} options={{ headerShown: false }} />
        <Stack.Screen name="ManagmentEventMediaUpload" component={ManagmentEventMediaUpload} options={{ headerShown: false }} />
        <Stack.Screen name="ManagmentEventCalendar" component={ManagmentEventCalendar} options={{ headerShown: false }} />
        <Stack.Screen name="ManageUploadTimetable" component={ManageUploadTimetable} options={{ headerShown: false }} />
        <Stack.Screen name="ManagementAcademicPerformance" component={ManagementAcademicPerformance} options={{ headerShown: false }} />         
        <Stack.Screen name="Studenticon" component={Studenticon} options={{ headerShown: false }} />
        <Stack.Screen name="StudenticonTeacher" component={StudenticonTeacher} options={{ headerShown: false }} />
        <Stack.Screen name="StudenticonManagement" component={StudenticonManagement} options={{ headerShown: false }} />
        <Stack.Screen name="TeacherDetails" component={TeacherDetails} options={{ headerShown: false }} />
        <Stack.Screen name="App" component={App} /> 
        </Stack.Navigator>
        
        </NavigationContainer>
    );
};
const styles = StyleSheet.create({
    linearGradient: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    mobileFrame: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoContainer: {
        marginBottom: 20,
        width: 300,
        height: 300,
        borderRadius: 150,
        overflow: 'hidden',
    },
    logo: {
        width: '100%',
        height: '100%',
        borderRadius: 150,
        resizeMode: 'contain',
    },
    loginOptions: {
        marginTop: 30,
        alignItems: 'center',
    },
    loginButtonBox: {
        backgroundColor: '#24385f',
        paddingVertical: 12,
        paddingHorizontal: 30,
        marginVertical: 10,
        borderWidth: 2,
        borderRadius: 25,
        width: 245,
        alignItems: 'center',
    },
    loginButtonText: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'condensed',
    },
});
export default App;