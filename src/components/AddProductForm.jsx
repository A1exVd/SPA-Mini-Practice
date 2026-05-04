import { useState } from "react"
import Button from "./Button"
import { ProductSchema } from "../utils/validators";

export default function AddProductForm({ onAddProduct, categoryOptions }) {
    const [ productFormData, setProductFormData ] = useState({
        name: "",
        description: "",
        category: "Mice",
        price: ""
    })
    const [ error, setError ] = useState(null);


    const handleSubmit = (e) => {
        // ПОЧЕМУ используем e.preventDefault()? Для отмены стандартного поведения браузера
        // при возникновении события. В данном случае чтобы отправить форму без перезагрузки страницы
        e.preventDefault();
        const result = ProductSchema.safeParse(productFormData);
        if(result.success) {
            onAddProduct(productFormData)
            setError(null)
            setProductFormData({
                name: "",
                description: "",
                category: "Mice",
                price: ""
            })
            return;
        }

        const errorMessages = result.error.issues.map(issue => issue.message)
        setError(errorMessages[0]);
        
    }

    return (
        <form className="product-form">
            <input
                type="text"
                value={productFormData.name}
                placeholder="Введите название товара"
                onChange={(e) => setProductFormData(prev => ({...prev, name: e.target.value}))}
            />
            <input 
                type="text"
                value={productFormData.description}
                placeholder="Введите описание товара"
                onChange={(e) => setProductFormData(prev => ({...prev, description: e.target.value}))}
            />

            <select
                value={productFormData.category}
                onChange={(e) => setProductFormData(prev => ({...prev, category: e.target.value}))}
            >
                {Object.entries(categoryOptions).map(([value, label]) => (
                    <option key={value} value={value}>{label}</option>
                ))}
            </select>
            <input 
                type="number"
                value={productFormData.price}
                placeholder="Введите цену товара"
                onChange={(e) => setProductFormData(prev => ({...prev, price: Number(e.target.value)}))}
            />
            <Button
                type="submit"
                onClick={handleSubmit}
                className="primary-btn"
            >
                Добавить новый товар
            </Button>
            {error && <p className="error">{error}</p>}
        </form>
    )
}