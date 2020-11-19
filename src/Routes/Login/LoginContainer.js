import React, { useState } from "react";
import LoginPresenter from "./LoginPresenter";
import useInput from "../../Hooks/useInput";
import { useMutation } from "react-apollo-hooks";
import { LOCAL_LOG_IN } from "./LoginQueries";
import { toast } from "react-toastify";
import { signIn, signInConfirm } from "../../Components/auth";

export default () => {
  const secret = useInput("");
  const id = useInput("");

  const [localLogInMutation] = useMutation(LOCAL_LOG_IN);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (id.value !== "" && secret.value !== "") {
      const requestSecret = signIn({ id: id.value });
      if (!requestSecret) {
        toast.error("You dont access this admin page.");
      } else {
        const token = await signInConfirm({
          id: id.value,
          secret: secret.value,
        });
        if (token !== "" && token !== undefined) {
          await localLogInMutation({ variables: { token } });
        } else {
          toast.error("You have wrong token");
        }
      }
    } else {
      toast.error("You dont access this admin page.");
    }
  };

  return <LoginPresenter id={id} secret={secret} onSubmit={onSubmit} />;
};
