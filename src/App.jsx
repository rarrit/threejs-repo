import { useEffect } from "react";
import * as THREE from "three";

function App() {
  useEffect(() => {
    // 1. Three.js의 Scene(장면) 생성
    const scene = new THREE.Scene();

    // 2. 원근 투영 카메라 생성
    const camera = new THREE.PerspectiveCamera(
      60, // 시야각 (FOV)
      window.innerWidth / window.innerHeight, // 화면 비율 (aspect ratio)
      0.1, // 가까운 절단면 (near)
      100 // 먼 절단면 (far)
    );

    // 3. 카메라 위치 설정 (뒤로 이동 & 위로 약간 올림)
    camera.position.z = 5; // z축 방향으로 5만큼 뒤로 이동
    camera.position.y = 1; // y축 방향으로 1만큼 위로 이동

    // 4. 박스 모양의 3D 객체 생성
    const geometry = new THREE.BoxGeometry(1, 1, 1); // (가로, 세로, 높이)
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000 }); // 빨간색 재질
    const mesh = new THREE.Mesh(geometry, material); // 박스(메시) 생성
    scene.add(mesh); // 씬에 추가

    // 5. WebGL 렌더러 생성 및 설정
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight); // 캔버스 크기 설정
    document.body.appendChild(renderer.domElement); // HTML body에 추가

    // 6. 창 크기가 변경될 때 자동 조정 (반응형 처리)
    window.addEventListener("resize", () => {
      renderer.setSize(window.innerWidth, window.innerHeight); // 캔버스 크기 조정
      camera.aspect = window.innerWidth / window.innerHeight; // 카메라 화면 비율 업데이트
      camera.updateProjectionMatrix(); // 카메라 설정 업데이트
      renderer.render(scene, camera); // 변경된 설정으로 다시 렌더링
    });

    // 7. 초기 화면 렌더링
    renderer.render(scene, camera);

    // 8. 컴포넌트가 언마운트될 때 정리
    return () => {
      document.body.removeChild(renderer.domElement); // 생성한 캔버스 제거
    };
  }, []);

  return <></>;
}

export default App;
