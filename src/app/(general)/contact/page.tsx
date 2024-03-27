import Tooltip from "@/components/Tooltip";
import { Contact, Github, Globe, Linkedin } from "lucide-react";
import Link from "next/link";

type Props = {};

const ContactPage = (props: Props) => {
  return (
    // <iframe src="https://juniorhuanca.vercel.app/" className="w-full h-screen" />
    <div className="flex items-center justify-center h-screen">
      <div className="bg-rose-600 p-8 rounded-lg text-center text-white shadow-xl animate-jump-in max-w-xl">
        <Contact
          size={64}
          className="mx-auto mb-4 animate-jump-in animate-delay-1000"
        />
        <h2 className="text-3xl font-semibold animate-flip-up animate-delay-1000">
          Contactame
        </h2>
        <div className="mb-4">
          <p className="text-lg animate-flip-up animate-delay-1000">
            Sitio creado por <strong>Junior Huanca.</strong> ¡No dudes en
            contactarme si tienes alguna consulta o duda!
          </p>
          <ul className="mt-12 flex justify-center gap-6 md:gap-8 animate-flip-down animate-delay-1000">
            <li>
              <Link
                href="https://github.com/JuniorHuanca"
                rel="noreferrer"
                target="_blank"
              >
                <span className="sr-only">GitHub</span>
                <Tooltip
                  text="GitHub"
                  icon={<Github size={60} />}
                  alignment="top"
                />
              </Link>
            </li>
            <li>
              <Link
                href="https://www.linkedin.com/in/juniorhuanca/"
                rel="noreferrer"
                target="_blank"
              >
                <span className="sr-only">Linkedin</span>
                <Tooltip
                  text="Linkedin"
                  icon={<Linkedin size={60} />}
                  alignment="top"
                />
              </Link>
            </li>
            <li>
              <Link
                href="https://juniorhuanca.vercel.app/"
                rel="noreferrer"
                target="_blank"
              >
                <span className="sr-only">Sitio Web</span>
                <Tooltip
                  text="Sitio Web"
                  icon={<Globe size={60} />}
                  alignment="top"
                />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
