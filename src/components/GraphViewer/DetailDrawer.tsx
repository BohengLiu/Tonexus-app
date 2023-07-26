import { MapPinIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import Drawer from "./Drawer";
import { useCallback, useEffect, useState } from "react";
import { getAddressStats, getTransctionByAddress } from "@/api/graph";
import { PieChart, Pie, Cell } from "recharts";
import {
  friendlyAddressToRawForm,
  rawFormToFriendlyAddress,
} from "@/utils/formatAddress";
import { Tab } from "@headlessui/react";
import classNames from "classnames";

interface CustomTabPorps {
  label: string;
}
export function CustomTab({ label }: CustomTabPorps) {
  return (
    <Tab
      className={({ selected }) =>
        classNames(
          "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-[#FFE9E9] ring-0 outline-0",
          selected
            ? "bg-[#6B6262]/60 shadow"
            : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
        )
      }
    >
      {label}
    </Tab>
  );
}

interface DetailDrawerProps {
  id: string | null;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const COLORS = ["#AD6DFF", "#13C2C2", "#5397FE", "#FF7D34", "#E92E01"];

export default function DetailDrawer({ id, setIsOpen }: DetailDrawerProps) {
  const isOpen = Boolean(id);
  const [data, setData] = useState<any>(null);
  const [inFlow, setInFlow] = useState<any[]>([]);
  const [outFlow, setOutFlow] = useState<any[]>([]);

  const [incomeTxs, setIncomeTxs] = useState<
    { address: string; txCount: string; value: string }[]
  >([]);
  const [outcomeTxs, setOutcomeTxs] = useState<
    { address: string; txCount: string; value: string }[]
  >([]);

  const updateTxs = useCallback(async () => {
    if (id) {
      const [ins, outs] = await Promise.all([
        getTransctionByAddress(id, "Receive"),
        getTransctionByAddress(id, "Send"),
      ]);
      setIncomeTxs(
        ins.map((item: any) => ({
          address: item.Source,
          txCount: item.InTxCount,
          value: item.TotalValue,
        }))
      );
      setOutcomeTxs(
        outs.map((item: any) => ({
          address: item.Destination,
          txCount: item.OutTxCount,
          value: item.TotalValue,
        }))
      );
      console.log(ins, outs);
    }
  }, [id]);

  const updateAddressStats = useCallback(async () => {
    if (id) {
      const data = await getAddressStats(id);
      console.log(data);
      const inflow = data?.TOPInflow?.map((item: any) => ({
        name: rawFormToFriendlyAddress(item.Address),
        value: Number(item.TotalValue),
      }));
      setInFlow(inflow);
      const outflow = data?.TOPOutflow?.map((item: any) => ({
        name: rawFormToFriendlyAddress(item.Address),
        value: Number(item.TotalValue),
      }));
      setOutFlow(outflow);
      setData(data);
    }
  }, [id]);

  useEffect(() => {
    updateAddressStats();
    updateTxs();
  }, [updateAddressStats, updateTxs]);

  return (
    <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="w-full flex flex-col text-white">
        <h2 className="flex flex-col relative border-b-2 p-4">
          <div className="flex items-center">
            <img src="/pin.svg" className="w-5 h-5" alt="" />
            <span className="ml-2">Address</span>
          </div>
          <span className="text-xs mt-2">{id}</span>
          <img className="absolute right-6 top-4 flex justify-center items-center  rounded-full p-1" src="/close-drawer.svg" alt="" onClick={() => setIsOpen(false)} />
        </h2>
        <div className="grid p-4 grid-cols-2 gap-2">
          <div className="border border-[#E3D6D6]/50 rounded flex flex-col p-2 col-span-2">
            <h3 className=" text-xs font-bold">Ton Balance</h3>
            <span className="text-[20px] mt-1 mb-1">
              {data?.TotalBalance} TON
            </span>
          </div>
          <div className="border border-[#E3D6D6]/50 rounded grid grid-cols-2 p-2 h-[108px] col-span-2">
            <div className="flex flex-col items-center">
              <PieChart width={68} height={68}>
                <Pie
                  data={inFlow}
                  cx="50%"
                  cy="50%"
                  innerRadius={20}
                  outerRadius={34}
                  fill="#645555"
                  dataKey="value"
                >
                  {inFlow?.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  )) || []}
                </Pie>
              </PieChart>
              <span className="text-xs mt-1">inflow</span>
            </div>
            <div className="flex flex-col items-center">
              <PieChart width={68} height={68}>
                <Pie
                  data={outFlow}
                  cx="50%"
                  cy="50%"
                  innerRadius={20}
                  outerRadius={34}
                  fill="#645555"
                  dataKey="value"
                >
                  {outFlow?.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  )) || []}
                </Pie>
              </PieChart>
              <span className="text-xs mt-1">outflow</span>
            </div>
          </div>

          <div className="border border-[#E3D6D6]/50 rounded flex flex-col col-span-2">
            <Tab.Group>
              <Tab.List className="flex space-x-1 rounded-xl bg-black/[0.06] p-1">
                <CustomTab label="Incoming Address" />
                <CustomTab label="Outcoming Address" />
              </Tab.List>
              <Tab.Panels>
                <Tab.Panel>
                  <div className="h-[600px] overflow-auto w-full">
                    <table className="h-[600px] w-full">
                      <thead className="bg-[#343030] text-[14px]">
                        <tr className="h-8">
                          <th className="pl-4">From</th>
                          <th className="px-2">Tx Count</th>
                          <th>Value</th>
                        </tr>
                      </thead>
                      <tbody className="text-xs">
                        {incomeTxs.map((tx) => {
                          return (
                            <tr key={tx.address} className="h-8">
                              <td className="pl-4">{`${tx.address.slice(
                                0,
                                6
                              )}...${tx.address.slice(
                                -5,
                                tx.address.length
                              )}`}</td>
                              <td className="px-2">{tx.txCount}</td>
                              <td>{Number(tx.value).toFixed(2)}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </Tab.Panel>
                <Tab.Panel>
                  <div className="h-[600px] overflow-auto w-full">
                    <table className="h-[600px] w-full">
                      <thead className="bg-[#343030] text-[14px]">
                        <tr className="h-8">
                          <th className="pl-4">To</th>
                          <th className="px-2">Tx Count</th>
                          <th>Value</th>
                        </tr>
                      </thead>
                      <tbody className="text-xs">
                        {outcomeTxs.map((tx) => {
                          return (
                            <tr key={tx.address} className="h-8">
                              <td className="pl-4">{`${tx.address.slice(
                                0,
                                6
                              )}...${tx.address.slice(
                                -5,
                                tx.address.length
                              )}`}</td>
                              <td className="px-2">{tx.txCount}</td>
                              <td>{Number(tx.value).toFixed(2)}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </div>
        </div>
      </div>
    </Drawer>
  );
}
