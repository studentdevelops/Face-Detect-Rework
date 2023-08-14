"use client"
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import styles from './page.module.css'
import { useUserContext } from './context/contextStore'
import { FaUpload } from "react-icons/fa"
import { motion } from "framer-motion";
import StyledImage from "@/app/components/Image/StyledImage"
import Loading from './components/Loading/loading'
import { toast } from 'react-toastify'
import { AuthGuard } from '@/utils/AuthGuard'

// export const metadata = {
//   title: 'Face Detector',
//   description: 'Upload to Detect Faces on any picture',
// }

export function getServerSideProps(context) {
  return AuthGuard(context.req);
}

export default function Home() {
  const [image, SetImage] = useState();
  const { user, setUser, count, setCount } = useUserContext()
  const [box, setBox] = useState()
  const [loading, setLoading] = useState(true);
  const [celebName, setCelebName] = useState()

  const router = useRouter();

  const clear = (e) => {
    const textBox = document.querySelector("#url");
    textBox.value = "";
    SetImage()
    setBox()
    setCelebName();
  }

  const fetchImage = (e) => {
    const imgUrl = e.target.value;
    SetImage(imgUrl);
  }

  const detectFace = async (e) => {
    setCelebName();
    const response = await toast.promise(
      fetch("/api/detectface", {
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

  const detectCeleb = async () => {
    const response = await toast.promise(
      fetch("/api/detectceleb", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          image: image,
        })
      }),
      {
        pending: 'Finding Celebrity',
        error: 'Error! Try Again! 🤯'
      }
    );
    const result = await response.json();
    setBox(result.response);
    if (result?.response) {
      setCount(count + 1);
      setCelebName(result?.response[0]?.data?.concepts[0]?.name)
      toast.success("Celebs Found 👌", { position: toast.POSITION.TOP_RIGHT })
    }

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
    if (result?.status) {
      router.push("/login")
    }
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
        <h4 className={styles.subTitle}> You have used this app {count} times</h4>
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
            <button onClick={detectFace} className={styles.button}>Find a Face</button>
            <button onClick={detectCeleb} className={styles.button}>Find Celebrity</button>
            <button onClick={clear} className={styles.button}>Clear</button>
          </div>
          <div className={styles.ImageContainer}>
            {image && (<StyledImage image={image} box={box} />)}
            {celebName && (<p className={styles.celebName}>{celebName}</p>)}
          </div>
        </div>
      </div>
    </main >
  )
}
