import { Dimensions, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
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


export default function StoresChartComponent() {
  function getPastThreeMonths() {
    const today = new Date();
    const months = [];

    for (let i = 3; i >= 0; i--) {
      const pastMonth = new Date(today);
      pastMonth.setMonth(today.getMonth() - i);
      const monthName = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(pastMonth);
      months.push(monthName);
    }

    return months;
  }

  const pastMonths = getPastThreeMonths();
  console.log(pastMonths);

  const data = {
    labels: pastMonths,
    datasets: [
      {
        data: [20, 45, 28, 80],
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, // optional
        strokeWidth: 2 // optional
      }
    ],
    legend: ['Highest Intake']
  }

  useEffect(() => {

  })
  return (
    <SafeAreaView>
      <Text style={styles.title}>Past 3 Months Work Rate</Text>
      <Pressable android_ripple={{ color: theme.third_faint }} style={{ borderRadius: 10, overflow: 'hidden', backgroundColor: theme.primary_faint }} >
        <LineChart
          transparent={true}
          data={data}
          width={windowWidth - 50}
          height={220}
          chartConfig={chartConfig}
          bezier
          fromZero={true}
        />
      </Pressable>
    </SafeAreaView>
  )
}


export function StoresBarGraphComponent() {
  const data = [
    {
      name: "Seoul",
      population: 21500000,
      color: "rgba(131, 167, 234, 1)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "Toronto",
      population: 2800000,
      color: "#F00",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    }
  ];

  return (
    <View style={{ marginVertical: 50 }}>
      <Text style={styles.title}>Stores Location Tracker</Text>
      <PieChart
        data={data}
        width={windowWidth - 50}
        height={200}
        chartConfig={chartConfig}
        accessor={"population"}
        backgroundColor={"transparent"}
        paddingLeft={"15"}
        center={[10, 10]}
        absolute

      />
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
    color: theme.third
  }
})

const barStyles = StyleSheet.create({})