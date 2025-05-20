import { useEffect } from "react"
import { useRef } from "react";
import { useContext } from "react";
import { useState } from "react"
import useFetch from "../hooks/useFetch.js"
import { fetchMeals } from "../http.js";
import { CartContext } from "../store/cart-context.jsx";


export default function Products() {

    const { isFetching, error, fetchedData, setFetchData } = useFetch(fetchMeals, []);
    const { handleAddToCart } = useContext(CartContext);

    return (
        <>
            {isFetching && <p className="fallback-text">Data is fetching</p>}
            {!isFetching && error?.message && <p className="fallback-text">{error.message}</p>}
            {!isFetching && fetchedData.length > 0 && (
                fetchedData.map((data) => {
                    return (
                        <div className="meal-item" key={data.id}>
                            <article>
                                <img src={`http://localhost:3000/${data.image}`} alt="" />
                                <h3>{data.name}</h3>

                                <div className="meal-item-price">
                                    {data.price} zł
                                </div>
                                <div className="meal-item-description">
                                    {data.description}
                                </div>
                                <button className="button meal-item-actions" onClick={() => handleAddToCart(data.id)} >Add toCart</button>
                            </article>
                        </div>
                    )
                })
            )}
        </>
    )
}