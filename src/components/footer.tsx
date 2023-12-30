import Link from "next/link";

const Footer = () => {
  return (
    <footer className="font-secondary text-center text-xs font-medium text-[#a9a9a9] sm:text-sm">
      created by{" "}
      <Link
        href="https://github.com/jorgeguedess"
        target="_blank"
        className="hover:text-blue-500 focus:text-blue-500 font-bold underline outline-none transition-colors"
      >
        Jorge Guedes
      </Link>{" "}
      - devChallenges.io
    </footer>
  );
};

export default Footer;
