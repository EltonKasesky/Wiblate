import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const VideoMetricsChart = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/videos/metrics');
        const result = await response.json();

        if (response.ok) {
          const labels: string[] = [];
          const counts: number[] = Array(31).fill(0);

          const date = new Date();
          const year = date.getFullYear();
          const month = date.getMonth();

          for (let day = 1; day <= 31; day++) {
            const currentDate = new Date(year, month, day);
            const dayString = currentDate.toLocaleDateString();

            labels.push(dayString);

            const entry = result.find((entry: any) =>
              new Date(entry.day).getDate() === day && 
              new Date(entry.day).getMonth() === month
            );

            if (entry) {
              counts[day - 1] = entry.count;
            }
          }

          setData({
            labels,
            datasets: [
              {
                label: 'Vídeos Assistidos',
                data: counts,
                backgroundColor: 'rgba(41, 116, 247, 1)',
              },
            ],
          });
        } else {
          console.error('Erro ao buscar dados do gráfico:', result.error);
        }
      } catch (error) {
        console.error('Erro ao buscar dados do gráfico:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='w-full lg:h-auto bg-white rounded-lg'>
      {data ? (
        <Bar
          data={data}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: 'top' as const,
              },
              title: {
                display: true,
                text: 'Vídeos Assistidos no Mês',
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'Dias do Mês',
                },
              },
              y: {
                title: {
                  display: true,
                  text: 'Quantidade',
                },
              },
            },
          }}
        />
      ) : (
        <p>Carregando dados...</p>
      )}
    </div>
  );
};

export default VideoMetricsChart;
