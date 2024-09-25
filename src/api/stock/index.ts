import request from '@/utils/request'

enum API {
  STOCK_MARKET_INFO = '/api/quot/index/all',
  STOCK_SECTOR_INDUSTRY = '/api/quot/sector/industry',
  STOCK_SECTOR_ALL = '/api/quot/stock/all',
  STOCK_UPDOWN_COUNT = '/api/quot/stock/updown/count',
  STOCK_SECTOR_EXPORT = '/api/quot/stock/export',
  STOCK_SECTOR_TRADE_AMT = '/api/quot/stock/tradeAmt',
  STOCK_SECTOR_UP_DOWN_RANGE = '/api/quot/stock/upDown',
}

export const getInnerMarketInfo = () =>
  request.get<any, any>(API.STOCK_MARKET_INFO)

export const getSectorIndustry = () =>
  request.get<any, any>(API.STOCK_SECTOR_INDUSTRY)

export const getStockAll = (page: number, pageSize: number) =>
  request.get<any, any>(
    API.STOCK_SECTOR_ALL + `?page=${page}&pageSize=${pageSize}`,
  )

export const quotStockUpdownCount = () =>
  request.get<any, any>(API.STOCK_UPDOWN_COUNT)

export const stockExport = (page: number, pageSize: number) =>
  request.get<any, any>(
    API.STOCK_SECTOR_EXPORT + `?page=${page}&pageSize=${pageSize}`,
  )

export const getCompareStockTradeAmt = () =>
  request.get<any, any>(API.STOCK_SECTOR_TRADE_AMT)

export const getIncreaseRange = () =>
  request.get<any, any>(API.STOCK_SECTOR_UP_DOWN_RANGE)
