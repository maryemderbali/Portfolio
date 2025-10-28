import { ReactLenis } from "lenis/react";
import { useTransform, motion, useScroll } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";

// Portfolio placeholder images
import pfe from "@/assets/images/mylibrary/1.png";
import home from "@/assets/images/mylibrary/2.png";
import proj from "@/assets/images/mylibrary/3.png";
import bill from "@/assets/images/mylibrary/4.png";

import co1 from "@/assets/images/coconsult/home.png";
import co2 from "@/assets/images/coconsult/login.JPG";
import co3 from "@/assets/images/coconsult/projects.JPG";
import co4 from "@/assets/images/coconsult/bill.JPG";

import ttt1 from "@/assets/images/tictactoe/1.png";
import ttt2 from "@/assets/images/tictactoe/image.png";

import p1 from "@/assets/images/portfolio/1.png";
import p2 from "@/assets/images/portfolio/2.png";

const projects = [
  {
    title: "📚 Library Management SaaS Platform",
    description:
      "Developed a full-featured SaaS platform to digitalize library operations and foster community engagement among readers. Built with Spring Boot (REST APIs), React (frontend), and PostgreSQL (database). Integrated Keycloak for authentication and Flowable BPM for workflow automation. Implemented modules for book management, orders, payments, ratings, and forum discussions.",
    images: [pfe, home, proj, bill],
    color: "#5B8FF9",
    technologies: ["Spring Boot", "React", "PostgreSQL", "Keycloak", "Flowable"],
    githubLink: "https://gitlab.com/derbalimaryem-group/library-management",
  },
  {
    title: "A sleek portfolio built with React and Tailwind CSS ",
    description:
      "A sleek portfolio built with React and Tailwind CSS to showcase your skills, projects, and experience in a modern design.",
    images: [p1, p2],
    color: "#ff89f9ff",
    technologies: ["React", "Tailwind CSS", "Vite"],
    githubLink: "https://github.com/maryemderbali/Portfolio",
  },
  {
    title: "CoConsult - Consultation Platform",
    description:
      "An online platform connecting consultants and clients with integrated scheduling and payment features.",
    images: [co1, co2, co3, co4],
    color: "#7F56D9",
    technologies: ["Angular", "Spring Boot", "MySQL"],
    githubLink: "https://github.com/maryemderbali/COCONSULT-FRONT",
  },
  {
    title: "🎮 Tic Tac Toe Game (HTML / CSS / JS)",
    description:
      "A simple yet fun Tic Tac Toe web game built with pure HTML, CSS, and JavaScript.",
    images: [ttt1, ttt2],
    color: "#FFB84C",
    technologies: ["HTML", "CSS", "JavaScript"],
    githubLink: "https://github.com/maryemderbali/TicTacToe", 
  },
];

