
import { StyleSheet, Text, View, TextInput , TouchableOpacity, Platform, Alert} from 'react-native'
import React, { useState } from 'react'
import { Colors } from '@/constants/Colors'
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from 'expo-router';
import { AppUseDispatch } from '@/redux/reduxHooks';
import { addTask, deleteTask, updateTask } from '@/redux/reducers/taskSlice';

interface Task {
    id: string;
    title: string;
    description: string;
    startDate: Date | null;
    endDate: Date | null;
}

// Define the type for the taskToUpdate prop
interface CustomUpdateFormProps {
    task: Task;
}

const CustomUpdateForm:React.FC<CustomUpdateFormProps> = ({task}) => {  
    const dispatch = AppUseDispatch()
    const navigation = useNavigation()
    const [title, setTitle] = useState<string>(task.title ||'')
    const [description, setDescription] = useState<string>( task.description ||'')
    const [startDate, setStartDate] = useState<Date | string>(task.startDate || new Date());
    const [endDate, setEndDate] = useState<Date | string>( task.endDate || new Date());
    const [showStartPicker, setShowStartPicker] = useState(false);
    const [showEndPicker, setShowEndPicker] = useState(false);
    const [submitPress, setSubmitPress] = useState<boolean>(false)
  
    const onStartDateChange = (event: any, selectedDate?: Date) => {
        setShowStartPicker(Platform.OS === 'ios'); 
        if (selectedDate) {
          setStartDate(selectedDate);
        }
      };
    
      const onEndDateChange = (event: any, selectedDate?: Date) => {
        setShowEndPicker(Platform.OS === 'ios');
        if (selectedDate) {
          setEndDate(selectedDate);
        }
      };
   
      const submitForm = () => {
        
        setSubmitPress(true)
        if(title.trim() && description.trim() && startDate && endDate && endDate > startDate){
            let updatedTask = {
                id: task.id,
                title: title,
                description: description,
                startDate: typeof startDate == 'string'? startDate : startDate.toLocaleDateString(),
                endDate: typeof endDate == 'string' ? endDate :endDate.toLocaleDateString()
            }
            
            setSubmitPress(false)
            dispatch(updateTask(updatedTask))
            navigation.goBack()
        }
      }
      
      
  return (
   <>
    <View style={styles.container}>
        <View style={{marginBottom: 30}}>
            <Text style={styles.label}>Task Name</Text>
            <View>
                <TextInput
                    placeholder=''
                    value={title}
                    onChangeText={setTitle}
                    style={styles.titleText}
                />
                <View style={styles.underline}/>
            </View>
            
            {submitPress && title.length <= 0 &&  (
                <Text style={styles.errorText}>Enter title</Text>
            )}
        </View>
        <View style={{marginBottom: 30}}>
            <Text style={styles.label}>Start Date</Text>
            <TouchableOpacity onPress={() => setShowStartPicker(true)}>
                <Text style={styles.titleText}>
                Start Date: {typeof startDate == 'string' ? startDate : startDate.toLocaleDateString() }
                </Text>
                <View style={styles.underline}/>
            </TouchableOpacity>
            {showStartPicker && (
            <DateTimePicker
            value={typeof startDate == 'string' ? new Date() : startDate}
            mode="date"
            display="default"
            onChange={onStartDateChange}
            />
      )}
        </View>
        <View style={{marginBottom: 30}}>
            <Text style={styles.label}>End Date</Text>
            
            <TouchableOpacity onPress={() => setShowEndPicker(true)}>
                <Text style={styles.titleText}>
                End Date: {typeof endDate == 'string' ? endDate : endDate.toLocaleDateString() }
                </Text>
                <View style={styles.underline}/>
            </TouchableOpacity>
            {showEndPicker && (
                <DateTimePicker
                value={typeof endDate == 'string' ? new Date(): endDate}
                mode="date"
                display="default"
                onChange={onEndDateChange}
                />
            )}
            {startDate && endDate && endDate < startDate && (
                <Text style={styles.errorText}>End date must be after start date!</Text>
            )}
           
        </View>
        <View>
            <Text style={styles.label}>Description</Text>
            <View>
                <TextInput
                    placeholder=''
                    value={description}
                    onChangeText={setDescription}
                    style={styles.titleText}
                    multiline={true}           
                    numberOfLines={4}
                    textAlignVertical="top" 
                />
                <View style={styles.underline}/>
            </View>
            {submitPress && description.length <= 0 &&  (
                <Text style={styles.errorText}>Enter Description</Text>
            )}
        </View>
    </View>
        <TouchableOpacity style={styles.submitButton} onPress={submitForm}>
            <Text style={styles.submitText}>Update</Text>
        </TouchableOpacity>
   </>
  )
}


const styles = StyleSheet.create({
    container:{
        marginTop: 40
    },
    label:{
        color: Colors.inactive_tint
    },
    titleText:{
        color: Colors.white,
        fontSize: 18,
        paddingVertical: 10
    },
    underline:{
        borderBottomWidth: 0.6,
        borderColor: 'grey'
    },
    errorText: {
        color: 'red',
        marginTop: 10,
      },
      submitButton:{
        backgroundColor: Colors.submit,
        padding: 16,
        borderRadius: 14,
        position: 'absolute',
        width: '100%',
        bottom: 10,
        marginLeft: 10

      },
      submitText:{
        color: Colors.black,
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold'
      }
})
export default CustomUpdateForm