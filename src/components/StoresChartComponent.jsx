import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import { theme, windowWidth } from '../utils/theme'

const chartConfig = {
  backgroundGradientFrom: "#1E2923",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#08130D",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 0.5) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false // optional
};

const data = {
  labels: ["Swim", "Bike", "Run"], // optional
  data: [0.4, 0.6, 0.8]
};

export default function StoresChartComponent() {
  return (
    <Pressable android_ripple={{ color: theme.primary_faint }} >
      <ProgressChart
        data={data}
        width={windowWidth - 50}
        height={220}
        strokeWidth={16}
        radius={32}
        chartConfig={chartConfig}
        hideLegend={false}
      />
    </Pressable>
  )
}

const styles = StyleSheet.create({})