"use client";
import G6, { Graph, IG6GraphEvent } from "@antv/g6";
import { useCallback, useEffect, useRef, useState } from "react";
import { getTransctionByAddress } from "@/api/graph";
import DetailDrawer from "./DetailDrawer";
import { getLabel } from "./utils";

interface GraphViewerProps {
  id: string;
}

export default function GraphViewer({ id }: GraphViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const dataRef = useRef<any>(null);
  const graphRef = useRef<Graph | null>(null);
  const [selectId, setSelectId] = useState<string | null>(null);

  const fetchTransaction = useCallback(async () => {
    const [data1] = await Promise.all([getTransctionByAddress(id, "Send")]);
    const nodes = [
      {
        id: id,
        label: getLabel(id),
        size: 4,
      },
      ...data1.map((item: any) => ({
        id: item.Destination,
        label: getLabel(item.Destination),
        size: 4,
      })),
      // ...data2.map((item: any) => ({
      //   id: item.Source,
      //   label: getLabel(item.Source),
      //   size: 15,
      // })),
    ];
    const edges = [
      ...data1.map((item: any) => ({
        source: item.Source,
        target: item.Destination,
        label: `${Number(item.TotalValue).toFixed(2)}(${item.Count}) \n\n`,
      })),
      // ...data2.map((item: any) => ({
      //   source: item.Source,
      //   target: item.Destination,
      //   label: `${Number(item.TotalValue).toFixed(2)}(${item.Count})`,
      // })),
    ];
    dataRef.current = {
      nodes,
      edges,
    };
    if (graphRef.current) {
      graphRef.current.data(dataRef.current); // 读取 Step 2 中的数据源到图上
      graphRef.current.render(); // 渲染图
    }
  }, [id]);

  useEffect(() => {
    fetchTransaction();
  }, [fetchTransaction]);

  const handleGraphClick = useCallback((e: IG6GraphEvent) => {
    if (e.item?._cfg?.type === "node" && e.item?._cfg?.id) {
      setSelectId(e.item?._cfg?.id);
    }
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      const graph = new G6.Graph({
        container: containerRef.current,
        width: 1200, // Number，必须，图的宽度
        height: 1000, // Number，必须，图的高度
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
              path: "M 0,0 L 2,1 L 2,-1 Z",
              fill: "#eee",
            },
          },
          labelCfg: {
            style: {
              fill: "#fff",
              fontSize: 2,
              offset: [20, 20],
            },
            yOffset: 20,
            offset: 20,
          },
        },
        defaultNode: {
          type: "circle",
          style: {
            fill: "#E92E01",
            fontSize: 12,
            stroke: "transparent",
            cursor: "pointer",
          },
          labelCfg: {
            style: {
              fill: "#fff",
              fontSize: 2,
            },
          },
        },
      });
      graph.on("click", handleGraphClick, false);
      graphRef.current = graph;

      if (dataRef.current) {
        graph.data(dataRef.current); // 读取 Step 2 中的数据源到图上
        graph.render(); // 渲染图
      }

      const onresize = () => {
        if (
          !containerRef.current ||
          !containerRef.current.scrollWidth ||
          !containerRef.current.scrollHeight
        )
          return;
        graphRef.current?.changeSize(
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
  }, [handleGraphClick]);
  return (
    <div className="flex flex-col grow">
      <div
        className="w-full grow flex justify-center items-center"
        ref={containerRef}
      />
      <DetailDrawer id={selectId} setIsOpen={() => setSelectId(null)} />
    </div>
  );
}
