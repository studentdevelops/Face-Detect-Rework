// import { useEffect } from 'react'
import NavBar from './components/Navigation/nav'
import ParticleArea from './components/Particles/particle'
import './globals.css'
import { UserContextProvider } from './context/contextStore'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';


export const metadata = {
  title: 'Face Detector',
  description: 'Upload to Detect Faces on any picture',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className='main'>
        <UserContextProvider>
          <ParticleArea />
          <NavBar />
          {children}
        </UserContextProvider>
        <ToastContainer />
      </body>
    </html>
  )
}
