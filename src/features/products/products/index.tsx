/* eslint-disable jsx-a11y/iframe-has-title */
import { Button, MiniCard, Pagination } from "components";
import styles from "./styles.module.scss";
import { Bar, Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  LineElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  PointElement,
  Legend,
  ChartOptions,
  plugins,
} from "chart.js";
import * as React from "react";
import { useRef } from "react";
import { useAppDispatch, useAppSelector } from "store/store";
import { addPerson } from "store/features/personSlice";

ChartJS.register(
  BarElement,
  LineElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip
);

declare global {
  interface HTMLIFrameElement {
    mozRequestFullScreen?: () => Promise<void>;
    webkitRequestFullscreen?: () => Promise<void>;
    msRequestFullscreen?: () => Promise<void>;
  }
}

const centerLabelPlugin = {
  id: "centerLabel",
  afterDraw: (chart: {
    config: any;
    ctx: any;
    width: any;
    height: any;
    data: { datasets: { data: any }[] };
  }) => {
    if (chart.config.type !== "doughnut") return;
    const ctx = chart.ctx;
    const canvasWidth = chart.width;
    const canvasHeight = chart.height;

    // Get the chart data
    const data = chart.data.datasets[0].data;
    const total = data.reduce((acc: any, val: any) => acc + val, 0);

    // Text to display in the center
    const labelText = `${total.toString()} candidates`; // You can customize this label as needed

    // Font properties
    ctx.font = "20px Arial";
    ctx.fillStyle = "#000";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // Calculate center coordinates
    const centerX = canvasWidth / 2;
    const centerY = canvasHeight / 2;

    // Draw the text in the center
    ctx.fillText(labelText, centerX, centerY);
  },
};

// Register the plugin
ChartJS.register(centerLabelPlugin);

interface UsersProps {
  products: any[];
  pagination: {
    handleChange: (page: any) => void;
    total: number;
    current: number;
    count: number;
    limit: number;
    info: any[];
  };
}

const ProductsUI: React.FC<UsersProps> = ({ products, pagination }) => {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "",
        data: [3, 6, 9, 2, 3, 5],
        backgroundColor: ["red", "green", "yellow", "black", "blue", "orange"],
        borderColor: ["red", "green", "yellow", "black", "blue", "orange"],
        pointBorderColor: "black",
        fill: true,
        pointRadius: 1,
        borderWidth: 2,
      },
    ],
  };
  const options: ChartOptions = {
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = data.labels[context.dataIndex];
            const value = context.parsed.y;
            return `${label}: ${value}`;
          },
        },
      },
      title: {
        display: true,
        text: "Chart.js Line Chart",
      },
    },
  };

  const doughnutData = {
    labels: ["Continuers", "Retakers"],
    datasets: [
      {
        data: [242, 400],
        backgroundColor: ["blue", "gray"],
        borderWidth: 0,
      },
    ],
  };

  const doughnutOptions: ChartOptions = {
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = doughnutData.labels[context.dataIndex];
            return `${label}: candidates`;
          },
        },
      },
      title: {
        display: true,
        text: "Doughnut Chart with Center Label",
      },
    },
  };

  const persons = useAppSelector((state) => state.person.persons);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleFullscreen = () => {
    if (iframeRef.current) {
      if (iframeRef.current.requestFullscreen) {
        iframeRef.current.requestFullscreen();
      } else if (iframeRef.current.mozRequestFullScreen) {
        // Firefox
        iframeRef.current.mozRequestFullScreen();
      } else if (iframeRef.current.webkitRequestFullscreen) {
        // Chrome, Safari and Opera
        iframeRef.current.webkitRequestFullscreen();
      } else if (iframeRef.current.msRequestFullscreen) {
        // IE/Edge
        iframeRef.current.msRequestFullscreen();
      }
    }
  };
  return (
    <div className={styles.users}>
      <h1 className={styles.ttl}>Products</h1>
      <section className={styles.sofascore}>
        <iframe
          title={""}
          id="sofa-cupTree-embed-132-54105-2858330"
          src="https://widgets.sofascore.com/embed/unique-tournament/132/season/54105/cuptree/2858330?widgetTitle=NBA 23/24 Playoffs&showCompetitionLogo=true&widgetTheme=dark"
          width="100%"
          height="100%"
        ></iframe>
      </section>
      <section className={styles.strikeout}>
        <iframe
          ref={iframeRef}
          src='https://embedstreams.me/euros/euro-semi-finals-netherlands-vs-england-stream-1'
          width="100%"
          height="100%"
        ></iframe>
        <Button
          type={"primary"}
          className={styles.fullScreen}
          onClick={handleFullscreen}
        >
          Fullscreen
        </Button>
      </section>
      <section className={styles.charts}>
        <div className={styles.chart}>
          <Bar data={data} options={options}></Bar>
        </div>
        <div className={styles.chart}>
          <Line data={data} options={options}></Line>
        </div>
        <div className={styles.chart}>
          <Doughnut data={doughnutData} options={doughnutOptions}></Doughnut>
        </div>
        <div>
          {persons.map((item, index) => (
            <div key={item.id}>{item.name}</div>
          ))}
        </div>
      </section>
      <section className={styles.miniCard}>
        {products.map((item, index) => (
          <MiniCard
            key={index}
            header={item.name}
            users={item.price}
            image={item.image}
          />
        ))}
      </section>

      <Pagination
        info={pagination.info}
        currentPage={pagination.current}
        totalPages={pagination.total}
        handleChange={pagination.handleChange}
        totalCount={pagination.count}
        pageLimit={pagination.limit}
        name={"Users"}
      />
    </div>
  );
};

export { ProductsUI };
