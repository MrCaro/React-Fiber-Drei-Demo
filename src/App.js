
import { useRef } from 'react';
import './App.scss';

import { Canvas, useFrame } from 'react-three-fiber';

import { softShadows, MeshWobbleMaterial, OrbitControls, Stars} from '@react-three/drei';

softShadows();

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

function App() {
    return (
    <>
        <Canvas
            shadowMap
            colorManagement
            camera={{position: [-5, 2, 10], fov: 70}}
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
            <group>
                <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]}>
                    <planeBufferGeometry attach='geometry' args={[50, 50]}/>
                    <shadowMaterial attach='material' opacity={.3} />
                </mesh>
            </group>
            <CustomBoxMesh position={[-2, 1, -5]} color='yellow' speed={6}/>
            <CustomBoxMesh position={[0, 1, 0]} args={[3, 2, 1]} color='lightblue' speed={1}/>
            <CustomBoxMesh position={[5, 1, -2]} color='pink' speed={6}/>
            <Stars
                radius={100} // Radius of the inner sphere (default=100)
                depth={50} // Depth of area where stars should fit (default=50)
                count={5000} // Amount of stars (default=5000)
                factor={4} // Size factor (default=4)
                saturation={0} // Saturation 0-1 (default=0)
            />
            <OrbitControls/>
        </Canvas>
    </>
    );
}

export default App;
