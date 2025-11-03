import { LoginForm } from "@/features/auth/components/login-form";
import { requireUnauth } from "@/lib/auth-utils";
import React from "react";

type Props = {};

const Page = async (props: Props) => {
  await requireUnauth();
  return <LoginForm />;
};

export default Page;
