<script setup lang="ts">
import { loadScript } from '@/models/customFetch'
import { getWorkoutsByUserId, type Workout } from '@/models/workout'
import { getDistanceUnit, measurementSystem, displayDistanceAsNumber } from '@/models/measurement'
import { ref, onMounted, watch } from 'vue'
import { getDistancesByMonth, calcStats } from '@/models/statistics'
import { useSession } from '@/models/session'

const session = useSession()

onMounted(() => {
  getWorkoutsByUserId(session.user ? session.user._id : '').then((res) => {
    console.log(res.data)
    calcStats(res.data)
  }).then(()=>{
    initChart()
  })
})

const graphDiv = ref<HTMLElement | null>(null)
async function initChart() {
  await loadScript('https://www.gstatic.com/charts/loader.js', 'google-loader')

  // Load the Visualization API and the corechart package.
  google.charts.load('current', { packages: ['corechart'] })

  // Set a callback to run when the Google Visualization API is loaded.
  google.charts.setOnLoadCallback(init)

  function init() {
    // Create the data table.
    var data = new google.visualization.DataTable()
    data.addColumn('string', 'Name')
    data.addColumn('number', `Distance (${getDistanceUnit()})`)
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ]
    const dataArray = ref<any>([])
    for (let i = 0; i < 12; i++) {
      dataArray.value.push([
        months[i],
        displayDistanceAsNumber(getDistancesByMonth(i + 1), 'imperial')
      ])
    }
    data.addRows(dataArray.value)

    // Set chart options
    var options = {
      title: 'Distance by Month',
      vAxis: {
        title: `${measurementSystem.value}`,
        titleTextStyle: {
          italic: false,
          bold: true
        }
      },
      hAxis: {
        title: 'Months'
      },
      animation: {
        duration: 1000,
        easing: 'out'
      }
    }
    // Instantiate and draw the chart, passing in some options.
    var chart = new google.visualization.ColumnChart(graphDiv.value!)
    function drawChart() {
      chart.draw(data, options)
    }
    watch(measurementSystem, () => {
      console.log('graph should change to ' + measurementSystem.value)
      for (let i = 0; i < 12; i++) {
        data.setValue(i, 1, displayDistanceAsNumber(getDistancesByMonth(i + 1), 'imperial'))
      }
      options.vAxis.title = `${measurementSystem.value}`
      data.setColumnLabel(1, `Distance (${measurementSystem.value})`)
      drawChart()
    })
    drawChart()
  }
}
</script>

<template>
  <div class="columns">
    <div class="column">
      <div id="graph" ref="graphDiv"></div>
    </div>
  </div>
</template>

<style scoped>
#graph {
  height: calc(100vh - 116px);
}
</style>
