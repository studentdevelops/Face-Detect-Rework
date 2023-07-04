"use client";

import Link from "next/link"
import { useRouter } from 'next/navigation'

import styles from "./signup.module.css";

import { motion } from "framer-motion";
import { validateEmail, validatePassword } from "@/utils/validators";
import { toast } from "react-toastify";
import { useUserContext } from "../context/contextStore";


export default function SignUp() {
  const router = useRouter()
  const { user, setUser } = useUserContext()

  const SignUpSubmit = async (e) => {
    e.preventDefault();
    const SignupForm = document.forms.namedItem("SignUpForm");
    const data = new FormData(SignupForm);
    const name = data.get("name")
    const email = data.get("email");
    const password = data.get("password");
    const confirmPassword = data.get("confirmPassword")
    if (validateEmail(email)) {
      if (password == confirmPassword) {
        const response = await toast.promise(
          fetch("/api/signup", {
            method: "POST",
            body: JSON.stringify({
              name,
              email,
              password
            })
          }),
          {
            pending: 'Loading',
            error: 'Error! Try Again! 🤯'
          }
        );
        const result = await response.json();
        if (result?.userId) {
          const date = new Date();
          date.setDate(date.getDate() + 7)
          toast.success("Welcome 👌", { position: toast.POSITION.TOP_RIGHT })
          setUser(name)
          router.push("/")
        } else {
          toast.error("Try again or Try again with a different Email", { position: toast.POSITION.TOP_RIGHT })
        }
      } else {
        toast.warn("Password do no match", {
          position: toast.POSITION.TOP_RIGHT
        })
      }
    } else {
      toast.warn("Please enter a valid Email", {
        position: toast.POSITION.TOP_RIGHT
      })

    }
  }


  return (
    <>
      <main className={styles.SignUpMain}>
        <div>
          <form method="POST" name="SignUpForm" onSubmit={SignUpSubmit} className={styles.SignUpForm}>
            <input type="texts" placeholder="Full name" name="name" />
            <input type="texts" placeholder="Email" name="email" />
            <input type="password" placeholder="Password" name="password" />
            <input type="password" placeholder="Confirm Password" name="confirmPassword" />
            <p>Not so new here? <Link href={"/login"}>Click Here!</Link></p>
            <motion.button
              type="submit"
              whileTap={{ scale: 0.9, transition: { duration: 0.1, ease: "easeInOut" } }}
              whileHover={{ scale: 1.1, transition: { duration: 0.2, ease: "easeInOut" } }}
              className={styles.SignUpButton}>Register</motion.button>
          </form>
        </div>
      </main>
    </>
  )
}
