### Setup
- Run `npm install` to download all the packages this app uses.
- Run `npm run start` to fire up the dev server.
- Add the newly created `build` folder to your Chrome extensions.
- Open the extension from the icon in your browser or go to `localhost:3000/home.html` for the home tab or `localhost:3000/popup.html` for the popup.
- Whenever you save changes to the code, the above pages should update without you needing to refresh them.
- To check for syntax issues, run `npm run lint`. It's also recommended that you add the eslint and stylelint plugins to Atom.

### How to debug background script
- Open chrome://extensions/
- Under Tabby, click `background page`.
- This will open the debugger for the background script.

### How to test context menu
- Open webpage with image.
- Open Tabby Home tab.
- Open debugger console.
- Right click on image in webpage.
- Click the Tabby context menu button.
- Go to Tabby Home tab.
- Image URL should appear in console.
