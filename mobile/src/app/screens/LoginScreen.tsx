import React, { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  DeviceEventEmitter,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getUser } from "../utils/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Props {
  navigation: any;
}

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = async () => {
    const user = await getUser();
    if (!user || user.email !== email || user.senha !== senha) {
      Alert.alert("Email ou senha incorretos!");
      return;
    }
    // Salve o usuário logado no AsyncStorage
    await AsyncStorage.setItem("user", JSON.stringify(user));
    DeviceEventEmitter.emit("userLoggedIn");
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-[#F6F6F6]"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView className="flex-1 justify-center px-8">
          <SafeAreaView className="items-center mb-8">
            <Image
              source={require("../../../assets/images/logo.webp")}
              style={{ width: 100, height: 100, marginBottom: 8 }}
              resizeMode="contain"
            />
            <Text className="text-3xl font-bold text-green-600">PetCare</Text>
          </SafeAreaView>
          <SafeAreaView className="bg-white rounded-3xl shadow-lg p-8">
            <Text className="text-2xl font-semibold text-gray-700 mb-6 text-center">Login</Text>
            <TextInput
              className="bg-gray-100 rounded-2xl px-4 py-4 mb-4 border border-gray-200 text-base"
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              placeholderTextColor="#aaa"
            />
            <TextInput
              className="bg-gray-100 rounded-2xl px-4 py-4 mb-6 border border-gray-200 text-base"
              placeholder="Senha"
              value={senha}
              onChangeText={setSenha}
              secureTextEntry
              placeholderTextColor="#aaa"
            />
            <TouchableOpacity
              className="bg-green-600 rounded-xl py-4 mb-2"
              onPress={handleLogin}
            >
              <Text className="text-white text-center font-bold text-lg">Entrar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="mt-2"
              onPress={() => navigation.navigate("Register")}
            >
              <Text className="text-green-600 text-center font-semibold">Criar conta</Text>
            </TouchableOpacity>
          </SafeAreaView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;