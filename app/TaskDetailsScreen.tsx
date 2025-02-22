import { StyleSheet, Text, View ,ScrollView, TouchableOpacity} from 'react-native'
import React, { useState } from 'react'
import CustomSafeAreaView from '@/components/CustomSafeAreaView'
import CustomHeader from '@/components/CustomHeader'
import { Colors } from '@/constants/Colors'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { AppUseDispatch, AppUseSelector } from '@/redux/reduxHooks'
import { RootState } from '@/redux/store'
import Ionicons from '@expo/vector-icons/Ionicons'
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { updateTask } from '@/redux/reducers/taskSlice'


const TaskDetailsScreen = () => {
    const navigation = useNavigation()
    const params = useLocalSearchParams()
    const {id} = params
    const dispatch = AppUseDispatch()

    const allTask = AppUseSelector((state: RootState) => state.tasks)
    const taskToDisplay = allTask.tasks.filter((task) => task.id == id)

    const [isCompleted, setIsCompleted] = useState<boolean>(taskToDisplay[0].isCompleted)

    const endDate = new Date(taskToDisplay[0].endDate)
    const startDate = new Date(taskToDisplay[0].startDate)
    const timeDiff = Math.abs(endDate - startDate)
    const dayLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24))
    const currentDate = new Date()
     
    const submitAsDone = () => {
        const taskAsDone = {
            ...taskToDisplay[0],
            isCompleted: true
        } 
        dispatch(updateTask(taskAsDone))
        navigation.goBack()
    }
    const submitAsUnDone = () => {
        const taskAsDone = {
            ...taskToDisplay[0],
            isCompleted: false
        } 
        dispatch(updateTask(taskAsDone))
        navigation.goBack()
    }


  return (
    <CustomSafeAreaView style={{backgroundColor: Colors.displayCard}}>
       <CustomHeader text='Your Task'/>
       <ScrollView style={styles.container}>
            <Text style={styles.title}>{taskToDisplay[0].title}</Text>
            <View style={styles.dateLeft}>
                <Text style={{fontSize: 16, color:Colors.inactive_tint,marginBottom: 10}}>Time Left</Text>
                <Text style={{fontSize: 32, fontWeight: '500', marginBottom: 6}}>{dayLeft} Days Left</Text>
                <Text style={{fontSize: 16, fontWeight: '400'}}>{endDate.toDateString()}</Text>
            </View>
            <View style={{marginTop: 20}}>  
                <Text style={styles.subTitle}>Additional Description</Text>
                <Text style={styles.date}>{taskToDisplay[0].description}</Text>
            </View>
            <View style={{marginTop: 20}}>  
                <Text style={styles.subTitle}>Created</Text>
                <Text style={styles.date}>{startDate.toDateString()}</Text>
            </View>
       </ScrollView> 
            <View>
               {currentDate < endDate ? (
                     isCompleted !== true ? (
                      <TouchableOpacity style={styles.statusButton} onPress={submitAsDone}>
                          <Ionicons name='checkmark-done' size={30} color={Colors.cartColor}/>
                          <Text style={styles.statusText}>Set As Done</Text>
                      </TouchableOpacity>
                ) : (
                    <TouchableOpacity style={styles.statusButton} onPress={submitAsUnDone}>
                        <Entypo name="cross" size={30} color={Colors.delete} />
                        <Text style={styles.statusText}>Set As Not Done</Text>
                </TouchableOpacity>
                )
               ) : (
                    <View style={[styles.statusButton, {backgroundColor: Colors.delete}]} onPress={submitAsUnDone}>
                        <MaterialIcons name="hourglass-disabled" size={30} color={Colors.white} />
                        <Text style={styles.statusText}>Task Is Expired, Go Back</Text>
                </View>
               )}
            </View>

    </CustomSafeAreaView>
  )
}

const styles = StyleSheet.create({
    container:{
        paddingHorizontal: 10,
        marginTop: 40
    },
    title:{
        fontSize: 60,
        fontWeight: '600'
    },
    dateLeft:{
        marginTop: 10,
    },
    date:{
        fontSize: 20, 
        fontWeight: '500', 
        marginBottom: 6
    },
    subTitle:{
        fontSize: 16, 
        color:Colors.inactive_tint,
        marginBottom: 10
    },
    statusButton:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        backgroundColor: Colors.botton,
        padding: 20,
        borderRadius: 20,
        marginTop: 50,
    },
    statusText:{
        fontSize: 18,
        fontWeight: 700
    }
})

export default TaskDetailsScreen