export default function Projects() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @media screen and (width: 1366px) and (height: 768px),
             screen and (width: 1367px) and (height: 768px),
             screen and (width: 1368px) and (height: 769px) {
        .project-card {
          scale: 0.85;
          margin-top: -5vh;
        }
        .project-container {
          height: 90vh;
        }
      }
    `;
    document.head.appendChild(style);

    const checkResolution = () => {
      const isTargetResolution =
        window.innerWidth >= 1360 &&
        window.innerWidth <= 1370 &&
        window.innerHeight >= 760 &&
        window.innerHeight <= 775;

      if (isTargetResolution) {
        document.documentElement.style.setProperty("--project-scale", "0.85");
        document.documentElement.style.setProperty("--project-margin", "-5vh");
      } else {
        document.documentElement.style.setProperty("--project-scale", "1");
        document.documentElement.style.setProperty("--project-margin", "0");
      }
    };

    checkResolution();
    window.addEventListener("resize", checkResolution);

    return () => {
      document.head.removeChild(style);
      window.removeEventListener("resize", checkResolution);
    };
  }, []);

  return (
    <ReactLenis root>
      <main className="bg-black" ref={container}>
        <section className="text-white w-full bg-slate-950">
          {projects.map((project, i) => {
            const targetScale = 1 - (projects.length - i) * 0.05;
            return (
              <Card
                key={`p_${i}`}
                i={i}
                images={project.images}
                title={project.title}
                color={project.color}
                description={project.description}
                technologies={project.technologies}
                progress={scrollYProgress}
                range={[i * 0.25, 1]}
                targetScale={targetScale}
                githubLink={project.githubLink}
              />
            );
          })}
        </section>
      </main>
    </ReactLenis>
  );
}

function Card({
  i,
  title,
  description,
  images,
  color,
  progress,
  range,
  targetScale,
  githubLink,
  technologies,
}) {
  const container = useRef(null);
  const scale = useTransform(progress, range, [1, targetScale]);
  const [index, setIndex] = useState(0);

  const prev = () => setIndex((p) => (p === 0 ? images.length - 1 : p - 1));
  const next = () => setIndex((p) => (p === images.length - 1 ? 0 : p + 1));
  const onDragEnd = (_e, info) => {
    if (info.offset.x > 80) prev();
    else if (info.offset.x < -80) next();
  };

  return (
    <div
      ref={container}
      className="h-screen flex items-center justify-center sticky top-0 project-container"
    >
      <motion.div
        style={{
          scale,
          top: `calc(-5vh + ${i * 25}px)`,
          transform: `scale(var(--project-scale, 1))`,
          marginTop: "var(--project-margin, 0)",
        }}
        className="relative -top-[25%] h-auto w-[90%] md:w-[85%] lg:w-[75%] xl:w-[65%] origin-top project-card"
        whileHover={{
          y: -8,
          transition: { duration: 0.3 },
        }}
      >
        <div className="w-full flex flex-col md:flex-row bg-zinc-900 rounded-2xl overflow-hidden shadow-xl">
          {/* Sliding Images */}
          <div className="w-full md:w-[55%] h-[250px] md:h-[400px] lg:h-[450px] relative overflow-hidden flex items-center justify-center">
            <motion.div
              className="flex w-full"
              animate={{ x: `-${index * 100}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {images.map((img, idx) => (
                <motion.div
                  key={idx}
                  className="w-full flex-shrink-0 flex items-center justify-center"
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragEnd={onDragEnd}
                >
                  <img
                    src={img}
                    alt={`${title}-${idx + 1}`}
                    className="max-w-full max-h-[450px] md:max-h-[500px] object-cover"
                    draggable={false}
                  />
                </motion.div>
              ))}
            </motion.div>

            {/* Overlay */}
            <motion.div
              className="absolute inset-0"
              style={{ backgroundColor: color, mixBlendMode: "overlay" }}
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 0.3 }}
              transition={{ duration: 0.3 }}
            />

            {/* Navigation */}
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/60 hover:bg-black/80 px-3 py-2 backdrop-blur text-white"
            >
              ‹
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/60 hover:bg-black/80 px-3 py-2 backdrop-blur text-white"
            >
              ›
            </button>

            {/* Dots */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
              {images.map((_, d) => (
                <button
                  key={d}
                  onClick={() => setIndex(d)}
                  className={`h-2.5 w-2.5 rounded-full transition-all ${
                    d === index ? "bg-white" : "bg-white/40"
                  }`}
                />
              ))}
            </div>

            <div className="absolute top-4 left-4 md:top-6 md:left-6 bg-black/50 backdrop-blur-md text-white px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium">
              Project {i + 1}
            </div>
          </div>

          {/* Content */}
          <div className="w-full md:w-[45%] p-6 md:p-8 lg:p-10 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4 md:mb-6">
                <div
                  className="w-2 h-2 md:w-3 md:h-3 rounded-full"
                  style={{ backgroundColor: color }}
                />
                <div className="h-[1px] w-12 md:w-20 bg-gray-600" />
              </div>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2 md:mb-4">
                {title}
              </h2>
              <p className="text-sm md:text-base text-gray-400 leading-relaxed line-clamp-3 md:line-clamp-none max-w-md">
                {description}
              </p>

              {/* Technologies */}
              <div className="mt-3 flex flex-wrap gap-2 text-xs md:text-sm text-gray-300 font-medium">
                {technologies.map((tech, idx) => (
                  <span
                    key={tech + idx}
                    className="px-2 py-1 bg-gray-800 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-4 md:mt-auto pt-4">
              <div className="w-full h-[1px] bg-gray-800 mb-4 md:mb-6" />
              <motion.a
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2"
                whileHover={{ y: -3 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={color}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
                <span className="text-xs md:text-sm font-medium" style={{ color }}>
                  Code
                </span>
              </motion.a>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

Card.propTypes = {
  i: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  images: PropTypes.array.isRequired,
  color: PropTypes.string.isRequired,
  progress: PropTypes.object.isRequired,
  range: PropTypes.array.isRequired,
  targetScale: PropTypes.number.isRequired,
  githubLink: PropTypes.string.isRequired,
  technologies: PropTypes.array.isRequired,
};
