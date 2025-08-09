import React, { useEffect } from "react";
import { Button } from "./ui/button";
import { useCreateCheckoutSessionMutation } from "@/features/api/purchaseApi";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const BuyCourseButton = ({ courseId }) => {
  const [createCheckoutSession, { data, isLoading, isSuccess, isError, error }] =
    useCreateCheckoutSessionMutation();

  const purchaseCourseHandler = async () => {
    await createCheckoutSession(courseId);
  };

  useEffect(() => {
    if (isSuccess) {
      if (data?.orderId && data?.key) {
        const options = {
          key: data.key, // Use the Razorpay key from the backend response
          amount: data.amount,
          currency: data.currency,
          order_id: data.orderId,
          handler: function (response) {
            toast.success("Payment successful!");
            // Optionally, redirect or update the UI
          },
          prefill: {
            name: "Your Name",
            email: "your.email@example.com",
          },
        };
        const razorpay = new window.Razorpay(options);
        razorpay.open();
      } else {
        toast.error("Invalid response from server.");
      }
    }
    if (isError) {
      const errorMessage = error?.data?.message || "Failed to create checkout session";
      toast.error(errorMessage);
    }
  }, [data, isSuccess, isError, error]);

  return (
    <Button
      disabled={isLoading}
      onClick={purchaseCourseHandler}
      className="w-full"
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please wait
        </>
      ) : (
        "Purchase Course"
      )}
    </Button>
  );
};

export default BuyCourseButton;
