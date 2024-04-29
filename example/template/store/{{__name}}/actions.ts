/**
 * {{__cname}}列表及增删改查
 */
import {
  queryAdd{{__Name}},
  queryDelete{{__Name}},
  queryEdit{{__Name}},
  query{{__Name}}List,
} from '@/services/{{__name}}'
import { withLoading } from '@/store/withLoading'
import { ReduxAction, RequestDataType } from '@/types'
import { {{__Name}}ItemType, {{__Name}}ListParamsType } from '@/types/{{__name}}'
import { {{__Name}}StateType } from '@/types/store'
import { CaseReducer, createAsyncThunk } from '@reduxjs/toolkit'
import { query{{__Name}}List } from '@/services/{{__name}}'
import { {{__Name}}ItemType, {{__Name}}ListParamsType } from '@/types/{{__name}}'

type {{__Name}}ActionReducerType<T = any> = CaseReducer<
  {{__Name}}StateType,
  ReduxAction<RequestDataType<T>>
>

// {{__cname}}列表
export const {{__name}}ListAction = {
  action: createAsyncThunk(
    '{{__name}}/async{{__Name}}ListAction',
    async (params?: {{__Name}}ListParamsType) => {
      const res = await query{{__Name}}List(params)
      return res
    }
  ),
  ...withLoading<{{__Name}}StateType>(),
  fulfilledReducer: ((state, { payload }) => {
    state.loading = false
    if (payload.status !== 200) {
      return
    }
    const data = payload.data
    state.{{__name}}List = data.list
    state.{{__name}}Total = Number(data.total)
  }) as {{__Name}}ActionReducerType<{
    list: {{__Name}}ItemType[]
    total: number
  }>,
}

// 增加{{__cname}}
export const add{{__Name}}Action = {
  action: createAsyncThunk(
    '{{__name}}/asyncAdd{{__Name}}Action',
    async (params: Omit<{{__Name}}ItemType, 'id'>) => {
      const res = await queryAdd{{__Name}}(params)
      return res
    }
  ),
  ...withLoading<{{__Name}}StateType>(),
}

export const edit{{__Name}}Action = {
  action: createAsyncThunk(
    '{{__name}}/asyncEdit{{__Name}}Action',
    async (params: {{__Name}}ItemType) => {
      const res = await queryEdit{{__Name}}(params)
      return res
    }
  ),
  ...withLoading<{{__Name}}StateType>(),
}

// 删除{{__cname}}
export const delete{{__Name}}Action = {
  action: createAsyncThunk(
    '{{__name}}/asyncDelete{{__Name}}Action',
    async (id: string) => {
      const res = await queryDelete{{__Name}}(id)
      return res
    }
  ),
  ...withLoading<{{__Name}}StateType>(),
}

export const {{__name}}ListAction = {
  action: createAsyncThunk(
    '{{__name}}/async{{__Name}}ListAction',
    async (params?: {{__Name}}ListParamsType) => {
      const res = await query{{__Name}}List(params)
      return res
    }
  ),
  ...withLoading<{{__Name}}StateType>(),
  fulfilledReducer: ((state, { payload }) => {
    state.loading = false
    if (payload.status !== 200) {
      return
    }
    const data = payload.data
    state.{{__name}}List = data.list
  }) as {{__Name}}ActionReducerType<{
    list: {{__Name}}ItemType[]
    total: number
  }>,
}
