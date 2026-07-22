import "../../styles/StatCard.css";

function StatCard({
    icon = "bi-circle-fill",
    title = "",
    value = 0,
    color = "#1E3A8A",
    className = "",
}) {
    return (
        <article className={`stat-card ${className}`.trim()}>
            <div
                className="stat-icon"
                style={{ backgroundColor: color }}
                aria-hidden="true"
            >
                <i
                    className={`bi ${icon}`}
                    aria-hidden="true"
                ></i>
            </div>

            <div className="stat-content">
                <p>{title}</p>

                <h3>{value}</h3>
            </div>
        </article>
    );
}

export default StatCard;