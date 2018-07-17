import fetchJsonp from 'fetch-jsonp'

//获取更多新闻
export const getMoreNews = (type) => {
	return fetchJsonp(`https://m.toutiao.com/list/?tag=${type}&ac=wap&count=20&format=json_raw&as=A1453BF4CC702D4&cp=5B4C00920D546E1&max_behot_time=${parseInt(new Date().getTime() / 1000)}`)
}

//刷新最新新闻
export const getRefreshNews = (type) => {
	return fetchJsonp(`https://m.toutiao.com/list/?tag=${type}&ac=wap&count=20&format=json_raw&as=A1453BF4CC702D4&cp=5B4C00920D546E1&min_behot_time=${parseInt(new Date().getTime() / 1000)}`)
}



//新闻详情
export const getDetailNews = (id) => {
	return fetchJsonp(`https://m.toutiao.com/i${id}/info/`)
}