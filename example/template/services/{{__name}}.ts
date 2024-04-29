// {{__cname}}管理

import { ApiMap } from '@/constants/apis'
import { {{__Name}}ItemType, {{__Name}}ListParamsType } from '@/types/{{__name}}'
import request from '@/utils/request'

// {{__cname}}列表
export const query{{__Name}}List = async (params?: {{__Name}}ListParamsType) => {
  const { data } = await request<{
    list: {{__Name}}ItemType[]
    total: number
  }>(ApiMap.{{__name}}, {
    method: 'GET',
    data: params,
  })
  return data
}

// 增加{{__cname}}
export const queryAdd{{__Name}} = async (
  params: Omit<{{__Name}}ItemType, 'id'>
) => {
  const { data } = await request(ApiMap.{{__name}}, {
    method: 'POST',
    data: params,
  })
  return data
}

// 删除{{__cname}}
export const queryDelete{{__Name}} = async (id: string) => {
  const { data } = await request(`${ApiMap.{{__name}}}/${id}`, {
    method: 'DELETE',
  })
  return data
}

// 编辑{{__cname}}
export const queryEdit{{__Name}} = async (params: {{__Name}}ItemType) => {
  const { data } = await request(ApiMap.{{__name}}, {
    method: 'PUT',
    data: params,
  })
  return data
}

// 查看{{__cname}}详情
export const queryDetail{{__Name}} = async (id: string) => {
  const { data } = await request<{{__Name}}ItemType>(`${ApiMap.{{__name}}}/${id}`, {
    method: 'GET',
  })
  return data
}
