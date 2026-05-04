import ProductCard from "./ProductCard";


export default function ProductList({products, onDelete, onAddToCart, cart}) {
    /* 
        ПОЧЕМУ используем key в ProductItem?
        При рендеринге списков, например, карточек товара, для каждого элемента списка необходимо добавить уникальный ключ идентификатор.
        Это поможет оптимизировать рендеринг списков. При именении состояния ключи помогают алгоритмам сравнения нового виртуального DOM со 
        старым, в частности определить какой элемент обновился и вместо обновления всего списка обновить только изменившийся элемент. 
        Тем самым улучшив производительность страницы.
    */

    /* 
        ПОЧЕМУ не используем здесь делегирование, как в ванильном js, а передаем onDelete и onAddToCart к дочернему компоненту?
        Потому что реакт использует синтетические события (SyntheticEvent) - "обертки" над нативным событием браузера.
        Реакт не привязывает обработчик к каждому DOM-элементу, использует один обработчик к document, что снижает потребление
        памяти. Следовательно, в отличии от onсlick в js, onClick в реакте на каждом дочернем элементе не означает прикрепление обработчика к каждому элементу.
    */


    return (
        <ul className="product-container">
            {products.length ? 
                products
                .map(product => {
                    const isInCart = cart.includes(product.id);

                    return <ProductCard 
                        key={product.id}
                        product={product}
                        onAddToCart={onAddToCart}
                        onDelete={onDelete}
                        inCart={isInCart}
                        />
                }
            ) : 
            <p>Products not found</p>
            }
        </ul>
    )
}