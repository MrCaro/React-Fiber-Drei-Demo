
import { useRef, Suspense, useState } from 'react';

import { Canvas, useFrame } from 'react-three-fiber';
import { softShadows, OrbitControls, Stars, useGLTF } from '@react-three/drei';
import { useSpring, a } from 'react-spring/three';

import './App.scss';
import PlanetsData from './data/planets.json';
import Model from './3d/NOVELO_EARTH.glb';

softShadows();

const PlanetEarth = (props) => {
    const group = useRef(null);
    const { nodes, materials } = useGLTF(Model);
    const scaleValue = [0.03, 0.03, 0.03];

    const [expand, setExpand] = useState(false);

    const propClick = useSpring({
        scale: expand ? [0.06, 0.06, 0.06] : scaleValue
    });

    useFrame(() => (group.current.rotation.y += 0.001));

    return (
        <group ref={group} {...props} dispose={null} >
            <a.mesh onClick={() => setExpand(!expand)} scale={propClick.scale} material={materials['02___Default']} geometry={nodes['buffer-0-mesh-0'].geometry} />
            <a.mesh onClick={() => setExpand(!expand)} scale={propClick.scale} material={materials.Mat} geometry={nodes['buffer-0-mesh-0_1'].geometry} />
        </group>
    )
}

const DisplayPlanetInfo = (props) => {                                                                   
    return (
        <div className={props.display}>
            <div className="planet-info-wrapper">
                <h1>{props.planet.name}</h1>
                <p>{props.planet.info}</p>
            </div>
        </div>
    );
}

function App() {
    const [showPlanetInfo, setShowPlanetInfo] = useState('');
    const [visibilityPlanetInfo, setVisibilityPlanetInfo] = useState(false);

    return (
    <>
        <Canvas
            shadowMap
            colorManagement
            camera={{position: [10, 50, 50], fov: 70}}
        >
            <ambientLight intensity={.5} />
            <directionalLight
                castShadow
                position={[0, 10, 0]}
                intensity={1.5}
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
                shadow-camera-far={50}
                shadow-camera-left={-10}
                shadow-camera-right={10}
                shadow-camera-top={10}
                shadow-camera-bottom={-10}
            />
            <pointLight position={[-10, 0, -20]} intensity={.5}/>
            <pointLight position={[0, -10, 0]} intensity={1.5}/>
            <Suspense fallback={null}>
                {PlanetsData.map((planet, i) => (
                    <PlanetEarth 
                        key={i} 
                        onClick={() => {setShowPlanetInfo(planet); setVisibilityPlanetInfo(!visibilityPlanetInfo)}} 
                        position={planet.position}
                    />
                ))}
            </Suspense>
            <Stars
                radius={100} 
                depth={50} 
                count={5000} 
                factor={4} 
                saturation={0} 
            />
            <OrbitControls />
        </Canvas>
        <DisplayPlanetInfo 
            display={visibilityPlanetInfo ? "" : "hide"}  
            planet={showPlanetInfo} 
        />
    </>
    );
}

export default App;
