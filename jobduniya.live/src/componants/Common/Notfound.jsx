import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect } from "react";
import img from "../../logo/2.png";
const NotFound = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = Cookies.get("token");
        if (!token) {
            navigate("/loginasuser");
        }
    }, [navigate]);

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-slate-50">
            {/* Animated Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-400/30 rounded-full blur-[100px] animate-[pulse_8s_ease-in-out_infinite]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-cyan-400/30 rounded-full blur-[100px] animate-[pulse_10s_ease-in-out_infinite_reverse]"></div>
                <div className="absolute top-[20%] right-[20%] w-[30%] h-[30%] bg-purple-400/20 rounded-full blur-[80px] animate-[bounce_12s_infinite]"></div>
            </div>

            {/* Glassmorphism Card */}
            <div className="relative z-10 w-full max-w-2xl mx-4 p-8 md:p-12 bg-white/40 backdrop-blur-xl border border-white/50 rounded-3xl shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] flex flex-col items-center text-center animate__animated animate__zoomIn">
                {/* Logo */}
                <img
                    src={img}
                    alt="JobDuniya Logo"
                    className="h-12 md:h-16 mb-8 drop-shadow-md select-none opacity-90 hover:opacity-100 transition-opacity duration-300"
                />

                {/* 404 Text */}
                <h1 className="text-[120px] md:text-[180px] leading-none font-black text-transparent bg-clip-text bg-linear-to-r from-blue-600 via-cyan-500 to-purple-600 drop-shadow-sm select-none animate__animated animate__fadeInUp">
                    404
                </h1>

                {/* Message */}
                <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mt-4 mb-4 font-[Inter] animate__animated animate__fadeInUp ">
                    Lost in Space?
                </h2>

                <p className="text-slate-600 text-lg max-w-md mx-auto mb-8 leading-relaxed animate__animated animate__fadeInUp ">
                    The page you are looking for seems to have drifted away into
                    the digital void. Let's get you back on track.
                </p>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 w-full justify-center animate__animated animate__fadeInUp ">
                    <button
                        onClick={() => navigate(-1)}
                        className="px-8 py-3.5 rounded-xl border border-white/60 bg-white/50 hover:bg-white text-slate-700 font-semibold backdrop-blur-sm transition-all duration-300 shadow-sm hover:shadow-md flex items-center justify-center gap-2 group"
                    >
                        <i className="fa-solid fa-arrow-left group-hover:-translate-x-1 transition-transform duration-300"></i>
                        Go Back
                    </button>

                    <button
                        onClick={() => navigate("/")}
                        className="px-8 py-3.5 rounded-xl bg-linear-to-r from-blue-600 to-cyan-500 text-white font-semibold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                        <i className="fa-solid fa-house"></i>
                        Back to Home
                    </button>
                </div>
            </div>

            {/* Footer Note */}
            <div className="absolute bottom-17 text-slate-400 text-sm font-medium z-10 animate__animated animate__fadeIn ">
                JobDuniya &copy; {new Date().getFullYear()}
            </div>
        </div>
    );
};
export default NotFound;
