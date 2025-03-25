import React, { useRef, useState, useEffect } from "react";
import { View, Alert, FlatList, Image, Dimensions, StyleSheet, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';
import { db } from "./src/services/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import duration from "dayjs/plugin/duration";
import "dayjs/locale/pt-br";


dayjs.extend(relativeTime);
dayjs.extend(duration);
dayjs.locale("pt-br");

const images = [
  require("./src/assets/imagem-1.jpg"),
  require("./src/assets/imagem-2.jpg"),
  require("./src/assets/imagem-3.jpg"),
  require("./src/assets/imagem-4.jpg"),
  require("./src/assets/imagem-5.jpg"),
  require("./src/assets/imagem-6.jpg")
];

const { width, height } = Dimensions.get("window");

const AutoScrollCarousel = () => {
  const scrollViewRef = useRef(null);
  const flatListRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [startDate, setStartDate] = useState(null);
  const [relationshipDuration, setRelationshipDuration] = useState("");
  const [tempoEmMeses, setAnosEmMeses] = useState("");
  const [tempoEmDias, setTempoEmDias] = useState("");
  const [tempoEmHoras, setTempoEmHoras] = useState("");

  const handleScrollDown = () => {
    scrollViewRef.current?.scrollTo({ y: 100, animated: true });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % images.length;
        flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
        return nextIndex;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    console.log("Buscando data do namoro no Firestore...");
    fetchDateData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (startDate) {
        calcularTempoDeRelacionamento(startDate);
      }
    }, 60000); // Atualiza a cada minuto

    return () => clearInterval(interval);
  }, [startDate]);

  const fetchDateData = async () => {
    try {
      const docRef = doc(db, "data_namoro", "bH4q7SPG1ILUgKYM76py");
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {
        const data = docSnap.data();
        
        if (data && data.data) {
          const namoroDate = dayjs.unix(data.data.seconds);
          console.log("Timestamp convertido:", namoroDate.format("DD/MM/YYYY HH:mm:ss"));

          
          setStartDate(namoroDate);
          calcularTempoDeRelacionamento(namoroDate);
        }
      } else {
        console.log("No such document!");
      }
    } catch (e) {
      Alert.alert("Erro!", "Não foi possível carregar a data.");
    }
  };

  const calcularTempoDeRelacionamento = (namoroDate) => {
    const now = dayjs();
    const diasTotais = now.diff(namoroDate, 'days'); // Diferença total de dias

    // Conta anos corretamente, considerando anos bissextos
    let anos = now.diff(namoroDate, 'year'); 
    let aniversarioAnos = namoroDate.add(anos, 'year');

    // Calcula meses restantes corretamente
    let meses = now.diff(aniversarioAnos, 'month');
    let aniversarioMeses = aniversarioAnos.add(meses, 'month');

    // Dias restantes após anos e meses completos
    let dias = now.diff(aniversarioMeses, 'day');

    const horasTotais = dayjs.duration(now.diff(namoroDate)).asHours();

    setRelationshipDuration(`${anos} ano, ${meses} meses, ${dias} dias`);
    setAnosEmMeses(anos * 12 + meses); // Meses totais
    setTempoEmDias(diasTotais);
    setTempoEmHoras(Math.floor(horasTotais));
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ScrollView ref={scrollViewRef} style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
          <View style={styles.carouselContainer}>
            <View style={styles.overlayContainer} />
            <FlatList
              ref={flatListRef}
              data={images}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              keyExtractor={(_, i) => i.toString()}
              renderItem={({ item }) => (
                <Image source={item} style={styles.image} />
              )}
            />
            <TouchableOpacity style={styles.scrollButton} onPress={handleScrollDown}>
              <Feather name="chevron-down" size={30} color="#AC1754" />
            </TouchableOpacity>
          </View>
  
          {[
            { title: 'Estamos namorando há exatamente...', content: relationshipDuration },
            { title: 'Isso são:', content: `${tempoEmMeses} meses` },
            { content: `${tempoEmDias} dias` },
            { content: `${tempoEmHoras} horas` },
            { title: 'Quanto tempo em...', content: 'Desde que eu te conheci, minha vida se tornou mais feliz. Obrigado por ser alguém tão especial. Te amo intensamente e sou grato por compartilhar um amor tão lindo e recíproco com você. Que esse sentimento dure para sempre e que possamos viver momentos inesquecíveis juntos!' },
          ].map((section, index) => (
            <View key={index} style={[
              styles.contentContainer,
              { backgroundColor: index % 2 === 0 ? '#FFF' : '#FFF9FB' }
            ]}>
              {section.title && <Text style={styles.textTitle}>{section.title}</Text>}
              <Text style={styles.text}>
                {section.content || <Text style={styles.loadingText}>Carregando momentos especiais...</Text>}
              </Text>
            </View>
          ))}
  
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9FB',
  },
  carouselContainer: {
    width: width,
    height: height,
    position: "relative",
  },
  image: {
    width,
    height: height,
    resizeMode: "cover",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  contentContainer: {
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 20,
    backgroundColor: '#FFF',
    padding: 25,
    elevation: 3,
    shadowColor: '#AC1754',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  text: {
    fontSize: 24,
    color: "#AC1754",
    textAlign: "center",
    fontWeight: '300',
    letterSpacing: 0.5,
    fontFamily: 'Helvetica',
    marginVertical: 8,
  },
  textTitle: {
    fontSize: 28,
    color: "#8A0A40",
    fontWeight: '600',
    textAlign: "center",
    marginBottom: 15,
    letterSpacing: 0.8,
  },
  scrollButton: {
    position: "absolute",
    bottom: 30,
    alignSelf: "center",
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#F0D0DC',
    elevation: 3,
  },
  overlayContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 60,
    backgroundColor: 'rgba(255, 249, 251, 0.9)',
  },
  loadingText: {
    fontSize: 18,
    color: '#D49EB3',
    fontStyle: 'italic',
  }
});

export default AutoScrollCarousel;
