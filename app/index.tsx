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
  ActivityIndicator,
} from 'react-native';

import { PrinterService } from '@/conection/conection';

// Ícone para o cabeçalho

const printerService = new PrinterService()

const PrinterIcon = ({ size = 50 }) => (
  <Text style={[styles.headerIcon, { fontSize: size }]}>🖨️</Text>
);

// Campo de entrada com rótulo
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

// --- Tela de Descoberta de Impressora ---

const PrinterDiscoveryScreen = ({ onConnect }) => {
  const [selectedPrinter, setSelectedPrinter] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);

  // Simulação de impressoras encontradas


  const handleConnect = () => {
    if (selectedPrinter) {
      setIsConnecting(true);
      // Simula um tempo de conexão
      setTimeout(() => {
        setIsConnecting(false);
        onConnect(selectedPrinter);
      }, 1500);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <PrinterIcon size={60} />
        <Text style={styles.title}>Conectar à Impressora</Text>
        <Text style={styles.subtitle}>Selecione uma impressora da lista para continuar.</Text>
      </View>

      <View style={styles.printerList}>
        {printerService.lookingForPrinter()?(
          <TouchableOpacity>
            <Text>
              {printerService.lookingForPrinter()}
            </Text>
          </TouchableOpacity>
        ):(null)}

      </View>

      <TouchableOpacity
        style={[styles.actionButton, !selectedPrinter && styles.buttonDisabled]}
        onPress={handleConnect}
        disabled={!selectedPrinter || isConnecting}
      >
        {isConnecting ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.actionButtonText}>Conectar</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};


// --- Tela de Impressão de Etiqueta ---

const LabelPrinterScreen = ({ printer, onDisconnect }) => {
  const [manufacturingDate, setManufacturingDate] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [quantity, setQuantity] = useState('1');

  const handlePrint = () => {
    if (!manufacturingDate || !expiryDate || !quantity) {
      Alert.alert(
        "Campos Incompletos",
        "Por favor, preencha todos os campos antes de imprimir."
      );
      return;
    }
    Alert.alert(
      "Imprimindo...",
      `Enviando ${quantity} etiqueta(s) para a impressora ${printer.name}.`
    );
  };

  return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={onDisconnect}>
            <Text style={styles.backButtonText}>← Voltar</Text>
        </TouchableOpacity>

      <View style={styles.header}>
        <PrinterIcon />
        <Text style={styles.title}>Impressora de Etiquetas</Text>
        <Text style={styles.subtitle}>Conectado a: {printer.name}</Text>
      </View>

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

      <TouchableOpacity style={styles.actionButton} onPress={handlePrint}>
        <Text style={styles.actionButtonText}>Imprimir</Text>
      </TouchableOpacity>
    </View>
  );
};


// --- Componente Principal do App ---

const App = () => {
  const [connectedPrinter, setConnectedPrinter] = useState(null);

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#F4F7FC" />
      <SafeAreaView style={styles.safeArea}>
        {connectedPrinter ? (
          <LabelPrinterScreen
            printer={connectedPrinter}
            onDisconnect={() => setConnectedPrinter(null)}
          />
        ) : (
          <PrinterDiscoveryScreen
            onConnect={(printer) => setConnectedPrinter(printer)}
          />
        )}
      </SafeAreaView>
    </>
  );
};

// --- Estilos ---

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
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#6A7A8F',
    marginTop: 8,
    textAlign: 'center',
  },
  // Estilos da lista de impressoras
  printerList: {
    marginBottom: 30,
  },
  printerItem: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#DDE3EC',
    marginBottom: 12,
  },
  printerItemSelected: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  printerItemText: {
    fontSize: 16,
    color: '#1E2A3A',
    fontWeight: '500',
  },
  printerItemSelectedText: {
      color: '#FFFFFF',
      fontWeight: 'bold',
  },
  // Estilos do formulário
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
  // Botão principal
  actionButton: {
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
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonDisabled: {
    backgroundColor: '#A9A9A9',
    shadowColor: 'transparent',
    elevation: 0,
  },
  // Botão de voltar
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    padding: 10,
  },
  backButtonText: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '500',
  },
});

export default App;
