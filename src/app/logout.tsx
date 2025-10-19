"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import React from "react";

type Props = {};

const Logout = (props: Props) => {
  return (
    <div>
      <Button onClick={() => authClient.signOut()}>Logout</Button>
    </div>
  );
};

export default Logout;
