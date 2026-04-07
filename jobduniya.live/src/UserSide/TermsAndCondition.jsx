import React from "react";
import Footer from "../componants/Common/Footer";

const TermsAndCondition = () => {
    const sections = [
        {
            title: "Introduction",
            content: [
                "Welcome to JOB DUNIYA! These terms and conditions outline the rules and regulations for the use of our website.",
                'By accessing this website, we assume you accept these terms and conditions. Do not continue to use JOB DUNIYA if you do not agree to all the terms and conditions stated on this page.',
                'The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice and all agreements: "Client", "You" and "Your" refers to you, the person log on this website and compliant to the Company\'s terms and conditions. "The Company", "Ourselves", "We", "Our" and "Us", refers to our Company. "Party", "Parties", or "Us", refers to both the Client and ourselves.',
            ],
        },
        {
            title: "Cookies",
            content: [
                "We employ the use of cookies. By accessing JOB DUNIYA, you agreed to use cookies in agreement with the JobDuniya's Privacy Policy.",
                "Most interactive websites use cookies to let us retrieve the user's details for each visit. Cookies are used by our website to enable the functionality of certain areas to make it easier for people visiting our website.",
            ],
        },
        {
            title: "License",
            content: [
                "Unless otherwise stated, JOB DUNIYA and/or its licensors own the intellectual property rights for all material on JOB DUNIYA. All intellectual property rights are reserved. You may access this from JOB DUNIYA for your own personal use subjected to restrictions set in these terms and conditions.",
            ],
            list: [
                "Republish material from JOB DUNIYA",
                "Sell, rent or sub-license material from JOB DUNIYA",
                "Reproduce, duplicate or copy material from JOB DUNIYA",
                "Redistribute content from JOB DUNIYA",
            ],
            listTitle: "You must not:",
        },
        {
            title: "Comments",
            content: [
                "Parts of this website offer an opportunity for users to post and exchange opinions and information in certain areas of the website. JOB DUNIYA does not filter, edit, publish or review Comments prior to their presence on the website. Comments do not reflect the views and opinions of JOB DUNIYA, its agents and/or affiliates.",
                "JOB DUNIYA reserves the right to monitor all Comments and to remove any Comments which can be considered inappropriate, offensive or causes breach of these Terms and Conditions.",
            ],
            list: [
                "You are entitled to post the Comments on our website and have all necessary licenses and consents to do so;",
                "The Comments do not invade any intellectual property right, including without limitation copyright, patent or trademark of any third party;",
                "The Comments do not contain any defamatory, libelous, offensive, indecent or otherwise unlawful material which is an invasion of privacy;",
                "The Comments will not be used to solicit or promote business or custom or present commercial activities or unlawful activity.",
            ],
            listTitle: "You warrant and represent that:",
        },
        {
            title: "Hyperlinking to our Content",
            content: [
                "The following organizations may link to our Website without prior written approval:",
            ],
            list: [
                "Government agencies",
                "Search engines",
                "News organizations",
                "Online directory distributors may link to our Website in the same manner as they hyperlink to the Websites of other listed businesses",
            ],
        },
        {
            title: "iFrames",
            content: [
                "Without prior approval and written permission, you may not create frames around our Webpages that alter in any way the visual presentation or appearance of our Website.",
            ],
        },
        {
            title: "Content Liability",
            content: [
                "We shall not be held responsible for any content that appears on your Website. You agree to protect and defend us against all claims that is rising on your Website. No link(s) should appear on any Website that may be interpreted as libelous, obscene or criminal, or which infringes, otherwise violates, or advocates the infringement or other violation of, any third party rights.",
            ],
        },
        {
            title: "Reservation of Rights",
            content: [
                "We reserve the right to request that you remove all links or any particular link to our Website. You approve to immediately remove all links to our Website upon request. We also reserve the right to amend these terms and conditions and its linking policy at any time. By continuously linking to our Website, you agree to be bound to and follow these linking terms and conditions.",
            ],
        },
        {
            title: "Disclaimer",
            content: [
                "To the maximum extent permitted by applicable law, we exclude all representations, warranties and conditions relating to our website and the use of this website. Nothing in this disclaimer will:",
            ],
            list: [
                "Limit or exclude our or your liability for death or personal injury;",
                "Limit or exclude our or your liability for fraud or fraudulent misrepresentation;",
                "Limit any of our or your liabilities in any way that is not permitted under applicable law;",
                "Exclude any of our or your liabilities that may not be excluded under applicable law.",
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
                            Terms &{" "}
                            <span className="text-blue-200">Conditions</span>
                        </h1>
                        <p className="text-lg md:text-xl text-blue-100 max-w-2xl leading-relaxed">
                            Please read these terms and conditions carefully
                            before using our platform.
                        </p>
                    </div>
                </div>

                {/* Content */}
                <div className="container mx-auto px-4 py-16">
                    <div className="max-w-4xl mx-auto">
                        {sections.map((section, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-2xl p-8 md:p-10 shadow-lg border border-blue-50 mb-6 hover:shadow-xl transition-shadow duration-300"
                            >
                                <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-6 pb-3 border-b-2 border-blue-100">
                                    {section.title}
                                </h2>
                                <div className="space-y-4">
                                    {section.content.map((para, idx) => (
                                        <p
                                            key={idx}
                                            className="text-slate-600 leading-relaxed"
                                        >
                                            {para}
                                        </p>
                                    ))}
                                    {section.listTitle && (
                                        <p className="text-slate-700 font-semibold mt-4">
                                            {section.listTitle}
                                        </p>
                                    )}
                                    {section.list && (
                                        <ul className="list-none space-y-3 mt-3">
                                            {section.list.map((item, idx) => (
                                                <li
                                                    key={idx}
                                                    className="flex items-start gap-3 text-slate-600"
                                                >
                                                    <span className="mt-1.5 w-2 h-2 bg-blue-500 rounded-full shrink-0"></span>
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
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

export default TermsAndCondition;
