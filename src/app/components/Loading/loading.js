import { motion } from "framer-motion";
import styles from "./loading.module.css"

export default function Loading() {
    const sideVariants = {
        initial: {
            opacity: 0,
            transition: {
                staggerChildren: 0.7,
                staggerDirection: -1
            }
        },
        animate: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                staggerDirection: 1
            }
        }
    };

    const itemVariants = {
        animate: {
            opacity: 1,
            y: [10, -10, 10],
            transition: { repeat: Infinity }
        }
    };


    return (
        <motion.div
            variants={sideVariants}
            initial="initial"
            animate="animate"
            className={styles.LoaderMain}>
            <motion.div
                variants={itemVariants}
                className={styles.LoadingDot}></motion.div>
            <motion.div
                variants={itemVariants}
                className={styles.LoadingDot}></motion.div>
            <motion.div
                variants={itemVariants}
                className={styles.LoadingDot}></motion.div>
            {/* <motion.div animate={{
                y: [20, -20, 20],
                // x: [0, 20, 0, -20, 0],
                transition: { repeat: Infinity, duration: 1 }
            }}
                className={styles.LoadingDot}></motion.div>
            <motion.div animate={{
                y: [20, -20, 20],
                // x: [0, 20, 0, -20, 0],
                transition: { repeat: Infinity, duration: 1 }
            }} className={styles.LoadingDot}></motion.div>
            <motion.div animate={{
                y: [20, -20, 20],
                // x: [0, 20, 0, -20, 0],
                transition: { repeat: Infinity, duration: 1 }
            }} className={styles.LoadingDot}></motion.div> */}
        </motion.div>
    )
}