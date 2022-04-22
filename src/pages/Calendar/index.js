import React, { useState } from 'react';
import {
  Keyboard, Platform, ScrollView, StyleSheet,
  Text, TextInput, TouchableOpacity, View,
  ToastAndroid, NativeEventEmitter, NativeModules,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Ionicons';
import firebase from '../../services/firebaseConnection';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';
import ReactNativeAN from 'react-native-alarm-notification';
import { ptBR } from 'date-fns/esm/locale';

export default function App() {

  const navigation = useNavigation();
  const [newTask, setNewTask] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const AnimatableTbn = Animatable.createAnimatableComponent(TouchableOpacity);

  //Lib Relogio e Calendário, aparição 
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [show, setShow] = useState(false);
  const [showTwo, setShowTwo] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    const currentTime = selectedDate || time;
    setShow(Platform.OS === 'ios');
    setShowTwo(Platform.OS === 'ios');
    setDate(currentDate);
    setTime(currentTime);
    date.setSeconds(0);
  }
  const showMode = () => {
    setShow(true);
    setShowTwo(true);
  };
  const showDate = () => {
    showMode('date');
    setShowTwo(false);
  }

  function showTime() {
    setShowTwo(true);
  }

  //Notificações programadas
  const { RNAlarmNotification } = NativeModules;
  const RNEmitter = new NativeEventEmitter(RNAlarmNotification);

  const alarmNotifData = {
    title: `${newTask}`, //task
    message: `${newTitle}, ${format(time, 'HH:mm')}`, //title
    vibrate: true,
    play_sound: true,
    schedule_type: 'once',
    locale: ptBR,
    channel: 'wakeup',
    data: { content: 'Minha notificação' }, // date/time
    loop_sound: true,
    has_button: true,
  };

  const state = {
    fireDate: ReactNativeAN.parseDate(new Date(date)),
    update: [],
    futureFireDate: '1',
    alarmId: null,
  };



  // Salvando no banco de dados toda a atividade
  async function handleAdd() {
    let uid = await firebase.auth().currentUser.uid;
    let key = await firebase.database().ref('evento').child(uid).push().key;
    await firebase.database().ref('evento').child(uid).child(key).set({
      nome: newTask,
      descri: newTitle,
      day: format(date, 'dd/MM/yyyy'),
      hour: format(time, 'HH:mm')
    });

    Keyboard.dismiss();
    setNewTask('');
    setNewTitle('');
    setTime(new Date());
    setDate(new Date());
    navigation.navigate('Home');

    try {
      date.setSeconds(0);
      const details = {
        ...alarmNotifData,
        fire_date: format(date, 'dd-MM-yyyy hh:mm:ss'),
      };

      const alarm = await ReactNativeAN.scheduleAlarm(details);
      if (alarm) {
        ToastAndroid.show('Salvo com sucesso!', ToastAndroid.LONG);
      } else {
        ToastAndroid.show(
          'Não foi possivel executar a ação',
          ToastAndroid.LONG,
        );
      }
    } catch (e) {
      if (e.toString() === 'Error: Não foi possivel agendar porque a data limite já passou') {
        ToastAndroid.show(
          'Não foi possivel salvar, a data já passou',
          ToastAndroid.LONG,
        );
      } else {
        ToastAndroid.show(e.toString(), ToastAndroid.LONG);
      }
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.ViewCalendar}>
        <Text style={styles.txtTitle}>Crie suas atividades</Text>
      </View>

      <Animatable.View
        animation="fadeInUp"
        style={styles.modal}>
        <ScrollView
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.titles}>
            Título
          </Text>
    
          <TextInput
            style={styles.txtInput}
            placeholder="Ex: Manuteção filtros"
            underlineColorAndroid="transparent"
            multiline={true}
            value={newTask}
            onChangeText={(texto) => setNewTask(texto)}
          />

          <Text style={{
            marginLeft: 45, marginTop: 15,
            fontSize: 19, fontWeight: '700', color: '#000'
          }}>Descrição</Text>

          <TextInput
            style={styles.txtInput2}
            placeholder="Ex: Contactar fornecedor "
            underlineColorAndroid="transparent"
            multiline={true}
            value={newTitle}
            onChangeText={(texto) => setNewTitle(texto)}
          />

          <Text style={{
            marginLeft: 45, marginTop: 15,
            fontSize: 19, fontWeight: '700', color: '#000'
          }}>Selecione a data</Text>

          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode="date"
              is24Hour={true}
              display="default"
              onChange={onChange}
            />
          )}
          <View style={styles.ViewDays}>
            <TouchableOpacity
              style={styles.days}
              onPress={showDate}
            >
              <Icon name="calendar" size={20} color="#696969" />
              <Text style={styles.datetimeText}>
                {` ${format(date, 'dd/MM/yyyy')}`}
              </Text>
            </TouchableOpacity>
          </View>

          {showTwo && (
            <DateTimePicker
              value={time}
              mode="time"
              display="default"
              is24Hour={true}
              onChange={onChange}
            />
          )}
          <View style={styles.ViewDays}>
            <TouchableOpacity
              style={styles.days}
              onPress={showTime}
            >
              <Icon name="time" size={20} color="#696969" />
              <Text style={styles.datetimeText}>
                {` ${format(time, 'HH:mm')}`}
              </Text>
            </TouchableOpacity>

            <AnimatableTbn
              style={styles.BtnAdd}
              onPress={handleAdd}>
              <Text style={styles.BtnTxt}>Salvar</Text>
            </AnimatableTbn>
          </View>
        </ScrollView>
      </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',

  },

  Txt: {
    marginTop: 30,
    marginLeft: 20,
    fontSize: 15.8,
    fontWeight: '700',
  },

  titles: {
    marginLeft: 45,
    marginTop: 18,
    top: 15,
    fontSize: 19,
    fontWeight: '700',
    color: '#000'
  },

  ViewCalendar: {
    alignItems: 'center',
    backgroundColor: '#2ADC5C',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    height: 60
  },

  txtTitle: {
    fontSize: 23,
    fontWeight: '700',
    marginTop: 15,
    height: 52.9,
    color: '#FFF'
  },

  btnNew: {

    position: 'absolute',
    width: 125,
    height: 50,
    backgroundColor: '#2ADC5C',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    right: 25,
    bottom: 25,
    elevation: 2,
    zIndex: 9,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 1,
      height: 3,
    }
  },

  txtEvent: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: '700'
  },

  dayCalendar: {
    marginLeft: 15,
    marginTop: 15,
    backgroundColor: '#F4F4F4',
    borderRadius: 5,
    height: 40,
    width: 245,
    fontSize: 13.5,
    fontWeight: '600',
    color: '#000',

  },




  ///ESTILO MODAL

  modal: {
    flex: 1,
    backgroundColor: '#DCDCDC'
  },

  modalHeader: {
    marginLeft: 10,
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },

  titleModal: {
    marginLeft: -15,
    fontSize: 22,
    color: '#000',
    fontWeight: '700',
    marginLeft: 18
  },


  txtInput: {
    fontSize: 15,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 25 ,
    backgroundColor: '#FFF',
    padding: 10,
    height: 65,
    color: '#000',
    borderRadius: 12,
    elevation: 1.5

  },

  txtInput2: {
    fontSize: 15,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10 ,
    backgroundColor: '#FFF',
    padding: 10,
    height: 65,
    color: '#000',
    borderRadius: 12,
    elevation: 1.5

  },

  ViewDays: {
    marginTop: 10,
    marginLeft: 35,
  },

  days: {
    color: '#000',
    backgroundColor: '#FFFAFA',
    height: 60,
    padding: 15,
    marginTop: 5,
    width: 160,
    borderRadius: 10,
    fontSize: 14.5,
    fontWeight: '700',
    flexDirection: 'row'

  },

  ViewAdd: {
    alignItems: 'flex-end'
  },

  BtnAdd: {
    backgroundColor: '#2ADC5C',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 36,
    top: 18,
    height: 46,
    marginTop: 20,
    borderRadius: 12,
    elevation: 0.5,
    marginBottom: 50
  },

  BtnTxt: {
    fontSize: 17,
    color: '#FFF',
    fontWeight: 'bold'
  },

  ////Relogio

  dateTimeButton: {
    marginBottom: 10,
    backgroundColor: '#2ADC5C',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 36,
    top: 18,
    height: 46,
    width: 186,
    borderRadius: 12,
    elevation: 0.8,
  },

  datetimeText: {
    fontWeight: '500',
    color: '#000',
    fontSize: 16

  }
});


