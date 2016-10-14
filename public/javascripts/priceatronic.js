var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 0.1, 1000 );

var light = new THREE.AmbientLight( 0x888888 );
scene.add( light );

light = new THREE.DirectionalLight( 0xcccccc, 1 );
light.position.set(5,3,5);
scene.add( light );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var geometry = new THREE.SphereGeometry( 0.5, 32, 32 );
var material = new THREE.MeshPhongMaterial();
material.map = THREE.ImageUtils.loadTexture('images/earthmap1k.jpg');
material.bumpMap = THREE.ImageUtils.loadTexture('images/earthbump1k.jpg');
material.bumpScale = 0.05;
material.specularMap = THREE.ImageUtils.loadTexture('images/earthspec1k.jpg');
material.specular = new THREE.Color('grey');
var cube = new THREE.Mesh(geometry, material);

scene.add( cube );
cube.rotation.x += 0.5;

geometry = new THREE.SphereGeometry( 10, 32, 32 );
material = new THREE.MeshBasicMaterial();
material.map = THREE.ImageUtils.loadTexture('images/galaxy_starfield.png');
material.side = THREE.BackSide;
var mesh = new THREE.Mesh( geometry, material );
scene.add( mesh );

camera.position.z = 2.5;

var render = function () {
  requestAnimationFrame( render );
  
  cube.rotation.y += 0.001;
  mesh.rotation.y += 0.0001;
  
  renderer.render(scene, camera);
};

render();
