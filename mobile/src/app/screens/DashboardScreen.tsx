import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView, View, Text, ScrollView } from "react-native";
import { getUser, getPets } from "../utils/storage";
import { User, Pet } from "../types";
import { useFocusEffect } from "@react-navigation/native";

function parseDate(dateStr: string) {
  if (!dateStr) return null;
  // Aceita "DD/MM/YYYY"
  const [day, month, year] = dateStr.split("/").map(Number);
  if (!year || !month || !day) return null;
  return new Date(year, month - 1, day);
}

const DashboardScreen: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [notificacoes, setNotificacoes] = useState<Pet[]>([]);


  useFocusEffect(
    useCallback(() => {
      async function load() {
        const u = await getUser();
        setUser(u);

        const pets = await getPets();
        console.log("Pets cadastrados:", pets);

        const hoje = new Date();
        hoje.setHours(0, 0, 0, 0);

        const notifics = pets.filter((pet) => {
        if (!pet.vacina) return false;
        const dataVacina = parseDate(pet.vacina);
        if (!dataVacina) return false;
        dataVacina.setHours(0, 0, 0, 0);
        const diff = (dataVacina.getTime() - hoje.getTime()) / (1000 * 60 * 60 * 24);
        console.log(
          `Pet: ${pet.nome}, Vacina: ${pet.vacina}, DataVacina: ${dataVacina.toISOString()}, Diff: ${diff}`
        );
        return diff >= 0 && diff <= 3;
      });

        console.log("Notificações encontradas:", notifics);
        setNotificacoes(notifics);
      }
      load();
  }, []));

  return (
    <SafeAreaView className="flex-1 bg-[#F6F6F6]">
      <ScrollView className="px-6 pt-12">
        <View className="items-center mb-8">
          <Text className="text-3xl font-bold text-green-600 mb-2">PetCare</Text>
          <Text className="text-lg text-gray-700">Bem-vindo, {user?.nome || ""}!</Text>
        </View>
        <View className="bg-white rounded-3xl shadow-lg p-6 mb-8">
          <Text className="text-xl font-semibold text-gray-700 mb-4 text-center">Notificações de Vacinas</Text>
          {notificacoes.length === 0 ? (
            <Text className="text-gray-500 text-center">Nenhuma vacina próxima nos próximos 3 dias.</Text>
          ) : (
            notificacoes.map((pet, idx) => (
              <View key={idx} className="mb-2">
                <Text className="text-base text-gray-700">
                  <Text className="font-bold text-green-700">{pet.nome}</Text>: Vacina em <Text className="font-bold">{pet.vacina}</Text>
                </Text>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DashboardScreen;