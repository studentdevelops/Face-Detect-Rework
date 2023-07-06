"use client"
import { useEffect, useState } from 'react'
import styles from './page.module.css'
import { useUserContext } from './context/contextStore'
import { FaUpload, FaWindowClose } from "react-icons/fa"
import { motion } from "framer-motion";
import StyledImage from "@/app/components/Image/StyledImage"
import Loading from './components/Loading/loading'
import { toast } from 'react-toastify'

// export const metadata = {
//   title: 'Face Detector',
//   description: 'Upload to Detect Faces on any picture',
// }

export default function Home() {
  const [image, SetImage] = useState();
  const { user, setUser, count, setCount } = useUserContext()
  const [box, setBox] = useState()
  const [loading, setLoading] = useState(true);

  const clear = (e) => {
    const textBox = document.querySelector("#url");
    textBox.value = "";
    SetImage()
    setBox()
  }

  const fetchImage = (e) => {
    const imgUrl = e.target.value;
    SetImage(imgUrl);
    setUploaded(false)
  }

  const detect = async (e) => {
    const response = await toast.promise(
      fetch("/api/predict", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          image: image,
        })
      }),
      {
        pending: 'Detecting Face',
        error: 'Error! Try Again! 🤯'
      }
    );
    const result = await response.json()
    setBox(result.response)
    setCount(count + 1);
    toast.success("Detected 👌", { position: toast.POSITION.TOP_RIGHT })
  }

  const onUploadClick = async (e) => {
    const image = e.target.files[0];
    const reader = new FileReader();

    const ImageData = await new Promise((resolve, reject) => {
      reader.addEventListener("load", () => {
        resolve(reader.result);
      });
      reader.readAsDataURL(image);
    }, false);


    const response = await toast.promise(
      fetch("/api/upload", {
        method: "POST",
        body: JSON.stringify({
          image: ImageData,
        })
      }),
      {
        pending: 'Uploading Face',
        error: 'Error! Try Again! 🤯'
      }
    );

    const result = await response.json();
    toast.success("Uploaded 👌", { position: toast.POSITION.TOP_RIGHT })
    SetImage(result.url)
  }
  const fetchDetails = async () => {
    const response = await fetch("/api/fetchdetails");
    const result = await response.json()
    setUser(result.name);
    setCount(result.count);
    setLoading(false);
  }
  useEffect(() => {
    setLoading(true);
    fetchDetails()
  }, [])

  if (loading) {
    return <Loading />
  }


  return (
    <main className={styles.main}>
      <div>
        <h2 className={styles.titleHeader}>Hey there {user}</h2>
        <h4 className={styles.subTitle}> You have detected {count} faces till now</h4>
        <div className={styles.formMain}>
          <div className={styles.searchBoxWrapper}>
            <input className={styles.inputField} type='text' id="url" onChange={fetchImage} />
            <input onChange={onUploadClick} type='file' id={"imgUpload"} className={styles.uploadInput} />
            <motion.label
              whileHover={{
                scale: 1.1,
                transition: { delay: 0.1, ease: "easeInOut" }
              }}
              whileTap={{
                scale: 0.9,
                transition: { delay: 0.1, ease: "easeInOut" }
              }}
              className={styles.uploadButton} htmlFor='imgUpload'><FaUpload /></motion.label>
          </div>
          <div className={styles.buttons}>
            <button onClick={detect} className={styles.button}>Detect</button>
            <button onClick={clear} className={styles.button}>Clear</button>
          </div>
          <div className={styles.ImageContainer}>
            {image && (<StyledImage image={image} box={box} />)}

          </div>
        </div>
      </div>
    </main >
  )
}
