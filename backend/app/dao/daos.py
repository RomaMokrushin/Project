from app.dao.base import BaseDAO
from app.data.models import User, UserGroup, LendersDebters, Group, Message, Invite, Trips, Log, Event, MainPerson, \
    OtherPerson, TripsLog, UserLog, TripStatistics, UserStatistics, Payments, Cards


class UsersDAO(BaseDAO):
    model = User


class UserGroupDAO(BaseDAO):
    model = UserGroup


class LendersDebtersDAO(BaseDAO):
    model = LendersDebters


class GroupDAO(BaseDAO):
    model = Group


class MessageDAO(BaseDAO):
    model = Message


class InviteDAO(BaseDAO):
    model = Invite


class TripsDAO(BaseDAO):
    model = Trips


class LogDAO(BaseDAO):
    model = Log


class EventDAO(BaseDAO):
    model = Event


class MainPersonDAO(BaseDAO):
    model = MainPerson


class OtherPersonDAO(BaseDAO):
    model = OtherPerson


class TripsLogDAO(BaseDAO):
    model = TripsLog


class UserLogDAO(BaseDAO):
    model = UserLog


class TripStatisticsDAO(BaseDAO):
    model = TripStatistics


class UserStatisticsDAO(BaseDAO):
    model = UserStatistics


class PaymentsDAO(BaseDAO):
    model = Payments


class CardsDAO(BaseDAO):
    model = Cards
