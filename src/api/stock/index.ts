import request from '@/utils/request'

enum API {
  STOCK_MARKET_INFO = '/api/quot/index/all',
  STOCK_SECTOR_ALL = '/api/quot/sector/all',
}

export const getInnerMarketInfo = () =>
  request.get<any, any>(API.STOCK_MARKET_INFO)

export const getSectorAll = () => request.get<any, any>(API.STOCK_SECTOR_ALL)
