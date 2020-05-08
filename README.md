# Cover Hack

Details will be added once I actually get this bad boy up and running!
For now, dev instructions since this is a nice environment to be working with as a base.

* Allow deleting posts
* Mobile update?

------------------------------------------

## Development Instructions

### Setup

```
# install server dependencies in the root directory
npm install

# install frontend dependencies in the client directory
cd client
npm install
```

Alternatively, you can run `npm run-script setup` in the root directory which runs a script to execute all the above commands. This is a shortcut command defined in [package.json](package.json).

```
# create a development build of React app
cd client
npm run build

# create Mongo database and run Express server in the root directory
mkdir mongo-data
mongod --dbpath mongo-data

# run the server on a separate terminal
node server.js
```

### Development

During development, run the following commands for your app to reflect any changes in the code. Make sure mongo is running on a separate terminal.

```
# build the React app
cd client
npm run build

# go back to the root directory
cd ..

# run the server
node server.js
```

Alternatively, you can run `npm run-script build-run` in the root directory which runs a script to execute all the above commands. This is a shortcut command defined in [package.json](package.json).

### Directory Structure

```
Cover Hack
├── db
│   └── mongoose.js
├── models
│   └── ...
├── package.json
├── server.js
└── client
    ├── public
    │   ├── index.html
    │   └── ...
    ├── tests
    │   └── ...
    └── src
        ├── actions
        │   ├── ...
        ├── react-components
        │   └── ...
        ├── index.js
        ├── index.css
        ├── App.js
        ├── App.css
        ├── MainView.js
        ├── package.json
        └── serviceWorker.js
```

### React Components

Each React component lives in a separate directory with its own `index.js` and `styles.css`. Import them from parent components as needed.

#### Styles

Unique styles associated with each React component are kept separate. If the same styles are shared between multiple React components, keep them in a top-level, shared CSS file (i.e. App.css) to avoid repeated styles.

#### Material UI

You can find more components [here](https://material-ui.com/).

Note that you can override the default styles of these components by increasing CSS selector specificity.

#### Actions

To keep your `index.js` files clean and simple, import required methods from an associated action file. Following this structure can help organize your code and keep it manageable.

#### Statezero

Application state is maintained as a single, immutable, global state graph. See
[statezero documentation](https://github.com/andornaut/statezero/blob/master/README.md) for more information.

Whenever the global state changes via [actions](client/src/actions), each component's `filterState()` method is invoked with a
frozen copy of the new state and then its `render()` method is invoked.

Steps on using statezero in your app:

1. Add statezero as a dependency in `package.json`.
2. In the main [index.js](client/src/index.js), call:
    1. `setEmptyState()`: This initializes all state paths in the global state as empty. You need to create this method. Think about the state paths that are required by your app (for example, this app requires a studentList state path to render all students in the database when a user presses the Get Students button). These are the states your components will directly read from to render correctly. Any actions that a user performs in your components will also write to these states.
    2. `startLogging()`: When an action is called, a table is printed to the console which describes the changes. This method is provided by statezero.
3. Create a [BaseReactComponent class](client/src/react-components/BaseReactComponent) that extends `React.Component` and does the necessary setup for statezero. You can directly copy this component.
4. `BaseReactComponent` provides a filterState method to components that extend from it. Any component class that needs to read from state paths in the global state needs to extend this class (see [StudentForm](client/src/react-components/StudentForm) as an example).
5. Your extended `BaseReactComponent` component class should define a `filterState()` method that chooses the state paths your component needs. `filterState()` puts the filtered state paths on your component's `this.state`. You can then read these states in your `render()` method.
6. When a user performs an action (i.e. clicks the Get Students button to make a GET request to the '/students' endpoint), your action method should update the appropriate state path using `setState()` (see [student.js](client/src/actions/student.js) as an example). Once the state path is updated, the `StudentList` component will use it to rerender. Notice how an updated state table is logged in your console everytime you mutate the global state paths.

Statezero makes it simple to read and update the global state in your app without having to pass around component states.

### Deployment

#### MongoDB Atlas
1. Create a Project, and cluster (or use the default Project0 Sandbox Cluster
2. In the left sidebar menu: Make sure under the security section you whitelist 0.0.0.0/0 (or select connect from anywhere)
3. Under the database access tab make sure you add a user that has read/write access
4. Grab the connection string for your database and plug in your password

#### Glitch
In ⚩.env, set up the two variables below:
```
MONGODB_URI='<connection-string>'
PORT='3000'
```

When installing modules in glitch, use `pnpm install` instead of `npm`, as it would avoid using up the set amount of disk space.