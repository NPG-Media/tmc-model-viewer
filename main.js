import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

var model4984;
var modelDessicant;
var modelBog;

var currentModelNumber = 0;

var modelArray = []

var changeModelButton = document.getElementById("change-model");
changeModelButton.addEventListener("click", function(){changeModel(1)});

function changeModel(increment=1)
{
	currentModelNumber += increment;
	if (currentModelNumber >= modelArray.length)
		currentModelNumber = 0;
	else if (currentModelNumber < 0)
		currentModelNumber = modelArray.length -1;

	for (var i in modelArray)
	{
		modelArray[i].visible = (i == currentModelNumber);
	}

	renderer.render(scene, camera);
}

document.addEventListener("keydown", onDocumentKeyDown, false);
function onDocumentKeyDown(event) {
    var keyCode = event.which;
	console.log(keyCode);
	if (keyCode == 39)
	{
		changeModel(1);
	}
	else if (keyCode == 37)
	{
		changeModel(-1);
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
	modelArray.push(model4984);
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
	modelArray.push(modelDessicant);
	//renderer.render(scene, camera);
	console.log("dessicant loaded");

}, undefined, function ( error ) {

	console.error( error );

} );


loader.load( './bog.glb', function ( gltf ) {

	var box = new THREE.Box3().setFromObject( gltf.scene );
	var center = new THREE.Vector3();
	box.getCenter( center );
	gltf.scene.position.sub( center ); // center the model
	scene.add( gltf.scene );
	modelBog = gltf.scene;
	modelBog.visible = false;
	modelArray.push(modelBog);
	//renderer.render(scene, camera);
	console.log("bog loaded");

}, undefined, function ( error ) {

	console.error( error );

} );

camera.position.z = 3;
renderer.render( scene, camera );
var controls = new OrbitControls( camera, renderer.domElement );
controls.addEventListener( 'change', function() { renderer.render(scene, camera); } );