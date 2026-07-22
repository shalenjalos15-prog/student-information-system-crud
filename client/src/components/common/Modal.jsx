import { useEffect } from "react";

import "../../styles/Modal.css";

function Modal({
    show,
    title,
    children,
    footer,
    onClose,
    size = "md",
    variant = "default",
}) {
    useEffect(() => {
        if (!show) return;

        const handleEscape = (event) => {
            if (event.key === "Escape") {
                onClose?.();
            }
        };

        document.addEventListener("keydown", handleEscape);
        document.body.style.overflow = "hidden";

        return () => {
            document.removeEventListener("keydown", handleEscape);
            document.body.style.overflow = "";
        };
    }, [show, onClose]);

    if (!show) return null;

    const handleOverlayClick = (event) => {
        if (event.target === event.currentTarget) {
            onClose?.();
        }
    };

    return (
        <div
            className="modal-overlay"
            onClick={handleOverlayClick}
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? "modal-title" : undefined}
        >
            <div
                className={`custom-modal modal-${size} ${
                    variant === "confirm" ? "confirm-modal" : ""
                }`}
            >
                <div className="modal-header">
                    {title && <h3 id="modal-title">{title}</h3>}

                    <button
                        type="button"
                        className="close-btn"
                        onClick={onClose}
                        aria-label="Close modal"
                    >
                        &times;
                    </button>
                </div>

                <div className="modal-body">{children}</div>

                {footer && (
                    <div className="modal-footer">
                        {footer}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Modal;