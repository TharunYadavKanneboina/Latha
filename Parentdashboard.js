
// import React, { useState, useEffect } from 'react';
// import { View, Text, Image, TouchableOpacity, TextInput, StyleSheet, ScrollView } from 'react-native';
// import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
// import { faUser, faBell, faSearch } from '@fortawesome/free-solid-svg-icons';
// import { useNavigation, useRoute } from '@react-navigation/native';

// const ParentDashboard = () => {
//   const navigation = useNavigation();
//   const route = useRoute();
//   const { username = 'Student Name' } = route.params || {};


//   const [searchBarVisible, setSearchBarVisible] = useState(false);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [studentImages] = useState([
//     require('./assets/images/slides/file.png'),
//     require('./assets/images/slides/homework.png'),
//     require('./assets/images/slides/bus.png'),
//     require('./assets/images/slides/timetable.png'),
//   ]);

  

//   const [searchQuery, setSearchQuery] = useState('');
//   const [searchResults, setSearchResults] = useState([]);

//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       setCurrentIndex((prevIndex) => (prevIndex + 1) % studentImages.length);
//     }, 2000);
//     return () => clearInterval(intervalId);
//   }, [studentImages]);

//   const toggleSearch = () => {
//     setSearchBarVisible(!searchBarVisible);
//   };

//   const handleSearch = () => {
//     const results = Object.keys(itemImages).filter((item) =>
//       item.replace(/-/g, ' ').toUpperCase().includes(searchQuery.toUpperCase())
//     );
//     setSearchResults(results);
//   };

//   const itemImages = {
//     "Homework-Tracker": require('./assets/images/slides/homeworkapp.jpg'),
//     "Timetable": require('./assets/images/slides/apptimetable.jpeg'),
//     "Attendance-records": require('./assets/images/slides/att.jpg'),
//     "Parent-teacher-messaging": require('./assets/images/slides/chat.jpg'),
//     "Event-calendar": require('./assets/images/slides/eventCopy.jpg'),
//     "Photo-gallery": require('./assets/images/slides/acad1.jpg'),
//     "Resources": require('./assets/images/slides/rsr.jpg'),
//     "Behavior-reports": require('./assets/images/slides/bhv.jpg'),
//     "Academic-performance": require('./assets/images/slides/acadapp.jpg'),
//   };

//   return (
//     <View style={styles.mobileFrame} >
//       <View style={styles.header}>
//         <TouchableOpacity>
//           <Image source={require('./assets/images/slides/file.png')} style={styles.logo} />
//         </TouchableOpacity>
//         <View style={styles.headerRight}>
//           <TouchableOpacity onPress={toggleSearch}>
//             <FontAwesomeIcon icon={faSearch} size={20} color="#000" style={styles.icon} />
//           </TouchableOpacity>
//           {searchBarVisible && (
//             <TextInput
//               style={styles.searchInput}
//               placeholder="Search..."
//               value={searchQuery}
//               onChangeText={setSearchQuery}
//               onSubmitEditing={handleSearch}
//             />
//           )}
//           <TouchableOpacity>
//             <FontAwesomeIcon icon={faUser} size={20} color="#000" style={styles.icon} />
//           </TouchableOpacity>
//           <TouchableOpacity>
//             <FontAwesomeIcon icon={faBell} size={20} color="#000" style={styles.icon} />
//           </TouchableOpacity>
//         </View>
//       </View>

//       <View style={styles.emptyHeader} />

//       <View style={styles.profilePictureContainer}>
//         <Image source={studentImages[currentIndex]} style={styles.profilePicture} />
//         <Text style={styles.studentName}>Student Name</Text>
//       </View>

//       <ScrollView horizontal style={styles.scrollingIconsContainer}>
//         {searchResults.length > 0 ? (
//           searchResults.map((item, index) => (
//             <View key={index} style={styles.scrollingLink}>
//               <View style={styles.scrollingItem}>
//                 <Image source={itemImages[item]} style={styles.scrollingItemImage} />
//                 <Text style={styles.imageText}>{item.replace(/-/g, ' ').toUpperCase()}</Text>
//               </View>
//             </View>
//           ))
//         ) : (Object.keys(itemImages).map((item, index) => (
//               <TouchableOpacity
//                 key={index}
//                 onPress={() => {
//                   if (item === 'Behavior-reports') {
//                     navigation.navigate('ParentBehavioralReport');
//                   } else {
//                     // Navigate to other screens based on item name
//                     switch (item) {
//                       case 'Homework-Tracker':
//                         navigation.navigate('ParentHomeworkScreen');
//                         break;
//                       case 'Timetable':
//                         navigation.navigate('ParentTimetable');
//                         break;
//                       case 'Parent-teacher-messaging':
//                         navigation.navigate('ParentMessage');
//                         break;
//                       case 'Academic-performance':
//                         navigation.navigate('ParentAcademicPerformance');
//                         break;
//                       case 'Photo-gallery':
//                         navigation.navigate('ParentPhoto');
//                         break;
//                       case 'Event-calendar':
//                         navigation.navigate('ParentEventCalendar');
//                         break;
//                       case 'Resources':
//                         navigation.navigate('ParentResources');
//                         break;
//                       case 'Attendance-records':
//                         navigation.navigate('ParentAttendance');
//                         break;
//                       default:
//                         navigation.navigate(item);
//                     }
//                   }
//                 }}
              
