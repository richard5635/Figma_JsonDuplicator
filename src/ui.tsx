import * as React from 'react'
import * as ReactDOM from 'react-dom'
import './ui.css'

declare function require(path: string): any

// Need to figure how to get info from code.
// Reference here https://github.com/PavelLaptev/JSON-to-Figma/blob/master/src/app/components/App.tsx
// Maybe for now I dont need to use pluginMessage.

const selItemsDefaultText = "No node selected.";
const selInsDefaultText = "Select the frame to use.";

// Hint from here. No need to mix it with react component. Just access it from html here.
// https://github.com/ozhsmt/figma-exporter-plugin/blob/701391931b90b751551f033cf12146243b588c0f/src/ui.tsx
// Maybe there would be time where I need to access in the React component. That time, I refer to
// https://github.com/sonnylazuardi/color-copy-paste/blob/69e2b9e99b9870697a767177f242fee57e7c0018/figma/src/ui.tsx

window.onmessage = async event => {
  const message = event.data.pluginMessage;
  console.log(message);
  if(message.type == 'selectionNames'){
      // Change the UI here.
      console.log("selectionNames message activated");
      // Show max 5 items selected as ul
      let selEl = document.getElementById('selected-items');
      let selIns = document.getElementById('selected-instruction');
      let listTxt="";
      let names = message.names;
      console.log(names);
      if(Array.isArray(names) && names.length == 0) {
          selEl.innerHTML = selItemsDefaultText;
          selIns.innerHTML = selInsDefaultText;
          // console.log("empty names");
          return;
      } else {
          for(let i = 0; i < names.length; i++){
              if(i < 5){
                  listTxt += names[i] + ', ';
              }
          }
          selIns.innerHTML = names.length + " nodes selected.";
          selEl.innerHTML = listTxt;
      }
  }

  // var pre = document.getElementById('content');
  // var textContent = document.createTextNode(message + '\n');
  // pre.appendChild(textContent);
}

class App extends React.Component {
  // Defines textbox as HTMLInput element, typescript syntax
  textbox: HTMLInputElement

  // const MsgListener = e => {
  //   if(e.data.pluginMessage.type==)
  // }

  // React.useEffect(() => {
  //   window.addEventListener('message', MsgListener);

  //   return () => {
  //     window.removeEventListener('message', MsgListener);
  //   }
  // });


  countRef = (element: HTMLInputElement) => {
    if (element) element.value = '5'
    this.textbox = element
  }

  onCreate = () => {
    const count = parseInt(this.textbox.value, 10)
    parent.postMessage({ pluginMessage: { type: 'create-rectangles', count } }, '*')
  }

  onCancel = () => {
    parent.postMessage({ pluginMessage: { type: 'cancel' } }, '*')
  }

  onDupTrans = () => {
    console.log("Button Pressed");
    parent.postMessage({ pluginMessage: { type: 'duplicate-translate' } }, '*');
  }

  onContFile = (event) => {
    // Referred to this https://stackoverflow.com/questions/41702911/how-can-i-test-a-change-handler-for-a-file-type-input-in-react-using-jest-enzyme
    const file = event.target.files[0];
    console.log(file);

    let fileReader = new FileReader();
    fileReader.readAsText(file);
    fileReader.onload = () => {
        try {
            let obj = JSON.parse(fileReader.result.toString());
            console.log(obj);
            parent.postMessage({ pluginMessage: { type: 'load-json', obj } }, '*');
        }
        catch (error) {
            console.log(error);
            // showErrorMsg(error, 'Something wrong with the file. Check the structure.');
        }
    };
  }

  render() {
    return <div id="content">
      {/* <img src={require('./logo.svg')} />
      <h2>Rectangle Creator</h2>
      <p>Count: <input ref={this.countRef} /></p>
      <button id="create" onClick={this.onCreate}>Create</button>
      <button onClick={this.onCancel}>Cancel</button> */}

      <div>
        <div>
          <h2>JSON Duplicator</h2>
        </div>
        <img src={require('./Cover.png')} alt="Image" />
        <p>This program loads a JSON file and creates a duplicate of selected Figma frame with modified text contents
        based on the loaded JSON file. In iA, we use this plugin to create localizations of our app’s screenshot
            images for the App Store.</p>
        <ol>
          <li>
            {/* <!-- Add link, open in a new tab --> */}
                Read the instructions <a href="/">here</a>.
          </li>
          <li>
            <div id="selected-instruction">Select the frame to use.</div>

            {/* <!-- Need to handle nested innerhtml --> */}
            <div id="selected-items">No node selected.</div>
          </li>
          <li>
            Prepare your JSON File here.
            <div>
              <input type="file" id="fileCont" onChange={this.onContFile}/>
            </div>
          </li>
        </ol>
      </div>
      <div className="execution-container">
        <button id="duptrans" onClick={this.onDupTrans}>Duplicate & Translate!</button>
      </div>
    </div>
  }
}

ReactDOM.render(<App />, document.getElementById('react-page'))
