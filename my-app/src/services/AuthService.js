/* eslint-disable import/no-anonymous-default-export */
import { useRouter, useState } from "react";
import api from "../utils/api";

export default {
  authlogin: async function () {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    let [email, setEmail] = useState("");
    // eslint-disable-next-line react-hooks/rules-of-hooks
    let [password, setPassword] = useState("");
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const router = useRouter();
    try {
      await api.post("/api/v1/users/login", { email, password });

      router.push("/");
    } catch (e) {
      setPassword("");
      console.log(e);
    }
  },
};
