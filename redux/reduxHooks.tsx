import type {RootState, AppDispatch} from './store'
import {useDispatch, useSelector} from 'react-redux'

export const AppUseSelector = useSelector.withTypes<RootState>()
export const AppUseDispatch = useDispatch.withTypes<AppDispatch>()