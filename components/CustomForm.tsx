import { StyleSheet, Text, View, TextInput , TouchableOpacity, Platform} from 'react-native'
import React, { useState } from 'react'
import { Colors } from '@/constants/Colors'
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from 'expo-router';
import { AppUseDispatch } from '@/redux/reduxHooks';
import { addTask, deleteTask } from '@/redux/reducers/taskSlice';

interface CustomFormProps{
    submitButtonText: string
}
const CustomForm:React.FC<CustomFormProps> = ({submitButtonText}) => {
    const dispatch = AppUseDispatch()
    const navigation = useNavigation()
    const [title, setTitle] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
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
            let newtask = {
                id: Date.now().toString(),
                title: title,
                description: description,
                startDate: startDate.toLocaleDateString(),
                endDate: endDate.toLocaleDateString()
            }
            setSubmitPress(false)
            dispatch(addTask(newtask))
            setTitle('');
            setDescription('');
            setStartDate(null)
            setEndDate(null)
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
                    placeholder='Enter Task'
                    placeholderTextColor={'white'}
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
                Start Date: {startDate ? startDate.toLocaleDateString() : 'Not selected'}
                </Text>
                <View style={styles.underline}/>
            </TouchableOpacity>
            {showStartPicker && (
            <DateTimePicker
            value={startDate || new Date()}
            mode="date"
            display="default"
            onChange={onStartDateChange}
            />
      )}
        {submitPress && startDate == null &&  (
                <Text style={styles.errorText}>Select Date</Text>
            )}
        </View>
        <View style={{marginBottom: 30}}>
            <Text style={styles.label}>End Date</Text>
            
            <TouchableOpacity onPress={() => setShowEndPicker(true)}>
                <Text style={styles.titleText}>
                End Date: {endDate ? endDate.toLocaleDateString() : 'Not selected'}
                </Text>
                <View style={styles.underline}/>
            </TouchableOpacity>
            {showEndPicker && (
                <DateTimePicker
                value={endDate || new Date()}
                mode="date"
                display="default"
                onChange={onEndDateChange}
                />
            )}
            {startDate && endDate && endDate < startDate && (
                <Text style={styles.errorText}>End date must be after start date!</Text>
            )}
            {submitPress && endDate == null &&  (
                <Text style={styles.errorText}>Select Date</Text>
            )}
        </View>
        <View>
            <Text style={styles.label}>Description</Text>
            <View>
                <TextInput
                    placeholder='Enter Description'
                    placeholderTextColor={'white'}
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
            <Text style={styles.submitText}>{submitButtonText}</Text>
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
export default CustomForm