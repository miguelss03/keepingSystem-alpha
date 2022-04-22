import React, { useContext, useState } from 'react';
import {
  Image, StyleSheet, Text,
  TouchableOpacity, View
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
//import  {launchImageLibrary} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '../../../contexts/auth';

export default function Photos() {
  const { user } = useContext(AuthContext);
  const [url, setUrl] = useState(null);

  const uploadFile = () => {
    const options = {
      noData: true,
      mediaType: 'photo'
    };

    ImagePicker.launchImageLibrary(options, response => {
      if(response.didCancel){
        console.log("cancelou o modal")
      }else if(response.error){
        console.log("parece que algo deu errado")
      }else{
        console.log("sua imagem: " + uploadFileFirebase(response))
      }
    });
  }

  const getFileLocalPath = (response) => {
    return response.uri;
  }

  const uploadFileFirebase = async (response) => {
    const fileSource = getFileLocalPath(response);
    console.log(fileSource);
  }

  return (
    <View style={styles.container}>
      <View style={styles.contBtn}>
        <TouchableOpacity
          style={styles.btnEmail}
          onPress={uploadFile}
        >
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.txt}>Adicionar Foto</Text>
            <Icon style={{ paddingLeft: 15 }}
              name="download" size={30}
              color='#A020F0' />
          </View>
        </TouchableOpacity>
      </View>

      <View>

        <View style={styles.viewImg}>

          <Image
            style={styles.img}
            source={{ uri: url }}
          />

        </View>

        <View style={styles.viewShare}>
          <TouchableOpacity>
            <Icon
              name="share-social"
              size={30}
              color='#000' />
          </TouchableOpacity>
        </View>

      </View>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF'
  },

  contBtn: {
    alignItems: 'center',
    paddingBottom: 5
  },

  btnEmail: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
    backgroundColor: '#DCDCDC',
    height: 60,
    width: 230,
    borderRadius: 12,
  },

  txt: {
    color: '#000',
    fontSize: 17.5,
    fontWeight: '700',
    flexDirection: 'row'
  },

  viewImg: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
    paddingHorizontal: 20,
    flexDirection: 'row',
    backgroundColor: '#f4f4f4',
    width: 200,
    height: 200,
    borderRadius: 12,
  },

  img: {
    width: 180,
    height: 180,
  },

  viewShare: {
    backgroundColor: '#f4f4f4',
    width: 50
  },

  shareBtn: {
    backgroundColor: '#467fff',
    width: 180,
    height: 50,
    borderRadius: 20
  },

});



/**
 * // COMPARTILHAMENTO DE QUALQUER COISA
 * 
 * 
 * const onShare = async () => {
    try {
      const result = await Share.share({
        uri: url,
        message:
          'ROTTEN APLE PARCEIRO',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          alert("VE SE DEU BOM")// shared with activity type of result.activityType
        } else {
          
          alert("deu bom de novo? ")// sharedA
        }
      } else if (result.action === Share.dismissedAction) {
       alert('agora eu nao sei de mais nada') // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
 * 
 */