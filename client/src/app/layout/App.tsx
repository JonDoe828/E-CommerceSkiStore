import { Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/ReactToastify.css';
import { fetchCurrentUser } from "../../features/account/accountSlice";
import { fetchBasketAsync } from "../../features/basket/basketSlice";
import { Header } from "./header";
import LoadingComponent from "./LoadingComponent";


function App() {
  // const { setBasket } = useStoreContext()

  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)

  const initApp = useCallback(async () => {
    try {
      await (dispatch as any)(fetchCurrentUser());
      await (dispatch as any)(fetchBasketAsync());
    } catch (error: any) {
      console.log(error)
    }
  }, [dispatch])

  useEffect(() => {
    // const buyerId = getCookie('buyerId')
    // // dispatch(fetchCurrentUser())
    // void (dispatch as any)(fetchCurrentUser());
    // if (buyerId) {
    //   agent.Basket.get()
    //     .then(basket => dispatch(setBasket(basket)))
    //     .catch(error => console.log(error))
    //     .finally(() => setLoading(false))
    // } else {
    //   setLoading(false)
    // }
    initApp().then(() => setLoading(false))
  }, [initApp])




  const [darkMode, setDarkMode] = useState(false);
  const paletteType = darkMode ? 'dark' : 'light'
  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: paletteType === 'light' ? '#eaeaea' : '#121212'
      }
    }
  })



  function handleThemeChange() {
    setDarkMode(!darkMode)
  }


  if (loading) return <LoadingComponent message="Initialising app..." />

  return (
    <>
      <ThemeProvider theme={theme}>
        <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
        <CssBaseline />
        <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />
        <Container>
          <Outlet />
        </Container>
      </ThemeProvider>
    </>
  )
}

export default App


