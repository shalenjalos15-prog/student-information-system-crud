import "../../styles/InputField.css";

function SelectField({
    label,
    id,
    name,
    value,
    onChange,
    options = [],
    disabled = false,
    required = false,
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

    const selectClasses = [
        "form-select",
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
                <select
                    id={id}
                    name={name}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                    required={required}
                    className={selectClasses}
                    aria-invalid={!!error}
                    aria-describedby={error ? errorId : helperId}
                    {...props}
                >
                    {options.map((option) => (
                        <option
                            key={option.value}
                            value={option.value}
                            disabled={option.disabled}
                            hidden={option.hidden}
                        >
                            {option.label}
                        </option>
                    ))}
                </select>

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

export default SelectField;