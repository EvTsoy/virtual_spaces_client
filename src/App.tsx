import { useEffect } from 'react';

function App() {
  useEffect(() => {
    const root = document.getElementById('root');
    if (!root) {
      return;
    }

    root.innerHTML = `
    <a-scene
    networked-scene="
    room: basic;
    debug: true;
    adapter: wseasyrtc;
  "
  >
    <a-assets>
      <!-- Templates -->
      <!-- Camera Rig / Player -->
      <template id="rig-template">
        <a-entity></a-entity>
      </template>

      <!-- Head / Avatar -->
      <!--      a few spheres make a head + eyes + pupils    -->
      <template id="avatar-template">
        <a-entity class="avatar">
          <!-- notice this child sphere, with class .head, has the random-color component; this modifies the material component's color property -->
          <a-sphere class="head" scale="0.2 0.22 0.2" random-color></a-sphere>
          <a-entity class="face" position="0 0.05 0">
            <a-sphere class="eye" color="white" position="0.06 0.05 -0.16" scale="0.04 0.04 0.04">
              <a-sphere class="pupil" color="black" position="0 0 -1" scale="0.2 0.2 0.2"></a-sphere>
            </a-sphere>
            <a-sphere class="eye" color="white" position="-0.06 0.05 -0.16" scale="0.04 0.04 0.04">
              <a-sphere class="pupil" color="black" position="0 0 -1" scale="0.2 0.2 0.2"></a-sphere>
            </a-sphere>
          </a-entity>
        </a-entity>
      </template>
      <!-- /Templates -->
    </a-assets>

    <a-entity environment="preset:starry;groundColor:#000000;"></a-entity>
    <a-entity light="type:ambient;intensity:0.5"></a-entity>

    <!--   Here we declare only the local user's avatar, which we then broadcast to other users     -->
    <a-entity id="rig" movement-controls="fly:true;" spawn-in-circle="radius:3" networked="template:#rig-template;">
      <!-- Here we add the camera. Adding the camera within a 'rig' is standard practice.
       We set the camera to head height for e.g. computer users, but otherwise never touch it again; if the user enters VR,
       its rotation and position will be updated by the headset in VR. If we need to touch the user's position
       or rotation, we always do that by adjusting the rig parent of the active camera. By making that rig--and the
       active camera appended to it--both networked, we ensure all player movement is kept in sync.
      -->
      <a-entity
        id="player"
        camera
        position="0 1.6 0"
        look-controls
        networked="template:#avatar-template;"
        visible="false"
      >
      </a-entity>
    </a-entity>
  </a-scene>
`;
  });
  return (
    <div className="App">
      <h1>gigig</h1>
    </div>
  );
}

export default App;
