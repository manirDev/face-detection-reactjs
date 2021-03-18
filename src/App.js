import './App.css';
import React, {Component} from 'react'
import Navigation  from "./Components/Navigation";
import Logo from "./Components/Logo";
import ImageLinkForm from "./Components/ImageLinkForm";
import Rank from "./Components/Rank";
import Particles from 'react-particles-js';
import FaceRecognition from "./Components/FaceRecognition";
import Clarifai from "clarifai";
const app= new Clarifai.App({
  apiKey: '0aa2090899fc42a6a9ee44880755b7c4'
});

const particlesOption={
  
    particles: {
        number:{
        value: 30,
        density: {
          enable:true,
          value_area:260
        }
        }
    }

}
class App extends Component{
  constructor(){
    super();
    this.state= {
      input : '',
      imageUrl: '',
      box: {}
    }
  }
calculateFaceLocation=(data)=>{
  const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
  const image = document.getElementById('inputimage');
  const width = Number(image.width);
  const height = Number(image.height);
  return {
    leftCol: clarifaiFace.left_col * width,
    topRow: clarifaiFace.top_row * height,
    rightCol: width - (clarifaiFace.right_col * width),
    bottomRow: height - (clarifaiFace.bottom_row * height)
  }
}
displayFaceBox = (box) => {
  this.setState({box: box});
}
  onInputChange=(event) => {
    this.setState({input: event.target.value});
  }
  onButtonSubmit= () =>{
    this.setState({imageUrl: this.state.input})
    app.models.predict(Clarifai.FACE_DETECT_MODEL,
     this.state.input)
    .then(response=> this.displayFaceBox(this.calculateFaceLocation(response)))
    .catch(err => console.log(err));
  }
 render(){
   return (
     <div className="App">
       <Particles className="particles"
                params={particlesOption} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm 
        onButtonSubmit={this.onButtonSubmit}
         onInputChange={this.onInputChange}/>
       <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
     </div>
   );
 }
}
export default App;
