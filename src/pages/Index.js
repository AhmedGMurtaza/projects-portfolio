import React, { Component } from "react";
import { Switch, Link, BrowserRouter, Route } from "react-router-dom";
import getBlock from "../blocks";
import getIcons from "../icons";

// components
import Header from "../components/Header";

// Containers
import Project from "./Project";
import Projects from "./Projects";
import Vendors from "./Vendors";

const iconList = getIcons();
const blockListArr = [];

Object.entries(iconList).forEach(([type, icons]) => {
  Object.keys(icons).map((name) => blockListArr.push(`${name},${type}`));
});

const themeList = [
  "indigo",
  "yellow",
  "red",
  "purple",
  "pink",
  "blue",
  "green",
];

const desktopIcon = (
  <svg
    stroke='currentColor'
    strokeWidth={2}
    fill='none'
    strokeLinecap='round'
    strokeLinejoin='round'
    viewBox='0 0 24 24'
  >
    <rect x={2} y={3} width={20} height={14} rx={2} ry={2} />
    <path d='M8 21h8m-4-4v4' />
  </svg>
);

const phoneIcon = (
  <svg
    viewBox='0 0 24 24'
    stroke='currentColor'
    strokeWidth={2}
    fill='none'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <rect x={5} y={2} width={14} height={20} rx={2} ry={2} />
    <path d='M12 18h.01' />
  </svg>
);

const tabletIcon = (
  <svg
    viewBox='0 0 24 24'
    stroke='currentColor'
    strokeWidth={2}
    fill='none'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <rect x={4} y={2} width={16} height={20} rx={2} ry={2} />
    <path d='M12 18h.01' />
  </svg>
);

