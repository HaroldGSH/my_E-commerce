import { useRoutes, BrowserRouter } from 'react-router-dom'
import { ShoppingCartProvider } from '../../Context'
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
  let routes = useRoutes([
    {path: '/', element: <Home/>},
    { path: "/men's clothing", element: <Home /> },
    { path: '/electronics', element: <Home /> },
    { path: '/jewelery', element: <Home /> },
    { path: "women's clothing", element: <Home /> },
    { path: '/others', element: <Home /> },
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
