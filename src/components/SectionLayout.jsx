
export default function SectionLayout({ id, children, title }) {
    return (
        <section id={id}>
            <h2>{title}</h2>
            {children}
        </section>
    )
}