//                 style={styles.scrollingLink}
//               >
//                 <View style={styles.scrollingItem}>
//                   <Image source={itemImages[item]} style={styles.scrollingItemImage} />
//                   <Text style={styles.imageText}>{item.replace(/-/g, ' ').toUpperCase()}</Text>
//                 </View>
//               </TouchableOpacity>
//             )
//           )
//           )}
        
//       </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   mobileFrame: {
//     flex: 1,
//     backgroundColor: '#f0f0f0',
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     backgroundColor: 'rgb(160, 180, 182)',
//     paddingVertical: 10,
//     height: 90,
//     paddingHorizontal: 15,
//   },
//   logo: {
//     width: 60,
//     height: 70,
//   },
//   headerRight: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   icon: {
//     marginLeft: 15,
//   },
//   searchInput: {
//     height: 40,
//     borderColor: '#ccc',
//     borderWidth: 1,
//     borderRadius: 5,
//     paddingHorizontal: 10,
//     marginLeft: 15,
//     width: 150,
//   },
//   emptyHeader: {
//     height: 30,
//     backgroundColor: 'rgb(160, 180, 182)',
//   },
//   profilePictureContainer: {
//     alignItems: 'center',
//     marginVertical: 15,
//   },
//   profilePicture: {
//     width: 150,
//     height: 150,
//     borderRadius: 75,
//   },
//   studentName: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginTop: 10,
//   },
//   scrollingIconsContainer: {
//     width: '100%',
//     height: 200,
//     overflow: 'hidden',
//     backgroundColor: 'transparent',
//   },
//   scrollingLink: {
//     marginRight: 20,
//   },
//   scrollingItem: {
//     position: 'relative',
//     width: 120,
//     height: 150,
//   },
//   imageText: {
//     position: 'absolute',
//     bottom: 10,
//     left: 10,
//     fontSize: 12,
//     color: '#fff',
//     fontWeight: 'bold',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     padding: 5,
//     borderRadius: 5,
//   },
//   scrollingItemImage: {
//     width: 120,
//     height: 190,
//     borderRadius: 10,
//   },
// });

// export default ParentDashboard;



import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, StyleSheet, ScrollView } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser, faBell, faSearch } from '@fortawesome/free-solid-svg-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Shadow } from 'react-native-shadow-2';

