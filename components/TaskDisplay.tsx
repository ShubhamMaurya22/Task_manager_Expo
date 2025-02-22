import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '@/constants/Colors'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import Entypo from '@expo/vector-icons/Entypo'

import { useNavigation } from 'expo-router'
import { AppUseDispatch } from '@/redux/reduxHooks'
import { deleteTask } from '@/redux/reducers/taskSlice'

interface TaskDisplayProps{
    id:string,
    title: string,
    description: string,
    startDate: string,
    endDate: string,
    isCompleted: boolean;
}

interface Task {
  task: TaskDisplayProps
}

const TaskDisplay:React.FC<Task> = ({task}) => {
  const dispatch = AppUseDispatch()
  const navigation = useNavigation()
 

  return (
  
      <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('TaskDetailsScreen', {id: task.id})}>
        
        <View style={{flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10}}>
          <Text style={styles.title}>
            {task.title}
          </Text>
            <TouchableOpacity style={styles.icons} onPress={() => navigation.navigate('UpdateTask', {id: task.id}) }>
                <Entypo name='pencil' size={25} color={Colors.black} />
            </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-around',}}>
          <Text style={styles.description}>
              {task.description}
          </Text>
          <TouchableOpacity style={styles.icons} onPress={() => dispatch(deleteTask(task.id))}>
              <MaterialIcons name='delete' size={25} color={Colors.black} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:Colors.displayCard,
        padding: 14,
        borderRadius: 20,
        justifyContent: 'center',
        marginBottom: 10
    },
    title:{
        color: Colors.black,
        fontSize: 22,
        fontWeight: '500',
        width: '80%'
    },
    description:{
        color: Colors.black,
        width: '80%',
        fontSize: 18
    },
    dates:{
      color: Colors.black,
      fontSize: 14,
      marginLeft: 10
    },
    icons:{
      backgroundColor: '#D8D8D870',
      padding: 6,
      borderRadius: 10,
      height: 40
    }
})

export default TaskDisplay
