"use client";

import {
  FieldValues,
  RegisterOptions,
  SubmitHandler,
  UseFormRegisterReturn,
  useForm,
} from "react-hook-form";
import { useCallback, useMemo, useState } from "react";

import CategoryBodyContent from "./bodyContentts/CategoryBodyContent";
import DescriptionBodyContent from "./bodyContentts/DescriptionBodyContent";
import ImagesBodyContent from "./bodyContentts/ImagesBodyContent";
import InfoBodyContent from "./bodyContentts/InfoBodyContent";
import LocationBodyContent from "./bodyContentts/LocationBodyContent";
import Modal from "../Modal";
import PriceBodyContent from "./bodyContentts/PriceBodyContent";
import axios from "axios";
import { toast } from "react-hot-toast";
import useRentModal from "@/app/hooks/useRentModal";
import { useRouter } from "next/navigation";

enum Steps {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const RentModal = () => {
  const rentModal = useRentModal();
  const router = useRouter();
  const [step, setStep] = useState(Steps.CATEGORY);
  const [loading, setLoading] = useState(false);

  const onPrevios = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const actionLabel = useMemo(
    () => (step === Steps.PRICE ? "Create" : "Next"),
    [step]
  );

  const secndaryActionLabel = useMemo(() => {
    if (step > Steps.CATEGORY) return "Back";
  }, [step]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: "",
      price: 1,
      title: "",
      description: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = useCallback(
    async (data) => {
      if (step !== Steps.PRICE) return onNext();

      setLoading(true);
      try {
        await axios.post("/api/listings", data);
        toast.success("Listing Created!");
        router.refresh();
        reset();
        setStep(Steps.CATEGORY);
        rentModal.onClose();
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    },
    [step, setLoading]
  );

  const category = watch("category");
  const location = watch("location");
  const guestCount = watch("guestCount");
  const roomCount = watch("roomCount");
  const bathroomCount = watch("bathroomCount");
  const imageSrc = watch("imageSrc");

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const bodyContents = useMemo(
    () => [
      <CategoryBodyContent
        currentCategory={category}
        onCategorySelect={(category) => setCustomValue("category", category)}
      />,
      <LocationBodyContent
        onChange={(value) => setCustomValue("location", value)}
        currentLocation={location}
      />,
      <InfoBodyContent
        guestCount={guestCount}
        roomCount={roomCount}
        bathroomCount={bathroomCount}
        onChange={(data) => {
          for (const [key, value] of Object.entries(data)) {
            setCustomValue(key, value);
          }
        }}
      />,

      <ImagesBodyContent
        value={imageSrc}
        onChange={(value) => setCustomValue("imageSrc", value)}
      />,

      <DescriptionBodyContent
        register={register}
        errors={errors}
        disabled={loading}
      />,

      <PriceBodyContent
        register={register}
        errors={errors}
        disabled={loading}
      />,
    ],
    [
      category,
      setCustomValue,
      location,
      guestCount,
      roomCount,
      bathroomCount,
      imageSrc,
      register,
      errors,
    ]
  );

  const BodyContent = bodyContents[step];

  return (
    <Modal
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel={actionLabel}
      secondaryActionLabel={secndaryActionLabel}
      secondaryAction={step > Steps.CATEGORY ? onPrevios : undefined}
      title="Airbnb your home!"
      body={BodyContent}
    />
  );
};

export default RentModal;
