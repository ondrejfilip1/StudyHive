import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import SplitText from "@/components/blocks/TextAnimations/SplitText/SplitText";
import Logo from "@/assets/img/logo.svg";
import Header from "@/components/header";

export default function Home() {
  return (
    <>
      <Header />
      <section className="py-32">
        <div className="container mx-auto">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
              <SplitText
                text="StudyHive"
                className="my-6 text-5xl font-bold text-pretty lg:text-7xl manrope_font tracking-tight"
                delay={100}
                duration={0.6}
                ease="power3.out"
                splitType="chars"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="-100px"
                textAlign="center"
              />
              <p className="mb-8 max-w-xl text-muted-foreground lg:text-xl">
                StudyHive is the modern chat and collaboration app built just
                for students. Whether you're stuck on homework, preparing for
                exams, or looking to share knowledge — StudyHive connects you
                with a community of learners to help you grow.
              </p>
              <div className="flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start">
                <Button asChild className="w-full sm:w-auto">
                  <Link to="/download">Download app</Link>
                </Button>

                <Button asChild variant="outline" className="w-full sm:w-auto">
                  <Link to="/login">
                    Try out
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </div>
            </div>
            <img
              className="max-h-96 w-full rounded-md object-contain"
              alt="logo"
              src={Logo}
            />
          </div>
        </div>
      </section>
    </>
  );
}
