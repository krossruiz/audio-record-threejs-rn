import Expo, { Permissions, Audio } from 'expo';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import ExpoTHREE, { THREE } from 'expo-three';

import { connect } from 'react-redux';
import { startCube } from '../../actions/cube-actions';


class ThreeComponent extends React.Component {
  render() {
    // Create an `Expo.GLView` covering the whole screen, tell it to call our
    // `_onGLContextCreate` function once it's initialized.
    return (
      <Expo.GLView
        style={{ flex: 1 }}
        onContextCreate={this._onGLContextCreate}
      />
    );
  }



  // This is called by the `Expo.GLView` once it's initialized
  _onGLContextCreate = async gl => {
    // Based on https://threejs.org/docs/#manual/introduction/Creating-a-scene
    // In this case we instead use a texture for the material (because textures
    // are cool!). All differences from the normal THREE.js example are
    // indicated with a `NOTE:` comment.

    const setup3DScene = async () => {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        75,
        gl.drawingBufferWidth / gl.drawingBufferHeight,
        0.1,
        1000,
      );

      // NOTE: How to create an `Expo.GLView`-compatible THREE renderer
      const renderer = ExpoTHREE.createRenderer({ gl });
      renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);

      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const material = new THREE.MeshBasicMaterial({
        // NOTE: How to create an Expo-compatible THREE texture
        map: await ExpoTHREE.createTextureAsync({
          asset: Expo.Asset.fromModule(require('../../assets/icons/app-icon.png')),
        }),
      });
      const cube = new THREE.Mesh(geometry, material);
      scene.add(cube);

      camera.position.z = 5;

      let render3D = () => {
        requestAnimationFrame(render3D);
        if(this.props.cubeState.cubeIsRotating == true){
          cube.rotation.x += 0.07;
          cube.rotation.y += 0.04;
        }

        renderer.render(scene, camera);

        // NOTE: At the end of each frame, notify `Expo.GLView` with the below
        gl.endFrameEXP();
      };
      render3D();
    }

    setup3DScene();

  };
}

const mapStateToProps = ({ cubeState }) => ({
  cubeState
});

export default connect(mapStateToProps, { startCube })(ThreeComponent);
