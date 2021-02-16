
import { useRef, Suspense, useState } from 'react';

import { Canvas, useFrame } from 'react-three-fiber';
import { OrbitControls, Stars, useGLTF } from '@react-three/drei';
import { useSpring, a } from 'react-spring/three';

import './App.scss';
import PlanetsData from './data/planets.json';
import Mars from './3d/Mars_1239.glb';
import Earth from './3d/NOVELO_EARTH.glb';
import Jupiter from './3d/Jupiter.glb'

const PlanetMars = (props) => {
    const group = useRef(null);
    const [expand, setExpand] = useState(false);

    const { nodes, materials } = useGLTF(Mars);
    const scaleValue = [0.2, 0.2, 0.2];

    const propClick = useSpring({
        scale: expand ? [0.4, 0.4, 0.4] : scaleValue
    });

    useFrame(() => (group.current.rotation.y += 0.004));

    return (
        <group ref={group} {...props} dispose={null}>
            <a.mesh onClick={() => setExpand(!expand)} scale={propClick.scale} material={materials['05___Default']} geometry={nodes['buffer-0-mesh-0'].geometry} />
            <a.mesh onClick={() => setExpand(!expand)} scale={propClick.scale} material={materials['04___Default']} geometry={nodes['buffer-0-mesh-0_1'].geometry} />
        </group>
    )
}

const PlanetEarth = (props) => {
    const group = useRef(null);
    const [expand, setExpand] = useState(false);

    const { nodes, materials } = useGLTF(Earth);
    const scaleValue = [0.03, 0.03, 0.03];

    const propClick = useSpring({
        scale: expand ? [0.06, 0.06, 0.06] : scaleValue
    });

    useFrame(() => (group.current.rotation.y += 0.001));

    return (
        <>
        <group ref={group} {...props} dispose={null} >
            <a.mesh onClick={() => setExpand(!expand)} scale={propClick.scale} material={materials['02___Default']} geometry={nodes['buffer-0-mesh-0'].geometry} />
            <a.mesh onClick={() => setExpand(!expand)} scale={propClick.scale} material={materials.Mat} geometry={nodes['buffer-0-mesh-0_1'].geometry} />
        </group>
        </>
    )
}

const PlanetJupiter = (props) => {
    const group = useRef(null);
    const [expand, setExpand] = useState(false);

    const { nodes, materials } = useGLTF(Jupiter);
    const scaleValue = [0.2, 0.2, 0.2];

    const propClick = useSpring({
        scale: expand ? [0.4, 0.4, 0.4] : scaleValue
    });

    useFrame(() => (group.current.rotation.y += 0.0008));

    return (
    <group ref={group} {...props} dispose={null}>
        <group position={[-0.98, 103.49, 0.34]}>
        <group position={[0.98, -103.49, -0.34]}>
            <a.mesh onClick={() => setExpand(!expand)} scale={propClick.scale} material={materials.Mat} geometry={nodes['node-0'].geometry} />
        </group>
        </group>
    </group>
    )
}

const DisplayTips = () => {
    return (
        <div className="tips-wrapper">
            <h1>Solar System</h1>
            <p>use your mouse to rotate, scroll and zoom through the solar system</p>
        </div>
    )
}

const DisplayPlanetInfo = (props) => {                                                                   
    return (
        <div className={props.display}>
            <div className="planet-info-wrapper">
                <h2>{props.planet.name}</h2>
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
                intensity={1}
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
                <PlanetMars 
                    key={0} 
                    onClick={() => {setShowPlanetInfo(PlanetsData[0]); setVisibilityPlanetInfo(!visibilityPlanetInfo)}} 
                    position={PlanetsData[0].position}
                    planet={PlanetsData[0]}
                />
                <PlanetEarth 
                    key={1} 
                    onClick={() => {setShowPlanetInfo(PlanetsData[1]); setVisibilityPlanetInfo(!visibilityPlanetInfo)}} 
                    position={PlanetsData[1].position}
                    planet={PlanetsData[1]}
                />
                <PlanetJupiter 
                    key={2} 
                    onClick={() => {setShowPlanetInfo(PlanetsData[2]); setVisibilityPlanetInfo(!visibilityPlanetInfo)}} 
                    position={PlanetsData[2].position}
                    planet={PlanetsData[2]}
                />
            </Suspense>
            <Stars
                radius={100} 
                depth={50} 
                count={5000} 
                factor={4} 
                saturation={0} 
            />
            <OrbitControls 
                minDistance={50}
                maxDistance={150}
            />
        </Canvas>
        <DisplayTips />
        <DisplayPlanetInfo 
            display={visibilityPlanetInfo ? "show" : "hide"}  
            planet={showPlanetInfo} 
        />
    </>
    );
}

export default App;
