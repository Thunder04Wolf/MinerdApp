import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Alert,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  ScrollView
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function RegisterScreen({ navigation }) {
  const [cedula, setCedula] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [clave, setClave] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [errorFields, setErrorFields] = useState({
    cedula: false,
    nombre: false,
    apellido: false,
    clave: false,
    correo: false,
    telefono: false,
    fechaNacimiento: false,
  });

  const formatCedula = (text) => {
    let formattedText = text.replace(/\D/g, '');
    if (formattedText.length > 11) {
      formattedText = formattedText.slice(0, 11);
    }
    if (formattedText.length > 3) {
      formattedText = `${formattedText.slice(0, 3)}-${formattedText.slice(3)}`;
    }
    if (formattedText.length > 10) {
      formattedText = `${formattedText.slice(0, 10)}-${formattedText.slice(10, 11)}`;
    }
    return formattedText;
  };

  const formatTelefono = (text) => {
    let formattedText = text.replace(/\D/g, '');
    if (formattedText.length > 10) {
      formattedText = formattedText.slice(0, 10);
    }
    if ((formattedText.length > 3) && formattedText.lenght <= 6) {
      formattedText = `${formattedText.slice(0, 3)}${formattedText.slice(3)}`;
    }
    if (formattedText.length > 6) {
      formattedText = `${formattedText.slice(0, 3)}-${formattedText.slice(3, 6)}-${formattedText.slice(6)}`;
    }
    return formattedText;
  };

  const handleRegister = async () => {
    const newErrorFields = {
      cedula: !cedula,
      nombre: !nombre,
      apellido: !apellido,
      clave: !clave,
      correo: !correo,
      telefono: !telefono,
      fechaNacimiento: !fechaNacimiento,
    };

    setErrorFields(newErrorFields);

    if (Object.values(newErrorFields).includes(true)) {
      Alert.alert('Error', 'Todos los campos son requeridos.');
      return;
    } else {
      await saveUser();
    }
  };

  const saveUser = async () => {
    const url = "https://adamix.net/minerd/def/registro.php";

    try {
      let formData = new FormData();
      formData.append('cedula', cedula.replace(/-/g, ''));
      formData.append('nombre', nombre);
      formData.append('apellido', apellido);
      formData.append('clave', clave);
      formData.append('correo', correo);
      formData.append('telefono', telefono.replace(/\D/g, '')); // Remove formatting for backend
      formData.append('fecha_nacimiento', fechaNacimiento.toISOString().split('T')[0]);

      let response = await fetch(url, {
        method: "POST",
        body: formData
      });

      let result = await response.json();

      if (result.exito) {
        Alert.alert('Éxito', 'Registro exitoso');
        navigation.navigate('Login', { cedula: cedula.replace(/-/g, '') });
      } else {
        Alert.alert('Error', result.mensaje);
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo conectar con el servidor.');
      console.error(error);
    }
  };

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || fechaNacimiento;
    setShowPicker(Platform.OS === 'ios');
    setFechaNacimiento(currentDate);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Crear Cuenta</Text>
        <View style={styles.formContainer}>
          <TextInput
            placeholder="Cédula"
            value={formatCedula(cedula)}
            onChangeText={(text) => setCedula(formatCedula(text))}
            style={[styles.input, errorFields.cedula && styles.errorInput]}
            keyboardType="numeric"
          />
          <TextInput
            placeholder="Nombre"
            value={nombre}
            onChangeText={(text) => setNombre(text)}
            style={[styles.input, errorFields.nombre && styles.errorInput]}
          />
          <TextInput
            placeholder="Apellido"
            value={apellido}
            onChangeText={(text) => setApellido(text)}
            style={[styles.input, errorFields.apellido && styles.errorInput]}
          />
          <TextInput
            placeholder="Clave"
            value={clave}
            onChangeText={(text) => setClave(text)}
            secureTextEntry
            style={[styles.input, errorFields.clave && styles.errorInput]}
          />
          <TextInput
            placeholder="Correo"
            value={correo}
            onChangeText={(text) => setCorreo(text)}
            keyboardType="email-address"
            style={[styles.input, errorFields.correo && styles.errorInput]}
          />
          <TextInput
            placeholder="Teléfono"
            value={formatTelefono(telefono)}
            onChangeText={(text) => setTelefono(formatTelefono(text))}
            keyboardType="phone-pad"
            style={[styles.input, errorFields.telefono && styles.errorInput]}
            maxLength={12}  // Max length for Dominican phone number format (xxx-xxx-xxxx)
          />
          <TouchableOpacity style={[styles.input, styles.datePicker]} onPress={() => setShowPicker(true)}>
            <Text style={styles.dateText}>
              {fechaNacimiento.toDateString() || 'Fecha de Nacimiento'}
            </Text>
          </TouchableOpacity>
          {showPicker && (
            <DateTimePicker
              value={fechaNacimiento}
              mode="date"
              display="default"
              onChange={onDateChange}
            />
          )}
          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Registrarse</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',  // Center content vertically
    alignItems: 'center',      // Center content horizontally
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 32,
    textAlign: 'center',  // Center title
  },
  formContainer: {
    width: '100%',
    maxWidth: 400, // Limit max width for larger screens
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  errorInput: {
    borderColor: '#f00',
    borderWidth: 1,
  },
  dateText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 50,
    textAlign: 'center',
  },
  datePicker: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#007BFF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
