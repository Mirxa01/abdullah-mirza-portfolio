import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ExecutiveProfile from "@/components/ExecutiveProfile";
import Ventures from "@/components/Ventures";
import Services from "@/components/Services";
import CorporateLeadership from "@/components/CorporateLeadership";
import CareerTimeline from "@/components/CareerTimeline";
import CompetenciesGrid from "@/components/CompetenciesGrid";
import EducationCertifications from "@/components/EducationCertifications";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import PrintableCV from "@/components/PrintableCV";

export default function Home() {
    return (
        <>
            {/* Screen portfolio — hidden when printing. */}
            <div className="screen-only">
                <main className="min-h-screen">
                    <Navbar />
                    <Hero />
                    <div className="section-divider" />
                    <ExecutiveProfile />
                    <div className="section-divider" />
                    <Ventures />
                    <div className="section-divider" />
                    <Services />
                    <div className="section-divider" />
                    <CorporateLeadership />
                    <div className="section-divider" />
                    <CareerTimeline />
                    <div className="section-divider" />
                    <CompetenciesGrid />
                    <div className="section-divider" />
                    <EducationCertifications />
                    <div className="section-divider" />
                    <Contact />
                    <Footer />
                </main>
            </div>

            {/* Fallback if someone prints the homepage directly */}
            <PrintableCV variant="embedded" />
        </>
    );
}
