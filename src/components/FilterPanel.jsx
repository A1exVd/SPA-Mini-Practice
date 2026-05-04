import ControlledRadioInput from "./ControlledRadioInput";

export default function FilterPanel({ activeFilter, onFilterChange, filteredOptions}) {
    return (
            <form className="filter-form">
                {Object.entries(filteredOptions).map(([value, label]) => (
                    <ControlledRadioInput
                        key={value}
                        name="product-filter"
                        value={value}
                        label={label}
                        onFilterChange={onFilterChange}
                        activeFilter={activeFilter}
                    />
                ))}
            </form>
    )
}