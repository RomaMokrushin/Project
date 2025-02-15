import React, { useRef } from "react";
import {
  StyledUserDescription,
  StyledUserDescriptionTextarea,
} from "./userDescription.styles";

type Props = {
  description: string;
  isEditable: boolean;
  changeDescription: (description: string) => void;
};

export default function UserDescription({
  description,
  isEditable,
  changeDescription,
}: Props) {
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  const handleDescriptionChange = () => {
    if (descriptionRef.current) {
      changeDescription(descriptionRef.current.value);
    }
  };

  return (
    <>
      {isEditable ? (
        <StyledUserDescriptionTextarea
          ref={descriptionRef}
          value={description}
          onChange={handleDescriptionChange}
          readOnly={!isEditable}
        />
      ) : (
        <StyledUserDescription>{description}</StyledUserDescription>
      )}
    </>
  );
}
