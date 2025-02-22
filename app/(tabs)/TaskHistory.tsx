import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import CustomSafeAreaView from '@/components/CustomSafeAreaView'
import CustomHeader from '@/components/CustomHeader'
import { Colors } from '@/constants/Colors'
import { AppUseSelector } from '@/redux/reduxHooks'
import type {RootState} from '@/redux/store'
import TaskDisplay from '@/components/TaskDisplay'


const TaskHistory = () => {
  const [selectedState, setSelectedState] = useState(0)
  
  const response = AppUseSelector((state: RootState) => state.tasks)
  const pendingTask = response.tasks.filter(t => t.isCompleted == false)
  const completedTask = response.tasks.filter((t) => t.isCompleted == true)

  return (
    <CustomSafeAreaView>
        <CustomHeader text='Task History' />
        <View style={styles.selectButton}>
            <TouchableOpacity style={[
              styles.button,
              { backgroundColor: selectedState == 0 ? Colors.iris : Colors.white }
              ]}
              onPress={() => setSelectedState(0)}
            >
                <Text style={[
                  styles.buttonText,
                  {color: selectedState == 0 ? Colors.white : Colors.iris}
                  ]}>
                    All
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={[
              styles.button,
              { backgroundColor: selectedState == 1 ? Colors.iris : Colors.white }
              ]}
              onPress={() => {setSelectedState(1)}}
            >
                <Text style={[
                  styles.buttonText,
                  {color: selectedState == 1 ? Colors.white : Colors.iris}
                  ]}>
                    Pending
                </Text>
            </TouchableOpacity >
            <TouchableOpacity style={[
              styles.button,
              { backgroundColor: selectedState == 2 ? Colors.iris : Colors.white }
              ]}
              onPress={() => {setSelectedState(2)}}
            >
                <Text style={[
                  styles.buttonText,
                  {color: selectedState == 2 ? Colors.white : Colors.iris}
                  ]}>
                    Completed
                </Text>
            </TouchableOpacity>
        </View>

        {/* displaying the task based on selected type  */}
        <View style={{marginTop: 30}}>
            {selectedState == 0 && (
              <FlatList
                data = {response.tasks}
                keyExtractor={(items) => items.id}
                renderItem={(task) => <TaskDisplay task={task.item} />}
              />
            )}
            {selectedState == 1 && (
               <FlatList
               data = {pendingTask}
               keyExtractor={(items) => items.id}
               renderItem={(task) => <TaskDisplay task={task.item} />}
             />
            )}
            {selectedState == 2 && (
                 <FlatList
                  data = {completedTask}
                  keyExtractor={(items) => items.id}
                  renderItem={(task) => <TaskDisplay task={task.item} />}
                />
            )}

            {response.tasks.length == 0  && (
                 <View style={styles.noTaskContainer}>
                      <Text style={styles.noTaskText}>No Task To Display</Text>
                  </View> 
            )}
        </View>
                            
    </CustomSafeAreaView>
  )
}

const styles = StyleSheet.create({
  selectButton:{
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: 30,
    backgroundColor: Colors.white,
    // paddingVertical: 6,
    borderRadius: 10,
    
  },
  button:{
    // backgroundColor: Colors.iris,
    width: '33.5%',
    height: '100%',
    paddingVertical: 10,
    borderRadius: 10
  },
  buttonText:{
    color: Colors.iris,
    fontWeight: 600,
    fontSize: 16,
    textAlign: 'center'
  },
  noTaskContainer:{
    backgroundColor: Colors.submit,
    padding: 20,
    borderRadius: 10
  },
  noTaskText:{
    color: Colors.black,
    fontWeight: '600',
    fontSize: 20
  },
})

export default TaskHistory
