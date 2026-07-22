import "../../styles/ProfileDropdown.css";

function ProfileDropdown({
    username,
    role,
    onClose,
}) {
    return (
        <div className="profile-dropdown">
            <div className="profile-dropdown-header">
                <div className="profile-dropdown-avatar">
                    <i
                        className="bi bi-person-circle"
                        aria-hidden="true"
                    ></i>
                </div>

                <h3>{username}</h3>

                <p>{role}</p>
            </div>

            <div className="profile-dropdown-body">
                <div className="profile-row">
                    <span className="profile-title">Username</span>
                    <span className="profile-value">{username}</span>
                </div>

                <div className="profile-row">
                    <span className="profile-title">Role</span>
                    <span className="profile-value">{role}</span>
                </div>
            </div>
        </div>
    );
}

export default ProfileDropdown;