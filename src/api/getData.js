import axios from 'axios'
import jsonp from 'jsonp'

export const getList = () => jsonp.get('http://api.map.baidu.com/place/v2/search?query=%E7%BE%8E%E5%A5%B3&tag=%E5%9B%BE%E7%89%87&region=%E4%B8%8A%E6%B5%B7&output=json&ak=V7GTuUvWI1oBA5IMFTUXvg4d2pXZducm')