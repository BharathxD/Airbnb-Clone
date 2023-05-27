"use client";

import { useMemo, useState } from "react";
import useRentModal from "@/hooks/useRentModal";
import Modal from "./Modal";
import Heading from "../UI/Heading";
import { categories } from "@/constants/Categories";
import CategoryInput from "../Inputs/CategoryInput";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import CountrySelect from "../Inputs/CountrySelect";
import dynamic from "next/dynamic";
import Counter from "../Inputs/Counter";
import ImageUpload from "../Inputs/ImageUpload";
import Input from "../Inputs/Input";
import { useMutation } from "react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import showToast from "../UI/Toast";

const enum STEPS {
  CATEGORY = 1,
  LOCATION = 2,
  INFO = 3,
  IMAGES = 4,
  DESCRIPTION = 5,
  PRICE = 6,
}

const defaultFormValues = {
  category: "",
  location: null,
  guestCount: 1,
  roomCount: 1,
  bathroomCount: 1,
  imageSrc: "",
  price: 1,
  title: "",
  description: "",
};

const RentModal = () => {
  const rentModal = useRentModal();
  const router = useRouter();

  const [step, setStep] = useState<STEPS>(STEPS.CATEGORY);

  const { mutate, isLoading } = useMutation({
    mutationFn: async (data: FieldValues) => {
      await axios.post("/api/listings", data);
      showToast("List Created!", "success");
    },
    onError: () => {
      showToast("List cannot be created, please try again later", "error");
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: defaultFormValues,
  });

  const category = watch("category");
  const location = watch("location");
  const guestCount = watch("guestCount");
  const roomCount = watch("roomCount");
  const bathroomCount = watch("bathroomCount");
  const imageSrc = watch("imageSrc");

  const Map = useMemo(
    () =>
      // Dynamically import Map component into this component every time location changes
      dynamic(() => import("../UI/Map"), {
        ssr: false,
      }),
    // eslint-disable-next-line
    [location]
  );

  const setCustomValue = (id: string, value: any) => {
    // setValue does sets the value, but it doesn't re-render the page
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onPrev = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const onSubmit: SubmitHandler<FieldValues> = (values: FieldValues) => {
    if (step !== STEPS.PRICE) {
      return onNext();
    }
    mutate(values);
    reset();
    setStep(STEPS.CATEGORY);
    rentModal.onClose();
    router.refresh();
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return "Create";
    }
    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }
    return "Back";
  }, [step]);

  const getBodyComponent = (step: STEPS) => {
    switch (step) {
      case STEPS.CATEGORY:
        return renderCategoryStep;
      case STEPS.LOCATION:
        return renderLocationStep;
      case STEPS.INFO:
        return renderInfoStep;
      case STEPS.IMAGES:
        return renderImagesStep;
      case STEPS.DESCRIPTION:
        return renderDescriptionStep;
      case STEPS.PRICE:
        return renderPriceStep;
      default:
        return null;
    }
  };

  const renderCategoryStep = (
    // CATEGORIES
    <div className="flex flex-col gap-8">
      <Heading
        title="Which of these best describes your place?"
        subtitle="Pick a category"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] p-3 overflow-y-auto">
        {categories.map((item) => (
          <div key={item.label} className="col-span-1">
            <CategoryInput
              onClick={(category) => setCustomValue("category", category)}
              selected={category === item.label}
              label={item.label}
              Icon={item.icon}
            /> 
          </div>
        ))}
      </div>
    </div>
  );

  const renderLocationStep = // LOCATION
    (
      <div className="flex flex-col gap-8">
        <Heading
          title="Where is your place located?"
          subtitle="Help guests find you!"
        />
        <CountrySelect
          value={location}
          onChange={(value) => {
            setCustomValue("location", value);
          }}
        />
        <Map center={location?.latlng} />
      </div>
    );

  const renderInfoStep = // INFO
    (
      <div className="flex flex-col gap-9">
        <Heading
          title="Share some basics about your place"
          subtitle="What amenities do you have?"
        />
        <Counter
          title="Guests"
          subtitle="How many guests do you allow?"
          value={guestCount}
          onChange={(value) => {
            setCustomValue("guestCount", value);
          }}
        />
        <Counter
          title="Rooms"
          subtitle="How many rooms do you have?"
          value={roomCount}
          onChange={(value) => {
            setCustomValue("roomCount", value);
          }}
        />
        <Counter
          title="Bathrooms"
          subtitle="How many bathrooms do you have?"
          value={bathroomCount}
          onChange={(value) => {
            setCustomValue("bathroomCount", value);
          }}
        />
      </div>
    );

  const renderImagesStep = // IMAGE
    (
      <div className="flex flex-col gap-8">
        <Heading
          title="Add a photo of your place"
          subtitle="Show guests what your place looks like!"
        />
        <ImageUpload
          value={imageSrc}
          onImageChange={(value) => setCustomValue("imageSrc", value)}
        />
      </div>
    );

  const renderDescriptionStep = // DESCRIPTION
    (
      <div className="flex flex-col gap-8">
        <Heading
          title="How would you describe your place?"
          subtitle="Short and sweet works best!"
        />
        <Input
          id="title"
          label="Title"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <hr />
        <Input
          id="description"
          label="Description"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );

  const renderPriceStep = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Now, set your price"
        subtitle="How much do you charge per night?"
      />
      <Input
        id="price"
        label="Price"
        type="number"
        register={register}
        errors={errors}
        required
        formatPrice
      />
    </div>
  );

  return (
    <Modal
      title="Airbnb your home!"
      isOpen={rentModal.isOpen}
      body={getBodyComponent(step)}
      onClose={rentModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onPrev}
    />
  );
};

export default RentModal;
