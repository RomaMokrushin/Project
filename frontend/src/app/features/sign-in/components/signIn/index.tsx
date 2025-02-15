"use client";

import { useRouter } from "next/navigation";
import {
  FormContainer,
  Form,
  H1,
  Input,
  Button,
} from "../../styles/signPage.styles";
import { handleSignIn } from "../../../../../core/actions/sign-in";

export default function SignInContainer() {
  const router = useRouter();
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const user = {
      email: (formData.get("email") as string) || "",
      password: (formData.get("password") as string) || "",
    };

    const res = await handleSignIn(user);
    if (res.error) {
      console.log(res.error);
      return;
    }
    router.push("/");
  };

  return (
    <FormContainer className="sign-in-container">
      <Form onSubmit={handleSubmit}>
        <H1>Войти</H1>
        <Input type="email" name="email" placeholder="Электронная почта" />
        <Input type="password" name="password" placeholder="Пароль" />
        <Button>Sign In</Button>
      </Form>
    </FormContainer>
  );
}
