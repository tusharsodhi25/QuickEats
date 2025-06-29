
import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItem, setCartItem] = useState({});
    const [food_list, setfoodlist] = useState([]);
    const [token, settoken] = useState("");

    const url = "http://localhost:4000";

    // Add to Cart Function
    const addToCart = async (itemId) => {
        if (!cartItem[itemId]) {
            setCartItem((prev) => ({ ...prev, [itemId]: 1 }));
        } else {
            setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        }

        if (token) {
            try {
                await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } });
            } catch (error) {
                console.error("Error adding to cart:", error);
            }
        }
    };

    // Remove from Cart Function
    const removeFromCart = async (itemId) => {
        if (cartItem[itemId] > 1) {
            setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
        } else {
            const { [itemId]: _, ...rest } = cartItem; // Remove item when quantity reaches 0
            setCartItem(rest);
        }

        if (token) {
            try {
                await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } });
            } catch (error) {
                console.error("Error removing from cart:", error);
            }
        }
    };

    // Get Total Cart Amount Function
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItem) {
            if (cartItem[item] > 0) {
                const itemInfo = food_list.find((product) => product._id === item);

                if (itemInfo) {
                    totalAmount += itemInfo.price * cartItem[item];
                } else {
                    console.warn(`Product with ID ${item} not found in food_list`);
                }
            }
        }
        return totalAmount;
    };

    // Fetch Food List Function
    const fetchfoodlist = async () => {
        try {
            const response = await axios.get(url + "/api/food/list");
            console.log("Fetched food list:", response.data);
            setfoodlist(response.data.data || []); // Ensure a default empty array
        } catch (error) {
            console.error("Error fetching food list:", error);
        }
    };

    // Load Cart Data Function
    const loadCartData = async (token) => {
        try {
            const response = await axios.post(url + "/api/cart/get", {}, { headers: { token } });
            setCartItem(response.data.cartData || {}); // Ensure a default empty object
        } catch (error) {
            console.error("Error loading cart data:", error);
        }
    };

    // Effect to Load Data on Component Mount
    useEffect(() => {
        async function loadData() {
            await fetchfoodlist();
            const storedToken = localStorage.getItem("token");
            if (storedToken) {
                settoken(storedToken);
                await loadCartData(storedToken);
            }
        }
        loadData();
    }, []);

    // Context Value
    const contextValue = {
        food_list,
        cartItem,
        setCartItem,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        settoken,
    };

    return <StoreContext.Provider value={contextValue}>{props.children}</StoreContext.Provider>;
};

export default StoreContextProvider;


