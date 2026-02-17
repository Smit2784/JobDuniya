import React from "react";
import logoFooter from "../../Images/logoFooter.png";

const Footer = () => {
    return (
        <footer className="relative pt-20 pb-6 bg-gradient-to-br from-slate-900 to-slate-800 text-slate-200 overflow-hidden font-[Inter] border-t border-white/10 before:absolute before:top-0 before:left-0 before:w-full before:h-[1px] before:bg-gradient-to-r before:from-transparent before:via-blue-500 before:to-transparent before:opacity-50">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* About Section */}
                    <div className="flex flex-col items-center md:items-start text-center md:text-left">
                        <img
                            className="max-w-[180px] mb-6 drop-shadow-md"
                            src={logoFooter}
                            alt="JobDuniya Logo"
                        />
                        <p className="text-[0.95rem] leading-relaxed text-slate-400 italic border-l-4 border-blue-500 pl-4 mb-6 md:border-l-0 md:border-t-4 md:pt-4 md:pl-0 lg:border-l-4 lg:border-t-0 lg:pt-0 lg:pl-4">
                            "Unlock Your Career Potential with JobDuniya: Your
                            Gateway to Endless Opportunities! Explore, Apply,
                            Succeed - Where Dreams Meet Destiny. Join the
                            JobDuniya Community Today and Turn Your Ambitions
                            into Achievements. Your Future Starts Here - Let
                            JobDuniya Guide Your Career Journey!"
                        </p>
                        <div className="flex gap-3 mt-6">
                            {[
                                {
                                    href: "https://twitter.com/?lang=en",
                                    icon: "fab fa-twitter",
                                },
                                {
                                    href: "https://www.facebook.com/",
                                    icon: "fab fa-facebook-f",
                                },
                                {
                                    href: "https://www.youtube.com/",
                                    icon: "fab fa-youtube",
                                },
                                {
                                    href: "https://www.instagram.com/",
                                    icon: "fab fa-instagram",
                                },
                                {
                                    href: "https://www.linkedin.com/",
                                    icon: "fab fa-linkedin-in",
                                },
                            ].map((social, index) => (
                                <a
                                    key={index}
                                    href={social.href}
                                    className="w-[42px] h-[42px] flex justify-center items-center bg-white/5 border border-white/10 rounded-xl text-slate-200 transition-all duration-300 backdrop-blur-sm hover:bg-blue-500 hover:border-blue-500 hover:text-white hover:-translate-y-1 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/50"
                                >
                                    <i className={social.icon}></i>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Contact Section */}
                    <div className="flex flex-col items-center md:items-start text-center md:text-left">
                        <div className="mb-6 relative">
                            <h3 className="text-lg font-bold uppercase tracking-wider text-white inline-block relative after:content-[''] after:absolute after:left-0 after:-bottom-2 after:w-full after:h-[3px] after:bg-blue-400 after:rounded-sm">
                                Get In Touch With Us
                            </h3>
                        </div>
                        <div className="space-y-4 text-slate-400">
                            <p className="flex items-start gap-3 justify-center md:justify-start">
                                <i className="fa fa-map-marker-alt text-blue-400 text-lg mt-1"></i>
                                <span>
                                    Shop no 1, JobDuniya Complex, Surat,
                                    <br />
                                    Gujarat, India
                                </span>
                            </p>
                            <p className="flex items-center gap-3 justify-center md:justify-start">
                                <i className="fa fa-phone-alt text-blue-400 text-lg"></i>
                                <span>+91 7434869584</span>
                            </p>
                            <p className="flex items-center gap-3 justify-center md:justify-start">
                                <i className="fa fa-envelope text-blue-400 text-lg"></i>
                                <span>JobDuniya@gmail.com</span>
                            </p>
                            <p className="flex items-center gap-3 justify-center md:justify-start">
                                <i className="far fa-clock text-blue-400 text-lg"></i>
                                <span>Mon - Sun, 9AM - 10PM</span>
                            </p>
                        </div>
                    </div>

                    {/* Support Links */}
                    <div className="flex flex-col items-center md:items-start text-center md:text-left">
                        <div className="mb-6 relative">
                            <h3 className="text-lg font-bold uppercase tracking-wider text-white inline-block relative after:content-[''] after:absolute after:left-0 after:-bottom-2 after:w-full after:h-[3px] after:bg-blue-400 after:rounded-sm">
                                Support Links
                            </h3>
                        </div>
                        <div className="flex flex-col space-y-2 w-full md:w-auto">
                            {[
                                "About Us",
                                "Privacy & Policy",
                                "Terms & Condition",
                                "Contact Us",
                                "Get Help",
                            ].map((link, index) => (
                                <a
                                    key={index}
                                    href="#"
                                    className="block text-slate-400 no-underline py-1.5 text-[0.95rem] transition-all duration-300 hover:text-white hover:pl-3 relative group"
                                >
                                    <span className="absolute left-0 opacity-0 transition-all duration-300 text-blue-400 group-hover:opacity-100 group-hover:left-0">
                                        ›
                                    </span>
                                    {link}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Customer Support & Feedback */}
                    <div className="flex flex-col items-center md:items-start text-center md:text-left">
                        <div className="mb-6 relative">
                            <h3 className="text-lg font-bold uppercase tracking-wider text-white inline-block relative after:content-[''] after:absolute after:left-0 after:-bottom-2 after:w-full after:h-[3px] after:bg-blue-400 after:rounded-sm">
                                Customer Support
                            </h3>
                        </div>
                        <div className="flex flex-col space-y-2 w-full md:w-auto mb-6">
                            {["Contact Us", "Get Help"].map((link, index) => (
                                <a
                                    key={index}
                                    href="#"
                                    className="block text-slate-400 no-underline py-1.5 text-[0.95rem] transition-all duration-300 hover:text-white hover:pl-3 relative group"
                                >
                                    <span className="absolute left-0 opacity-0 transition-all duration-300 text-blue-400 group-hover:opacity-100 group-hover:left-0">
                                        ›
                                    </span>
                                    {link}
                                </a>
                            ))}
                        </div>

                        <div className="bg-white/5 p-5 rounded-2xl border border-white/10 w-full">
                            <h3 className="text-[0.9rem] mb-3 text-slate-200">
                                How would you rate your experience with our
                                website?
                            </h3>
                            <div className="flex gap-2 justify-center md:justify-start group">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <i
                                        key={star}
                                        className="fa fa-star text-2xl text-slate-600 cursor-pointer transition-all duration-200 hover:text-amber-400 hover:scale-110 peer-hover:text-slate-600"
                                    ></i>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-16 pt-6 border-t border-white/10 bg-black/20 text-center">
                    <p className="text-[0.9rem] text-slate-400 m-0">
                        Copyright &copy; 2026{" "}
                        <a
                            href="#"
                            className="text-blue-500 font-semibold no-underline hover:text-blue-400 hover:underline"
                        >
                            JOBDUNIYA
                        </a>{" "}
                        All rights reserved
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
