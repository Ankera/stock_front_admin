import request from '@/utils/request'

enum API {
  STOCK_MARKET_INFO = '/api/quot/index/all',
  STOCK_SECTOR_INDUSTRY = '/api/quot/sector/industry',
  STOCK_SECTOR_ALL = '/api/quot/sector/all',
  STOCK_UPDOWN_COUNT = '/api/quot/stock/updown/count',
}

export const getInnerMarketInfo = () =>
  request.get<any, any>(API.STOCK_MARKET_INFO)

export const getSectorIndustry = () =>
  request.get<any, any>(API.STOCK_SECTOR_INDUSTRY)

export const getSectorAll = (page: number, pageSize: number) =>
  request.get<any, any>(
    API.STOCK_SECTOR_ALL + `?page=${page}&pageSize=${pageSize}`,
  )

export const quotStockUpdownCount = () =>
  request.get<any, any>(API.STOCK_UPDOWN_COUNT)
