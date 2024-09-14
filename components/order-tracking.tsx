"use client";

import { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  PackageIcon,
  TruckIcon,
  HomeIcon,
  CheckCircleIcon,
} from "lucide-react";
import { notFound, useSearchParams } from "next/navigation";
import { verifyOrderNumber } from "@/lib/utils";
import LaundryLoading from "./loading";
import Link from "next/link";

interface OrderStatus {
  currentStatus: "Processing" | "Shipped" | "Out for Delivery" | "Delivered";
  date: string;
}

// const orderStatuses: OrderStatus[] = [
//   { status: 'Processing', date: '2023-06-01' },
//   { status: 'Shipped', date: '2023-06-03' },
//   { status: 'Out for Delivery', date: '2023-06-05' },
//   { status: 'Delivered', date: '2023-06-06' },
// ]

export default function OrderTracking() {
  const [currentStatus, setCurrentStatus] = useState(0); // Index 2 corresponds to 'Out for Delivery'
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<string>();
  const searhParams = useSearchParams();
  const [orderStatuses, setOrderStatus] = useState<OrderStatus[]>([
    { currentStatus: "Processing", date: "" },
    { currentStatus: "Shipped", date: "" },
    { currentStatus: "Out for Delivery", date: "" },
    { currentStatus: "Delivered", date: "" },
  ]);
  const orderId = searhParams.get("orderId");

  useEffect(() => {
    setProgress((currentStatus / (orderStatuses.length - 1)) * 100);
  }, [currentStatus]);

  if (!orderId || !verifyOrderNumber(orderId!)) {
    return notFound();
  }

  useEffect(() => {
    getOrderData();
  }, [isLoading]);

  useEffect(() => {
    const index = orderStatuses.findIndex((s) => s.date === "");
    setCurrentStatus(index - 1);
  }, [orderStatuses]);
  // get order
  const getOrderData = async () => {
    setIsError("");
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/controllers/orders?orderId=${orderId}`
      );
      const data = await response.json();
      if (data.success) {
        const status = data.orderList.status;
        setOrderStatus((prevStatuses: OrderStatus[]) => {
          // Assuming 'status' is the array with the API response
          return prevStatuses.map((prevStatus) => {
            const matchingApiItem = status.find(
              (apiItem: any) =>
                apiItem.currentStatus === prevStatus.currentStatus
            );
            // If there's a match, update the date field, otherwise return the same object
            return matchingApiItem
              ? { ...prevStatus, date: matchingApiItem.date }
              : prevStatus;
          });
        });
      } else {
        setIsError("Order Not Found");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusIcon = (status: OrderStatus["currentStatus"]) => {
    switch (status) {
      case "Processing" || "Pending":
        return <PackageIcon className="h-6 w-6" />;
      case "Shipped":
        return <TruckIcon className="h-6 w-6" />;
      case "Out for Delivery":
        return <TruckIcon className="h-6 w-6" />;
      case "Delivered":
        return <HomeIcon className="h-6 w-6" />;
    }
  };

  if (isLoading) {
    return <LaundryLoading />;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Order Tracking</h1>
      {isError ? (
        <div>{isError}</div>
      ) : (
        <>
          <div className="mb-8">
            <Progress value={progress} className="w-full h-2" />
          </div>
          <div className="space-y-6">
            {orderStatuses.map((status, index) => (
              <div
                key={status.currentStatus}
                className={`flex items-center space-x-4 ${
                  index <= currentStatus
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                <div
                  className={`transition-all duration-500 ${
                    index <= currentStatus ? "scale-110" : "scale-100"
                  }`}
                >
                  {getStatusIcon(status.currentStatus)}
                </div>
                <div className="flex-1">
                  <p className="font-semibold">{status.currentStatus}</p>
                  <p className="text-sm">{status.date}</p>
                </div>
                {index <= currentStatus && (
                  <Badge
                    variant="outline"
                    className={index === currentStatus ? "animate-pulse" : ""}
                  >
                    {index === currentStatus ? (
                      "Current"
                    ) : (
                      <CheckCircleIcon className="h-4 w-4" />
                    )}
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </>
      )}
      <div className="mt-8 text-center">
        <Link href="/" className="bg-black/90 py-2 px-4 text-white rounded-lg">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
