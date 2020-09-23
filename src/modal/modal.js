import React from 'react';
import './modal.scss';
import 'tui-image-editor/dist/tui-image-editor.css'
import ImageEditor from '@toast-ui/react-image-editor'

const myTheme = {
    'common.bi.image': 'https://uicdn.toast.com/toastui/img/tui-image-editor-bi.png',
    'common.backgroundColor': '#ffffff',
    'header.border': '0px'
};

const removeHeader = () => {
  document.querySelector('.tui-image-editor-header').remove();
}

class Modal extends React.Component {

    returnDrawnImage = () => {
      const editor = this.imageEditor.imageEditorInst;
      const drawnImage = editor.toDataURL();
      this.props.setImage(drawnImage);
      this.props.close();
    }

    constructor(props) {
        super();
    }

    componentDidUpdate = () => {
      if(this.imageEditor) {
        removeHeader();
      }
    }

    render() {
        return (
          <React.Fragment>{
            this.props.openFlag?
            <React.Fragment>
              <div>
              <div 
                className="Modal-overlay" 
                onClick={this.props.close} 
              />
              <div className="Modal">
                <p className="title">차트수정</p>
                <div className="content">
                <ImageEditor
                  ref={ref=>{
                    this.imageEditor = ref;
                  }}
                  includeUI={{
                                loadImage: {
                                    path: this.props.bubbleChartImage,
                                    name: 'loadImage'
                                },
                                theme: myTheme,
                                menu: ['icon', 'text'],
                                uiSize: {
                                    width: '950px',
                                    height: '500px'
                                },
                                menuBarPosition: 'bottom'
                                }}
                  cssMaxHeight={500}
                  cssMaxWidth={950}
                  selectionStyle={{
                      cornerSize: 20,
                      rotatingPointOffset: 70
                  }}
                  usageStatistics={true}
                />
                </div>
                <div className="button-wrap">
                  <button onClick={this.returnDrawnImage}>Confirm</button>
                </div>
              </div>
            </div>
            </React.Fragment>
            :null
          }</React.Fragment>
        )
    }
    
}
export default Modal;