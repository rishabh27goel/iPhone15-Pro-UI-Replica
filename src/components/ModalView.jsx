import { Html, OrbitControls, PerspectiveCamera, View } from '@react-three/drei';
import React, { Suspense } from 'react';
import Lights from './Lights';
import IPhone from './iPhone';
import * as THREE from 'three';
import Loader from './Loader';

const ModalView = ({ index, item, size, groupRef, gsapType, controlRef, setRotationState }) => {
  return (
    <View
      id={gsapType}
      index={index}
      className={`w-full h-full absolute ${index === 2 && 'right-[-100%]'}`}
    >
      {/* Ambient Light */}
      <ambientLight intensity={1} />

      {/* Default Camera */}
      <PerspectiveCamera makeDefault position={[0, 0, 4]} />

      {/* Group of Lights */}
      <Lights />

      <OrbitControls 
        makeDefault
        ref={controlRef}
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.7}
        target={new THREE.Vector3(0, 0, 0)}
        onEnd={() => setRotationState(controlRef.current.getAzimuthalAngle())}
      />

      <group 
        ref={groupRef} 
        name={index === 1 ? 'small' : 'large'}
        position={[0, 0, 0]}  
      >
        <Suspense fallback={<Loader />}>
          <IPhone 
            scale={index === 1 ? [15, 15, 15] : [17, 17, 17]}
            rotation={[(10 * Math.PI) / 180, (220 * Math.PI) / 180, 0]}
            item={item}
            size={size}
          />
        </Suspense>
      </group>
    </View>
  );
}

export default ModalView;