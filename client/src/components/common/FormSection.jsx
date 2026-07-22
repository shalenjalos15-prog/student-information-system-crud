function FormSection({
    title,
    icon,
    className = "",
    children,
}) {
    const sectionClassName = [
        "form-section",
        className,
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <section className={sectionClassName}>
            {title && (
                <h5 className="section-title">
                    {icon && (
                        <i
                            className={icon}
                            aria-hidden="true"
                        ></i>
                    )}

                    <span>{title}</span>
                </h5>
            )}

            {children}
        </section>
    );
}

export default FormSection;