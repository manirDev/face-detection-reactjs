import React from 'react'
import './ImageLinkForm.css'

const ImageLinkForm =({onInputChange, onButtonSubmit}) =>{
    return(
      <div >
          <p className="f3">
              {'Enter a link of a picture and detect the face, This magic works for real   . Git it a try'}
          </p>
          <div className="center">
             <div className="form center pa4 br3 shadow-5">
                <input onChange={onInputChange} className="f4 pa2 w-70 center" type="text"/>
                <button 
                onClick ={onButtonSubmit}
                className="f4 w-30 grow link ph3 pv2 dib white bg-light-purple">
                     Detect
                </button>
             </div>
          </div>
      </div>
    );
}
   export default ImageLinkForm;