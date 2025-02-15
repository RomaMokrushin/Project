"use client";

import { handleSignUp } from "@/core/actions/sign-up";
import {
  Button,
  Form,
  FormContainer,
  H1,
  Input,
} from "../../styles/signPage.styles";
import { useRouter } from "next/navigation";

export default function SignUpContainer() {
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const user = {
      name: (formData.get("name") as string) || "",
      surname: (formData.get("surname") as string) || "",
      phone: (formData.get("phone") as string) || "",
      email: (formData.get("email") as string) || "",
      password: (formData.get("password") as string) || "",
      confirmPassword: (formData.get("confirmPassword") as string) || "",
    };
    if (user.password !== user.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    const res = await handleSignUp(user);
    if (res.error) {
      console.log(res.error);
      return;
    }
    router.push("/");
  }

  return (
    <FormContainer className="sign-up-container">
      <Form onSubmit={handleSubmit}>
        <H1>Создать Аккаунт</H1>
        <Input type="text" name="name" placeholder="Имя" required />
        <Input type="text" name="surname" placeholder="Фамилия" required />
        <Input type="tel" name="phone" placeholder="Номер телефона" required />
        <Input
          type="email"
          name="email"
          placeholder="Электронная почта"
          required
        />
        <Input type="password" name="password" placeholder="Пароль" required />
        <Input
          type="password"
          name="confirmPassword"
          placeholder="Подтвердите пароль"
          required
        />
        <Button>Sign Up</Button>
      </Form>
    </FormContainer>
  );
}
