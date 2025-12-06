# 3D Portfolio Website

A stunning, interactive portfolio website for showcasing your 3D work. Built with Three.js for real-time 3D rendering and smooth animations.

## Features

- **Interactive 3D Viewer**: View and interact with 3D models using mouse controls
- **Responsive Design**: Works beautifully on desktop, tablet, and mobile devices
- **Modern UI**: Clean, gradient-based design with smooth animations
- **Gallery System**: Showcase multiple 3D projects in an organized grid
- **Modal Viewer**: Full-screen 3D model viewer with controls
- **Keyboard Shortcuts**: Quick navigation and controls
- **Contact Form**: Built-in contact form for inquiries

## Quick Start

1. Open `index.html` in your web browser
2. Explore the gallery and click on any project to view it in 3D
3. Use mouse to rotate, zoom, and pan the 3D models

## Viewer Controls

### Mouse Controls
- **Left Click + Drag**: Rotate the model
- **Right Click + Drag**: Pan the camera
- **Scroll**: Zoom in/out

### Keyboard Shortcuts (in viewer)
- `Esc`: Close viewer
- `R`: Reset view to default position
- `W`: Toggle wireframe mode
- `Space`: Play/Pause animation

### Button Controls
- **Reset View**: Return camera to initial position
- **Toggle Wireframe**: Switch between solid and wireframe display
- **Play/Pause Animation**: Control model rotation

## Customization

### Adding Your Own 3D Models

Edit the `portfolioItems` array in `script.js`:

```javascript
const portfolioItems = [
    {
        id: 1,
        title: "Your Project Name",
        description: "Your project description",
        tags: ["Tag1", "Tag2", "Tag3"],
        modelType: "cube" // or sphere, torus, etc.
    }
];
```

### Supported Model Types
- `cube`: Box geometry
- `sphere`: Spherical geometry
- `torus`: Torus knot geometry
- `dodecahedron`: 12-sided polyhedron
- `cylinder`: Cylindrical geometry
- `cone`: Cone geometry

### Loading Custom 3D Models (GLTF/OBJ)

The website includes loaders for GLTF and OBJ formats. To load custom models, modify the `loadModelInViewer()` function in `script.js`:

```javascript
const loader = new THREE.GLTFLoader();
loader.load('path/to/your/model.gltf', (gltf) => {
    viewerMesh = gltf.scene;
    viewerScene.add(viewerMesh);
});
```

### Changing Colors

Update CSS variables in `styles.css`:

```css
:root {
    --primary-color: #6366f1;      /* Primary accent color */
    --secondary-color: #8b5cf6;    /* Secondary accent color */
    --dark-bg: #0f172a;            /* Background color */
    --card-bg: #1e293b;            /* Card background */
}
```

## Technologies Used

- **HTML5**: Structure and semantics
- **CSS3**: Styling with modern features (Grid, Flexbox, Animations)
- **JavaScript (ES6+)**: Interactive functionality
- **Three.js**: 3D rendering and WebGL
- **OrbitControls**: Camera controls for 3D viewer

## Browser Support

Works on all modern browsers that support WebGL:
- Chrome 9+
- Firefox 4+
- Safari 5.1+
- Edge 12+
- Opera 12+

## Project Structure

```
3DpPort/
├── index.html          # Main HTML structure
├── styles.css          # All styling and animations
├── script.js           # JavaScript logic and Three.js setup
└── README.md           # This file
```

## Tips for Best Results

1. **3D Models**: Keep models optimized (low poly count for web)
2. **Images**: Add thumbnail images for gallery items
3. **Performance**: Test on different devices for smooth performance
4. **Content**: Update the About section with your information
5. **Social Links**: Add your actual social media links in the footer

## Extending the Portfolio

### Add More Model Types

Create new geometry types in the `loadModelInViewer()` function:

```javascript
case 'your-shape':
    geometry = new THREE.YourGeometry(params);
    break;
```

### Add Textures

Apply textures to materials:

```javascript
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('path/to/texture.jpg');
material.map = texture;
```

### Add Animations

Create custom animations in the `animateViewer()` function:

```javascript
if (viewerMesh && isAnimating) {
    viewerMesh.rotation.x += 0.01;
    viewerMesh.position.y = Math.sin(Date.now() * 0.001) * 0.5;
}
```

## License

Free to use and modify for your personal portfolio.

## Support

For issues or questions, feel free to reach out through the contact form on the website.

---

**Happy showcasing your 3D work! 🎨✨**
