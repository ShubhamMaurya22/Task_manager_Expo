import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { Link, useNavigation } from 'expo-router'
import { AppUseDispatch } from '@/redux/reduxHooks'
import { deleteTask } from '@/redux/reducers/taskSlice'

interface TaskDisplayProps{
    id:string,
    title: string,
    description: string,
    startTime: number,
    endTime: number
}
const TaskDisplay:React.FC<TaskDisplayProps> = ({task}) => {
  const dispatch = AppUseDispatch()
  const navigation = useNavigation()
  
  return (
  
      <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('UpdateTask', {id: task.id})}>
        <Text style={styles.title}>{task.title}</Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-around',}}>
          <Text style={styles.description}>
              {task.description}
          </Text>
          <TouchableOpacity onPress={() => dispatch(deleteTask(task.id))}>
              <MaterialIcons name='delete' size={25} color={Colors.black} />
          </TouchableOpacity>
        </View>
        <Text style={styles.dates}>{task.startDate} --&gt; {task.endDate} </Text>
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
        fontSize: 18,
        fontWeight: '500',
        width: '80%'
    },
    description:{
        color: Colors.black,
        width: '80%',
        fontSize: 16
    },
    dates:{
      color: Colors.black,
      fontSize: 14,
      marginLeft: 10
    }
})

export default TaskDisplay
