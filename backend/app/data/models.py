from sqlalchemy import ForeignKey, TIMESTAMP, func
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.dao.database import Base, str_uniq
from datetime import datetime


class User(Base):
    first_name: Mapped[str]
    last_name: Mapped[str]
    email: Mapped[str_uniq]
    password: Mapped[str]
    avatar: Mapped[str]
    about: Mapped[str]
    balance: Mapped[float]
    is_private: Mapped[int]
    is_closed: Mapped[int]

    message: Mapped[list["Message"]] = relationship(back_populates="user")
    invite: Mapped[list["Invite"]] = relationship(back_populates="user")
    usergroups: Mapped[list["UserGroup"]] = relationship(back_populates="user")
    main_persons: Mapped[list["MainPerson"]] = relationship(back_populates="user")
    other_persons: Mapped[list["OtherPerson"]] = relationship(back_populates="user")
    user_log: Mapped[list["UserLog"]] = relationship(back_populates="user")
    trip_statistics: Mapped[list["TripStatistics"]] = relationship(back_populates="user")

    def __repr__(self):
        return f"{self.__class__.__name__}(id={self.id})"


class Group(Base):
    name: Mapped[str]
    about: Mapped[str]
    owner: Mapped[int]
    proxies: Mapped[str]
    is_private: Mapped[int]
    is_closed: Mapped[int]

    invite: Mapped[list["Invite"]] = relationship(back_populates="group")
    groupusers: Mapped[list["UserGroup"]] = relationship(back_populates="group")
    group_logs: Mapped[list["Log"]] = relationship(back_populates="group")

    def __repr__(self):
        return f"{self.__class__.__name__}(id={self.id})"


class Invite(Base):
    user_id: Mapped[int] = mapped_column(ForeignKey("User.id"), nullable=False)
    group_id: Mapped[int] = mapped_column(ForeignKey("Group.id"), nullable=False)
    checked: Mapped[int]
    message: Mapped[str]
    direction: Mapped[int]

    user: Mapped["User"] = relationship("User", back_populates="invite", lazy="joined")
    group: Mapped["Group"] = relationship("Group", back_populates="invite", lazy="joined")

    def __repr__(self):
        return f"{self.__class__.__name__}(id={self.id})"


class Message(Base):
    user_id: Mapped[int] = mapped_column(ForeignKey("User.id"), nullable=False)
    message: Mapped[str]
    checked: Mapped[int]

    user: Mapped["User"] = relationship("User", back_populates="message", lazy="joined")

    def __repr__(self):
        return f"{self.__class__.__name__}(id={self.id})"


class UserGroup(Base):
    user_id: Mapped[int] = mapped_column(ForeignKey("User.id"), nullable=False)
    group_id: Mapped[int] = mapped_column(ForeignKey("Group.id"), nullable=False)

    user: Mapped["User"] = relationship("User", back_populates="usergroups", lazy="joined")
    group: Mapped["Group"] = relationship("Group", back_populates="groupusers", lazy="joined")

    def __repr__(self):
        return f"{self.__class__.__name__}(id={self.id})"


class LendersDebters(Base):
    debter_id: Mapped[int] = mapped_column(ForeignKey("User.id"), nullable=False)
    lender_id: Mapped[int] = mapped_column(ForeignKey("User.id"), nullable=False)

    money: Mapped[float]
    reminded_at: Mapped[datetime] = mapped_column(TIMESTAMP, server_default=func.now())

    debter_ref: Mapped["User"] = relationship("User", foreign_keys=[debter_id])
    lender_ref: Mapped["User"] = relationship("User", foreign_keys=[lender_id])

    def __repr__(self):
        return f"{self.__class__.__name__}(id={self.id})"


class Trips(Base):
    name: Mapped[str]
    creator_id: Mapped[int]
    participants: Mapped[str]
    wasted_money: Mapped[float]
    amount_events: Mapped[int]
    group_id: Mapped[int]

    def __repr__(self):
        return f"{self.__class__.__name__}(id={self.id})"


class Log(Base):
    group_id: Mapped[int] = mapped_column(ForeignKey("Group.id"), nullable=False)

    message: Mapped[str]
    type: Mapped[int]

    group: Mapped["Group"] = relationship("Group", back_populates="group_logs", lazy="joined")

    def __repr__(self):
        return f"{self.__class__.__name__}(id={self.id})"


class Event(Base):
    trip_id: Mapped[int]

    name: Mapped[str]
    payment: Mapped[float]
    total_money: Mapped[float]

    def __repr__(self):
        return f"{self.__class__.__name__}(id={self.id})"


class MainPerson(Base):
    main_person_id: Mapped[int] = mapped_column(ForeignKey("User.id"), nullable=False)

    event_id: Mapped[int]
    paid: Mapped[float]
    is_participate: Mapped[int]

    user: Mapped["User"] = relationship("User", back_populates="main_persons", lazy="joined")

    def __repr__(self):
        return f"{self.__class__.__name__}(id={self.id})"


class OtherPerson(Base):
    other_person_id: Mapped[int] = mapped_column(ForeignKey("User.id"), nullable=False)

    event_id: Mapped[int]

    user: Mapped["User"] = relationship("User", back_populates="other_persons", lazy="joined")

    def __repr__(self):
        return f"{self.__class__.__name__}(id={self.id})"


class UserLog(Base):
    user_id: Mapped[int] = mapped_column(ForeignKey("User.id"), nullable=False)

    log_id: Mapped[int]

    user: Mapped["User"] = relationship("User", back_populates="user_log", lazy="joined")

    def __repr__(self):
        return f"{self.__class__.__name__}(id={self.id})"


class TripsLog(Base):
    message: Mapped[str]
    log_id: Mapped[int]
    link: Mapped[str]
    type: Mapped[str]

    def __repr__(self):
        return f"{self.__class__.__name__}(id={self.id})"


class TripStatistics(Base):
    user_id: Mapped[int] = mapped_column(ForeignKey("User.id"), nullable=False)

    trip_id: Mapped[int]
    borrowed_money: Mapped[float]
    lended_money: Mapped[float]
    lender: Mapped[int]
    debter: Mapped[int]
    participate: Mapped[int]
    result: Mapped[float]

    user: Mapped["User"] = relationship("User", back_populates="trip_statistics", lazy="joined")

    def __repr__(self):
        return f"{self.__class__.__name__}(id={self.id})"


class UserStatistics(Base):
    user_id: Mapped[int]

    total_borrowed: Mapped[float]
    total_lent: Mapped[float]
    groups_created: Mapped[int]

    def __repr__(self):
        return f"{self.__class__.__name__}(id={self.id})"


class Payments(Base):
    money: Mapped[float]

    from_user: Mapped[int]
    to_user: Mapped[int]
    debt_id: Mapped[int]
    checked_to: Mapped[int]
    checked_from: Mapped[int]
    card_id_to: Mapped[int]
    card_id_from: Mapped[int]

    def __repr__(self):
        return f"{self.__class__.__name__}(id={self.id})"


class Cards(Base):
    user_id: Mapped[int]
    bank_logo: Mapped[str]
    payment_logo: Mapped[str]
    card_color: Mapped[str]
    text_color: Mapped[str]
    card_type: Mapped[str]
    name: Mapped[str]
    surname: Mapped[str]
    number: Mapped[str]
    cvv: Mapped[int]
    date: Mapped[str]
    bank: Mapped[str]
    country: Mapped[str]

    def __repr__(self):
        return f"{self.__class__.__name__}(id={self.id})"
