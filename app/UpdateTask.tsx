import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomSafeAreaView from '@/components/CustomSafeAreaView'
import CustomHeader from '@/components/CustomHeader'
import CustomForm from '@/components/CustomForm'
import { useNavigation, useRouter,useLocalSearchParams} from 'expo-router'
import { AppUseSelector } from '@/redux/reduxHooks'
import { RootState } from '@/redux/store'
import CustomUpdateForm from '@/components/CustomUpdateForm'

const Update = () => {
  const params = useLocalSearchParams()
  const {id} = params

  const AllTask = AppUseSelector((State: RootState) => State.tasks)
  const taskToUpdate = AllTask.tasks.filter(t => t.id === id )
  

  return (
    <CustomSafeAreaView>
        <CustomHeader text='Update Task' />
        <CustomUpdateForm task={taskToUpdate[0]} />
    </CustomSafeAreaView>
  )
}

export default Update

const styles = StyleSheet.create({})