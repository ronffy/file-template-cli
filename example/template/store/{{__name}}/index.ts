import { GlobalStoreStateType } from '@/types/store'
import { createSlice, bindActionCreators } from '@reduxjs/toolkit'
import { useSelector, useDispatch } from 'react-redux'
import {
  add{{__Name}}Action,
  delete{{__Name}}Action,
  edit{{__Name}}Action,
  {{__name}}ListAction,
} from './actions'
import { batchAddStoreReducerCase } from '@/utils/batchAddStoreReducerCase'
import { {{__Name}}ListParamsType } from '@/types/{{__name}}'
import { DefaultPageParams } from '@/constants'
import {
  commonUpdateParamsState,
  commonUpdateState,
  genCommoResetState,
} from '../commonReducers'

type {{__Name}}StateType = GlobalStoreStateType['{{__name}}']

export const initial{{__Name}}State: {{__Name}}StateType = {
  loading: false,
  params: {
    ...DefaultPageParams,
  },
  {{__name}}List: [],
  {{__name}}Total: 0,
  {{__name}}Detail: undefined,
  hangarList: [],
}

export const {{__name}}Slice = createSlice({
  name: '{{__name}}',
  initialState: initial{{__Name}}State,
  reducers: {
    updateState: commonUpdateState<{{__Name}}StateType>,
    updateParamsState: commonUpdateParamsState<{{__Name}}StateType>,
    resetState: genCommoResetState<{{__Name}}StateType>(initial{{__Name}}State),
  },
  extraReducers(builder) {
    batchAddStoreReducerCase<{{__Name}}StateType>(builder, [
      // 列表
      {{__name}}ListAction,
      // 增加{{__cname}}
      add{{__Name}}Action,
      // 编辑{{__cname}}
      edit{{__Name}}Action,
      // 删除{{__cname}}
      delete{{__Name}}Action,
    ])
  },
})

export const { updateState, resetState, updateParamsState } =
  {{__name}}Slice.actions

export default {{__name}}Slice.reducer

export const use{{__Name}}Store = () => {
  const {
    loading,
    {{__name}}List,
    {{__name}}Total,
    {{__name}}Detail,
    params,
  } = useSelector((store: GlobalStoreStateType) => store.{{__name}})
  const dispatch = useDispatch()

  const actionCreators = bindActionCreators(
    {
      updateState,
      resetState,
      updateParamsState,
      asyncAdd{{__Name}}Action: add{{__Name}}Action.action,
      asyncEdit{{__Name}}Action: edit{{__Name}}Action.action,
      asyncDelete{{__Name}}Action: delete{{__Name}}Action.action,
      async{{__Name}}ListAction: (_params?: Partial<{{__Name}}ListParamsType>) =>
        {{__name}}ListAction.action({
          ...params,
          ..._params,
        }),
    },
    dispatch
  )

  return {
    loading,
    params,
    {{__name}}List,
    {{__name}}Total,
    {{__name}}Detail,
    ...actionCreators,
  }
}
