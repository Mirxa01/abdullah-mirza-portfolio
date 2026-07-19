/**
 * Dedicated printable CV — rendered only for print / Save as PDF.
 *
 * The marketing homepage is hidden during print; this layout is a calm,
 * professional one- to two-page resume that does not depend on Framer
 * animations, typewriters, or absolute-positioned cards.
 */
import {
    PROFESSIONAL_TITLE,
    SITE_URL,
    LINKEDIN_URL,
    EMAIL_ADDRESS,
    WHATSAPP_DISPLAY,
    cvSummary,
    competencyNames,
    certifications,
    education,
    leadershipRoles,
    timelineEvents,
    ventures,
} from "@/lib/data";

/** Keep the printed CV compact — top highlights only. */
const CAREER_HIGHLIGHT_LIMIT = 2;
const LEADERSHIP_POINT_LIMIT = 4;

export default function PrintableCV() {
    return (
        <article
            id="printable-cv"
            className="hidden print:block"
            aria-label="Printable curriculum vitae"
        >
            <header className="cv-header">
                <div>
                    <h1 className="cv-name">Abdullah Mirza</h1>
                    <p className="cv-title">{PROFESSIONAL_TITLE}</p>
                    <p className="cv-location">Riyadh, Saudi Arabia</p>
                </div>
                <ul className="cv-contact">
                    <li>
                        <a href={`mailto:${EMAIL_ADDRESS}`}>{EMAIL_ADDRESS}</a>
                    </li>
                    <li>
                        <a href={`tel:${WHATSAPP_DISPLAY.replace(/\s/g, "")}`}>
                            {WHATSAPP_DISPLAY}
                        </a>
                    </li>
                    <li>
                        <a href={LINKEDIN_URL}>linkedin.com/in/abdullahmirxa</a>
                    </li>
                    <li>
                        <a href={SITE_URL}>abdullahmirza.com</a>
                    </li>
                </ul>
            </header>

            <section className="cv-section">
                <h2>Profile</h2>
                <p className="cv-summary">{cvSummary}</p>
            </section>

            <section className="cv-section">
                <h2>Core skills</h2>
                <ul className="cv-skills">
                    {competencyNames.map((skill) => (
                        <li key={skill}>{skill}</li>
                    ))}
                </ul>
            </section>

            <section className="cv-section">
                <h2>Leadership experience</h2>
                {leadershipRoles.map((role) => (
                    <div key={role.company} className="cv-role">
                        <div className="cv-role-head">
                            <div>
                                <h3>{role.role}</h3>
                                <p className="cv-org">{role.company}</p>
                            </div>
                            <span className="cv-period">{role.period}</span>
                        </div>
                        <ul>
                            {role.points.slice(0, LEADERSHIP_POINT_LIMIT).map((point) => (
                                <li key={point}>{point}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </section>

            <section className="cv-section">
                <h2>Career history</h2>
                {timelineEvents.map((event) => (
                    <div key={`${event.company}-${event.role}`} className="cv-role cv-role-compact">
                        <div className="cv-role-head">
                            <div>
                                <h3>{event.role}</h3>
                                <p className="cv-org">{event.company}</p>
                            </div>
                        </div>
                        {event.highlights.length > 0 && (
                            <ul>
                                {event.highlights.slice(0, CAREER_HIGHLIGHT_LIMIT).map((highlight) => (
                                    <li key={highlight}>{highlight}</li>
                                ))}
                            </ul>
                        )}
                    </div>
                ))}
            </section>

            <section className="cv-section">
                <h2>Selected products</h2>
                <ul className="cv-ventures">
                    {ventures.map((venture) => (
                        <li key={venture.title}>
                            <strong>{venture.title}</strong>
                            {venture.domain ? (
                                <span className="cv-domain"> — {venture.domain}</span>
                            ) : null}
                            <span className="cv-venture-desc"> {venture.description}</span>
                        </li>
                    ))}
                </ul>
            </section>

            <section className="cv-section cv-section-split">
                <div>
                    <h2>Education</h2>
                    <p className="cv-edu-degree">{education.degree}</p>
                    <p className="cv-org">{education.institution}</p>
                    <p className="cv-period">{education.location}</p>
                </div>
                <div>
                    <h2>Certifications</h2>
                    <ul className="cv-certs">
                        {certifications.map((cert) => (
                            <li key={cert}>{cert}</li>
                        ))}
                    </ul>
                </div>
            </section>
        </article>
    );
}
