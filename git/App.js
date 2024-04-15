import React, {useState, useEffect} from 'react';
import { View, Text,TouchableOpacity ,Button, StyleSheet, TextInput, Linking, Image, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { WebView } from 'react-native-webview';
import * as ImagePicker from 'react-native-image-picker';
import CalendarImage from './assets/calendarImage.png';
import DollorImage from './assets/dollor.png';
import LoginImage from './assets/login.png';
import LogoImage from './assets/logo.webp';



const Stack = createNativeStackNavigator();

const styles = StyleSheet.create({
  logoconatiner:{
    flex: 1,
    backgroundColor: '#fffae5',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#141416',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  header: {
    marginTop: 200, // 상단 여백 추가
  },
  headerText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  description: {
    color: '#fff', // 텍스트 색상을 흰색으로 설정
    textAlign: 'center', // 텍스트를 가운데 정렬
    marginBottom: 100, // 하단 여백 추가
  },
  button: {
    backgroundColor: 'red',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginBottom: 100,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  image: {
    flex: 1,
    alignItems: 'center',
    width: 30,
    height: 30,
  },
  logoImage:{
    width: 300,
    height:300,
  },
  dayContainer: {
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  dayTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  classInfo: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
  }
});



function LogoScreen({ navigation }) {
  return (
    <View style={styles.logoconatiner}>
      <View style={styles.header}>
      <Image source={LogoImage} style={styles.logoImage} />
      <Text style={styles.headerText}></Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Schedule')}>

        <Text style={styles.buttonText}>시작하기</Text>
      </TouchableOpacity>
    </View>

  );
}

function ScheduleScreen({ navigation }) {
  return (
    <View style={styles.container}>
    
      <View style={styles.header}>
      </View>
      <Image source={require('./assets/calendarImage.png')} style={styles.calendarImage} />
      <Text style={styles.headerText}>시간표도, 일정도</Text>
      <Text style={styles.description}>
        자동으로 학교 시간표를 추가해 줄 수 있어요.{"\n"}
        시간표에 일정을 따로 추가하거나 메모 할 수 있어요.
      </Text>
      
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Bank')}>

      <Text style={styles.buttonText}>시작하기</Text>
      </TouchableOpacity>
    </View>
  );
}

function BankScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
      </View>
      <Image source={DollorImage} style={styles.calendarImage} />
      <Text style={styles.headerText}>더욱 편해진 잔고 환인</Text>
      <Text style={styles.description}>
            앱에서 편리하게 WisCard의 잔고를 확인 할 수 있어요{"\n"}
            거래내역을 확인하고 달러를 충전 할 수 있어요.
          </Text>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('LoginNofication')}>
          <Text style={styles.buttonText}>시작하기</Text>
          </TouchableOpacity>
    </View>
  );
}
function LoginNoficationScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
      </View>
      <Image source={LoginImage} style={styles.calendarImage} />
      <Text style={styles.headerText}>로그인 한번으로 모든 것을</Text>
      <Text style={styles.description}>
            위 기능을 위해 Google로그인을 통해 학교 인증을 해야해요{"\n"}
            구글 로그인 정보는 일회성으로 저장되고{"\n"}
            추후에 재로그인이 필요할 수도 있어요
          </Text>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.buttonText}>시작하기</Text>
          </TouchableOpacity>
    </View>
  );
}
function LoginScreen({ navigation }) {
  const handleLogin = () => {
    // The URL you want to open
    const url = 'https://my.wisc.edu/portal/p/MyCourses.ctf2/max/render.uP?pP_view=grid&pP_action=showClassSchedule&pP_termCode=1244';

    // Attempt to open the URL
    Linking.openURL(url)
      .then(() => {
        // After opening the URL, navigate to the next page after a delay
        setTimeout(() => {
          navigation.navigate('pdf');  // Replace 'NextScreen' with the actual name of your next screen
        }, 1000);  // 5000 milliseconds = 5 seconds delay
      })
      .catch(err => console.error("Failed to open URL:", err));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>학교 로그인을 위해서 My UW에 로그인해주세요</Text>
      </View>
      <Text style={styles.description}>
        아래 버튼을 통해서 웹사이트로 접속하면{"\n"}
        print 버튼을 누른 후 다운로드를 해주세요.
      </Text>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log in and Continue</Text>
      </TouchableOpacity>
    </View>
  );
}
  
  

      function pdfScreen({ navigation }) {
        const handleLogin = () => {
          // Perform login or other actions
          // After actions are done, redirect to the Flask server page
          const url = 'http://172.20.10.10:100'; // Replace <your-server-address> with your Flask server URL
          Linking.openURL(url)
          .then(() => {
            // After opening the URL, navigate to the next page after a delay
            setTimeout(() => {
              navigation.navigate('table');  // Replace 'NextScreen' with the actual name of your next screen
            }, 5000);  // 5000 milliseconds = 5 seconds delay
          })
            .catch(err => console.error("Failed to open URL:", err));
        };
      
        return (
          <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>아래 버튼을 통해서 웹사이트를 통해서 {"\n"}
        다운 받으신 pdf파일을 업로드해주세요.</Text>
      </View>
      <Text style={styles.description}>
        
      </Text>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>업로드하기</Text>
      </TouchableOpacity>
          </View>
        );
      }
      function TableScreen({ navigation }) {
        const [schedule, setSchedule] = useState([]);
      
        useEffect(() => {
          console.log("Fetching schedule data...");
          fetch('http://192.168.0.183:100/schedule', { // 적절한 엔드포인트 사용 확인
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
          })
          .then(response => {
            if (response.ok) { // 응답 상태 확인
              return response.json();
            }
            throw new Error('Network response was not ok.'); // 응답 상태가 올바르지 않은 경우 오류 처리
          })
          .then(data => {
            console.log("Data received:", data);
            if (Array.isArray(data)) { // 데이터가 배열인지 확인
              setSchedule(data.map(day => ({
                day: day[0],
                classes: day[1].map(cls => ({
                  className: cls[0],
                  location: cls[1],
                  startTime: cls[2],
                  endTime: cls[3]
                }))
              })));
            } else {
              console.error("Expected data to be an array, received:", typeof data);
              // 데이터가 배열이 아닌 경우 처리 로직
            }
          })
          .catch(error => {
            console.error('Error fetching data:', error.message);
          });
        }, []);
        
        
      }
      
      
  
    

    
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Logo">
        <Stack.Screen name="Logo" component={LogoScreen} />
        <Stack.Screen name="Schedule" component={ScheduleScreen} />
        <Stack.Screen name="Bank" component={BankScreen} />
        <Stack.Screen name="LoginNofication" component={LoginNoficationScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="pdf" component={pdfScreen} />
        <Stack.Screen name="table" component={TableScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

