"use client";

import { Debt } from "@/core/types";
import Avatar, { genConfig } from "react-nice-avatar";
import {
  StyledDebtorCard,
  StyledItemWrapper,
  UserWrapper,
  StyledButton,
  CardTitle,
  Value,
  StyledDate,
  RemindBtnWrapper,
  RemindText,
} from "./debtCard.styles";
import { useState } from "react";
import Modal from "@/app/features/common/modal";
import { toast } from "react-toastify";
import { handleChangeDebt } from "@/core/actions/change-debt";
import { handleRemindDebter } from "@/core/actions/remind-debter";
import ConfirmModal from "@/app/features/common/confirmModal";
import { handleRemoveDebt } from "@/core/actions/remove-debt";

type Props = {
  debt: Debt;
};

export default function DebtCard({ debt }: Readonly<Props>) {
  const [isDebtRemoved, setIsDebtRemoved] = useState(false);
  const [isRemoveDebtModalOpen, setIsRemoveDebtModalOpen] = useState(false);
  const [isReminded, setIsReminded] = useState(debt.remind_time);
  const [debtValue, setDebtValue] = useState(debt.money);
  const [constDebtValue, setConstDebtValue] = useState(debt.money);
  const [isModalChangeDebtOpen, setIsModalChangeDebtOpen] = useState(false);

  if (isDebtRemoved) return null;

  const handleChangeDebtInput = (value: string) => {
    if (parseFloat(value) > debt.money) return null;
    const filteredValue = value.replace(/[^0-9.]/g, "");
    setDebtValue(parseFloat(filteredValue));
  };

  const handleChangeDebtLocal = async () => {
    const moneyValueElem = document.getElementById("money") as HTMLInputElement;
    const moneyValue = moneyValueElem.value;
    const body = {
      money: parseFloat(moneyValue),
      debter_id: debt.id,
    };
    try {
      const { data, error } = await handleChangeDebt({ body });
      if (!data || error) {
        toast.error("Ошибка при изменении долга");
        throw new Error("Error while changing debt");
      } else {
        toast.success("Долг успешно изменен");
        setIsModalChangeDebtOpen(false);
        setConstDebtValue(parseFloat(moneyValue));
      }
    } catch (error) {
      console.error(error);
      toast.error("Ошибка при изменении долга");
    }
  };

  const handleRemind = async () => {
    if (isReminded) return null;
    try {
      const { data, error } = await handleRemindDebter({
        body: { debter_id: debt.id },
      });
      if (!data || error) {
        toast.error("Ошибка при отправке напоминания");
        throw new Error("Error while reminding debter");
      } else {
        toast.success("Напоминание отправлено");
        setIsReminded("3 д.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Ошибка при отправке напоминания");
    }
  };

  const handleRemoveDebtLocal = async () => {
    setIsDebtRemoved(true);
    setIsRemoveDebtModalOpen(false);
    try {
      const { data, error } = await handleRemoveDebt({
        body: { debter_id: debt.id },
      });
      if (!data || error) {
        toast.error("Ошибка при обнулении долга");
        setIsDebtRemoved(false);
        setIsRemoveDebtModalOpen(false);
        throw new Error("Error while removing debt");
      } else {
        toast.success("Долг успешно обнулен");
      }
    } catch (error) {
      console.error(error);
      setIsDebtRemoved(false);
      setIsRemoveDebtModalOpen(false);
      toast.error("Ошибка при обнулении долга");
    }
  };

  return (
    <>
      {isModalChangeDebtOpen && (
        <Modal
          i18n={{
            title: `Изменить долг для ${debt.debter.name}`,
            btn: "Изменить",
          }}
          inputs={[
            {
              name: "money",
              label: "Сумма",
              value: debtValue.toFixed(2),
              placeholder: "Введите сумму",
              callback: handleChangeDebtInput,
            },
          ]}
          closeAction={() => setIsModalChangeDebtOpen(false)}
          btnAction={handleChangeDebtLocal}
        />
      )}
      {isRemoveDebtModalOpen && (
        <ConfirmModal
          title={`Вы дейстивтельно хотите обнулить долг для ${debt.debter.name}?`}
          i18n={{ confirm: "Обнулить", cancel: "Отменить" }}
          closeAction={() => setIsRemoveDebtModalOpen(false)}
          onConfirm={handleRemoveDebtLocal}
        />
      )}
      <StyledDebtorCard key={debt.id}>
        <StyledItemWrapper>
          <UserWrapper>
            <Avatar
              style={{
                width: "40px",
                height: "40px",
                minHeight: "40px",
                minWidth: "40px",
              }}
              {...genConfig(debt.debter.avatar)}
            />
            <span>{debt.debter.name}</span>
          </UserWrapper>
          <RemindBtnWrapper>
            <StyledButton $isReminded={!!isReminded} onClick={handleRemind}>
              Напомнить о долге
            </StyledButton>
            {isReminded && <RemindText>{isReminded}</RemindText>}
          </RemindBtnWrapper>
        </StyledItemWrapper>
        <StyledItemWrapper>
          <CardTitle>Долг</CardTitle>
          <Value>{constDebtValue.toFixed(2)} ₽</Value>
        </StyledItemWrapper>
        <StyledItemWrapper>
          <StyledButton onClick={() => setIsRemoveDebtModalOpen(true)}>
            Обнулить долг
          </StyledButton>
          <StyledButton onClick={() => setIsModalChangeDebtOpen(true)}>
            Изменить долг
          </StyledButton>
        </StyledItemWrapper>
        <StyledDate>{debt.created_at}</StyledDate>
      </StyledDebtorCard>
    </>
  );
}
