
import { useRef, Suspense } from 'react';

import { Canvas, useFrame, useLoader } from 'react-three-fiber';
import { softShadows, MeshWobbleMaterial, OrbitControls, Stars, useGLTF } from '@react-three/drei';

import './App.scss';
import Model from './3d/NOVELO_EARTH.glb';

softShadows();

const ModelCustom = (props) => {
    const group = useRef(null);
    const { nodes, materials } = useGLTF(Model);
    const scaleValue = 0.03;

    useFrame(() => (group.current.rotation.y += 0.001));

    return (
        <group ref={group} {...props} dispose={null}>
            <mesh scale={[scaleValue, scaleValue, scaleValue]} material={materials['02___Default']} geometry={nodes['buffer-0-mesh-0'].geometry} />
            <mesh castShadow scale={[scaleValue, scaleValue, scaleValue]} material={materials.Mat} geometry={nodes['buffer-0-mesh-0_1'].geometry} />
        </group>
    )
}

const CustomBoxMesh = ({ position, args, color, speed }) => {
    const mesh = useRef(null);
    useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01));

    return (
        <mesh castShadow ref={mesh} position={position}>
            <boxBufferGeometry attach='geometry' args={args} />
            <MeshWobbleMaterial
                attach='material'
                color={color}
                speed={speed}
                factor={0.3}
            />
        </mesh>
    )
}

const Plane = () => {
    return (
        <group>
            <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]}>
                <planeBufferGeometry attach='geometry' args={[50, 50]}/>
                <shadowMaterial attach='material' opacity={.3} />
            </mesh>
        </group>
    )
}

function App() {
    return (
    <>
        <Canvas
            shadowMap
            colorManagement
            camera={{position: [-5, 20, 50], fov: 70}}
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
            <Suspense fallback={null}>
                <ModelCustom />
            </Suspense>
            <pointLight position={[-10, 0, -20]} intensity={.5}/>
            <pointLight position={[0, -10, 0]} intensity={1.5}/>
            <CustomBoxMesh position={[-20, 25, -5]} color='green' speed={4}/>
            <CustomBoxMesh position={[35, 15, -20]} args={[5, 10, 10]} color='lightgray' speed={1}/>
            <CustomBoxMesh position={[12, 10, 11]} color='red' speed={4}/>
            <Stars
                radius={100} 
                depth={50} 
                count={5000} 
                factor={4} 
                saturation={0} 
            />
            <OrbitControls/>
        </Canvas>
    </>
    );
}

export default App;
