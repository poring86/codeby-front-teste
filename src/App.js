import { useRef, useState } from "react";

import classes from "./App.module.css";

// Caso queira utilizar os dados do arquivo abaixo-10-reais.json faça o import e use como padrão no "useState"
// import abaixoData from "./data/abaixo-10-reais.json";

import acimaData from "./data/acima-10-reais.json";

function App() {
    const [cartItems, setCartItems] = useState(acimaData.items);
    const total = useRef(0);

    const removeItem = (id) => {
        let newCartItemList = cartItems.filter((item) => id !== item.uniqueId);
        setCartItems(newCartItemList);
    };

    return (
        <div className={classes.main}>
            <div className={classes.card}>
                <header>
                    <p>Meu carrinho</p>
                </header>
                {cartItems.length === 0 ? (
                    <div className={classes.carrinhoVazio}>Carrinho Vazio!</div>
                ) : (
                    <>
                        <div className={classes.itemsList}>
                            {cartItems.map((item, index) => {
                                if (index === 0) {
                                    total.current = 0;
                                }
                                total.current += item.price;
                                let formatedPrice = (
                                    item.price / 100
                                ).toLocaleString("pt-br", {
                                    style: "currency",
                                    currency: "BRL",
                                });
                                return (
                                    <div
                                        key={item.uniqueId}
                                        className={classes.cartItem}
                                    >
                                        <div>
                                            <img
                                                className={classes.itemImage}
                                                src={item.imageUrl}
                                            />
                                        </div>
                                        <div className={classes.itemDetails}>
                                            <p className={classes.itemName}>
                                                {item.name}
                                            </p>
                                            <p className={classes.firstPrice}>
                                                {formatedPrice}
                                            </p>
                                            <p className={classes.secondPrice}>
                                                {formatedPrice}
                                            </p>
                                            <div
                                                className={classes.removeItem}
                                                onClick={() => {
                                                    removeItem(item.uniqueId);
                                                }}
                                            >
                                                X
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <div className={classes.totalBox}>
                            <p>Total</p>
                            <p>
                                {(total.current / 100).toLocaleString("pt-br", {
                                    style: "currency",
                                    currency: "BRL",
                                })}
                            </p>
                        </div>
                        {total.current / 100 > 10 && (
                            <div className={classes.freteGratis}>
                                Parabéns, sua compra tem frete grátis!
                            </div>
                        )}
                        <div className={classes.bottomBox}>
                            <button>Finalizar Compra</button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default App;