const ParentDashboard = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { username = 'Student Name' } = route.params || {};

  const [searchBarVisible, setSearchBarVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [studentImages] = useState([
    require('./assets/images/slides/file.png'),
    require('./assets/images/slides/homework.png'),
    require('./assets/images/slides/bus.png'),
    require('./assets/images/slides/timetable.png'),
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const itemImages = {
    "Homework-Tracker": require('./assets/images/slides/homeworkapp.jpg'),
    "Timetable": require('./assets/images/slides/apptimetable.jpeg'),
    "Attendance-records": require('./assets/images/slides/att.jpg'),
    "Parent-teacher-messaging": require('./assets/images/slides/chat.jpg'),
    "Event-calendar": require('./assets/images/slides/eventCopy.jpg'),
    "Photo-gallery": require('./assets/images/slides/acad1.jpg'),
    "Resources": require('./assets/images/slides/rsr.jpg'),
    "Behavior-reports": require('./assets/images/slides/bhv.jpg'),
    "Academic-performance": require('./assets/images/slides/acadapp.jpg'),
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % studentImages.length);
    }, 2000);
    return () => clearInterval(intervalId);
  }, [studentImages]);

  const toggleSearch = () => {
    setSearchBarVisible(!searchBarVisible);
  };

  const handleSearch = () => {
    const results = Object.keys(itemImages).filter((item) =>
      item.replace(/-/g, ' ').toUpperCase().includes(searchQuery.toUpperCase())
    );
    setSearchResults(results);
  };

  return (
    <View style={styles.mobileFrame}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Image source={require('./assets/images/slides/main.png')} style={styles.logo} />
        </TouchableOpacity>
        <View style={styles.headerRight}>
          <TouchableOpacity onPress={toggleSearch}>
            <FontAwesomeIcon icon={faSearch} size={20} color="#000" style={styles.icon} />
          </TouchableOpacity>
          {searchBarVisible && (
            <TextInput
              style={styles.searchInput}
              placeholder="Search..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              onSubmitEditing={handleSearch}
            />
          )}
          <TouchableOpacity>
            <FontAwesomeIcon icon={faUser} size={20} color="#000" style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity>
            <FontAwesomeIcon icon={faBell} size={20} color="#000" style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
     

      <View style={styles.emptyHeader} />
      <Text></Text>
      <Text></Text>

      <View style={styles.profilePictureContainer}>
        <Shadow
          startColor={'rgba(0, 0, 0, 0.2)'}
          offset={[5, 5]}
          radius={10}
          distance={10}
        >
          <Image source={studentImages[currentIndex]} style={styles.profilePicture} />
        </Shadow>
        <Text></Text>
      <Text></Text>
        <Text style={styles.studentName}>Student Name</Text>
        <Text></Text>
      <Text></Text>
      </View>

      <ScrollView horizontal style={styles.scrollingIconsContainer}>
        {searchResults.length > 0 ? (
          searchResults.map((item, index) => (
            <TouchableOpacity key={index} style={styles.scrollingLink}>
              <Shadow
                startColor={'rgba(0, 0, 0, 0.3)'}
                offset={[3, 3]}
                radius={3}
                distance={3}
                viewStyle={{ borderRadius: 3}}
              >
                <View style={styles.scrollingItem}>
                  <Image source={itemImages[item]} style={styles.scrollingItemImage} />
                  <Text style={styles.imageText}>{item.replace(/-/g, ' ').toUpperCase()}</Text>
                </View>
              </Shadow>
            </TouchableOpacity>
          ))
        ) : (
          Object.keys(itemImages).map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                switch (item) {
                  case 'Behavior-reports':
                    navigation.navigate('ParentBehavioralReport');
                    break;
                  case 'Homework-Tracker':
                    navigation.navigate('ParentHomeworkScreen');
                    break;
                  case 'Timetable':
                    navigation.navigate('ParentTimetable');
                    break;
                  case 'Parent-teacher-messaging':
                    navigation.navigate('ParentMessage');
                    break;
                  case 'Academic-performance':
                    navigation.navigate('ParentAcademicPerformance');
                    break;
                  case 'Photo-gallery':
                    navigation.navigate('ParentPhoto');
                    break;
                  case 'Event-calendar':
                    navigation.navigate('ParentEventCalendar');
                    break;
                  case 'Resources':
                    navigation.navigate('ParentResources');
                    break;
                  case 'Attendance-records':
                    navigation.navigate('ParentAttendance');
                    break;
                  default:
                    navigation.navigate(item);
                }
              }}
              style={styles.scrollingLink}
            >
              <Shadow
                startColor={'rgba(0, 0, 0, 0.5)'}
                offset={[5, 5]}
                radius={10}
                distance={10}
                viewStyle={{ borderRadius: 10 }}
              >
                <View style={styles.scrollingItem}>
                  <Image source={itemImages[item]} style={styles.scrollingItemImage} />
                  <Text style={styles.imageText}>{item.replace(/-/g, ' ').toUpperCase()}</Text>
                </View>
              </Shadow>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mobileFrame: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 1,
    marginTop: -90
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgb(160, 180, 182)',
    paddingVertical: 10,
    height: 90,
    paddingHorizontal: 15,
    marginTop: 90,
  },
  logo: {
    width: 50,
    height: 60,
    marginTop: 5,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginLeft: 15,
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginLeft: 15,
    width: 150,
  },
  emptyHeader: {
    height: 30,
    backgroundColor: 'rgb(160, 180, 182)',
    marginTop: 2,
  },
  profilePictureContainer: {
    alignItems: 'center',
    marginVertical: 15,
  },
  profilePicture: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  studentName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  scrollingIconsContainer: {
    width: '100%',
    height: 250,
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
  scrollingLink: {
    marginRight: 20,
  },
  scrollingItem: {
    position: 'relative',
    width: 120,
    height: 200,
    borderRadius: 10,
  },
  imageText: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    fontSize: 10,
    color: '#fff',
    fontWeight: 'bold',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 5,
    borderRadius: 3,
  },
  scrollingItemImage: {
    width: 120,
    height: 200,
    borderRadius: 10,
  },
});

export default ParentDashboard;
