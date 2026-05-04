
export default function ControlledRadioInput({ name, value, label, onFilterChange, activeFilter}) {
    return (
        <label className={value === activeFilter ? "selected": ""}>
            <input 
                type="radio"
                name={name}
                value={value}
                checked={value === activeFilter} 
                onChange={e => {onFilterChange(e.target.value);}}
            />
            {label}
        </label>
    )
}