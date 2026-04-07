import React, { useState, useEffect } from "react";

const ScrollToTop = ({ scrollRef }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = scrollRef?.current;
        if (!el) return;

        const handleScroll = () => {
            setVisible(el.scrollTop > 300);
        };

        el.addEventListener("scroll", handleScroll);
        return () => el.removeEventListener("scroll", handleScroll);
    }, [scrollRef]);

    const scrollToTop = () => {
        scrollRef?.current?.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <button
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className={`fixed bottom-8 right-8 z-9999 w-12 h-12 rounded-full bg-blue-600 text-white shadow-lg shadow-blue-500/40 flex items-center justify-center transition-all duration-300 hover:bg-blue-700 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/50 cursor-pointer ${
                visible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4 pointer-events-none"
            }`}
        >
            <i className="fas fa-arrow-up text-lg"></i>
        </button>
    );
};

export default ScrollToTop;
