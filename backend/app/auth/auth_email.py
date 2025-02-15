import smtplib
from app.config import settings
from email.mime.text import MIMEText
from email.header import Header
from app.constants import last_paid, smtp_address, smtp_port


async def send_email(message, recipient):
    sender = settings.EMAIL
    password = settings.EMAIL_TOKEN

    msg = MIMEText(
        f"Ваш код регистрации: <b><mark>{message}</mark></b>.<br /><br />Если вы "
        f"не регистрировались просто проигнорируйте это письмо.<br /><br />"
        f"\n\n<b>Message has been sent from FinanceFlow</b>",
        "html", "utf-8")
    msg["Subject"] = Header("Регистрация в FinanceFlow", "utf-8")
    msg["From"] = settings.EMAIL
    msg["To"] = recipient

    server = smtplib.SMTP(smtp_address, smtp_port)
    server.starttls()

    try:
        server.login(sender, password)
        server.sendmail(msg["From"], recipient,
                        msg.as_string())

        return "Message sent successfully!"
    except Exception as er:
        return f"{er}\n Error"


async def send_transaction_info(message, recipient):
    sender = settings.EMAIL
    password = settings.EMAIL_TOKEN

    msg = MIMEText(f"Вы только что перевели  <mark>{message['money']} RUB</mark>"
                   f" пользователю {message['first_name']} {message['last_name']} в пользу долга.<br />Перевод был совершен <mark>{message['card']}</mark><br />За"
                   f" более подробной информацией перейдите по ссылке: <a href='{message['link']}'>{message['link']}"
                   f"</a>.<br /><br /><b>Message has been"
                   f" sent from FinanceFlow</b>",
                   "html", "utf-8")
    msg["Subject"] = Header("Транзакция в FinanceFlow", "utf-8")
    msg["From"] = settings.EMAIL
    msg["To"] = recipient

    server = smtplib.SMTP(smtp_address, smtp_port)
    server.starttls()

    try:
        server.login(sender, password)
        server.sendmail(msg["From"], recipient,
                        msg.as_string())

        return "Message sent successfully!"
    except Exception as er:
        return f"{er}\n Error"


async def send_remind(message, recipient):
    sender = settings.EMAIL
    password = settings.EMAIL_TOKEN

    msg = MIMEText(
        f"<h4>{message['from']} напоминает вам о долге!</h5><br />"
        f"{f'Последний раз долг был выплачен:  <mark>{message[last_paid]}</mark>' if message[last_paid] else 'Вы еще ни разу не перевели деньги в счет вашего долга!'}."
        f" <br />С момента появления долга прошло уже  <mark>{message['days']}</mark> полных дней.<br />Текущая задолженность"
        f": <mark>{message['money']} ₽</mark><br /><br />Настоятельная просьба"
        f" выплатить пользователю  <mark>{message['from']}</mark> всю сумму долга!"
        f"<br /><br /><b>Message has been sent from FinanceFlow</b>",
        "html", "utf-8")
    msg["Subject"] = Header("Задолженность пользователю в FinanceFlow", "utf-8")
    msg["From"] = settings.EMAIL
    msg["To"] = recipient

    server = smtplib.SMTP(smtp_address, smtp_port)
    server.starttls()

    try:
        server.login(sender, password)
        server.sendmail(msg["From"], recipient,
                        msg.as_string())

        return "Message sent successfully!"
    except Exception as er:
        return f"{er}\n Error"