const viewList = [
  {
    icon: desktopIcon,
    name: "desktop",
  },
  {
    icon: tabletIcon,
    name: "tablet",
  },
  {
    icon: phoneIcon,
    name: "phone",
  },
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: false,
      darkMode: false,
      copied: false,
      sidebar: true,
      codeView: false,
      currentKeyCode: null,
      view: "desktop",
      theme: "indigo",
      blockType: "Blog",
      blockName: "BlogA",
      markup: "",
    };

    this.changeMode = this.changeMode.bind(this);
    this.changeTheme = this.changeTheme.bind(this);
    this.changeBlock = this.changeBlock.bind(this);
    this.handleContentDidMount = this.handleContentDidMount.bind(this);
    this.changeView = this.changeView.bind(this);
    this.toggleSidebar = this.toggleSidebar.bind(this);
    this.toggleView = this.toggleView.bind(this);
    this.copyToClipboard = this.copyToClipboard.bind(this);
    this.keyboardNavigation = this.keyboardNavigation.bind(this);
    this.markupRef = React.createRef();
    this.textareaRef = React.createRef();
    this.sidebarRef = React.createRef();
    this.openerRef = React.createRef();
  }

  componentDidMount() {
    document.addEventListener("keydown", this.keyboardNavigation);
  }

  hideSidebar() {
    const sidebar = this.sidebarRef.current;
    const opener = this.openerRef.current;

    document.addEventListener("click", (e) => {
      if (e.target === opener) {
        return;
      }

      if (!e.target === sidebar || !sidebar.contains(e.target)) {
        this.setState({ sidebar: false });
      }
    });
  }

  keyboardNavigation(e) {
    const { blockType, blockName } = this.state;
    const blockStringFormat = `${blockName},${blockType}`;
    const keyCode = e.which || e.keyCode;

    switch (keyCode) {
      case 40: // Down
        e.preventDefault();
        blockListArr.forEach((block, index) => {
          if (block === blockStringFormat) {
            const newActiveBlock =
              index + 1 <= blockListArr.length - 1
                ? blockListArr[index + 1].split(",")
                : blockListArr[0].split(",");
            const newBlockName = newActiveBlock[0];
            const newBlockType = newActiveBlock[1];
            const newBlockNode = document.querySelector(
              `.block-item[block-name="${newBlockName}"]`
            );
            if (newBlockNode) newBlockNode.focus();
            this.setState({
              blockType: newBlockType,
              blockName: newBlockName,
              codeView: false,
              currentKeyCode: 40,
            });
          }
        });
        break;
      case 37: // Left
        e.preventDefault();
        this.setState({ sidebar: false, currentKeyCode: 37 });
        break;
      case 39: // Right
        e.preventDefault();
        this.setState({ sidebar: true, currentKeyCode: 39 });
        break;
      case 38: // Up
        e.preventDefault();
        blockListArr.forEach((block, index) => {
          if (block === blockStringFormat) {
            const newActiveBlock =
              index - 1 >= 0
                ? blockListArr[index - 1].split(",")
                : blockListArr[blockListArr.length - 1].split(",");
            const newBlockName = newActiveBlock[0];
            const newBlockType = newActiveBlock[1];
            const newBlockNode = document.querySelector(
              `.block-item[block-name="${newBlockName}"]`
            );
            if (newBlockNode) newBlockNode.focus();

            this.setState({
              blockType: newBlockType,
              blockName: newBlockName,
              codeView: false,
              currentKeyCode: 38,
            });
          }
        });
        break;
      default:
        return;
    }

    setTimeout(() => {
      if (
        keyCode === 37 ||
        keyCode === 38 ||
        keyCode === 39 ||
        keyCode === 40
      ) {
        this.setState({ currentKeyCode: null });
      }
    }, 200);
  }

  changeMode() {
    this.setState({ darkMode: !this.state.darkMode });
  }

  handleContentDidMount() {
    const iframe = document.querySelector("iframe");
    iframe.contentWindow.document.addEventListener(
      "keydown",
      this.keyboardNavigation
    );
    iframe.contentWindow.document.addEventListener("click", () =>
      this.setState({ sidebar: false })
    );

    setTimeout(() => {
      this.setState({
        ready: true,
        markup: this.markupRef.current.innerHTML,
      });
    }, 400);
  }

  beautifyHTML(codeStr) {
    const process = (str) => {
      let div = document.createElement("div");
      div.innerHTML = str.trim();
      return format(div, 0).innerHTML.trim();
    };

    const format = (node, level) => {
      let indentBefore = new Array(level++ + 1).join("  "),
        indentAfter = new Array(level - 1).join("  "),
        textNode;

      for (let i = 0; i < node.children.length; i++) {
        textNode = document.createTextNode("\n" + indentBefore);
        node.insertBefore(textNode, node.children[i]);

        format(node.children[i], level);

        if (node.lastElementChild === node.children[i]) {
          textNode = document.createTextNode("\n" + indentAfter);
          node.appendChild(textNode);
        }
      }

      return node;
    };
    return process(codeStr);
  }

  changeBlock(e) {
    const { currentTarget } = e;
    const blockType = currentTarget.getAttribute("block-type");
    const blockName = currentTarget.getAttribute("block-name");
    this.setState({
      blockType,
      blockName,
      codeView: false,
    });
  }

  changeTheme(e) {
    const { currentTarget } = e;
    const theme = currentTarget.getAttribute("data-theme");
    this.setState({ theme });
  }

  changeView(e) {
    const { currentTarget } = e;
    const view = currentTarget.getAttribute("data-view");
    this.setState({ view, codeView: false });
  }

  toggleView() {
    this.setState({
      codeView: !this.state.codeView,
      view: "desktop",
      markup: this.markupRef.current.innerHTML,
    });
  }

  themeListRenderer() {
    const { theme } = this.state;
    return themeList.map((t, k) => (
      <button
        key={k}
        data-theme={t}
        onKeyDown={this.keyboardNavigation}
        className={`theme-button bg-${t}-500${theme === t ? " is-active" : ""}`}
        onClick={this.changeTheme}
      ></button>
    ));
  }

  listRenderer() {
    const { blockName } = this.state;
    return Object.entries(iconList).map(([type, icons]) => (
      <div className='blocks' key={type}>
        <div className='block-category'>{type}</div>
        <div className='block-list'>
          {Object.entries(icons).map((icon) => (
            <button
              key={icon[0]}
              tabIndex='0'
              onClick={this.changeBlock}
              className={`block-item${
                icon[0] === blockName ? " is-active" : ""
              }`}
              block-type={type}
              block-name={icon[0]}
            >
              {icon[1]}
            </button>
          ))}
        </div>
      </div>
    ));
  }

  viewModeRenderer() {
    const { view } = this.state;
    return viewList.map((v, k) => (
      <button
        key={k}
        className={`device${view === v.name ? " is-active" : ""}`}
        data-view={v.name}
        onClick={this.changeView}
      >
        {v.icon}
      </button>
    ));
  }

  toggleSidebar() {
    this.setState({ sidebar: !this.state.sidebar });
  }

  copyToClipboard() {
    const code = this.beautifyHTML(this.state.markup);
    var input = document.createElement("textarea");
    input.innerHTML = code;
    document.body.appendChild(input);
    input.select();
    document.execCommand("copy");
    document.body.removeChild(input);
    this.setState({ copied: true });
    setTimeout(() => {
      this.setState({
        copied: false,
      });
    }, 2000);
  }

  render() {
    const { darkMode, theme, blockName, blockType, sidebar, view } = this.state;
    return (
      <BrowserRouter>
        <div
          className={`app${darkMode ? " dark-mode" : ""}${
            sidebar ? " has-sidebar" : ""
          } ${theme} ${view}`}
        >
          <div className='toolbar'>
            <Header theme={theme} />
            <div className='switcher'>{this.themeListRenderer()}</div>
            {/* dark/light mode */}
            {/* <button className='mode' onClick={this.changeMode}></button> */}
          </div>
          <div className='markup' ref={this.markupRef}>
            {getBlock({ theme, darkMode })[blockType][blockName]}
          </div>
          {/* view area  */}
          <main className='main'>
            <Switch>
              <Route exact path='/'>
                <Projects theme={theme} />
              </Route>
              <Route exact path='/projects'>
                <Projects theme={theme} />
              </Route>
              <Route path='/projects/:id'>
                <Project theme={theme} />
              </Route>
              <Route path='/vendors'>
                <Vendors theme={theme} />
              </Route>
            </Switch>
          </main>
          {/* view area  */}
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
