
import CustomSafeAreaView from '@/components/CustomSafeAreaView';
import TaskDisplay from '@/components/TaskDisplay';
import { Colors } from '@/constants/Colors';
import { AppUseSelector } from '@/redux/reduxHooks';
import { useNavigation } from 'expo-router';
import {StyleSheet, Text, TouchableOpacity, View , FlatList, TextInput} from 'react-native';
import { RootState } from '@/redux/store';
import { useEffect, useState } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';

interface Task {
  id: string;
  title: string;
  description: string;
  startDate: string;  
  endDate: string;  
  isCompleted: boolean;  
}


export default function HomeScreen() {
  const navigation = useNavigation()
  const response = AppUseSelector((state: RootState) => state.tasks )
  const pendingTask = response.tasks.filter(t => t.isCompleted !== true)
  
  const [searchQuery, setSearchQuery] = useState('')
  const [responseTask, setResponseTask] = useState<Task[]>([])
  
  const fetchSearchResult = () => {
    // setResponseTask([])
    const result = response.tasks.filter(task => 
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase()) 
    )
   setResponseTask(result)
  }

  useEffect(() => {
      const debounce = setTimeout(() => {
        if(searchQuery.trim() == ''){
          setResponseTask([])
        }else{
          fetchSearchResult()
        }
      }, 300)

      return () => clearInterval(debounce)
  }, [searchQuery])


  return (
    <CustomSafeAreaView>
      <View style={styles.greetContainer}>
          <Text style={styles.helloText}>Hello</Text>
          <Text style={styles.userGreet}>Shubham 👋</Text>
      </View>
      <View style={styles.tagLineContainer}>
        <Text style={styles.tagLine}>
          Manage Your Daily Task
        </Text>
      </View>
      <View style={styles.searchComponent}>
        <View style={styles.searchBox}>
          <AntDesign  name='search1' size={25} color={Colors.inactive_tint}/>
          <TextInput
            style={styles.searchInput}
            placeholder="Search tasks..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        {responseTask.length > 0 && (
          <FlatList
              style={styles.searchResult}
              data={responseTask}
              keyExtractor={(task) => task.id}
              renderItem={({item}) => (
                <View>
                    <TouchableOpacity style={styles.resultTask} onPress={() => navigation.navigate('TaskDetailsScreen', {id: item.id})}>
                    <Text style={{color: Colors.white}}>{item.title}</Text>
                    <Text style={{color: Colors.white, fontSize: 12}}>{item.description}</Text>    
                  </TouchableOpacity>
                  </View>
            )}  
          />
        )}
      </View>
      <Text style={styles.text}>Your Task :-</Text>
      {
        pendingTask.length > 0 ? 
          <FlatList 
              data={pendingTask}
              keyExtractor={(items) => items.id}
              renderItem={(task) => {
                return ( 
                  <TaskDisplay key={task.item.id} task={task.item}/>
                )
              }}
          />
        :
          <View style={styles.noTaskContainer}>
             <Text style={styles.noTaskText}>No Task To Complete</Text>
          </View> 
      }

   </CustomSafeAreaView>
  );
}

const styles = StyleSheet.create({
  greetContainer:{
    flexDirection: 'row',
    gap: 10
  },
  helloText:{
    color: Colors.inactive_tint,
    fontSize: 18,
  },
  userGreet:{
    color: Colors.white,
    fontSize: 18,
    fontWeight: 'bold'
  },
  tagLineContainer:{
    paddingVertical:20
    
  },
  tagLine:{
    color: Colors.text,
    fontSize: 36,
    fontWeight: '600',
    justifyContent: 'center',  
    flexWrap: 'wrap',  
    width: 250, 
    lineHeight: 40
  },
  addTaskBtn:{
    backgroundColor: 'green',
    position: 'absolute',
    bottom: 20,
    right: 20,
    padding: 16,
    borderRadius: 20
  },
  text:{
    color: Colors.inactive_tint,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20
  },
  addtext:{
    color: Colors.black,
    fontSize: 18,
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
  searchComponent:{
   
    padding: 4,
    borderRadius: 10,
    marginBottom: 10
  },
  searchInput:{
   fontSize: 14,  
  },
  searchResult:{
    borderWidth: 1,
    borderColor: Colors.card,
    backgroundColor: Colors.white,
    borderRadius:10,
    padding: 10,
    position: 'absolute',
    width: '100%',
    marginTop: 50,
    zIndex: 1,
    marginLeft: 4
  },
  searchBox:{
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: Colors.card,
    backgroundColor: Colors.white,
    alignItems: 'center',
    marginBottom: 10,
    gap: 6,
    paddingHorizontal: 10,
    borderRadius: 10

  },
  resultTask:{
    marginBottom: 6,
    backgroundColor: Colors.black,
    color: Colors.white,
    padding: 10,
    borderRadius: 10
  }
});
