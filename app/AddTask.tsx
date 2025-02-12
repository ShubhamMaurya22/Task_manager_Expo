import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomSafeAreaView from '@/components/CustomSafeAreaView'
import CustomHeader from '@/components/CustomHeader'
import CustomForm from '@/components/CustomForm'

const AddTask = () => {
  return (
    <CustomSafeAreaView>
        <CustomHeader text='Add New Task'/>
        <CustomForm submitButtonText='Create Task'/>
    </CustomSafeAreaView>
  )
}

export default AddTask

const styles = StyleSheet.create({})