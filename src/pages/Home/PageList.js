
import React from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import * as Animatable from 'react-native-animatable';

export default function PageList({ data, editItem }) {

  return (
    <Animatable.View
      animation="bounceIn"
      useNativeDriver
    >

      <View style={styles.labelTitle}>
        <Text style={styles.nameLabel}>{data.nome}</Text>
      </View>
      <TouchableWithoutFeedback onPress={() => editItem(data)}>
        <View style={styles.containerList}>
          <Text style={styles.Name}>{data.descri}</Text>
          <Text style={styles.dateIni}>Data inicial: {data.day}</Text>
          <Text style={styles.dateFin}>Horário: {data.hour}</Text>
          <Text style={styles.labelBottom}>Toque para alterar</Text>
        </View>
      </TouchableWithoutFeedback>   
    </Animatable.View>

  );
}
const styles = StyleSheet.create({
   containerList: {
    flex: 1,
    margin: 8,

    backgroundColor: '#FFFAFA',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    elevation: 1
  },

  Name: {
    marginTop: 10,
    paddingLeft: 15,
    fontSize: 16.5,
    fontWeight: '700',
    flexDirection: 'row',
    color: '#000',
    backgroundColor: '#F0F0F0',
    borderRadius: 6,
    marginLeft: 12,
    marginRight: 12,
    marginBottom: 5,
    paddingBottom: 5,
    elevation: 0.5,
    
  },
  dateIni: {
    paddingLeft: 15,
    fontSize: 16,
    height: 30,
    fontWeight: 'bold',
    backgroundColor: '#F0F0F0',
    color: '#4F4F4F',
    borderRadius: 6,
    marginLeft: 12,
    marginRight: 12,
    marginBottom: 5,
    paddingBottom: 5,
    elevation: 0.5
  },

  dateFin: {
    paddingLeft: 15,
    fontSize: 16,
    backgroundColor: '#F0F0F0',
    color: '#4F4F4F',
    fontWeight: 'bold',
    borderRadius: 6,
    marginLeft: 12,
    marginRight: 12,
    paddingBottom: 5,
    elevation: 0.5,
    height: 30,
  },

  labelTitle: {
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: '#2ADC5C',
    marginLeft: 8,
    marginRight: 8.1,
    top: 8,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    elevation: 1
  },
  nameLabel: {
    marginBottom: 15,
    top: 8,
    fontSize: 19,
    color: '#FFF',
    fontWeight: '700',
  },

  labelBottom:{
    marginTop:5,
    marginBottom: 10,
    fontSize: 12.4,
    alignSelf: 'center',
    color: '#363636'
  }


});

