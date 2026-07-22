import Button from "./Button";
import Modal from "./Modal";

import "../../styles/ConfirmModal.css";

function ConfirmModal({
    show,
    onClose,
    onConfirm,
    title = "Confirm Action",
    message = "Are you sure you want to continue?",
    icon = "bi bi-exclamation-triangle-fill",
    iconClassName = "confirm-icon",
    confirmText = "Confirm",
    cancelText = "Cancel",
    confirmVariant = "danger",
    cancelVariant = "secondary",
    loading = false,
    confirmAutoFocus = false,
}) {
    if (!show) return null;

    return (
        <Modal
            show={show}
            title=""
            onClose={onClose}
            size="sm"
            variant="confirm"
            footer={
                <>
                    <Button
                        type="button"
                        variant={cancelVariant}
                        onClick={onClose}
                        disabled={loading}
                    >
                        {cancelText}
                    </Button>

                    <Button
                        type="button"
                        variant={confirmVariant}
                        onClick={onConfirm}
                        loading={loading}
                        autoFocus={confirmAutoFocus}
                    >
                        {confirmText}
                    </Button>
                </>
            }
        >
            <div
                className="confirm-modal-content"
                role="alertdialog"
                aria-labelledby="confirm-modal-title"
                aria-describedby="confirm-modal-message"
            >
                <div className={iconClassName}>
                    <i
                        className={icon}
                        aria-hidden="true"
                    ></i>
                </div>

                <h4
                    id="confirm-modal-title"
                    className="confirm-title"
                >
                    {title}
                </h4>

                <p
                    id="confirm-modal-message"
                    className="confirm-message"
                >
                    {message}
                </p>
            </div>
        </Modal>
    );
}

export default ConfirmModal;