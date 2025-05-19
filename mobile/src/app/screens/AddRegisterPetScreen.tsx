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
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getPets, savePets } from "../utils/storage";
import { Pet } from "../types";

interface Props {
  navigation: any;
}

const AddPetScreen: React.FC<Props> = ({ navigation }) => {
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [raca, setRaca] = useState("");
  const [peso, setPeso] = useState("");
  const [vacina, setVacina] = useState("");

  const handleSave = async () => {
    if (!nome) {
      Alert.alert("Preencha o nome do pet!");
      return;
    }
    const pets = await getPets();
    const novoPet: Pet = { nome, idade, raca, peso, vacina };
    pets.push(novoPet);
    await savePets(pets);
    Alert.alert("Pet cadastrado!");
    navigation.navigate("ListPets");
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-[#F6F6F6]"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView className="flex-1 justify-center px-8">
          <SafeAreaView className="bg-white rounded-3xl shadow-lg p-8">
            <Text className="text-2xl font-semibold text-green-600 mb-6 text-center">Cadastrar Pet</Text>
            <TextInput
              className="bg-gray-100 rounded-2xl px-4 py-4 mb-4 border border-gray-200 text-base"
              placeholder="Nome do pet"
              value={nome}
              onChangeText={setNome}
              placeholderTextColor="#aaa"
            />
            <TextInput
              className="bg-gray-100 rounded-2xl px-4 py-4 mb-4 border border-gray-200 text-base"
              placeholder="Idade (anos)"
              value={idade}
              onChangeText={setIdade}
              keyboardType="numeric"
              placeholderTextColor="#aaa"
            />
            <TextInput
              className="bg-gray-100 rounded-2xl px-4 py-4 mb-4 border border-gray-200 text-base"
              placeholder="Raça"
              value={raca}
              onChangeText={setRaca}
              placeholderTextColor="#aaa"
            />
            <TextInput
              className="bg-gray-100 rounded-2xl px-4 py-4 mb-4 border border-gray-200 text-base"
              placeholder="Peso (kg)"
              value={peso}
              onChangeText={setPeso}
              keyboardType="numeric"
              placeholderTextColor="#aaa"
            />
            <TextInput
              className="bg-gray-100 rounded-2xl px-4 py-4 mb-6 border border-gray-200 text-base"
              placeholder="Data da vacina (DD/MM/YYYY)"
              value={vacina}
              onChangeText={setVacina}
              placeholderTextColor="#aaa"
            />
            <TouchableOpacity
              className="bg-green-600 rounded-xl py-4"
              onPress={handleSave}
            >
              <Text className="text-white text-center font-bold text-lg">Salvar Pet</Text>
            </TouchableOpacity>
          </SafeAreaView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default AddPetScreen;