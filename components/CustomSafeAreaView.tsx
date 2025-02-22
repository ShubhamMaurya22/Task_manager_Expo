import { SafeAreaView, StyleSheet, Text, View, ViewStyle } from 'react-native'
import React, { ReactNode } from 'react'
import { Colors } from '@/constants/Colors'

interface CustomSafeAreaViewProps {
    children: ReactNode
    style?: ViewStyle
}
const CustomSafeAreaView:React.FC<CustomSafeAreaViewProps> = ({children, style}) => {
  return (
    <SafeAreaView style={[styles.container, style]}>
         <View style={[styles.container, style]}>
                {children}
          </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: Colors.background,
        padding: 10
    }
})

export default CustomSafeAreaView
