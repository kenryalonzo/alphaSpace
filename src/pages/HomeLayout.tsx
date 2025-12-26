import { Outlet } from "react-router-dom"
import { Footer, Header, Navbar } from "../components"

const HomeLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Navbar />
      <main className="flex-grow pt-[140px]">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default HomeLayout
