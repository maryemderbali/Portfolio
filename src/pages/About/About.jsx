import HeroImg from "@/assets/images/hero.jpg";

export default function About() {
  return (
    <>
      <section id="about" className="py-16 md:py-32  text-white bg-[#04081A]">
        <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-16">
          <h2 className="relative z-10 max-w-xl text-4xl font-medium lg:text-5xl text-white">
            Engineer, Developer, Creator, Innovator
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 md:gap-12 lg:gap-24">
            <div className="relative mb-6 sm:mb-0">
              <div className="bg-linear-to-b aspect-76/59 relative rounded-2xl p-px from-zinc-300 to-transparent">
                <img
                  src={HeroImg}
                  className="rounded-[15px] shadow block"
                  alt="payments illustration"
                  width={1207}
                  height={929}
                />
              </div>
            </div>

            <div className="relative space-y-4">
              <p className="text-white">
                Hello! Im Maryem Derbali, a passionate Fullstack Developer.
                I specialize in building scalable SaaS platforms, web applications, and secure, user-friendly interfaces.{" "}
              </p>

              <div className="pt-6">
                <blockquote className="border-l-4 border-gray-300 pl-4">
                  <p className="text-white">
                    I am a lifelong learner and problem solver, committed to delivering innovative solutions.
                    My experience includes developing multi-module SaaS platforms, implementing DevOps pipelines,
                    and integrating AI-based features to enhance user experiences.
                  </p>

                  <div className="mt-6 space-y-3">
                    <cite className="block font-medium text-white">
                      Maryem Derbali
                    </cite>
                  </div>
                  <div className="mt-6 space-y-3">
                    <cite className="block font-medium text-white">
                      Skills & Expertise:
                    </cite>
                    <ul className="text-white list-disc list-inside space-y-1">
                      <li>Java, Spring Boot, React, Angular, Node.js</li>
                      <li>PostgreSQL, MySQL, MongoDB</li>
                      <li>Docker, Jenkins, Flowable BPM, Git</li>
                      <li>AI-driven recommendation systems & SaaS development</li>
                    </ul>
                  </div>
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
