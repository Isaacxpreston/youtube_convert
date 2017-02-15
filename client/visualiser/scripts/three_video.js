if ( ! Detector.webgl ) Detector.addGetWebGLMessage();
var boost;
var container;
var camera, scene, renderer;
var video, texture, material, mesh;
var composer;
var mouseX = 0;
var mouseY = 0;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
var cube_count,
  meshes = [],
  materials = [],
  xgrid = 26,
  ygrid = 26;

function init() {
  container = document.getElementById("container")
  camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 10000 );
  camera.position.z = 500;
  camera.position.x = 800;
  scene = new THREE.Scene();
  scene.scale.set(3,1.5,1)
  var light = new THREE.DirectionalLight( 0xffffff );
  light.position.set( 0.5, 1, 1 ).normalize();
  scene.add( light );
  renderer = new THREE.WebGLRenderer( { antialias: false, alpha: true} );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  container.appendChild( renderer.domElement );
  video = document.getElementById( 'video' );
  texture = new THREE.VideoTexture( video );
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.format = THREE.RGBFormat;
  var i, j, ux, uy, ox, oy,
    geometry,
    xsize, ysize;
  ux = 1 / xgrid;
  uy = 1 / ygrid;
  xsize = 480 / xgrid;
  ysize = 204 / ygrid;
  var parameters = { color: 0xffffff, map: texture };
  cube_count = 0;
  for ( i = 0; i < xgrid; i ++ )
  for ( j = 0; j < ygrid; j ++ ) {
    ox = i;
    oy = j;
    geometry = new THREE.BoxGeometry( xsize, ysize, xsize );
    change_uvs( geometry, ux, uy, ox, oy );
    materials[ cube_count ] = new THREE.MeshLambertMaterial( parameters );
    material = materials[ cube_count ];
    mesh = new THREE.Mesh( geometry, material );
    mesh.position.x =   ( i - xgrid/2 ) * xsize;
    mesh.position.y =   ( j - ygrid/2 ) * ysize;
    mesh.position.z = 0;
    mesh.scale.x = 1
    mesh.scale.y = 1
    mesh.scale.z = 2;
    scene.add( mesh );
    mesh.dx = 0.001 * ( 0.5 - Math.random() );
    mesh.dy = 0.001 * ( 0.5 - Math.random() );
    meshes[ cube_count ] = mesh;
    cube_count += 1;
  }

  //keep high res
  renderer.autoClear = false;
  document.addEventListener( 'mousemove', onDocumentMouseMove, false );
  // postprocessing
  var renderModel = new THREE.RenderPass( scene, camera );
  var effectBloom = new THREE.BloomPass( 1.3 );
  var effectCopy = new THREE.ShaderPass( THREE.CopyShader );
  effectCopy.renderToScreen = true;
  composer = new THREE.EffectComposer( renderer );
  composer.addPass( renderModel );
  composer.addPass( effectBloom );
  composer.addPass( effectCopy );
  //
  window.addEventListener( 'resize', onWindowResize, false );
}

//handle resize
function onWindowResize() {
  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
  composer.reset();
}

//spread video
function change_uvs( geometry, unitx, unity, offsetx, offsety ) {
  var faceVertexUvs = geometry.faceVertexUvs[ 0 ];
  for ( var i = 0; i < faceVertexUvs.length; i ++ ) {
    var uvs = faceVertexUvs[ i ];
    for ( var j = 0; j < uvs.length; j ++ ) {
      var uv = uvs[ j ];
      uv.x = ( uv.x + offsetx ) * unitx;
      uv.y = ( uv.y + offsety ) * unity;
    }
  }
}

//mouse position
function onDocumentMouseMove(event) {
  mouseX = ( event.clientX - windowHalfX );
  mouseY = ( event.clientY - windowHalfY ) * 0.3;
}

//animation loop
function animate() {
  requestAnimationFrame( animate );
  render();
}

function render() {
  for (var i = 0; i < scene.children.length; i ++) {
    if(scene.children[i].type !== "DirectionalLight") {
      scene.children[i].scale.z = boost[i]/10 + 0.001
    }
  }
  // camera.position.x += ( mouseX - camera.position.x ) * 0.05;
  // camera.position.y += ( - mouseY - camera.position.y ) * 0.05;
  camera.lookAt( scene.position );
  renderer.clear();
  composer.render();
}
