"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

interface FractalCanvasProps {
    maxIterations: number;
    zoom: number;
    centerX: number;
    centerY: number;
    colorScheme: "classic" | "fire" | "ice" | "rainbow";
}

// Mandelbrot shader
const mandelbrotVertexShader = `
    varying vec2 vUv;
    void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`;

const mandelbrotFragmentShader = `
    uniform int maxIterations;
    uniform float zoom;
    uniform vec2 center;
    uniform int colorScheme;
    varying vec2 vUv;
    
    vec3 getColor(float t, int scheme) {
        if (scheme == 0) {
            // Classic
            return vec3(t, t * 0.5, t * t);
        } else if (scheme == 1) {
            // Fire
            return vec3(t, t * t, t * t * t);
        } else if (scheme == 2) {
            // Ice
            return vec3(t * t * t, t * t, t);
        } else {
            // Rainbow
            float r = sin(t * 6.28318) * 0.5 + 0.5;
            float g = sin(t * 6.28318 + 2.09439) * 0.5 + 0.5;
            float b = sin(t * 6.28318 + 4.18879) * 0.5 + 0.5;
            return vec3(r, g, b);
        }
    }
    
    void main() {
        // Map UV to complex plane
        vec2 c = (vUv - 0.5) * 4.0 / zoom + center;
        
        // Mandelbrot iteration: z = z² + c
        vec2 z = vec2(0.0, 0.0);
        int iterations = 0;
        
        for (int i = 0; i < 1000; i++) {
            if (i >= maxIterations) break;
            
            // z² = (x² - y², 2xy)
            float x2 = z.x * z.x;
            float y2 = z.y * z.y;
            
            if (x2 + y2 > 4.0) {
                iterations = i;
                break;
            }
            
            z = vec2(x2 - y2, 2.0 * z.x * z.y) + c;
            iterations = i + 1;
        }
        
        // Color based on escape time
        if (iterations == maxIterations) {
            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
        } else {
            float t = float(iterations) / float(maxIterations);
            // Smooth coloring
            float smoothT = t - log2(log2(dot(z, z))) / log2(2.0);
            smoothT = clamp(smoothT, 0.0, 1.0);
            
            vec3 color = getColor(smoothT, colorScheme);
            gl_FragColor = vec4(color, 1.0);
        }
    }
`;

function FractalPlane({ maxIterations, zoom, centerX, centerY, colorScheme }: FractalCanvasProps) {
    const meshRef = useRef<THREE.Mesh>(null);
    
    const uniforms = useMemo(() => ({
        maxIterations: { value: maxIterations },
        zoom: { value: zoom },
        center: { value: new THREE.Vector2(centerX, centerY) },
        colorScheme: { value: colorScheme === "classic" ? 0 : colorScheme === "fire" ? 1 : colorScheme === "ice" ? 2 : 3 },
    }), [maxIterations, zoom, centerX, centerY, colorScheme]);
    
    useFrame(() => {
        if (meshRef.current) {
            const material = meshRef.current.material as THREE.ShaderMaterial;
            material.uniforms.maxIterations.value = maxIterations;
            material.uniforms.zoom.value = zoom;
            material.uniforms.center.value.set(centerX, centerY);
            material.uniforms.colorScheme.value = 
                colorScheme === "classic" ? 0 : 
                colorScheme === "fire" ? 1 : 
                colorScheme === "ice" ? 2 : 3;
        }
    });
    
    return (
        <mesh ref={meshRef}>
            <planeGeometry args={[10, 10, 1, 1]} />
            <shaderMaterial
                vertexShader={mandelbrotVertexShader}
                fragmentShader={mandelbrotFragmentShader}
                uniforms={uniforms}
            />
        </mesh>
    );
}

function FractalScene(props: FractalCanvasProps) {
    return (
        <>
            <ambientLight intensity={0.5} />
            <FractalPlane {...props} />
        </>
    );
}

export default function FractalCanvas(props: FractalCanvasProps) {
    return (
        <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
            <color attach="background" args={["#000000"]} />
            <FractalScene {...props} />
            <OrbitControls
                enablePan={false}
                enableZoom={false}
                enableRotate={false}
            />
        </Canvas>
    );
}
