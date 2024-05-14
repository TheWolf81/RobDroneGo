import * as THREE from 'three';

class ChangeModel {
    changeModelURL(selectedModel) {
      let newURL, scale;
      
      if (selectedModel === 'Robot') {
        newURL = '../../../assets/models/gltf/Robot/robot1.glb';
        scale = new THREE.Vector3(0.1, 0.1, 0.1);
      } else if(selectedModel === 'Robot2') {
        newURL = '../../../assets/models/gltf/Robot/robot.glb';
        scale = new THREE.Vector3(0.3, 0.3, 0.3);
      }
  
      localStorage.setItem('newModelURL', newURL);
      localStorage.setItem('newModelScale', JSON.stringify(scale));
  
      console.log(`Model URL changed to: ${newURL}`);
      console.log(`Model scale changed to: ${scale.toArray()}`);
    }
  }
  
  export default ChangeModel;
  