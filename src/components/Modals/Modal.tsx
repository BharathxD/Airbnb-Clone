"use client";

import {
  FC,
  Fragment,
  ReactElement,
  useCallback,
  useEffect,
  useState,
} from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: ReactElement;
  footer?: ReactElement;
  actionLabel: string;
  disabled: boolean;
  secondaryAction: () => void;
  secondaryLabel?: string;
}

const Modal: FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  disabled,
  secondaryAction,
  secondaryLabel,
}) => {
  const [showModal, setShowModal] = useState<boolean>(isOpen);
  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);
  const handleClose = useCallback(() => {
    if (disabled) {
      // If the modal is already disabled
      return;
    }
    setShowModal(false);
    // Settinga timeout as we are performing animations on the modal, and that would roughly take 300ms
    setTimeout(() => {
      onClose();
    }, 300);
  }, [disabled, onClose]);
  const handleSubmit = useCallback(() => {
    if (disabled) {
      // If the modal is already disabled
      return;
    }
    onSubmit();
  }, [disabled, onSubmit]);
  const hasSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) {
      //? If there is no secondary action
      return;
    }
    secondaryAction();
  }, [disabled, secondaryAction]);
  if (!isOpen) {
    return null;
  }
  return (
    <Fragment>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70">
        <div className="relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full lg:h-auto md:h-auto">
          {/* {CONTENT} */}
          <div
            className={`translate duration-300 h-full ${
              showModal ? `translate-y-0` : `translate-y-full`
            } ${showModal ? `opacity-100` : `opacity-0`}`}
          >
            <div className="translate h-full lg:h-auto md:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none"></div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Modal;
