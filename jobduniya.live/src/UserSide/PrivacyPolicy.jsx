import React from "react";
import Footer from "../componants/Common/Footer";

const PrivacyPolicy = () => {
    const sections = [
        {
            title: "1. Information We Collect",
            items: [
                {
                    subtitle: "Personal Information",
                    text: "When users register on our platform, we collect personal information such as name, email address, contact number, and location. This information is necessary for creating user accounts and providing our services.",
                },
                {
                    subtitle: "Resume/CV",
                    text: "Users have the option to upload their resumes or CVs to our platform. This information helps us match users with relevant job opportunities and streamline the job application process.",
                },
                {
                    subtitle: "Usage Data",
                    text: "We collect data on how users interact with our website, including pages visited, job searches performed, and clicks on job listings. This information helps us improve our services and tailor the user experience.",
                },
                {
                    subtitle: "Cookies",
                    text: "Like many websites, we use cookies to enhance user experience and gather information about site usage. Users have the option to accept or decline cookies through their browser settings.",
                },
            ],
        },
        {
            title: "2. How We Use Information",
            items: [
                {
                    subtitle: "Matching Users with Job Opportunities",
                    text: "We use the information provided by users to match them with relevant job opportunities and notify them of new job listings that match their preferences.",
                },
                {
                    subtitle: "Improving Services",
                    text: "We analyze usage data to identify trends, improve our website's functionality, and enhance the overall user experience.",
                },
                {
                    subtitle: "Communications",
                    text: "We may use users' contact information to send them important updates, newsletters, or promotional offers related to our services. Users can opt-out of receiving these communications at any time.",
                },
            ],
        },
        {
            title: "3. Data Security",
            items: [
                {
                    text: "We employ industry-standard security measures to protect users' personal information from unauthorized access, alteration, disclosure, or destruction.",
                },
                {
                    text: "Our website uses encryption technology to safeguard sensitive data transmitted between users' browsers and our servers.",
                },
            ],
        },
        {
            title: "4. Sharing of Information",
            items: [
                {
                    text: "We do not sell, trade, or rent users' personal information to third parties without their consent.",
                },
                {
                    text: "We may share users' information with trusted third-party service providers who assist us in operating our website, conducting business, or servicing users. These parties are contractually obligated to keep users' information confidential and secure.",
                },
            ],
        },
        {
            title: "5. Compliance with Laws",
            items: [
                {
                    text: "We comply with all applicable laws and regulations regarding the collection, use, and disclosure of personal information.",
                },
            ],
        },
        {
            title: "6. Changes to Privacy Policy",
            items: [
                {
                    text: "We reserve the right to update or modify this Privacy Policy at any time without prior notice. Users are encouraged to review this policy periodically to stay informed about how we collect, use, and protect their information.",
                },
            ],
        },
        {
            title: "7. Contact Us",
            items: [
                {
                    text: "If users have any questions or concerns regarding this Privacy Policy or our data practices, they can contact us at JobDuniya@gmail.com.",
                },
            ],
        },
    ];

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
                            Privacy{" "}
                            <span className="text-blue-200">Policy</span>
                        </h1>
                        <p className="text-lg md:text-xl text-blue-100 max-w-2xl leading-relaxed">
                            At JobDuniya, we are committed to protecting the
                            privacy and security of our users' personal
                            information.
                        </p>
                    </div>
                </div>

                {/* Content */}
                <div className="container mx-auto px-4 py-16">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg border border-blue-50 mb-8">
                            <p className="text-slate-600 leading-relaxed text-lg">
                                This Privacy Policy outlines the types of
                                information we collect, how we use it, and the
                                measures we take to safeguard it. By using
                                JobDuniya, you agree to the collection and use of
                                information in accordance with this policy.
                            </p>
                        </div>

                        {sections.map((section, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-2xl p-8 md:p-10 shadow-lg border border-blue-50 mb-6 hover:shadow-xl transition-shadow duration-300"
                            >
                                <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-6 pb-3 border-b-2 border-blue-100">
                                    {section.title}
                                </h2>
                                <div className="space-y-4">
                                    {section.items.map((item, idx) => (
                                        <div
                                            key={idx}
                                            className="pl-4 border-l-3 border-blue-200"
                                        >
                                            {item.subtitle && (
                                                <h3 className="text-lg font-semibold text-slate-700 mb-2">
                                                    {item.subtitle}
                                                </h3>
                                            )}
                                            <p className="text-slate-600 leading-relaxed">
                                                {item.text}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}

                        <div className="bg-linear-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white text-center mt-10">
                            <p className="text-blue-100 text-lg">
                                Last Updated: April 2026
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default PrivacyPolicy;
