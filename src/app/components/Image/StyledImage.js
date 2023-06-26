"use client"
import styles from "./StyledImage.module.css"
import Image from "next/image";
import drawBoxes from "./boundingBox";

export default function StyledImage({ image, box }) {
    return (
        <div className={styles.ImageWrapper}>
            {/* <Image id="img" src={image} width={"800"} height={"400"} className={styles.ImageFetched} alt="Face Fetching User input Image via URL provided" /> */}
            <Image id="img" src={image} style={{objectFit: "contain"}} fill={true} className={styles.ImageFetched} alt="Face Fetching User input Image via URL provided" />
            {drawBoxes(box)}
        </div>
    );
};

