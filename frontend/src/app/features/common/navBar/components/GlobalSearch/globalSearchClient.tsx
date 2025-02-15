import React, { useActionState, useRef, useState, useTransition } from "react";
import {
  DropDownContent,
  DropDownItem,
  InnerLoadingText,
  Input,
  InputSearchWrapper,
  InputWrapper,
  LoadingDropDownItem,
  NothingFound,
} from "./globalSearchClient.styles";
import { Icon } from "@/core/enums/Icon.enum";
import { IconHandler } from "@/core/images/IconHandler";
import useDebounce from "@/core/hooks/useDebounce";
import useOutsideClick from "@/core/hooks/useOutsideClick";
import { handleSearchGlobal } from "@/core/actions/global-search";
import type { GlobalSearchResponse } from "@/core/types";
import Avatar, { genConfig } from "react-nice-avatar";

export default function GlobalSearchClient() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, startTransition] = useTransition();
  const inputSearchRef = useRef<HTMLInputElement>(null!);
  const inputWrapperRef = useRef<HTMLDivElement>(null!);
  const [inputSearch, setInputSearch] = useState<string>("");
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [state, formAction, pending] = useActionState(
    (_state: unknown, payload: { search: string }) =>
      handleSearchGlobal({ query: payload.search }),
    { data: [], error: undefined }
  );
  const data = state.data as GlobalSearchResponse[];

  const handleClickOutsideInput = () => {
    setIsDropdownOpen(false);
  };

  const debouncedSearch = useDebounce((search: string) => {
    startTransition(() => {
      formAction({ search });
    });
  }, 300);

  const handleChangeSearch = () => {
    const search = inputSearchRef.current?.value || "";
    if (search.length >= 3) {
      setIsDropdownOpen(true);
      setInputSearch(search);
      debouncedSearch(search);
    } else {
      setIsDropdownOpen(false);
      setInputSearch(search);
    }
  };

  const handleFocusInput = () => {
    if (inputSearch.length >= 3 && data.length > 0) {
      setIsDropdownOpen(true);
    }
  };

  useOutsideClick(inputWrapperRef, handleClickOutsideInput);

  return (
    <InputSearchWrapper ref={inputWrapperRef}>
      <InputWrapper $isDropdownOpen={isDropdownOpen}>
        <Input
          placeholder="глобальный поиск"
          value={inputSearch}
          ref={inputSearchRef}
          onChange={handleChangeSearch}
          onFocus={handleFocusInput}
          $isDropdownOpen={isDropdownOpen}
        />
        {IconHandler(Icon.Spyglass)}
      </InputWrapper>
      {isDropdownOpen && (
        <DropDownContent>
          {data && !pending ? (
            data.length > 0 ? (
              data?.map((item) => (
                <DropDownItem
                  key={item.id}
                  href={
                    item.type === "user"
                      ? `/user/${item.id}`
                      : `/groups/${item.id}`
                  }
                >
                  {item.type === "user" ? (
                    <>
                      <Avatar
                        style={{
                          width: "16px",
                          height: "16px",
                          minHeight: "16px",
                          minWidth: "16px",
                        }}
                        {...genConfig(item.avatar || "")}
                      />
                      <span>{item.name}</span>
                    </>
                  ) : (
                    <>{item.name}</>
                  )}
                </DropDownItem>
              ))
            ) : (
              <NothingFound>Ничего не найдено</NothingFound>
            )
          ) : (
            <>
              {Array.from({ length: 3 }).map((_, index) => (
                <LoadingDropDownItem key={"loading-group" + index}>
                  <InnerLoadingText $instance={index + 1} />
                </LoadingDropDownItem>
              ))}
            </>
          )}
        </DropDownContent>
      )}
    </InputSearchWrapper>
  );
}
