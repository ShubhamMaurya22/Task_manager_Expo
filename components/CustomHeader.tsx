import { StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native'
import React from 'react'
import  AntDesign  from '@expo/vector-icons/AntDesign'
import { Colors } from '@/constants/Colors'
import { useNavigation } from 'expo-router'


interface HeaderProps {
    text: string
    style?: ViewStyle
}

const CustomHeader:React.FC<HeaderProps> = ({text, style}) => {
    const navigation = useNavigation()
   return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <AntDesign name='leftcircleo' size={25} color={'white'}/>
            </TouchableOpacity>
            <Text style={styles.headerText}>{text}</Text>
            <TouchableOpacity >
                <AntDesign name="exclamationcircleo" size={25} color={'white'} />
            </TouchableOpacity>
    </View>
)
}

const styles = StyleSheet.create({
  container:{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
  },
  headerText:{
    color: Colors.white,
    fontSize: 18
  }
})

export default CustomHeader
