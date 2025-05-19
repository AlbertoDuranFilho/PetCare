import React, { useEffect, useState } from "react";
import { Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getPets } from "../utils/storage";
import { Pet } from "../types";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  navigation: any;
}

const ListPetsScreen: React.FC<Props> = ({ navigation }) => {
  const [pets, setPets] = useState<Pet[]>([]);

  useEffect(() => {
    async function load() {
      const p = await getPets();
      setPets(p);
    }
    const unsubscribe = navigation.addListener("focus", load);
    return unsubscribe;
  }, [navigation]);

  const hoje = new Date();

  return (
    <SafeAreaView className="flex-1 bg-[#F6F6F6]">
      <ScrollView className="px-6 pt-8">
        <Text className="text-2xl font-bold text-green-600 text-center mb-6">Meus Pets</Text>
        {pets.length === 0 ? (
          <Text className="text-gray-500 text-center">Você ainda não cadastrou nenhum pet.</Text>
        ) : (
          pets.map((pet, idx) => {
            let alerta = "";
            if (pet.vacina) {
              const dataVacina = new Date(pet.vacina);
              const diff = (dataVacina.getTime() - hoje.getTime()) / (1000 * 60 * 60 * 24);
              if (diff >= 0 && diff <= 3) {
                alerta = ` (Vacina em ${Math.round(diff)} dias!)`;
              }
            }
            return (
              <SafeAreaView
                key={idx}
                className="mb-4 p-4 bg-white rounded-2xl border border-gray-200 shadow"
              >
                <Text className="font-bold text-lg text-green-700 mb-1">Nome: {pet.nome}</Text>
                <Text>Idade: {pet.idade} anos</Text>
                <Text>Raça: {pet.raca}</Text>
                <Text>Peso: {pet.peso} kg</Text>
                <Text>
                  Vacina: {pet.vacina}
                  <Text className="text-red-600 font-bold">{alerta}</Text>
                </Text>
              </SafeAreaView>
            );
          })
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ListPetsScreen;