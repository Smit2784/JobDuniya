import React, { useState } from "react";
import Footer from "../componants/Common/Footer";

const GetHelp = () => {
    const [openFaq, setOpenFaq] = useState(null);

    const faqs = [
        {
            question: "How do I create an account on JobDuniya?",
            answer: 'Click on the "Sign Up" button on the homepage. Fill in your personal details like name, email, and phone number. Create a password and verify your email address. Once verified, your account is ready to use!',
        },
        {
            question: "How do I search for jobs?",
            answer: 'Use the search bar on the homepage or the Jobs page. You can filter jobs by location, category, experience level, salary range, and job type. You can also use the advanced search feature for more specific results.',
        },
        {
            question: "How do I apply for a job?",
            answer: 'Once you find a job you\'re interested in, click on the job listing to view details. Click the "Apply Now" button to submit your application. Make sure your profile and resume are up to date before applying.',
        },
        {
            question: "How can I save jobs for later?",
            answer: 'Click the bookmark/save icon on any job listing to save it to your saved jobs list. You can access your saved jobs from the "Saved" section in the navigation menu.',
        },
        {
            question: "How do I update my profile?",
            answer: 'Go to your profile page by clicking on your avatar or the "Profile" link. Click "Edit Profile" to update your personal information, skills, experience, and education. Don\'t forget to upload or update your resume.',
        },
        {
            question: "How do I reset my password?",
            answer: 'Click on "Forgot Password" on the login page. Enter your registered email address. You will receive a password reset link via email. Click the link and create a new password.',
        },
        {
            question: "Is my personal information secure?",
            answer: "Yes, we take data security very seriously. We use industry-standard encryption and security measures to protect your personal information. Please refer to our Privacy Policy for more details.",
        },
        {
            question: "How do I delete my account?",
            answer: "If you wish to delete your account, please contact our support team at JobDuniya@gmail.com. Please note that account deletion is permanent and all your data will be removed.",
        },
    ];

    const helpCategories = [
        {
            icon: "fas fa-user-circle",
            title: "Account & Profile",
            description:
                "Managing your account, updating profile, and login issues.",
            color: "blue",
        },
        {
            icon: "fas fa-briefcase",
            title: "Job Search & Applications",
            description:
                "Finding jobs, applying, and tracking your applications.",
            color: "indigo",
        },
        {
            icon: "fas fa-shield-alt",
            title: "Privacy & Security",
            description:
                "Data protection, account security, and privacy settings.",
            color: "purple",
        },
        {
            icon: "fas fa-credit-card",
            title: "Payments & Billing",
            description:
                "Payment methods, refunds, and billing related queries.",
            color: "green",
        },
        {
            icon: "fas fa-file-alt",
            title: "Resume & Documents",
            description:
                "Uploading resume, document formats, and file management.",
            color: "orange",
        },
        {
            icon: "fas fa-cogs",
            title: "Technical Support",
            description:
                "Website issues, bugs, browser compatibility, and more.",
            color: "red",
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
                            Get{" "}
                            <span className="text-blue-200">Help</span>
                        </h1>
                        <p className="text-lg md:text-xl text-blue-100 max-w-2xl leading-relaxed">
                            Find answers to common questions and get the support
                            you need.
                        </p>
                    </div>
                </div>

                {/* Content */}
                <div className="container mx-auto px-4 py-16">
                    {/* Help Categories */}
                    <div className="mb-20">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-slate-800 mb-4">
                                How Can We Help You?
                            </h2>
                            <div className="w-20 h-1 bg-blue-500 mx-auto rounded-full"></div>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                            {helpCategories.map((category, index) => (
                                <div
                                    key={index}
                                    className="bg-white rounded-2xl p-6 shadow-lg border border-blue-50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                                >
                                    <div
                                        className={`w-12 h-12 bg-${category.color}-100 rounded-xl flex items-center justify-center mb-4`}
                                    >
                                        <i
                                            className={`${category.icon} text-${category.color}-600 text-xl`}
                                        ></i>
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-800 mb-2">
                                        {category.title}
                                    </h3>
                                    <p className="text-slate-600 text-sm leading-relaxed">
                                        {category.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* FAQs */}
                    <div className="max-w-4xl mx-auto mb-20">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-slate-800 mb-4">
                                Frequently Asked Questions
                            </h2>
                            <div className="w-20 h-1 bg-blue-500 mx-auto rounded-full"></div>
                        </div>
                        <div className="space-y-4">
                            {faqs.map((faq, index) => (
                                <div
                                    key={index}
                                    className="bg-white rounded-2xl shadow-lg border border-blue-50 overflow-hidden hover:shadow-xl transition-shadow duration-300"
                                >
                                    <button
                                        onClick={() =>
                                            setOpenFaq(
                                                openFaq === index
                                                    ? null
                                                    : index
                                            )
                                        }
                                        className="w-full flex items-center justify-between p-6 text-left"
                                    >
                                        <span className="text-lg font-semibold text-slate-800 pr-4">
                                            {faq.question}
                                        </span>
                                        <i
                                            className={`fas fa-chevron-down text-blue-500 transition-transform duration-300 shrink-0 ${
                                                openFaq === index
                                                    ? "rotate-180"
                                                    : ""
                                            }`}
                                        ></i>
                                    </button>
                                    <div
                                        className={`overflow-hidden transition-all duration-300 ${
                                            openFaq === index
                                                ? "max-h-96 pb-6"
                                                : "max-h-0"
                                        }`}
                                    >
                                        <p className="px-6 text-slate-600 leading-relaxed">
                                            {faq.answer}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Still Need Help CTA */}
                    <div className="bg-linear-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 md:p-12 text-white text-center max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold mb-4">
                            Still Need Help?
                        </h2>
                        <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
                            Can't find what you're looking for? Our support team
                            is always ready to assist you.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="/contact-us"
                                className="inline-block bg-white text-blue-600 font-semibold px-8 py-3 rounded-xl hover:bg-blue-50 transition-colors duration-300 shadow-lg"
                            >
                                Contact Us
                            </a>
                            <a
                                href="mailto:JobDuniya@gmail.com"
                                className="inline-block bg-blue-500/30 text-white font-semibold px-8 py-3 rounded-xl hover:bg-blue-500/50 transition-colors duration-300 border border-white/20"
                            >
                                Email Support
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default GetHelp;
