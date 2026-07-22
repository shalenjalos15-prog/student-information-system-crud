import "../../styles/Button.css";

function Button({
    children,
    variant = "primary",
    type = "button",
    icon,
    iconPosition = "left",
    loading = false,
    loadingText = "Loading...",
    fullWidth = false,
    className = "",
    disabled = false,
    onClick,
    ...props
}) {
    const buttonClassName = [
        `btn-${variant}`,
        fullWidth && "w-100",
        className,
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <button
            type={type}
            className={buttonClassName}
            disabled={disabled || loading}
            onClick={onClick}
            aria-busy={loading}
            {...props}
        >
            {loading ? (
                <>
                    <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                    ></span>

                    <span>{loadingText}</span>
                </>
            ) : (
                <>
                    {icon && iconPosition === "left" && (
                        <i
                            className={icon}
                            aria-hidden="true"
                        ></i>
                    )}

                    {children}

                    {icon && iconPosition === "right" && (
                        <i
                            className={icon}
                            aria-hidden="true"
                        ></i>
                    )}
                </>
            )}
        </button>
    );
}

export default Button;