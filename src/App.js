import AddProductForm from "./components/AddProductForm";
import FilterForm from "./components/FilterForm";
import Header from "./components/Header";
import Layout from "./components/Layout";
import ProductList from "./components/ProductList";
import ProgressBar from "./components/ProgressBar";
import { useState } from "react";
import useStorage from "./hooks/useStorage";
import SectionLayout from "./components/SectionLayout";
import Footer from "./components/Footer";
import { ThemeProvider } from "./providers/ThemeProvider";

const STORAGE_PRODUCTS = "spa-mini-items";
const STORAGE_CART = "spa-mini-cart";

// ПОЧЕМУ? Данные вынесены за пределы компонента — 
// они не пересоздаются при каждом рендере.
const initialProducts = [
  { id: "1", name: "MacBook Pro 14", description: "Apple M3 Pro, 16 ГБ, 512 ГБ SSD, 14.2", category: "Laptops", categoryRus: "Ноутбуки", price: 999.99 },
  { id: "2", name: "Logitech G Pro X Superlight", description: "Беспроводная, 25600 DPI, белый", category: "Mice", categoryRus: "Мыши", price: 49.50 },
  { id: "3", name: "Keychron K2 V2", description: "Механическая, Gateron Brown, RGB", category: "Keyboards", categoryRus: "Клавиатуры", price: 120.00 },
  { id: "4", name: "ASUS ROG Swift 27\" PG27AQDM", description: "OLED, 240 Гц, 2560x1440, 0.03 мс", category: "Monitors", categoryRus: "Мониторы", price: 350.00 },
  { id: "5", name: "AirPods Pro 2", description: "Белые", category: "Headphones", categoryRus: "Наушники", price: 200.00 }
];

const categoryOptions = initialProducts.reduce((prev, current) => {prev[current.category] = current.categoryRus; return prev}, {all: "Все"})

/* 
ПОЧЕМУ функциональное обновление prev => [...]?
Это безопасно при нескольких обновлениях подряд (batching). // React гарантирует, что prev — это актуальное состояние. 

ПОЧЕМУ filter, а не splice? splice мутирует массив. В React state нельзя мутировать напрямую.
filter возвращает новый массив — React видит изменение и перерисовывает.

ПОЧЕМУ вычисляем filteredProducts здесь, а не в ItemList? 
App.js — владелец данных. Логика фильтрации — это бизнес-логика,
она должна жить рядом с данными, а не в презентационном компоненте.
*/




function App() {
  /*
  ПОЧЕМУ используем кастомные хуки? 
  Используем, чтобы вынести useState + useEffect логику из компонента в переиспользуемые функции.
  Улучшаем читаемость, уменьшаем дублирование кода отделяем логику от UI.
  */
 const [ products, setProducts] = useStorage(STORAGE_PRODUCTS, initialProducts);
 const [ cart, setCart ] = useStorage(STORAGE_CART, []);
 const [ filter, setFilter ] = useState("all");
 
  const handleDelete = (id) => {
    setProducts(products.filter(product => product.id !== id));
    setCart(prev => prev.filter(productId => productId !== id));
  }

  const handleInCart = (id) => {
    if(cart.includes(id)) {
      setCart(prev => prev.filter(productId => productId !== id));
      return;
    }
    setCart(prev => [...prev, id])
  }

  const handleAddProduct = (newProduct) => {
      setProducts(prev => [...prev, {id: Date.now(), categoryRus: categoryOptions[newProduct.category], ...newProduct}])
  }  

  const filteredProducts = filter === "all" 
    ? products
    : products.filter(product => product.category === filter);

  return (
    <ThemeProvider>
      <Layout>
        <Header />
        <main>
          <SectionLayout id="progress" title="Интернет-магазин">
            <ProgressBar 
              id="progress"
              label={`Прогресс: ${cart.length}/${products.length} добавлено`}
              value={cart.length}
              max={products.length}
              />
          </SectionLayout>
          <SectionLayout id="add-product" title="Добавить новый товар">
            <AddProductForm onAddProduct={handleAddProduct} categoryOptions={categoryOptions}/>
          </SectionLayout>
          <SectionLayout id="filter-product" title="Фильтр товаров">
            <FilterForm activeFilter={filter} onFilterChange={setFilter} filteredOptions={categoryOptions}/>
          </SectionLayout>
          <SectionLayout id="products" title="Каталог товаров">
            <ProductList products={filteredProducts} onDelete={handleDelete} onAddToCart={handleInCart} cart={cart}/>
          </SectionLayout>
        </main>
        <Footer />
      </Layout>
    </ThemeProvider>
  );
}

export default App;
