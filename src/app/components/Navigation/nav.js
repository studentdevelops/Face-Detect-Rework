"use client";
import classNames from "classnames";
import styles from "./nav.module.css";
import { motion } from "framer-motion";
import { FaRobot } from "react-icons/fa";
import Link from "next/link";
import { useUserContext } from "@/app/context/contextStore";
import { useRouter } from "next/navigation";

export default function NavBar() {
    const { user, setUser, setCount } = useUserContext();
    const router = useRouter()
    const logout = async () => {
        const response = await fetch("/api/logout")
        router.push("/login")
        setUser()
        setCount()
    }
    return (
        <nav className={styles.NavMain}>
            <ul className={styles.NavBar}>
                <motion.li
                    whileHover={{
                        scale: 1.1,
                        color: "rgb(255,255,255)",
                        transition: { duration: 0.2 },
                    }}
                    className={styles.NavItem}
                >
                    <Link href={"/"}> <FaRobot size={32} /></Link>
                </motion.li>
                {!user ? <motion.li
                    whileHover={{
                        scale: 1.1,
                        color: "rgb(255,255,255)",
                        transition: { duration: 0.2 },
                    }}
                    className={classNames(styles.NavItem, styles.push)}
                >
                    <Link href={"/login"}>Login</Link>
                </motion.li> : <li

                    className={classNames(styles.NavItem, styles.push)}
                >
                    <div className={styles.dropdown}>
                        <motion.p whileHover={{
                            scale: 1.1,
                            color: "rgb(255,255,255)",
                            transition: { duration: 0.2 },
                        }}>{user}</motion.p>
                        <motion.div whileHover={{
                            scale: 1.1,
                            color: "rgb(255,255,255)",
                            transition: { duration: 0.2 },
                        }} className={styles.dropdownContent}
                            onClick={logout}
                        >
                            Logout
                        </motion.div>
                    </div>
                </li>}
            </ul>
        </nav>
    );
}
