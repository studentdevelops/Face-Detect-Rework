"use client"

import Link from "next/link"
import { useRouter } from 'next/navigation'

import { motion } from "framer-motion";

import { toast } from 'react-toastify';

import styles from "./login.module.css"
import { validateEmail } from "@/utils/validators";
import { useUserContext } from "../context/contextStore";


export default function Login() {
  const router = useRouter();
  const { user, setUser, count, setCount } = useUserContext()

  const onSuccessfulLogin = async () => {
    const response = await fetch("/api/fetchdetails")
    const result = await response.json()
    setUser(result.name);
    setCount(result.count);
  }

  const LoginSubmit = async (e) => {
    e.preventDefault();

    const LoginForm = document.forms.namedItem("LoginForm");
    const data = new FormData(LoginForm);
    const email = data.get("email");
    const password = data.get("password");
    if (validateEmail(email)) {
      const response = await toast.promise(
        fetch("/api/login", {
          method: "POST",
          body: JSON.stringify({ email, password })
        }),
        {
          pending: 'Loading',
          error: 'Error! Try Again! 🤯'
        }
      );
      const result = await response.json();
      if (result?.userId) {
        toast.success("Welcome 👌", { position: toast.POSITION.TOP_RIGHT });
        onSuccessfulLogin();
        router.push("/")
      } else {
        toast.warn("Invalid email or password", { position: toast.POSITION.TOP_RIGHT });
      }
    }
  }

  return (
    <main className={styles.LoginMain}>
      <div>

        <form method="POST" name="LoginForm" onSubmit={LoginSubmit} className={styles.LoginForm}>
          <input type="texts" placeholder="Email" name="email" />
          <input type="password" placeholder="Password" name="password" />
          <p>New here? <Link href={"/signup"}>Click Here!</Link></p>
          <motion.button
            whileTap={{ scale: 0.9, transition: { duration: 0.1, ease: "easeInOut" } }}
            whileHover={{ scale: 1.1, transition: { duration: 0.2, ease: "easeInOut" } }}
            className={styles.LoginButton}>Login</motion.button>
        </form>
      </div>
    </main>
  )
}
