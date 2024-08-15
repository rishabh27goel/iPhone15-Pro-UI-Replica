import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React, { useEffect, useRef, useState } from 'react';
import ModalView from './ModalView';
import { yellowImg } from '../utils';
import { Canvas } from '@react-three/fiber';
import { View } from '@react-three/drei';
import * as THREE from 'three';
import { models, sizes } from '../constants';

const Model = () => {

    const [modelSize, setModelSize] = useState('small');
    const [model, setModel] = useState({
        title: 'iPhone 15 Pro is Natural Titanium',
        color: ['#8F8A81', '#FFE789', '#6F6C64'],
        img: yellowImg
    });

    // Camera control
    const cameraControlSmall = useRef();
    const cameraControlLarge = useRef();

    // Models Ref
    const smallModel = useRef(new THREE.Group());
    const largeModel = useRef(new THREE.Group());

    // To track model rotation
    const [smallModelRotation, setSmallModelRotation] = useState(0);
    const [largeModelRotation, setLargeModelRotation] = useState(0);

    useGSAP(() => {
        gsap.to("#heading", {
            opacity: 1,
            y: 0
        });
    }, []);

    return (
        <section className="common-padding">
            <div className="screen-max-width">
                <h1 id="heading" className="section-heading">
                    Take a closer look.
                </h1>
            </div>
            <div className="flex flex-col items-center mt-5">
                <div className="w-full h-[75vh] md:h-[90vh] overflow-hidden relative">
                    <ModalView
                        index={1}
                        item={model}
                        size={modelSize}
                        groupRef={smallModel}
                        gsapType='small-view'
                        control={cameraControlSmall}
                        setRotationState={setSmallModelRotation}
                    />

                    <ModalView
                        index={2}
                        item={model}
                        size={modelSize}
                        groupRef={largeModel}
                        gsapType='large-view'
                        control={cameraControlLarge}
                        setRotationState={setLargeModelRotation}
                    />

                    <Canvas
                        className="w-full h-full"
                        style={{
                            position: 'fixed',
                            top: 0,
                            bottom: 0,
                            left: 0,
                            right: 0,
                            overflow: 'hidden'
                        }}
                        eventSource={document.getElementById('root')}
                    >
                        <View.Port />
                    </Canvas>
                </div>
                <div className="mx-auto w-full">
                    <p className="text-sm font-light text-center mb-5">
                        {model.title}
                    </p>
                    <div className="flex-center">
                        <ul className="color-container">
                            {models.map((item, idx) => (
                                <li
                                    key={idx}
                                    className="w-6 h-6 rounded-full mx-2 cursor-pointer"
                                    style={{ backgroundColor: item.color[0] }}
                                    onClick={() => setModel(item)}
                                />
                            ))}
                        </ul>
                        <button className="size-btn-container">
                            {
                                sizes.map(({ label, value }) => (
                                    <span
                                        key={label}
                                        className="size-btn"
                                        style={{ 
                                            backgroundColor: modelSize === value ? 'white' : 'transparent', 
                                            color: modelSize === value ? 'black' : 'white' 
                                        }}
                                        onClick={() => setModelSize(value)}
                                    >
                                        {label}
                                    </span>
                                ))
                            }
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Model;