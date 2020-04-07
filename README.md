# vue 三级联动地域选择 多选


## 安装

```base
npm install area-selecter --save
```

```js
import areaSelect from 'area-selecter'
Vue.use(areaSelect)
```

## 使用
```html
 <area-select v-model="string"></area-select>
```

## props

|Prop|Type|Default| Description|
|:---|:---|:------|:-----------|
|areaRes|Array| []|数据回填|
|dataRource|Obj| {}| 数据源 |
|disabled|Boolean| false| 是否禁用 |
|value(v-model)|String| '' | 数据回填 |

## 事件
|Event|Output| Description |
|:----|:-----|:------------|
|res-change|Array|[1,2,3]  |
|input||1,2,3 |
|current-item|Object|{id: 123,  name:北京, selected:true} |

## demo
<img src="./src/img/demo.png" width = "678" height = "404" /> 

