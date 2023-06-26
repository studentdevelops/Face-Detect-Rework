"use client"
import particleConfig from "@/utils/particlesjs-config.json"
import { useCallback } from "react";
import Particles from "react-particles";
import { loadFull } from "tsparticles";


const ParticleArea = () => {
    const particlesInit = useCallback(async engine => {
        // console.log(engine);
        await loadFull(engine);
    }, []);

    const particlesLoaded = useCallback(async container => {
        // await console.log(container);
    }, []);
    return (
        <Particles
            id="tsparticles"
            init={particlesInit}
            loaded={particlesLoaded}
            options={particleConfig}
            className="particles"
        />
    );
};

export default ParticleArea;
