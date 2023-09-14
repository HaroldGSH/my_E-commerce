import { useContext } from 'react'
import { useRoutes, BrowserRouter, Navigate } from 'react-router-dom'
import { ShoppingCartContext, ShoppingCartProvider, initializeLocalStorage } from '../../Context'
import { Home } from '../Home'
import { MyAccount } from '../MyAccount'
import { MyOrder } from '../MyOrder'
import { MyOrders } from '../MyOrders'
import { NotFound } from '../NotFound'
import { SignIn } from '../SignIn'
import { NavBar } from '../../Components/NavBar'
import { CheckoutSideMenu } from '../../Components/CheckoutSideMenu'
import './App.css'

const AppRoutes = () => {
  const context = useContext(ShoppingCartContext)
  const account = localStorage.getItem('account')
  const parsedAccount = JSON.parse(account)

  const signOut = localStorage.getItem('sign-out')
  const parsedSignOut = JSON.parse(signOut)

  const noAccountInLocalStorage = parsedAccount?Object.keys(parsedAccount).length===0: true
  const noAccountInLocalState = context.account?Object.keys(context.account).length===0: true
  const hasUserAnAccount = !noAccountInLocalState || !noAccountInLocalState

  const isUserSignOut = context.signOut || parsedSignOut

  let routes = useRoutes([
    {path: '/', element: hasUserAnAccount && !isUserSignOut ? <Home/>: <Navigate replace to={'/sign-in'} />},
    { path: "/men's clothing", element:hasUserAnAccount && !isUserSignOut ? <Home />: <Navigate replace to={'/sign-in'} /> },
    { path: '/electronics', element: hasUserAnAccount && !isUserSignOut ?<Home />: <Navigate replace to={'/sign-in'} /> },
    { path: '/jewelery', element: hasUserAnAccount && !isUserSignOut ?<Home />: <Navigate replace to={'/sign-in'} /> },
    { path: "/women's clothing", element:hasUserAnAccount && !isUserSignOut ? <Home />: <Navigate replace to={'/sign-in'} /> },
    { path: '/others', element:hasUserAnAccount && !isUserSignOut ? <Home />: <Navigate replace to={'/sign-in'} /> },
    {path: '/my-account', element: <MyAccount/>},
    {path: '/my-order', element: <MyOrder/>},
    {path: '/my-orders', element: <MyOrders/>},
    {path: '/my-orders/last', element: <MyOrder/>},
    {path: '/my-orders/:id', element: <MyOrder /> },
    {path: '/not-found', element: <NotFound/>},
    {path: '/*', element: <SignIn/>}
  ])

 return routes
}
const App = ()=> {
  initializeLocalStorage()
   return (
    <ShoppingCartProvider>
      <BrowserRouter>
       <AppRoutes/>
       <NavBar/>
       <CheckoutSideMenu />
      </BrowserRouter>
    </ShoppingCartProvider>  
  )
}

export default App
