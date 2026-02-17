import React from "react";
import img from "../../logo/Logo Files/For Web/png/Color logo - no background.png";

const Footer = () => {
    return (
        <>
            <footer id="footer">
                <div className="w-full bg-[#acc2e4] text-white flex flex-col-reverse md:flex-row justify-center md:justify-around items-center p-4 md:p-0">
                    <p className="mt-4 md:mt-0">
                        Copyright &copy; 2023-24 jobDuniya.in
                    </p>
                    <ul className="flex flex-wrap md:flex-nowrap list-none w-full md:w-auto justify-center md:justify-start items-center gap-4">
                        <li>
                            <a
                                href="#"
                                className="text-white no-underline px-4"
                            >
                                Get Help
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="text-white no-underline px-4"
                            >
                                Terms and Conditions
                            </a>
                        </li>
                    </ul>
                </div>
            </footer>
        </>
    );
};

export default Footer;
