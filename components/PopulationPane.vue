<script setup lang="ts">
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import type { Population } from '~/types'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const props = defineProps<{
  selectedPrefectures: number[]
}>();

interface PopulationResponse {
  result: {
    data: Array<{
      data: Population[]
    }>
  }
}

const prefectureData = ref<Map<number, Population[]>>(new Map());
const prefectureNames = ref<Map<number, string>>(new Map());

// 都道府県名を取得
const { data: prefecturesData } = await useAsyncData<{ result: { prefCode: number; prefName: string }[] }>(
  "prefectures",
  () => $fetch("/api/prefectures")
);

if (prefecturesData.value?.result) {
  prefecturesData.value.result.forEach((pref) => {
    prefectureNames.value.set(pref.prefCode, pref.prefName);
  });
}

// 選択された都道府県の人口データを取得
watch(() => props.selectedPrefectures, async (newPrefectures) => {
  const newData = new Map(prefectureData.value);
  
  // 新しく選択された都道府県のデータを取得
  for (const prefCode of newPrefectures) {
    if (!newData.has(prefCode)) {
      try {
        const response = await $fetch<PopulationResponse>("/api/population", {
          query: {
            prefCode,
            cityCode: "-",
          },
        });
        if (response.result?.data?.[0]?.data) {
          newData.set(prefCode, response.result.data[0].data);
        }
      } catch (error) {
        console.error(`Failed to fetch data for prefecture ${prefCode}:`, error);
      }
    }
  }
  
  // 選択解除された都道府県のデータを削除
  for (const [prefCode] of newData) {
    if (!newPrefectures.includes(prefCode)) {
      newData.delete(prefCode);
    }
  }

  // 新しいMapで更新して反応性を維持
  prefectureData.value = newData;
}, { immediate: true });

const hasData = computed(() => prefectureData.value.size > 0);

// グラフ用のデータを生成
const chartData = computed(() => {
  const years = Array.from(
    new Set(
      Array.from(prefectureData.value.values())
        .flat()
        .map(d => d.year)
    )
  ).sort((a, b) => a - b);

  const datasets = Array.from(prefectureData.value.entries()).map(([prefCode, data]) => ({
    label: prefectureNames.value.get(prefCode) || `Prefecture ${prefCode}`,
    data: years.map(year => {
      const point = data.find(d => d.year === year);
      return point ? point.value : null;
    }),
    borderColor: `hsl(${(prefCode * 137.508) % 360}, 70%, 50%)`,
    backgroundColor: `hsla(${(prefCode * 137.508) % 360}, 70%, 50%, 0.5)`,
    tension: 0.1
  }));

  return {
    labels: years,
    datasets
  };
});

// グラフのタイトルを動的に生成
const graphTitle = computed(() => {
  const selectedPrefNames = Array.from(prefectureData.value.keys())
    .map(prefCode => prefectureNames.value.get(prefCode))
    .filter(name => name)
    .join('、');
  return selectedPrefNames ? `${selectedPrefNames}の人口推移` : '人口推移';
});

// グラフのオプション
const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const
    },
    title: {
      display: false // タイトルの表示をオフ
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: '人口数'
      }
    },
    x: {
      title: {
        display: true,
        text: '年度'
      }
    }
  }
}));
</script>

<template>
  <v-card class="pa-4">
    <v-card-title class="text-h5 mb-4">{{ graphTitle }}</v-card-title>
    <client-only>
      <v-row v-if="hasData">
        <v-col cols="12">
          <div style="width: 100%; height: 400px;">
            <Line
              :data="chartData"
              :options="chartOptions"
            />
          </div>
        </v-col>
      </v-row>
      <v-row v-else>
        <v-col cols="12" class="text-center">
          <v-alert type="info" variant="tonal">
            都道府県を選択すると、ここに人口推移グラフが表示されます
          </v-alert>
        </v-col>
      </v-row>
    </client-only>
  </v-card>
</template>

<style scoped>
.flex {
  display: flex;
}
.flex > table {
  flex: 1;
  border: solid 1px;
}
td,
th {
  text-align: right;
}
</style>
