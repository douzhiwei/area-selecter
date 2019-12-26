# simple, beautiful, convenience vue area-select plug-in


## Install

```base
npm install area-selecter --save
```

```js
import areaSelect from 'area-selecter'
Vue.use(areaSelect)
```

## Usage
```html
 <area-select></area-select>
```



## v-model

```html
 <area-select v-model="string"></area-select>
```

> use v-model Implementing two-way binding



## props

|Prop|Type|Default| Description|
|:---|:---|:------|:-----------|
|areaRes|Array| []|backfilldata|
|dataRource|Obj| {}| data origin|
|disabled|Boolean| false| disabled|

## Event
|Event|Output| Description |
|:----|:-----|:------------|
|res-change|Array|[1,2,3]  |

## Result
<img src="./src/img/demo.png" width = "678" height = "404" /> 

