import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Tabs, useNavigation } from 'expo-router'
import AntDesign from '@expo/vector-icons/AntDesign'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { Colors } from '@/constants/Colors'


const TabLayOut = () => {
    const navigation = useNavigation()
  return (
    <Tabs
        screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle:{
                backgroundColor: 'transparent',
                borderTopWidth: 0,
                position: 'absolute'
            }
        }}
    >
        <Tabs.Screen
            name='index'
            options={{
                title:'Home',
                tabBarIcon: ({color}) => <AntDesign name='home' size={30} color={color} />
            }}
        />
        <Tabs.Screen
            name='Add'
            options={{
                title:'Add',
                tabBarIcon: ({color}) => (
                    <TouchableOpacity
                        onPress={() => navigation.navigate("AddTask")}
                        activeOpacity={0.5}
                        style={styles.addButton}
                    >
                        <MaterialIcons name='add' size={35} color={color} />
                    </TouchableOpacity>
                )
            }}
            listeners={{
                tabPress: (e) => e.preventDefault()
            }}
        />
        <Tabs.Screen
            name='TaskHistory'
            options={{
                title:'History',
                tabBarIcon: ({color}) => <MaterialCommunityIcons name='check-circle-outline' size={30} color={color} />
            }}
        />
    </Tabs>
  )
}

const styles = StyleSheet.create({
    addButton:{
        backgroundColor: Colors.card,
        borderRadius: 60,
        shadowColor: Colors.text,
        elevation: 5,
        shadowOpacity: 0.4,
        shadowOffset: {width: 1, height:1},
        shadowRadius: 8,
        bottom: 10,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default TabLayOut
