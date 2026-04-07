import React, { useState } from "react";
import Footer from "../componants/Common/Footer";
import { toast } from "react-toastify";

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        toast.success("Your message has been sent! We'll get back to you soon.");
        setFormData({ name: "", email: "", subject: "", message: "" });
    };

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
                            Contact{" "}
                            <span className="text-blue-200">Us</span>
                        </h1>
                        <p className="text-lg md:text-xl text-blue-100 max-w-2xl leading-relaxed">
                            Have questions or need assistance? We're here to
                            help. Reach out to us anytime.
                        </p>
                    </div>
                </div>

                {/* Content */}
                <div className="container mx-auto px-4 py-16">
                    <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                        {/* Contact Info */}
                        <div>
                            <h2 className="text-3xl font-bold text-slate-800 mb-8">
                                Get In Touch
                            </h2>
                            <div className="space-y-6">
                                {[
                                    {
                                        icon: "fas fa-map-marker-alt",
                                        title: "Our Office",
                                        text: "Shop no 1, JobDuniya Complex, Surat, Gujarat, India",
                                        color: "blue",
                                    },
                                    {
                                        icon: "fas fa-phone-alt",
                                        title: "Phone",
                                        text: "+91 7434869584",
                                        color: "green",
                                    },
                                    {
                                        icon: "fas fa-envelope",
                                        title: "Email",
                                        text: "JobDuniya@gmail.com",
                                        color: "indigo",
                                    },
                                    {
                                        icon: "fas fa-clock",
                                        title: "Working Hours",
                                        text: "Monday - Sunday, 9:00 AM - 10:00 PM",
                                        color: "purple",
                                    },
                                ].map((info, index) => (
                                    <div
                                        key={index}
                                        className="flex items-start gap-4 bg-white rounded-2xl p-6 shadow-lg border border-blue-50 hover:shadow-xl transition-shadow duration-300"
                                    >
                                        <div
                                            className={`w-12 h-12 bg-${info.color}-100 rounded-xl flex items-center justify-center shrink-0`}
                                        >
                                            <i
                                                className={`${info.icon} text-${info.color}-600 text-lg`}
                                            ></i>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-slate-800 mb-1">
                                                {info.title}
                                            </h3>
                                            <p className="text-slate-600">
                                                {info.text}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Social Links */}
                            <div className="mt-8">
                                <h3 className="text-lg font-semibold text-slate-800 mb-4">
                                    Follow Us
                                </h3>
                                <div className="flex gap-3">
                                    {[
                                        {
                                            href: "https://twitter.com",
                                            icon: "fab fa-twitter",
                                        },
                                        {
                                            href: "https://facebook.com",
                                            icon: "fab fa-facebook-f",
                                        },
                                        {
                                            href: "https://youtube.com",
                                            icon: "fab fa-youtube",
                                        },
                                        {
                                            href: "https://instagram.com",
                                            icon: "fab fa-instagram",
                                        },
                                        {
                                            href: "https://linkedin.com",
                                            icon: "fab fa-linkedin-in",
                                        },
                                    ].map((social, index) => (
                                        <a
                                            key={index}
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-11 h-11 flex justify-center items-center bg-blue-50 border border-blue-100 rounded-xl text-blue-600 transition-all duration-300 hover:bg-blue-600 hover:text-white hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/30"
                                        >
                                            <i className={social.icon}></i>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="bg-white rounded-2xl p-8 md:p-10 shadow-lg border border-blue-50">
                            <h2 className="text-2xl font-bold text-slate-800 mb-6">
                                Send Us a Message
                            </h2>
                            <form
                                onSubmit={handleSubmit}
                                className="space-y-5"
                            >
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Your Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-slate-50"
                                        placeholder="Enter your name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-slate-50"
                                        placeholder="Enter your email"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Subject
                                    </label>
                                    <input
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-slate-50"
                                        placeholder="Enter subject"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Message
                                    </label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows={5}
                                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-slate-50 resize-none"
                                        placeholder="Write your message..."
                                    ></textarea>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-linear-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5"
                                >
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ContactUs;
