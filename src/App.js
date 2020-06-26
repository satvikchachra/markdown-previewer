import React, { Component } from 'react';
import marked from 'marked';
import Footer from './Footer/Footer';
import './App.css';

class App extends Component {

  initialText = `# Welcome to Marky 🎉
  
Marky is an online markdown editor built by [Satvik Chachra](https://github.com/satvikchachra)

  ## 📄 List
  ### Number List
  1. One
  2. Two
  3. Three


  ### Bulletpoint List
  * One
  * Two
  * Three

  
  ### Dash also works!
  - One
  - Two
  - Three
  

  ## 🌃 Images
  <img src="https://media.giphy.com/media/VbnUQpnihPSIgIXuZv/giphy.gif" height="200px"></img>
  
  # 📝 Typography
  
  ### Headings
  
  # Heading 1
  ## Heading 2
  ### Heading 3
  #### Heading 4
  ##### Heading 5
  
  ### Quotes

> Lorem ipsum dolor sit amet, consectetuer adipiscing elit.Donec odio.Quisque volutpat mattis eros.
`;

  state = {
    text: this.initialText
  }

  handleChange = (e) => {
    this.setState({
      text: e.target.value
    })
  }


  render() {
    const { text } = this.state;

    // Process input text as markdown
    const markdown = marked(text, { breaks: true });

    // Change background-color of text-area
    const setbg = (color) => {
      document.querySelector('#editor').style.backgroundColor = `${color}`;
    };

    // For .md file
    let fileReader;

    // To read .md file
    const handleFileRead = (e) => {
      const content = fileReader.result;

      // Update state with content of the file
      this.setState({
        text: content
      });
    };

    // To handle .md file
    const handleFileChosen = (file) => {
      fileReader = new FileReader();
      fileReader.onloadend = handleFileRead;
      fileReader.readAsText(file);
    };

    return (
      <div className="App" >

        <div className="header">
          <h1>Marky</h1>
          <h3>An online markdown editor built in React.</h3>
        </div>
        <div className="container">
          <div className="editor-container">
            <textarea id="editor" value={text} onChange={this.handleChange} onFocus={() => setbg('#191919')} onBlur={() => setbg('#121212')}></textarea>

            <div className="file-container">
              <input type="file"
                id="file"
                className="input-file"
                accept=".md"
                onChange={e => handleFileChosen(e.target.files[0])}></input>
            </div>
          </div>

          <div className="preview-container">
            <div id="preview" dangerouslySetInnerHTML={{ __html: markdown }}></div>
          </div>
        </div>

        <Footer />
      </div>
    )
  }
}

export default App;
