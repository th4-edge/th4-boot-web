<template>
  <div ref="chartElement" class="echarts-bar-line"></div>
</template>
<script lang="ts" setup>
import {computed, defineProps, nextTick, onMounted, onUnmounted, ref, shallowRef, watch} from 'vue';
import * as echarts from 'echarts';
import {color} from "@/views/admin/components/widgets/chart/echarts-config.ts"
import http from "@th4/http.ts";

const props = defineProps<{
  data: string | any[] | { url: string, params?: Record<string, any> } | Function,
  dimensionData?: any[] | Function,
  dimension: string | string[],
  dimensionUnit?: string,
  value: string | { label: string, value: string, type?: ('bar' | 'line'), unit: string }[] | {
    label: string,
    value: string,
    type?: ('bar' | 'line'),
    unit?: string
  },
  valueDimension?:{ label?: string, value: string, type?: ('bar' | 'line'), unit: string }[],
  valueUnit?: string,
  type: 'bar' | 'line',
  swap?: boolean,
  showToolBar?: boolean,
  interval?: number,
  grid?: any,
  seriesOptions?: any[]
}>();
const chartElement = ref<HTMLDivElement>();
const chart = shallowRef();
const syncData = ref<any[]>([]);
let intervalId: any;

const categoryData = computed<any[]>(() => {
  if (props.dimensionData) {
    if (props.dimensionData instanceof Function) {
      return props.dimensionData()
    } else {
      return props.dimensionData
    }
  }
  if (syncData.value && props.dimension) {
      return syncData.value.reduce((categories,item) => {
        let dimensionValue = undefined;
        if (props.dimension instanceof Array) {
          dimensionValue = "";
          for (let i = 0; i < props.dimension.length; i++) {
            if (i % 2 === 0) {
              dimensionValue = dimensionValue.concat(getValue(item, props.dimension[i]));
            } else {
              dimensionValue = dimensionValue.concat(props.dimension[i]);
            }
          }

        } else if (typeof props.dimension === "string") {
          dimensionValue = getValue(item, props.dimension)
        }
        if(!categories.includes(dimensionValue)){
          categories.push(dimensionValue);
        }
        return categories;
      },[]);
  }
  return [];
})
const legend = computed<string[]|undefined>(() => {
  if (syncData.value && props.value) {
    if (props.value instanceof Array) {
      return props.value.map(item => item.label)
    } else if (typeof props.value === 'object' && 'label' in props.value) {
      return [props.value.label]
    }else if (typeof props.value ==='string' && props.valueDimension) {
      return series.value.map(item => item.name)
    }
  }
  return undefined;
})
const series = computed<any[]>(() => {
  if (syncData.value && props.value) {
    if (typeof props.value === 'string') {
      if (props.valueDimension) {
        return syncData.value.reduce((series: any[], dataItem) => {
          if (props.valueDimension) {
            props.valueDimension.forEach(valueItem => {
              const valueDimensionItemValue = getValue(dataItem, valueItem.value);
              let index = series.findIndex(item => item.name == valueDimensionItemValue);
              if (index < 0) {
                series.push({
                  name: valueDimensionItemValue,
                  data: categoryData.value.map(() => 0),
                  type: valueItem.type || props.type
                })
                index = series.length - 1
              }
              let dimensionValue = "";
              if (props.dimension instanceof Array) {
                for (let i = 0; i < props.dimension.length; i++) {
                  if (i % 2 === 0) {
                    dimensionValue = dimensionValue.concat(getValue(dataItem, props.dimension[i]));
                  } else {
                    dimensionValue = dimensionValue.concat(props.dimension[i]);
                  }
                }
              } else if (typeof props.dimension === "string") {
                dimensionValue = getValue(dataItem, props.dimension)
              }
              series[index].data[categoryData.value.findIndex(item => item.toString() == dimensionValue)] = getValue(dataItem, props.value as string);
            })
          }
          return series
        }, []);

      }else{
        const data = categoryData.value.map(() => 0)
        syncData.value.forEach(dataItem => {
          let dimensionValue = "";
          if (props.dimension instanceof Array) {
            for (let i = 0; i < props.dimension.length; i++) {
              if (i % 2 === 0) {
                dimensionValue = dimensionValue.concat(getValue(dataItem, props.dimension[i]));
              } else {
                dimensionValue = dimensionValue.concat(props.dimension[i]);
              }
            }
          } else if (typeof props.dimension === "string") {
            dimensionValue = getValue(dataItem, props.dimension)
          }
          data[categoryData.value.findIndex(item => item == dimensionValue)] = getValue(dataItem, props.value as string);
        })
        return [{
          data: props.valueUnit ? data.map((item: any) => item + props.valueUnit) : data,
          type: props.type,
          label: {
            show: props.swap,
            precision: 1,
            position: 'right',
            valueAnimation: true,
            fontFamily: 'monospace'
          },
          itemStyle: {
            color: function (params: any) {
              if (params.dataIndex % color.length >= 0) {
                return color[params.dataIndex % color.length]||color[0];
              } else {
                return color[params.dataIndex]||color[0];
              }
            }
          }
        }]
      }
    } else if (typeof props.value === 'object' && 'value' in props.value) {
      const data = categoryData.value.map(() => undefined)
      syncData.value.forEach(dataItem => {
        let dimensionValue = "";
        if (props.dimension instanceof Array) {
          for (let i = 0; i < props.dimension.length; i++) {
            if (i % 2 === 0) {
              dimensionValue = dimensionValue.concat(getValue(dataItem, props.dimension[i]));
            } else {
              dimensionValue = dimensionValue.concat(props.dimension[i]);
            }
          }
        } else if (typeof props.dimension === "string") {
          dimensionValue = getValue(dataItem, props.dimension)
        }
        // @ts-ignore
        data[categoryData.value.findIndex(item => item == dimensionValue)] = getValue(dataItem, props.value.value);
      })

      return [{
        data: props.valueUnit ? data.map((item: any) => item + props.valueUnit) : data,
        type: props.value.type || props.type,
        label: {
          show: props.swap,
          precision: 1,
          position: 'right',
          valueAnimation: true,
          fontFamily: 'monospace'
        },
        itemStyle: {
          color: function (params: any) {
            if (params.dataIndex % color.length >= 0) {
              return color[params.dataIndex % color.length] || color[0];
            } else {
              return color[params.dataIndex] || color[0];
            }
          }
        }
      }]
    } else {
      return syncData.value.reduce((series: any[], dataItem) => {
        if (props.value instanceof Array) {
          props.value.forEach(valueItem => {
            let index = series.findIndex(item => item.name == valueItem.label);
            if (index < 0) {
              series.push({
                name: valueItem.label,
                data: categoryData.value.map(() => 0),
                type: valueItem.type || props.type
              })
              index = series.length - 1
            }
            let dimensionValue = "";
            if (props.dimension instanceof Array) {
              for (let i = 0; i < props.dimension.length; i++) {
                if (i % 2 === 0) {
                  dimensionValue = dimensionValue.concat(getValue(dataItem, props.dimension[i]));
                } else {
                  dimensionValue = dimensionValue.concat(props.dimension[i]);
                }
              }

            } else if (typeof props.dimension === "string") {
              dimensionValue = getValue(dataItem, props.dimension)
            }
            series[index].data[categoryData.value.findIndex(item => item.toString() == dimensionValue)] = getValue(dataItem, valueItem.value);
          })
        }
        return series
      }, []);

    }

  }
  return [{
    type: props.type,
    data: categoryData.value.map(() => 0),
  }]
})
const getValue = (item: any, field: string) => {
  if (field.includes(".")) {
    let fields = field.split(".");
    let target = item;
    for (let index = 0; index < fields.length - 1; index++) {
      if (target) {
        target = target[fields[index]]
      } else {
        break;
      }
    }
    if (target) {
      return target[fields[fields.length - 1]]
    }
  }
  return item[field]
}
const loadData = () => {
  if (props.data) {
    if (typeof props.data === 'string') {
      http.post(props.data).then(data => {
        // @ts-ignore
        syncData.value = data;
      })
      if (props.interval) {
        if (intervalId) {
          window.clearInterval(intervalId)
        }
        intervalId = setInterval(() => {
          // @ts-ignore
          http.post(props.data).then(data => {
            // @ts-ignore
            syncData.value = data;
          })
        }, props.interval)
      }

    } else if (props.data instanceof Array) {
      syncData.value = props.data
    } else if (props.data instanceof Function) {
      const data = props.data();
      if (data instanceof Promise) {
        data.then(dataValue => syncData.value = dataValue)
      } else if (data instanceof Array) {
        syncData.value = data
      } else {
        syncData.value = [data]
      }
      if (props.interval) {
        if (intervalId) {
          window.clearInterval(intervalId)
        }
        intervalId = setInterval(() => {
          const data = props.data instanceof Function ? props.data() : [];
          if (data instanceof Promise) {
            data.then(dataValue => syncData.value = dataValue)
          } else if (data instanceof Array) {
            syncData.value = data
          } else {
            syncData.value = [data]
          }
        }, props.interval)
      }
    } else if (typeof props.data === 'object' && 'url' in props.data) {
      // @ts-ignore
      http.post(props.data.url, props.data.params).then(data => {
        // @ts-ignore
        syncData.value = data;
      })
      if (props.interval) {
        if (intervalId) {
          window.clearInterval(intervalId)
        }
        intervalId = setInterval(() => {
          // @ts-ignore
          http.post(props.data.url, props.data.params).then(data => {
            // @ts-ignore
            syncData.value = data;
          })
        }, props.interval)
      }
    }
  }
}
const renderChart = () => {
  const option = {
    grid: {
      top: legend.value?(legend.value.length > 0 ? 40 : 10):10,
      right: 30,
      ...props.grid
    },

    color: color,
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        crossStyle: {
          color: '#999'
        }
      }
    },
    toolbox: props.showToolBar ? {
      feature: {
        dataView: {show: true, readOnly: false},
        magicType: {show: true, type: ['line', 'bar']},
        saveAsImage: {show: true}
      }
    } : {},
    legend: {
      data: legend.value
    },
    xAxis: props.swap ? {
      type: 'value',
      axisPointer: {
        type: 'shadow'
      },
      show: false,
    } : {
      type: 'category',
      data: props.dimensionUnit ? categoryData.value.map(item => item + props.dimensionUnit) : categoryData.value,
      axisPointer: {
        type: 'shadow'
      }
    },
    yAxis: !props.swap ? {
      type: 'value',
      axisPointer: {
        type: 'shadow'
      }
    } : {
      type: 'category',
      data: props.dimensionUnit ? categoryData.value.map(item => item + props.dimensionUnit) : categoryData.value,
      axisPointer: {
        type: 'shadow'
      }
    },
    series: series.value.map((item,index) =>{
      if(item.type === 'line'){
        return {...item,smooth:true,...props.seriesOptions?props.seriesOptions[index]:{}}
      }
      return {...item,...props.seriesOptions?props.seriesOptions[index]:{}}
    }),
    animationDuration: 0,
    animationDurationUpdate: 2000,
    animationEasing: 'linear',
    animationEasingUpdate: 'linear',
  }
  chart.value?.clear();
  chart.value?.setOption(option,true);
}
const resizeChart = () => {
  chart.value?.resize();
}

onMounted(() => {
  loadData();
  if (chartElement.value) {
    chart.value = echarts.init(chartElement.value, null, {locale: 'zh'});
    renderChart();
  }
  window.addEventListener('resize', resizeChart);
});
onUnmounted(() => {
  if (intervalId) {
    window.clearInterval(intervalId)
  }
  window.removeEventListener('resize', resizeChart);
})

watch(() => syncData.value, () => {
  nextTick(()=>{
    renderChart();
  })
},{deep: true})

watch(() => categoryData.value, () => {
  nextTick(()=>{
    renderChart();
  })
},{deep: true})
watch(() => props.data, () => {
  if(props.data instanceof Array){
    loadData();
    nextTick(()=>{
      renderChart();
    })
  }

},{deep: true})
</script>
<style lang="scss" scoped>
.echarts-bar-line {
  width: 100%;
  height: 100%;
}
</style>