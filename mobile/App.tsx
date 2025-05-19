import React, {useEffect} from 'react';
import Navigation from './src/app/navigation';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "./src/styles/global.css"

export default function App() {
  useEffect(() => {
      AsyncStorage.clear().then(() => {
        console.log("AsyncStorage zerada o iniciar o app!");
      });
    }, []);
  
  return(
    <SafeAreaProvider> 
      <Navigation />
    </SafeAreaProvider> 
  );
}