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
  FlatList,
  ActivityIndicator,
} from 'react-native';

// --- Tela de Impressão de Etiquetas (O seu código original) ---
const PrinterIcon = () => (
  <Text style={styles.headerIcon}>🖨️</Text>
);

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

const PrintScreen = ({ onBack }) => {
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
      "Impressão Enviada",
      `Etiqueta com validade em ${expiryDate} enviada para a impressora.`
    );
  };

  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <PrinterIcon />
            <Text style={styles.title}>Impressora de Etiquetas</Text>
            <Text style={styles.subtitle}>Preencha as informações para gerar a etiqueta.</Text>
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
        
        <TouchableOpacity style={styles.printButton} onPress={handlePrint}>
            <Text style={styles.printButtonText}>Imprimir</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.printButton, styles.backButton]} onPress={onBack}>
            <Text style={styles.printButtonText}>Voltar</Text>
        </TouchableOpacity>
    </View>
  );
};


// --- Nova Tela de Seleção de Impressora ---
const mockPrinters = [
    { id: '1', name: 'Zebra ZD220', status: 'Online' },
    { id: '2', name: 'Elgin L42 Pro', status: 'Online' },
    { id: '3', name: 'Brother QL-800', status: 'Offline' },
    { id: '4', name: 'Argox OS-214 Plus', status: 'Online' },
];

const PrinterSelectionScreen = ({ onConnect }) => {
    const [loading, setLoading] = useState(false);

    const handleConnect = (printer) => {
        if (printer.status === 'Offline') {
            Alert.alert("Erro", "Esta impressora está offline e não pode ser conectada.");
            return;
        }
        setLoading(true);
        // Simula uma conexão de 1.5 segundos
        setTimeout(() => {
            setLoading(false);
            onConnect(printer);
        }, 1500);
    };

    const renderPrinter = ({ item }) => (
        <View style={styles.printerItem}>
            <View>
                <Text style={styles.printerName}>{item.name}</Text>
                <Text style={[
                    styles.printerStatus,
                    { color: item.status === 'Online' ? '#28A745' : '#DC3545' }
                ]}>
                    {item.status}
                </Text>
            </View>
            <TouchableOpacity 
                style={[styles.connectButton, item.status === 'Offline' && styles.disabledButton]} 
                onPress={() => handleConnect(item)}
                disabled={item.status === 'Offline'}>
                <Text style={styles.connectButtonText}>Conectar</Text>
            </TouchableOpacity>
        </View>
    );

    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#007AFF" />
                <Text style={styles.loadingText}>Conectando...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerIcon}>📡</Text>
                <Text style={styles.title}>Buscar Impressoras</Text>
                <Text style={styles.subtitle}>Selecione uma impressora para conectar.</Text>
            </View>
            <FlatList
                data={mockPrinters}
                renderItem={renderPrinter}
                keyExtractor={item => item.id}
                style={styles.list}
            />
        </View>
    );
};


// --- Componente Principal que gerencia a navegação ---
const App = () => {
  const [connectedPrinter, setConnectedPrinter] = useState(null);

  const handleConnection = (printer) => {
    setConnectedPrinter(printer);
  };

  const handleDisconnect = () => {
    setConnectedPrinter(null);
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#F4F7FC" />
      <SafeAreaView style={styles.safeArea}>
        {connectedPrinter ? (
          <PrintScreen onBack={handleDisconnect} />
        ) : (
          <PrinterSelectionScreen onConnect={handleConnection} />
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
    paddingVertical: 20,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F4F7FC',
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
  backButton: {
    backgroundColor: '#6c757d',
    marginTop: 15,
    shadowColor: "#6c757d",
  },
  printButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  // Estilos da tela de seleção
  list: {
    width: '100%',
  },
  printerItem: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#DDE3EC',
  },
  printerName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E2A3A',
  },
  printerStatus: {
    fontSize: 14,
    fontWeight: '500',
  },
  connectButton: {
    backgroundColor: '#28A745',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  disabledButton: {
    backgroundColor: '#6c757d',
  },
  connectButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#6A7A8F',
  }
});

export default App;
