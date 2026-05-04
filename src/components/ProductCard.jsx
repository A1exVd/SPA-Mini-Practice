import Button from "./Button.jsx";
import { useState } from "react";

export default function ProductCard({product, onDelete, onAddToCart, inCart}) {
    const [isInCart, setIsInCart] = useState(inCart);

    const handleInChart = () => {
        setIsInCart(!isInCart);
        onAddToCart(product.id)
    }

    return (
        <li className="product-card" data-product-id={product.id}>
            <h3>{product.name}</h3>
            <div>
                <span className={`product-category ${product.category.toLowerCase()}`}>{product.categoryRus}</span>
            </div>
            <p>{product.description}</p>
            <span>Цена: {product.price.toFixed(2)}$</span>
            <Button
                onClick={handleInChart}
                className={isInCart? "primary-btn" : ""}
            >
                {isInCart ? "В корзине" : "Добавить"}
            </Button>
            <Button
                onClick={() => onDelete(product.id)}
                className="secondary-btn"
            >
                Удалить
            </Button>
        </li>
    )
}

