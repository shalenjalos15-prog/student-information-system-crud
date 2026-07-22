import { useEffect, useState } from "react";

import "../../styles/WelcomeBanner.css";

function WelcomeBanner({
    title = "Welcome back, Admin!",
    subtitle = "View your system overview and recent activity.",
}) {
    const [now, setNow] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setNow(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const currentDate = now.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    const currentTime = now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
    });

    return (
        <section className="welcome-banner">
            <div className="welcome-left">
                <div
                    className="welcome-icon"
                    aria-hidden="true"
                >
                    <i
                        className="bi bi-mortarboard-fill"
                        aria-hidden="true"
                    ></i>
                </div>

                <div className="welcome-text">
                    <h2>{title}</h2>

                    <p>{subtitle}</p>

                    <div className="welcome-info">
                        <div className="welcome-date">
                            <i
                                className="bi bi-calendar3"
                                aria-hidden="true"
                            ></i>

                            <span>{currentDate}</span>
                        </div>

                        <div className="welcome-time">
                            <i
                                className="bi bi-clock"
                                aria-hidden="true"
                            ></i>

                            <span>{currentTime}</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default WelcomeBanner;