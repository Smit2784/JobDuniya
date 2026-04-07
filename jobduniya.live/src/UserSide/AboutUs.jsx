import React from "react";
import Footer from "../componants/Common/Footer";

const AboutUs = () => {
    return (
        <>
            <div className="min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
                {/* Hero Section */}
                <div className="relative bg-linear-to-r from-blue-600 via-blue-700 to-indigo-800 text-white overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
                        <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-300 rounded-full blur-3xl"></div>
                    </div>
                    <div className="container mx-auto px-4 py-20 relative z-10">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
                            About <span className="text-blue-200">JobDuniya</span>
                        </h1>
                        <p className="text-lg md:text-xl text-blue-100 max-w-2xl leading-relaxed">
                            Your Gateway to Endless Career Opportunities. We
                            connect talent with the right opportunities, making
                            job searching effortless and efficient.
                        </p>
                    </div>
                </div>

                {/* Main Content */}
                <div className="container mx-auto px-4 py-16">
                    {/* Mission Section */}
                    <div className="grid md:grid-cols-2 gap-12 mb-20">
                        <div className="bg-white rounded-2xl p-8 shadow-lg shadow-blue-100/50 border border-blue-50 hover:shadow-xl transition-shadow duration-300">
                            <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                                <i className="fas fa-bullseye text-blue-600 text-2xl"></i>
                            </div>
                            <h2 className="text-2xl font-bold text-slate-800 mb-4">
                                Our Mission
                            </h2>
                            <p className="text-slate-600 leading-relaxed">
                                At JobDuniya, our mission is to bridge the gap
                                between job seekers and employers. We strive to
                                create a platform where finding the right job or
                                the right candidate is seamless, transparent, and
                                accessible to everyone. We believe that everyone
                                deserves the opportunity to find work that is
                                fulfilling and rewarding.
                            </p>
                        </div>
                        <div className="bg-white rounded-2xl p-8 shadow-lg shadow-blue-100/50 border border-blue-50 hover:shadow-xl transition-shadow duration-300">
                            <div className="w-14 h-14 bg-indigo-100 rounded-xl flex items-center justify-center mb-6">
                                <i className="fas fa-eye text-indigo-600 text-2xl"></i>
                            </div>
                            <h2 className="text-2xl font-bold text-slate-800 mb-4">
                                Our Vision
                            </h2>
                            <p className="text-slate-600 leading-relaxed">
                                We envision a world where every individual has
                                access to meaningful employment opportunities.
                                JobDuniya aims to become the leading job portal
                                in India, empowering millions of people to build
                                their careers and achieve their professional
                                dreams through innovative technology and
                                personalized services.
                            </p>
                        </div>
                    </div>

                    {/* Who We Are */}
                    <div className="mb-20">
                        <div className="text-center mb-6">
                            <h2 className="text-3xl font-bold text-slate-800 mb-4">
                                Who We Are
                            </h2>
                            <div className="w-20 h-1 bg-blue-500 mx-auto rounded-full"></div>
                        </div>
                        <div className="max-w-3xl mx-auto bg-white rounded-2xl p-8 md:p-12 shadow-lg border border-blue-50">
                            <p className="text-slate-600 leading-relaxed text-lg mb-6">
                                JobDuniya is a comprehensive job portal designed
                                to cater to the diverse needs of job seekers and
                                employers across India. Founded with the vision
                                of making recruitment simple and efficient, we
                                provide a robust platform that connects talent
                                with opportunities.
                            </p>
                            <p className="text-slate-600 leading-relaxed text-lg">
                                Our team consists of passionate professionals
                                dedicated to revolutionizing the way people find
                                jobs. With cutting-edge technology and a
                                user-centric approach, we ensure that our
                                platform delivers the best experience for both
                                job seekers and recruiters.
                            </p>
                        </div>
                    </div>

                    {/* What We Offer */}
                    <div className="mb-20">
                        <div className="text-center mb-6">
                            <h2 className="text-3xl font-bold text-slate-800 mb-4">
                                What We Offer
                            </h2>
                            <div className="w-20 h-1 bg-blue-500 mx-auto rounded-full"></div>
                        </div>
                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                {
                                    icon: "fas fa-search",
                                    title: "Smart Job Search",
                                    description:
                                        "Advanced search filters to help you find the perfect job that matches your skills, experience, and preferences.",
                                    color: "blue",
                                },
                                {
                                    icon: "fas fa-file-alt",
                                    title: "Easy Applications",
                                    description:
                                        "Apply to multiple jobs with a single click using your uploaded resume and profile information.",
                                    color: "indigo",
                                },
                                {
                                    icon: "fas fa-bell",
                                    title: "Job Alerts",
                                    description:
                                        "Get notified about new job postings that match your criteria so you never miss an opportunity.",
                                    color: "purple",
                                },
                                {
                                    icon: "fas fa-building",
                                    title: "Company Profiles",
                                    description:
                                        "Explore detailed company profiles to learn about potential employers before you apply.",
                                    color: "blue",
                                },
                                {
                                    icon: "fas fa-shield-alt",
                                    title: "Secure Platform",
                                    description:
                                        "Your data is protected with industry-standard security measures ensuring your privacy.",
                                    color: "indigo",
                                },
                                {
                                    icon: "fas fa-headset",
                                    title: "24/7 Support",
                                    description:
                                        "Our dedicated support team is always ready to help you with any questions or concerns.",
                                    color: "purple",
                                },
                            ].map((item, index) => (
                                <div
                                    key={index}
                                    className="bg-white rounded-2xl p-6 shadow-lg border border-blue-50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                                >
                                    <div
                                        className={`w-12 h-12 bg-${item.color}-100 rounded-xl flex items-center justify-center mb-4`}
                                    >
                                        <i
                                            className={`${item.icon} text-${item.color}-600 text-xl`}
                                        ></i>
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-800 mb-3">
                                        {item.title}
                                    </h3>
                                    <p className="text-slate-600 leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Contact CTA */}
                    <div className="bg-linear-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 md:p-12 text-white text-center">
                        <h2 className="text-3xl font-bold mb-4">
                            Ready to Start Your Journey?
                        </h2>
                        <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
                            Join thousands of job seekers who have found their
                            dream jobs through JobDuniya. Your next opportunity
                            is just a click away.
                        </p>
                        <a
                            href="/jobs"
                            className="inline-block bg-white text-blue-600 font-semibold px-8 py-3 rounded-xl hover:bg-blue-50 transition-colors duration-300 shadow-lg"
                        >
                            Browse Jobs Now
                        </a>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default AboutUs;
