import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

var model4984;
var modelDessicant;

var changeModelButton = document.getElementById("change-model");
changeModelButton.addEventListener("click", changeModel);

function changeModel()
{
	modelDessicant.visible = !modelDessicant.visible;
	model4984.visible = !model4984.visible;
	renderer.render(scene, camera);
}

document.addEventListener("keydown", onDocumentKeyDown, false);
function onDocumentKeyDown(event) {
    var keyCode = event.which;
	console.log(keyCode);
	if (keyCode == 39 || keyCode == 37) // left or right
	{
		changeModel();
	}
};

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	0.1,
	1000
);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor( 0xeeeeee );
document.body.appendChild( renderer.domElement );

const directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
directionalLight.position.z = 5;
directionalLight.position.y = 5;
directionalLight.position.x = 5;
scene.add( directionalLight );

const light = new THREE.AmbientLight( 0x404040, 2 ); // soft white light
scene.add( light );

const loader = new GLTFLoader();


loader.load( './4984.glb', function ( gltf ) {

	var box = new THREE.Box3().setFromObject( gltf.scene );
	var center = new THREE.Vector3();
	box.getCenter( center );
	gltf.scene.position.sub( center ); // center the model
	scene.add( gltf.scene );
	model4984 = gltf.scene;
	renderer.render(scene, camera);
	console.log("4984 loaded");

}, undefined, function ( error ) {

	console.error( error );

} );

loader.load( './dessicant.glb', function ( gltf ) {

	var box = new THREE.Box3().setFromObject( gltf.scene );
	var center = new THREE.Vector3();
	box.getCenter( center );
	gltf.scene.position.sub( center ); // center the model
	scene.add( gltf.scene );
	modelDessicant = gltf.scene;
	modelDessicant.visible = false;
	//renderer.render(scene, camera);
	console.log("dessicant loaded");

}, undefined, function ( error ) {

	console.error( error );

} );

camera.position.z = 3;
renderer.render( scene, camera );
var controls = new OrbitControls( camera, renderer.domElement );
controls.addEventListener( 'change', function() { renderer.render(scene, camera); } );