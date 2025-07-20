import React, { useState } from 'react';
import {
  Alert,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

// Componente de ícone para o cabeçalho
const PrinterIcon = () => (
  <Text style={styles.headerIcon}>🖨️</Text>
);

// Componente para um campo de entrada com rótulo
const InputField = ({ label, value, onChangeText, placeholder, keyboardType = 'default' }) => (
  <View style={styles.inputContainer}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor="#999"
      keyboardType={keyboardType}
    />
  </View>
);

const App = () => {
  // Estados para armazenar os valores dos campos de entrada
  const [manufacturingDate, setManufacturingDate] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [quantity, setQuantity] = useState('1');
  
  initConnect();

  // Função para lidar com o pressionamento do botão de impressão
  const handlePrint = () => {
    // Validação simples para verificar se os campos não estão vazios
    if (!manufacturingDate || !expiryDate || !quantity) {
      // Usando um Alerta customizado ao invés do alert() padrão
      Alert.alert(
        "Campos Incompletos",
        "Por favor, preencha todos os campos antes de imprimir."
      );
      return;
    }
    
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#F4F7FC" />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          {/* Cabeçalho do App */}
          <View style={styles.header}>
            <PrinterIcon />
            <Text style={styles.title}>Impressora de Etiquetas</Text>
            <Text style={styles.subtitle}>Preencha as informações para gerar a etiqueta.</Text>
          </View>

          {/* Formulário de Entrada */}
          <View style={styles.form}>
            <InputField
              label="Data de Fabricação"
              value={manufacturingDate}
              onChangeText={setManufacturingDate}
              placeholder="DD/MM/AAAA"
            />
            <InputField
              label="Data de Validade"
              value={expiryDate}
              onChangeText={setExpiryDate}
              placeholder="DD/MM/AAAA"
            />
            <InputField
              label="Quantidade de Impressões"
              value={quantity}
              onChangeText={setQuantity}
              placeholder="Ex: 10"
              keyboardType="numeric"
            />
          </View>
          
          {/* Botão de Ação */}
          <TouchableOpacity style={styles.printButton} onPress={handlePrint}>
            <Text style={styles.printButtonText}>Imprimir</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

// Estilos para os componentes
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F4F7FC',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  headerIcon: {
    fontSize: 50,
    marginBottom: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1E2A3A',
  },
  subtitle: {
    fontSize: 16,
    color: '#6A7A8F',
    marginTop: 5,
    textAlign: 'center',
  },
  form: {
    width: '100%',
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#495867',
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#FFFFFF',
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#1E2A3A',
    borderWidth: 1,
    borderColor: '#DDE3EC',
  },
  printButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "#007AFF",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  printButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default App;
