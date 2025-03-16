import { Navigate, Route, Routes } from "react-router-dom"
import { MarvelPage, DcPage, HeroesRoutes } from "../heroes"
import { LoginPage } from "../auth"
import { Navbar } from "../ui/components"
import { PrivateRoute } from "./PrivateRoute"
import { PublicRoute } from "./PublicRoute"



export const AppRouter = () => {
  return (
    <>

      {/* <Navbar /> */}

      <Routes>
        {/* <Route path="marvel" element={<MarvelPage />} />
        <Route path="dc" element={<DcPage />} />
        <Route path="login" element={<LoginPage />} /> */}

        {/* <Route path="/login" element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        } /> */}

        <Route path="login/*" element={
          <PublicRoute>
            {/* <LoginPage /> */}
            <Routes>
              <Route path="/*" element={<LoginPage />} />
            </Routes>
          </PublicRoute>
        } />


        <Route path="/*" element={
          <PrivateRoute>
            <HeroesRoutes />
          </PrivateRoute>
        } />


        {/* <Route path="/*" element={<HeroesRoutes />} /> */}
        {/* <Route path="/" element={<Navigate to="/marvel" />} /> */}


      </Routes>
    </>
  )
}

