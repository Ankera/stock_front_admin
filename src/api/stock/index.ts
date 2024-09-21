import request from '@/utils/request'

enum API {
  STOCK_MARKET_INFO = '/api/quot/index/all',
}

// 登录
export const getInnerMarketInfo = () =>
  request.get<any, any>(API.STOCK_MARKET_INFO)
