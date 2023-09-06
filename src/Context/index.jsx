import { createContext, useState, useEffect } from 'react';

export const ShoppingCartContext= createContext()
export const ShoppingCartProvider = ({children})=>{
    const [count, setCount]= useState(0)//shopping cart: increment quantity
    const [isProductDetailOpen, setIsProductDetailOpen]= useState(false)//product detail: open/close
    const openProductDetail= ()=>setIsProductDetailOpen(true)//product detail: show product
    const closeProductDetail= ()=>setIsProductDetailOpen(false)

     // Checkout Side Menu · Open/Close
    const [isCheckoutSideMenuOpen, setIsCheckoutSideMenuOpen] = useState(false)
    const openCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(true)
    const closeCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(false)

    const [productToShow, setProductToShow] = useState({})
    // Shopping Cart · Add products to cart
    const [cartProducts, setCartProducts] = useState([])

    const [order, setOrder] = useState([])

    //Get produts
    const [items, setItems]= useState(null)

    const [filteredItems, setFilteredItems] = useState(null)

    // Get products by title
    const [searchByTitle, setSearchByTitle] = useState(null)
    console.log('searchByTitle: ', searchByTitle)

     // Get products by category
    const [searchByCategory, setSearchByCategory] = useState(null)

    const filteredItemsByCategory = (items, searchByCategory) => {
      return items?.filter(item => item.category.toLowerCase().includes(searchByCategory.toLowerCase()))
    }
  
    const filterBy = (searchType, items, searchByTitle, searchByCategory) => {
      if (searchType === 'BY_TITLE') {
        return filteredItemsByTitle(items, searchByTitle)
      }
  
      if (searchType === 'BY_CATEGORY') {
        return filteredItemsByCategory(items, searchByCategory)
      }
  
      if (searchType === 'BY_TITLE_AND_CATEGORY') {
        return filteredItemsByCategory(items, searchByCategory).filter(item => item.title.toLowerCase().includes(searchByTitle.toLowerCase()))
      }
  
      if (!searchType) {
        return items
      }
    }

     useEffect(()=> {
       fetch('https://fakestoreapi.com/products')
        .then(response=> response.json())
        .then(data=> setItems(data))
      },[])

      const filteredItemsByTitle = (items, searchByTitle) => {
        return items?.filter(item => item.title.toLowerCase().includes(searchByTitle.toLowerCase()))
      }
    
      useEffect(() => {
        if (searchByTitle && searchByCategory) setFilteredItems(filterBy('BY_TITLE_AND_CATEGORY', items, searchByTitle, searchByCategory))
        if (searchByTitle && !searchByCategory) setFilteredItems(filterBy('BY_TITLE', items, searchByTitle, searchByCategory))
        if (!searchByTitle && searchByCategory) setFilteredItems(filterBy('BY_CATEGORY', items, searchByTitle, searchByCategory))
        if (!searchByTitle && !searchByCategory) setFilteredItems(filterBy(null, items, searchByTitle, searchByCategory))
      }, [items, searchByTitle, searchByCategory])

    return (
        <ShoppingCartContext.Provider value={{ 
         count, 
         setCount,
         openProductDetail,
         closeProductDetail,
         isProductDetailOpen, 
         productToShow,
         setProductToShow,
         cartProducts,
         setCartProducts,
         isCheckoutSideMenuOpen,
         openCheckoutSideMenu,
         closeCheckoutSideMenu,
         order,
         setOrder,
         items,
         setItems,
         searchByTitle,
         setSearchByTitle,
         filteredItems,
         searchByCategory,
         setSearchByCategory
         
         }}>
         {children}
        </ShoppingCartContext.Provider>
    )
    
}
