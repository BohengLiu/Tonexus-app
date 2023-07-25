"use client";
import G6, { Graph } from "@antv/g6";
import { useCallback, useEffect, useRef, useState } from "react";
import { getTransctionByAddress } from "@/api/graph";
import DetailDrawer from "./DetailDrawer";

interface GraphViewerProps {
  id: string;
}

export default function GraphViewer({ id }: GraphViewerProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const dataRef = useRef<any>(null);
  dataRef.current = {
    nodes: [
      {
        id: "0",
        label: "0",
      },
      {
        id: "1",
        label: "1",
      },
      {
        id: "2",
        label: "2",
      },
      {
        id: "3",
        label: "3",
      },
      {
        id: "4",
        label: "4",
      },
      {
        id: "5",
        label: "5",
      },
      {
        id: "6",
        label: "6",
      },
      {
        id: "7",
        label: "7",
      },
      {
        id: "8",
        label: "8",
      },
      {
        id: "9",
        label: "9",
      },
      {
        id: "10",
        label: "10",
      },
      {
        id: "11",
        label: "11",
      },
      {
        id: "12",
        label: "12",
      },
      {
        id: "13",
        label: "13",
      },
      {
        id: "14",
        label: "14",
      },
      {
        id: "15",
        label: "15",
      },
      {
        id: "16",
        label: "16",
      },
      {
        id: "17",
        label: "17",
      },
      {
        id: "18",
        label: "18",
      },
      {
        id: "19",
        label: "19",
      },
      {
        id: "20",
        label: "20",
      },
      {
        id: "21",
        label: "21",
      },
      {
        id: "22",
        label: "22",
      },
      {
        id: "23",
        label: "23",
      },
      {
        id: "24",
        label: "24",
      },
      {
        id: "25",
        label: "25",
      },
      {
        id: "26",
        label: "26",
      },
      {
        id: "27",
        label: "27",
      },
      {
        id: "28",
        label: "28",
      },
      {
        id: "29",
        label: "29",
      },
      {
        id: "30",
        label: "30",
      },
      {
        id: "31",
        label: "31",
      },
      {
        id: "32",
        label: "32",
      },
      {
        id: "33",
        label: "33",
      },
    ],
    edges: [
      {
        source: "0",
        target: "1",
      },
      {
        source: "0",
        target: "2",
      },
      {
        source: "0",
        target: "3",
      },
      {
        source: "0",
        target: "4",
      },
      {
        source: "0",
        target: "5",
      },
      {
        source: "0",
        target: "7",
      },
      {
        source: "0",
        target: "8",
      },
      {
        source: "0",
        target: "9",
      },
      {
        source: "0",
        target: "10",
      },
      {
        source: "0",
        target: "11",
      },
      {
        source: "0",
        target: "13",
      },
      {
        source: "0",
        target: "14",
      },
      {
        source: "0",
        target: "15",
      },
      {
        source: "0",
        target: "16",
      },
      {
        source: "2",
        target: "3",
      },
      {
        source: "4",
        target: "5",
      },
      {
        source: "4",
        target: "6",
      },
      {
        source: "5",
        target: "6",
      },
      {
        source: "7",
        target: "13",
      },
      {
        source: "8",
        target: "14",
      },
      {
        source: "9",
        target: "10",
      },
      {
        source: "10",
        target: "22",
      },
      {
        source: "10",
        target: "14",
      },
      {
        source: "10",
        target: "12",
      },
      {
        source: "10",
        target: "24",
      },
      {
        source: "10",
        target: "21",
      },
      {
        source: "10",
        target: "20",
      },
      {
        source: "11",
        target: "24",
      },
      {
        source: "11",
        target: "22",
      },
      {
        source: "11",
        target: "14",
      },
      {
        source: "12",
        target: "13",
      },
      {
        source: "16",
        target: "17",
      },
      {
        source: "16",
        target: "18",
      },
      {
        source: "16",
        target: "21",
      },
      {
        source: "16",
        target: "22",
      },
      {
        source: "17",
        target: "18",
      },
      {
        source: "17",
        target: "20",
      },
      {
        source: "18",
        target: "19",
      },
      {
        source: "19",
        target: "20",
      },
      {
        source: "19",
        target: "33",
      },
      {
        source: "19",
        target: "22",
      },
      {
        source: "19",
        target: "23",
      },
      {
        source: "20",
        target: "21",
      },
      {
        source: "21",
        target: "22",
      },
      {
        source: "22",
        target: "24",
      },
      {
        source: "22",
        target: "25",
      },
      {
        source: "22",
        target: "26",
      },
      {
        source: "22",
        target: "23",
      },
      {
        source: "22",
        target: "28",
      },
      {
        source: "22",
        target: "30",
      },
      {
        source: "22",
        target: "31",
      },
      {
        source: "22",
        target: "32",
      },
      {
        source: "22",
        target: "33",
      },
      {
        source: "23",
        target: "28",
      },
      {
        source: "23",
        target: "27",
      },
      {
        source: "23",
        target: "29",
      },
      {
        source: "23",
        target: "30",
      },
      {
        source: "23",
        target: "31",
      },
      {
        source: "23",
        target: "33",
      },
      {
        source: "32",
        target: "33",
      },
    ],
  };
  const graphRef = useRef<Graph | null>(null);

  const fetchTransaction = useCallback(async () => {
    const data = await getTransctionByAddress(id, "Send");

    console.log(data);
  }, [id]);

  useEffect(() => {
    fetchTransaction();
  }, [fetchTransaction]);

  useEffect(() => {
    if (containerRef.current) {
      const graph = new G6.Graph({
        container: containerRef.current,
        width: 800, // Number，必须，图的宽度
        height: 500, // Number，必须，图的高度
        fitView: true,
        modes: {
          default: ["drag-canvas", "drag-node"],
        },
        layout: {
          type: "radial",
          unitRadius: 50,
          preventOverlap: true,
          maxPreventOverlapIteration: 100,
        },
        animate: true,
        defaultEdge: {
          style: {
            endArrow: {
              path: "M 0,0 L 8,4 L 8,-4 Z",
              fill: "#e2e2e2",
            },
          },
        },
      });
      graph.on(
        "click",
        (e) => {
          console.log(e);
        },
        false
      );
      graphRef.current = graph;
      dataRef.current.nodes.forEach((node: any) => {
        node.size = Math.random() * 20 + 10;
      });

      graph.data(dataRef.current); // 读取 Step 2 中的数据源到图上
      graph.render(); // 渲染图

      const onresize = () => {
        if (
          !containerRef.current ||
          !containerRef.current.scrollWidth ||
          !containerRef.current.scrollHeight
        )
          return;
        graph.changeSize(
          containerRef.current.scrollWidth,
          containerRef.current.scrollHeight
        );
      };

      window.addEventListener("resize", onresize, false);
    }
    return () => {
      if (graphRef.current) {
        graphRef.current.destroy();
      }
    };
  }, []);
  return (
    <div className="flex flex-col">
      <div>
        <button
          className="border border-white text-white"
          onClick={() => setOpen((pre) => !pre)}
        >
          Open/Close
        </button>
      </div>
      <div className="w-full flex justify-center" ref={containerRef} />
      <DetailDrawer isOpen={open} setIsOpen={setOpen} />
    </div>
  );
}
