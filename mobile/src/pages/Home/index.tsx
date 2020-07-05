import React, { useEffect, useState }from 'react';
import { Feather as Icon, Feather } from '@expo/vector-icons';
import { View, ImageBackground, Text, Image, StyleSheet, TextInput, KeyboardAvoidingView, Platform } from  'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';

interface IBGEUFResponse {
  sigla: string;
}

interface IBGECityResponse {
  nome: string;
}

const Home = () => {
  const [cities, setCities] = useState<string[]>([]);
  const [ufs, setUfs] = useState<string[]>([]);
  
  const[uf, setUf] = useState('');
  const[city, setCity] = useState('');

  const navigation = useNavigation();

  function handleNavigationToPoints(uf: String, city: String) {
    navigation.navigate('Points', {
      uf,
      city,
    });
  }

  useEffect(() => {
    axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(response => {
        const ufInitials = response.data.map(uf => uf.sigla);
        setUfs(ufInitials);
    })
}, []);

useEffect(() => {
    if(uf === '0')
        return;

    axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`).then(response => {
        const cityNames = response.data.map(city => city.nome);
        setCities(cityNames);
    })       
}, [uf]);

  return (
    <KeyboardAvoidingView 
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ImageBackground 
        source={require('../../assets/home-background.png')}
        style={styles.container}
        imageStyle={{width: 274, height: 368 }}
        >
          <View style={styles.main}>
            <Image source={require('../../assets/logo.png')} />
            <View>
              <Text style={styles.title}>Seu marketplace de coleta de resíduos</Text>
              <Text style={styles.description}>Ajudamos a pessoa a encontrarem pontos de coleta de forma efieciente.</Text>
            </View>
        </View>

        <View style={styles.footer}>
          {/* <TextInput 
            style={styles.input}
            placeholder='Digite a UF'
            value={uf}
            onChangeText={text => setUf(text)}
          />

          <TextInput 
            style={styles.input}
            placeholder='Digite a cidade'
            value={city}
            onChangeText={text => setCity(text)}
          /> */}
          <RNPickerSelect
            style={{
              ...pickerSelectStyles,
              iconContainer: {
                top: 10,
                right: 10
              },
            }}
            Icon={() => (
              <Icon name="arrow-down" color="gray" size={24} />
            )}
            placeholder={{
              label: 'Selecione uma UF',
              value: null,
            }}
            onValueChange={value => setUf(value)}
            items={
              ufs.map(uf => {
                return ({
                  label: uf,
                  value: uf,
                  key: uf
                });
              })}
          />

            <Text />

          <RNPickerSelect
            style={{
              ...pickerSelectStyles,
              iconContainer: {
                top: 10,
                right: 10
              },
            }}
            Icon={() => (
              <Icon name="arrow-down" color="gray" size={24} />
            )}
            placeholder={{
              label: 'Selecione uma cidade',
              value: null,
            }}
            onValueChange={value => setCity(value)}
            items={
              cities.map(city => {
                return ({
                  label: city,
                  value: city,
                  key: city
                });
              })}
          />
          <Text />

          <RectButton style={styles.button} onPress={() => {handleNavigationToPoints(uf, city)}}>
            <View style={styles.buttonIcon}>  
              <Text>
                <Icon name="arrow-right" color="#FFF" size={24} />
              </Text>
            </View>
            <Text style={styles.buttonText}>
              Entrar
            </Text>
          </RectButton>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 2,
    borderColor: '#322153',
    borderRadius: 10,
    color: 'black',
    fontFamily: 'Roboto_400Regular',

    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
  },

  main: {
    flex: 1,
    justifyContent: 'center',
  },

  title: {
    color: '#322153',
    fontSize: 32,
    fontFamily: 'Ubuntu_700Bold',
    maxWidth: 260,
    marginTop: 64,
  },

  description: {
    color: '#6C6C80',
    fontSize: 16,
    marginTop: 16,
    fontFamily: 'Roboto_400Regular',
    maxWidth: 260,
    lineHeight: 24,
  },

  footer: {},

  select: {},

  input: {
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
  },

  button: {
    backgroundColor: '#34CB79',
    height: 60,
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    marginTop: 8,
  },

  buttonIcon: {
    height: 60,
    width: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonText: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    color: '#FFF',
    fontFamily: 'Roboto_500Medium',
    fontSize: 16,
  }
});

export default Home