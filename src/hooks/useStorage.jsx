import { useEffect, useState } from "react";

export default function useStorage(storageKey, initialItems) {
    const [ items, setItems ] = useState(() => {
        // ПОЧЕМУ функция-инициализатор?
        // Она выполняется только один раз при монтировании,
        // а не при каждом рендере.
        try {
            const saved = localStorage.getItem(storageKey);
            return saved ? JSON.parse(saved) : initialItems;
        
        } catch {
            return initialItems;
        }
    });
    /* 
    ПОЧЕМУ укзаываем зависимости для useEffect? 
    Для контроля выполнения побочных эффектов. В данном случае побочный эффект 
    будет выполняться при изменение items или storageKey, предотвращая ненужные 
    рендеры и обеспечивая актуальные данные.
    
    Жизненный цикл компонента  
    * Монтирование (Добавление в DOM)
    * Обновление (Изменения props, state)
    * Размонтирование (Удаление из DOM)

    без массива - выполнение после каждого рендера
    [] - запуск при монтировании (один раз)
    [props, state] - запуск при монтировании и при каждом изменении props, state
    
    ПОЧЕМУ не возвращаем очищающую функцию в данном случае?
    Операция получения данных из localstorage является синхронной, локальной и 
    не создает побочных эффектов, требующих уборки.
    */
    useEffect(() => {
        localStorage.setItem(storageKey, JSON.stringify(items));
    }, [items, storageKey])

    return [items, setItems]
}