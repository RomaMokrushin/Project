"use client";

// import { toast } from "react-toastify";
import { DeleteAllInvitesButton } from "./deleteAll.styles";
// import { useRef } from "react";
// import { useRouter } from "next/navigation";

// type Props = {
//   ids: number[];
// };

export default function DeleteAllButton() {
  // const modalRef = useRef<HTMLDivElement>(null!);
  // const router = useRouter();

  const handleDeleteAll = async () => {};
  return (
    <DeleteAllInvitesButton onClick={handleDeleteAll}>
      Удалить просмотренные
    </DeleteAllInvitesButton>
  );
}
