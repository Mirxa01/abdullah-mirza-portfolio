import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ExecutiveProfile from "@/components/ExecutiveProfile";
import Ventures from "@/components/Ventures";
import CorporateLeadership from "@/components/CorporateLeadership";
import CareerTimeline from "@/components/CareerTimeline";
import CompetenciesGrid from "@/components/CompetenciesGrid";
import EducationCertifications from "@/components/EducationCertifications";
import Contact from "@/components/Contact";

export default function Home() {
    return (
        <main className="min-h-screen">
            <Navbar />
            <Hero />
            <ExecutiveProfile />
            <Ventures />
            <CorporateLeadership />
            <CareerTimeline />
            <CompetenciesGrid />
            <EducationCertifications />
            <Contact />
        </main>
    );
}
