import "./App.css";
import Hero from "./components/sections/Hero.tsx";
import {Layout} from "./components/layout/Layout.tsx";
import {usePortfolioConfig} from "./hooks/usePortfolioConfig.tsx";
import Projects from "./components/sections/Projects.tsx";
import Skills from "./components/sections/Skills.tsx";
import Experience from "./components/sections/Experience.tsx";
import Blog from "./components/sections/Blog";
import Contact from "./components/sections/Contact.tsx";
import {useLayoutEffect} from "react";

function App() {
    const {personal} = usePortfolioConfig()

    useLayoutEffect(()=>{
        document.title = `${personal.name} - ${personal.role}`;
    },[personal])

  return (
    <Layout>
        <Hero />
        <Projects />
        <Skills />
        <Experience />
        <Blog />
        <Contact />
    </Layout>
  );
}

export default App;
