import "../../styles/InputField.css";

function InputField({
    label,
    id,
    name,
    type = "text",
    value,
    onChange,
    placeholder = "",
    disabled = false,
    readOnly = false,
    required = false,
    icon,
    error = "",
    helperText = "",
    col,
    className = "",
    inputClassName = "",
    ...props
}) {
    const wrapperClass = [
        col ? `col-md-${col}` : "",
        className,
    ]
        .filter(Boolean)
        .join(" ");

    const inputClasses = [
        "form-control",
        icon ? "has-icon" : "",
        error ? "is-invalid" : "",
        inputClassName,
    ]
        .filter(Boolean)
        .join(" ");

    const helperId = helperText ? `${id}-helper` : undefined;
    const errorId = error ? `${id}-error` : undefined;

    return (
        <div className={wrapperClass}>
            {label && (
                <label
                    htmlFor={id}
                    className="form-label"
                >
                    {label}
                    {required && <span className="text-danger"> *</span>}
                </label>
            )}

            <div className="input-wrapper">
                {icon && (
                    <span
                        className="input-icon"
                        aria-hidden="true"
                    >
                        <i className={icon}></i>
                    </span>
                )}

                <input
                    id={id}
                    name={name}
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    disabled={disabled}
                    readOnly={readOnly}
                    required={required}
                    className={inputClasses}
                    aria-invalid={!!error}
                    aria-describedby={error ? errorId : helperId}
                    {...props}
                />

                {error && (
                    <div
                        id={errorId}
                        className="invalid-feedback"
                    >
                        {error}
                    </div>
                )}

                {!error && helperText && (
                    <small
                        id={helperId}
                        className="form-text"
                    >
                        {helperText}
                    </small>
                )}
            </div>
        </div>
    );
}

export default InputField;