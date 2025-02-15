"use client";
import type { PartialUser } from "@/core/types";
import {
  AddUserSvgWrapper,
  AddUserText,
  AddUserWrapper,
  DeleteUserFromAdminIconWrapper,
  FadeAndUsersWrapper,
  GroupUserTitle,
  GroupUserWrapper,
  StyledFade,
  UserAvatarWrapper,
  UserName,
  UsersWrapper,
  UserWrapper,
} from "./groupUser.styles";
import Avatar, { genConfig } from "react-nice-avatar";
import { Icon } from "@/core/enums/Icon.enum";
import { IconHandler } from "@/core/images/IconHandler";
import {
  useActionState,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";
import Modal from "@/app/features/common/modal";
import { handlePromoteToAdmin } from "@/core/actions/make-admin";
import { toast } from "react-toastify";
import { handleRemoveAdmin } from "@/core/actions/remove-admin";
import { handleSearchUser } from "@/core/actions/user-search";
import useDebounce from "@/core/hooks/useDebounce";
import { handleInviteUserToGroup } from "@/core/actions/send-group-invete";
import { handleRemoveUser } from "@/core/actions/remove-user";

type Props = {
  users: PartialUser[];
  groupTitle: string;
  notAdmins?: PartialUser[];
  isAllowedToAddUsers: boolean;
  inGroup?: boolean;
  groupId: number;
  variant: "admins" | "users";
};

type DropDownItem = {
  id: string;
  name: string;
  avatar?: string;
  isInvited?: boolean;
  callback: () => void;
};

export default function GroupUsers({
  users,
  groupTitle,
  isAllowedToAddUsers,
  notAdmins,
  variant,
  groupId,
}: Props) {
  const [showTopFade, setShowTopFade] = useState(false);
  const [showBottomFade, setShowBottomFade] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dropDownValue, setDropDownValue] = useState<DropDownItem[]>([]);
  const [selectedUser, setSelectedUser] = useState<PartialUser | null>(null);
  const [isDropDown1Open, setIsDropDown1Open] = useState(false);
  const [input1, setInput1] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, startTransition] = useTransition();
  const [state, formAction, pending] = useActionState(
    (_state: unknown, payload: { search: string }) =>
      handleSearchUser({ filter: payload.search, groupId: groupId.toString() }),
    { data: [], error: undefined }
  );

  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleOpenModal = () => {
    setIsModalOpen(true);
    window.scrollTo(0, 0);
    document.documentElement.style.overflow = "hidden";
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    document.documentElement.style.overflow = "";
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!wrapperRef.current) return;
      const { scrollTop, scrollHeight, clientHeight } = wrapperRef.current;
      setShowTopFade(scrollTop > 0);
      setShowBottomFade(scrollTop + clientHeight < scrollHeight);
    };

    const wrapperEl = wrapperRef.current;
    if (wrapperEl) {
      wrapperEl.addEventListener("scroll", handleScroll);
      handleScroll();
    }

    return () => {
      if (wrapperEl) {
        wrapperEl.removeEventListener("scroll", handleScroll);
      }
    };
  }, [users]);

  const selectUser = (id: string) => {
    const user = notAdmins?.find((user) => user.user_id.toString() === id);
    if (user) {
      setInput1(user.name);
      setDropDownValue([]);
      setIsDropDown1Open(false);
      setSelectedUser(user);
    }
  };
  const setUser = (user: PartialUser) => {
    setInput1(user.name);
    setDropDownValue([]);
    setIsDropDown1Open(false);
    setSelectedUser(user);
  };
  const debouncedSearch = useDebounce((search: string) => {
    startTransition(() => {
      formAction({ search });
    });
  }, 300);

  const userInputSearch = (value: string) => {
    if (variant === "admins") {
      setInput1(value);
      const notAdminsFiltered = notAdmins?.filter((user) =>
        user?.name?.toLowerCase()?.includes(value?.toLowerCase())
      );
      const newDropDownValue = notAdminsFiltered?.map((user) => ({
        id: user.user_id.toString(),
        name: user.name,
        avatar: user.avatar,
        callback: () => selectUser(user.user_id.toString()),
      }));
      setIsDropDown1Open(true);
      setDropDownValue(newDropDownValue || []);
    }

    if (variant === "users") {
      setIsDropDown1Open(true);
      setInput1(value);
      if (value.length >= 3) {
        debouncedSearch(value);
      }
    }
  };

  const makeUserAdmin = async () => {
    if (!selectedUser) return;
    const body = {
      group_id: groupId.toString(),
      ids: [selectedUser.user_id.toString()],
    };
    try {
      const res = await handlePromoteToAdmin({ body });
      if (res.data && !res.error) {
        toast.success("Пользователь добавлен в администраторы");
      } else {
        toast.error("Ошибка при добавлении администратора");
      }
      setIsModalOpen(false);
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (error) {
      toast.error("Ошибка при добавлении администратора");
      console.error(error);
    }
  };

  const inviteUserToGroup = async () => {
    if (!selectedUser) return;
    const message = (
      document.getElementById("textarea_message") as HTMLTextAreaElement
    )?.value;

    const body = {
      user_id: selectedUser.user_id.toString(),
      group_id: groupId.toString(),
      message,
    };
    try {
      const res = await handleInviteUserToGroup({ body });
      if (res.data && !res.error) {
        toast.success("Пользователь приглашен в группу");
      } else {
        toast.error("Ошибка при приглашении пользователя в группу");
      }
      setDropDownValue([]);
      setInput1("");
      setIsModalOpen(false);
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (error) {
      toast.error("Ошибка при приглашении пользователя в группу");
      console.error(error);
    }
  };

  const removeFromAdmin = async (
    e: React.MouseEvent<HTMLDivElement>,
    id: string
  ) => {
    e.preventDefault();
    e.stopPropagation();
    const body = {
      group_id: groupId.toString(),
      ids: [id],
    };

    try {
      const res = await handleRemoveAdmin({ body });
      if (res.data && !res.error) {
        toast.success("Администратор удален");
        const userItemId = document.getElementById(`user-item-${id}`);
        if (userItemId) {
          userItemId.remove();
        }
      } else {
        toast.error("Ошибка при удалении администратора");
      }
    } catch (error) {
      toast.error("Ошибка при удалении администратора");
      console.error(error);
    }
  };

  const removeUser = async (
    e: React.MouseEvent<HTMLDivElement>,
    id: string
  ) => {
    e.preventDefault();
    e.stopPropagation();
    const body = {
      group_id: +groupId,
      user_id: +id,
    };
    try {
      const res = await handleRemoveUser({ body });
      if (res.data && !res.error) {
        toast.success("Пользователь удален");
        const userItemId = document.getElementById(`user-item-${id}`);
        if (userItemId) {
          userItemId.remove();
        }
      } else {
        toast.error("Ошибка при удалении пользователя");
      }
    } catch (error) {
      toast.error("Ошибка при удалении пользователя");
      console.error(error);
    }
  };

  const dropDownOptionUsers = (state.data as PartialUser[]).map((user) => {
    return {
      id: user.user_id.toString(),
      name: user.name,
      avatar: user.avatar,
      callback: () => setUser(user),
    };
  });

  useEffect(() => {
    if (variant === "users") {
      setDropDownValue(dropDownOptionUsers);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.data]);

  return (
    <>
      {isModalOpen && isAllowedToAddUsers && (
        <Modal
          i18n={
            variant === "admins"
              ? { title: "Сделать участника администратором", btn: "Добавить" }
              : { title: "Добавить участника", btn: "Пригласить" }
          }
          inputs={[
            {
              isSearch: true,
              placeholder: "Поиск по имени",
              label: "Имя",
              name: "name",
              value: input1,
              isDropdownPending: variant === "users" && pending,
              isDropdownOpen: isDropDown1Open,
              dropdownOption: dropDownValue,
              callback: userInputSearch,
            },
          ]}
          textarea={
            variant === "admins"
              ? undefined
              : {
                  label: "Сообщение",
                  placeholder: "Сообщение для пользователя",
                  name: "textarea_message",
                }
          }
          btnAction={variant === "admins" ? makeUserAdmin : inviteUserToGroup}
          closeAction={handleCloseModal}
        />
      )}
      <GroupUserWrapper>
        <GroupUserTitle>{groupTitle}: </GroupUserTitle>
        <FadeAndUsersWrapper>
          <StyledFade $showFade={showTopFade} $isTop />
          <UsersWrapper ref={wrapperRef}>
            {users.map((user) => (
              <UserWrapper
                key={user.user_id}
                id={`user-item-${user.user_id}`}
                href={`/user/${user.user_id}`}
              >
                <UserAvatarWrapper>
                  <Avatar
                    key={user.user_id}
                    style={{
                      width: "32px",
                      height: "32px",
                      minHeight: "32px",
                      minWidth: "32px",
                    }}
                    {...genConfig(user.avatar)}
                  />
                </UserAvatarWrapper>
                <UserName>{user.name}</UserName>
                {isAllowedToAddUsers && (
                  <DeleteUserFromAdminIconWrapper
                    onClick={
                      variant === "admins"
                        ? (e) => removeFromAdmin(e, user.user_id.toString())
                        : (e) => removeUser(e, user.user_id.toString())
                    }
                  >
                    {IconHandler(Icon.Delete)}
                  </DeleteUserFromAdminIconWrapper>
                )}
              </UserWrapper>
            ))}
            {isAllowedToAddUsers && (
              <AddUserWrapper onClick={handleOpenModal}>
                <AddUserSvgWrapper>{IconHandler(Icon.Plus)}</AddUserSvgWrapper>
                <AddUserText>Добавить участника</AddUserText>
              </AddUserWrapper>
            )}
          </UsersWrapper>
          <StyledFade $showFade={showBottomFade} />
        </FadeAndUsersWrapper>
      </GroupUserWrapper>
    </>
  );
}
