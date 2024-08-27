import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  Image,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { weatherImages } from "./src/constant";

export default function App() {
  const [cityInput, setCityInput] = useState("");
  const [data, setData] = useState([]);
  const apiKey = "2638cb8e055a48f28be131615242508";

  async function fetchData() {
    const response = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cityInput}&aqi=no`
    );
    const json = await response.json();
    setData(json);
    console.log(data);
  }

  const handleSearch = () => {
    fetchData();
  };

  return (
    <SafeAreaView className="flex-1 items-center bg-bgColor">
      <View className="flex-row gap-5 items-center mt-2 ">
        <TextInput
          className="bg-inputColor text-white p-4 w-3/4 rounded-lg"
          placeholder="Enter city name"
          placeholderTextColor="#ffffff"
          onChangeText={(value) => setCityInput(value)}
        ></TextInput>
        <TouchableOpacity onPress={() => handleSearch()}>
          <Text>
            <FontAwesome name="search" size={24} color="white" />
          </Text>
        </TouchableOpacity>
      </View>
      <View className="mt-6">
        {data.current && (
          <View className="gap-4">
            <Text className="text-white text-center text-xl">
              {data.location.name}
            </Text>
            <Text className="text-white text-center text-xl">
              {data.location.country}
            </Text>
            <Image
              source={weatherImages[data.current?.condition?.text] || "other"}
              className="w-48 h-48"
            />
            <Text className="text-white text-center text-4xl">
              {data.current.temp_c}°C
            </Text>
            <Text className="text-white text-center text-4xl">
              {data.current.condition.text}
            </Text>
          </View>
        )}
      </View>

      <StatusBar style="light" />
    </SafeAreaView>
  );
}
