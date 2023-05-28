"use client";

import { FC, MouseEvent, useCallback, useMemo } from "react";
import { Listing, Reservation, User } from "@prisma/client";

import Button from "../Button";
import HeartButton from "../HeartButton";
import Image from "next/image";
import { SafeUser } from "@/app/types";
import { format } from "date-fns";
import useCountries from "@/app/hooks/useCountries";
import { useRouter } from "next/navigation";

interface ListingCardProps {
  data: Listing;
  reservation?: Reservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: SafeUser | null;
}

const ListingCard: FC<ListingCardProps> = ({
  data,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId = "",
  currentUser,
}) => {
  const router = useRouter();
  const { getByValue } = useCountries();
  const location = getByValue(data.locationValue);
  const handleCancel = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      if (disabled) return;
      onAction?.(actionId);
    },
    [onAction, disabled, actionId]
  );

  const price = useMemo(() => {
    if (reservation) return reservation.totalPrice;
    return data.price;
  }, [reservation, data.price]);

  const reservationDate = useMemo(() => {
    if (!reservation) return null;
    const start = reservation.startDate;
    const end = reservation.endDate;
    return `${format(start, "PP")} - ${format(end, "PP")}`;
  }, []);

  return (
    <div
      onClick={() => router.push(`/listings/${data.id}`)}
      className="col-span-1 cursor-pointer group"
    >
      <div className="w-full aspect-square relative overflow-hidden rounded-xl">
        <Image
          fill
          alt="listing"
          src={data.imageSrc}
          className="object-cover h-full w-full group-hover:scale-110 transition"
        />
        <div className="absolute top-3 right-3">
          <HeartButton listingId={data.id} currentUser={currentUser} />
        </div>
      </div>

      <div className="font-semibold text-lg mt-2">
        {location?.region}, {location?.label}
      </div>
      <div className="font-light text-neutral-500">
        {reservationDate ?? data.category}
      </div>
      <div className="flex flex-row items-center gap-1">
        <div className="font-semibold">$ {price}</div>
        {!reservation && <div className="font-light">night</div>}
      </div>
      {onAction && actionLabel && (
        <Button
          disabled={disabled}
          small
          label={actionLabel}
          onClick={handleCancel}
        />
      )}
    </div>
  );
};

export default ListingCard;
