
export default function ProgressBar({ id, label, value, max}) {
    return (
        <>
            <label htmlFor={id} className="progress-label">{label}</label>
            <progress id={id} value={value} max={max} className="progress"></progress>
        </>
    );

}