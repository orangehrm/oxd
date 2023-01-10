(function() {
  const defs = {}; // id -> {dependencies, definition, instance (possibly undefined)}

  // Used when there is no 'main' module.
  // The name is probably (hopefully) unique so minification removes for releases.
  const register_3795 = function(id) {
    const module = dem(id);
    const fragments = id.split('.');
    let target = Function('return this;')();
    for (let i = 0; i < fragments.length - 1; ++i) {
      if (target[fragments[i]] === undefined) target[fragments[i]] = {};
      target = target[fragments[i]];
    }
    target[fragments[fragments.length - 1]] = module;
  };

  const instantiate = function(id) {
    const actual = defs[id];
    const dependencies = actual.deps;
    const definition = actual.defn;
    const len = dependencies.length;
    const instances = new Array(len);
    for (let i = 0; i < len; ++i) instances[i] = dem(dependencies[i]);
    const defResult = definition.apply(null, instances);
    if (defResult === undefined) throw 'module [' + id + '] returned undefined';
    actual.instance = defResult;
  };

  const def = function(id, dependencies, definition) {
    if (typeof id !== 'string') throw 'module id must be a string';
    else if (dependencies === undefined) throw 'no dependencies for ' + id;
    else if (definition === undefined) throw 'no definition function for ' + id;
    defs[id] = {
      deps: dependencies,
      defn: definition,
      instance: undefined,
    };
  };

  var dem = function(id) {
    const actual = defs[id];
    if (actual === undefined) throw 'module [' + id + '] was undefined';
    else if (actual.instance === undefined) instantiate(id);
    return actual.instance;
  };

  const req = function(ids, callback) {
    const len = ids.length;
    const instances = new Array(len);
    for (let i = 0; i < len; ++i) instances[i] = dem(ids[i]);
    callback.apply(null, instances);
  };

  const ephox = {};

  ephox.bolt = {
    module: {
      api: {
        define: def,
        require: req,
        demand: dem,
      },
    },
  };

  const define = def;
  const require = req;
  const demand = dem;
  // this helps with minification when using a lot of global references
  const defineGlobal = function(id, ref) {
    define(id, [], function() {
      return ref;
    });
  };
  /*jsc
["tinymce.modern.Theme","global!tinymce.Env","global!tinymce.EditorManager","global!tinymce.ThemeManager","tinymce.modern.modes.Iframe","tinymce.modern.modes.Inline","tinymce.modern.ui.Resize","tinymce.modern.ui.ProgressState","global!tinymce.util.Tools","global!tinymce.ui.Factory","global!tinymce.DOM","tinymce.modern.ui.Toolbar","tinymce.modern.ui.Menubar","tinymce.modern.ui.ContextToolbars","tinymce.modern.ui.A11y","tinymce.modern.ui.Sidebar","tinymce.modern.ui.SkinLoaded","global!tinymce.ui.FloatPanel","global!tinymce.ui.Throbber","global!tinymce.util.Delay","global!tinymce.geom.Rect"]
jsc*/
  defineGlobal('global!tinymce.Env', tinymce.Env);
  defineGlobal('global!tinymce.EditorManager', tinymce.EditorManager);
  defineGlobal('global!tinymce.ThemeManager', tinymce.ThemeManager);
  defineGlobal('global!tinymce.util.Tools', tinymce.util.Tools);
  defineGlobal('global!tinymce.ui.Factory', tinymce.ui.Factory);
  defineGlobal('global!tinymce.DOM', tinymce.DOM);
  /**
   * Toolbar.js
   *
   * Released under LGPL License.
   * Copyright (c) 1999-2016 Ephox Corp. All rights reserved
   *
   * License: http://www.tinymce.com/license
   * Contributing: http://www.tinymce.com/contributing
   */

  define('tinymce.modern.ui.Toolbar', [
    'global!tinymce.util.Tools',
    'global!tinymce.ui.Factory',
  ], function(Tools, Factory) {
    const defaultToolbar =
      'undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | ' +
      'bullist numlist outdent indent | link image';

    const createToolbar = function(editor, items, size) {
      let toolbarItems = [],
        buttonGroup;

      if (!items) {
        return;
      }

      Tools.each(items.split(/[ ,]/), function(item) {
        let itemName;

        const bindSelectorChanged = function() {
          const selection = editor.selection;

          if (item.settings.stateSelector) {
            selection.selectorChanged(
              item.settings.stateSelector,
              function(state) {
                item.active(state);
              },
              true,
            );
          }

          if (item.settings.disabledStateSelector) {
            selection.selectorChanged(
              item.settings.disabledStateSelector,
              function(state) {
                item.disabled(state);
              },
            );
          }
        };

        if (item == '|') {
          buttonGroup = null;
        } else {
          if (Factory.has(item)) {
            item = {type: item, size: size};
            toolbarItems.push(item);
            buttonGroup = null;
          } else {
            if (!buttonGroup) {
              buttonGroup = {type: 'buttongroup', items: []};
              toolbarItems.push(buttonGroup);
            }

            if (editor.buttons[item]) {
              // TODO: Move control creation to some UI class
              itemName = item;
              item = editor.buttons[itemName];

              if (typeof item == 'function') {
                item = item();
              }

              item.type = item.type || 'button';
              item.size = size;

              item = Factory.create(item);
              buttonGroup.items.push(item);

              if (editor.initialized) {
                bindSelectorChanged();
              } else {
                editor.on('init', bindSelectorChanged);
              }
            }
          }
        }
      });

      return {
        type: 'toolbar',
        layout: 'flow',
        items: toolbarItems,
      };
    };

    /**
     * Creates the toolbars from config and returns a toolbar array.
     *
     * @param {String} size Optional toolbar item size.
     * @return {Array} Array with toolbars.
     */
    const createToolbars = function(editor, size) {
      const toolbars = [],
        settings = editor.settings;

      const addToolbar = function(items) {
        if (items) {
          toolbars.push(createToolbar(editor, items, size));
          return true;
        }
      };

      // Convert toolbar array to multiple options
      if (Tools.isArray(settings.toolbar)) {
        // Empty toolbar array is the same as a disabled toolbar
        if (settings.toolbar.length === 0) {
          return;
        }

        Tools.each(settings.toolbar, function(toolbar, i) {
          settings['toolbar' + (i + 1)] = toolbar;
        });

        delete settings.toolbar;
      }

      // Generate toolbar<n>
      for (let i = 1; i < 10; i++) {
        if (!addToolbar(settings['toolbar' + i])) {
          break;
        }
      }

      // Generate toolbar or default toolbar unless it's disabled
      if (!toolbars.length && settings.toolbar !== false) {
        addToolbar(settings.toolbar || defaultToolbar);
      }

      if (toolbars.length) {
        return {
          type: 'panel',
          layout: 'stack',
          classes: 'toolbar-grp',
          ariaRoot: true,
          ariaRemember: true,
          items: toolbars,
        };
      }
    };

    return {
      createToolbar: createToolbar,
      createToolbars: createToolbars,
    };
  });

  /**
   * Menubar.js
   *
   * Released under LGPL License.
   * Copyright (c) 1999-2016 Ephox Corp. All rights reserved
   *
   * License: http://www.tinymce.com/license
   * Contributing: http://www.tinymce.com/contributing
   */

  define('tinymce.modern.ui.Menubar', ['global!tinymce.util.Tools'], function(
    Tools,
  ) {
    const defaultMenus = {
      file: {title: 'File', items: 'newdocument'},
      edit: {
        title: 'Edit',
        items: 'undo redo | cut copy paste pastetext | selectall',
      },
      insert: {title: 'Insert', items: '|'},
      view: {title: 'View', items: 'visualaid |'},
      format: {
        title: 'Format',
        items:
          'bold italic underline strikethrough superscript subscript | formats | removeformat',
      },
      table: {title: 'Table'},
      tools: {title: 'Tools'},
    };

    const createMenuItem = function(menuItems, name) {
      let menuItem;

      if (name == '|') {
        return {text: '|'};
      }

      menuItem = menuItems[name];

      return menuItem;
    };

    const createMenu = function(editorMenuItems, settings, context) {
      let menuButton, menu, menuItems, isUserDefined, removedMenuItems;

      removedMenuItems = Tools.makeMap(
        (settings.removed_menuitems || '').split(/[ ,]/),
      );

      // User defined menu
      if (settings.menu) {
        menu = settings.menu[context];
        isUserDefined = true;
      } else {
        menu = defaultMenus[context];
      }

      if (menu) {
        menuButton = {text: menu.title};
        menuItems = [];

        // Default/user defined items
        Tools.each((menu.items || '').split(/[ ,]/), function(item) {
          const menuItem = createMenuItem(editorMenuItems, item);

          if (menuItem && !removedMenuItems[item]) {
            menuItems.push(createMenuItem(editorMenuItems, item));
          }
        });

        // Added though context
        if (!isUserDefined) {
          Tools.each(editorMenuItems, function(menuItem) {
            if (menuItem.context == context) {
              if (menuItem.separator == 'before') {
                menuItems.push({text: '|'});
              }

              if (menuItem.prependToContext) {
                menuItems.unshift(menuItem);
              } else {
                menuItems.push(menuItem);
              }

              if (menuItem.separator == 'after') {
                menuItems.push({text: '|'});
              }
            }
          });
        }

        for (let i = 0; i < menuItems.length; i++) {
          if (menuItems[i].text == '|') {
            if (i === 0 || i == menuItems.length - 1) {
              menuItems.splice(i, 1);
            }
          }
        }

        menuButton.menu = menuItems;

        if (!menuButton.menu.length) {
          return null;
        }
      }

      return menuButton;
    };

    const createMenuButtons = function(editor) {
      let name,
        menuButtons = [],
        settings = editor.settings;

      const defaultMenuBar = [];
      if (settings.menu) {
        for (name in settings.menu) {
          defaultMenuBar.push(name);
        }
      } else {
        for (name in defaultMenus) {
          defaultMenuBar.push(name);
        }
      }

      const enabledMenuNames =
        typeof settings.menubar == 'string'
          ? settings.menubar.split(/[ ,]/)
          : defaultMenuBar;
      for (let i = 0; i < enabledMenuNames.length; i++) {
        let menu = enabledMenuNames[i];
        menu = createMenu(editor.menuItems, editor.settings, menu);

        if (menu) {
          menuButtons.push(menu);
        }
      }

      return menuButtons;
    };

    return {
      createMenuButtons: createMenuButtons,
    };
  });

  defineGlobal('global!tinymce.util.Delay', tinymce.util.Delay);
  defineGlobal('global!tinymce.geom.Rect', tinymce.geom.Rect);
  /**
   * ContextToolbars.js
   *
   * Released under LGPL License.
   * Copyright (c) 1999-2016 Ephox Corp. All rights reserved
   *
   * License: http://www.tinymce.com/license
   * Contributing: http://www.tinymce.com/contributing
   */

  define('tinymce.modern.ui.ContextToolbars', [
    'global!tinymce.DOM',
    'global!tinymce.util.Tools',
    'global!tinymce.util.Delay',
    'tinymce.modern.ui.Toolbar',
    'global!tinymce.ui.Factory',
    'global!tinymce.geom.Rect',
  ], function(DOM, Tools, Delay, Toolbar, Factory, Rect) {
    const toClientRect = function(geomRect) {
      return {
        left: geomRect.x,
        top: geomRect.y,
        width: geomRect.w,
        height: geomRect.h,
        right: geomRect.x + geomRect.w,
        bottom: geomRect.y + geomRect.h,
      };
    };

    const hideAllFloatingPanels = function(editor) {
      Tools.each(editor.contextToolbars, function(toolbar) {
        if (toolbar.panel) {
          toolbar.panel.hide();
        }
      });
    };

    const movePanelTo = function(panel, pos) {
      panel.moveTo(pos.left, pos.top);
    };

    const togglePositionClass = function(panel, relPos, predicate) {
      relPos = relPos ? relPos.substr(0, 2) : '';

      Tools.each(
        {
          t: 'down',
          b: 'up',
        },
        function(cls, pos) {
          panel.classes.toggle(
            'arrow-' + cls,
            predicate(pos, relPos.substr(0, 1)),
          );
        },
      );

      Tools.each(
        {
          l: 'left',
          r: 'right',
        },
        function(cls, pos) {
          panel.classes.toggle(
            'arrow-' + cls,
            predicate(pos, relPos.substr(1, 1)),
          );
        },
      );
    };

    const userConstrain = function(
      handler,
      x,
      y,
      elementRect,
      contentAreaRect,
      panelRect,
    ) {
      panelRect = toClientRect({x: x, y: y, w: panelRect.w, h: panelRect.h});

      if (handler) {
        panelRect = handler({
          elementRect: toClientRect(elementRect),
          contentAreaRect: toClientRect(contentAreaRect),
          panelRect: panelRect,
        });
      }

      return panelRect;
    };

    const addContextualToolbars = function(editor) {
      let scrollContainer,
        settings = editor.settings;

      const getContextToolbars = function() {
        return editor.contextToolbars || [];
      };

      const getElementRect = function(elm) {
        let pos, targetRect, root;

        pos = DOM.getPos(editor.getContentAreaContainer());
        targetRect = editor.dom.getRect(elm);
        root = editor.dom.getRoot();

        // Adjust targetPos for scrolling in the editor
        if (root.nodeName === 'BODY') {
          targetRect.x -=
            root.ownerDocument.documentElement.scrollLeft || root.scrollLeft;
          targetRect.y -=
            root.ownerDocument.documentElement.scrollTop || root.scrollTop;
        }

        targetRect.x += pos.x;
        targetRect.y += pos.y;

        return targetRect;
      };

      const reposition = function(match, shouldShow) {
        let relPos,
          panelRect,
          elementRect,
          contentAreaRect,
          panel,
          relRect,
          testPositions,
          smallElementWidthThreshold;
        const handler = settings.inline_toolbar_position_handler;

        if (editor.removed) {
          return;
        }

        if (!match || !match.toolbar.panel) {
          hideAllFloatingPanels(editor);
          return;
        }

        testPositions = ['bc-tc', 'tc-bc', 'tl-bl', 'bl-tl', 'tr-br', 'br-tr'];

        panel = match.toolbar.panel;

        // Only show the panel on some events not for example nodeChange since that fires when context menu is opened
        if (shouldShow) {
          panel.show();
        }

        elementRect = getElementRect(match.element);
        panelRect = DOM.getRect(panel.getEl());
        contentAreaRect = DOM.getRect(
          editor.getContentAreaContainer() || editor.getBody(),
        );
        smallElementWidthThreshold = 25;

        if (DOM.getStyle(match.element, 'display', true) !== 'inline') {
          // We need to use these instead of the rect values since the style
          // size properites might not be the same as the real size for a table
          elementRect.w = match.element.clientWidth;
          elementRect.h = match.element.clientHeight;
        }

        if (!editor.inline) {
          contentAreaRect.w = editor.getDoc().documentElement.offsetWidth;
        }

        // Inflate the elementRect so it doesn't get placed above resize handles
        if (
          editor.selection.controlSelection.isResizable(match.element) &&
          elementRect.w < smallElementWidthThreshold
        ) {
          elementRect = Rect.inflate(elementRect, 0, 8);
        }

        relPos = Rect.findBestRelativePosition(
          panelRect,
          elementRect,
          contentAreaRect,
          testPositions,
        );
        elementRect = Rect.clamp(elementRect, contentAreaRect);

        if (relPos) {
          relRect = Rect.relativePosition(panelRect, elementRect, relPos);
          movePanelTo(
            panel,
            userConstrain(
              handler,
              relRect.x,
              relRect.y,
              elementRect,
              contentAreaRect,
              panelRect,
            ),
          );
        } else {
          // Allow overflow below the editor to avoid placing toolbars ontop of tables
          contentAreaRect.h += panelRect.h;

          elementRect = Rect.intersect(contentAreaRect, elementRect);
          if (elementRect) {
            relPos = Rect.findBestRelativePosition(
              panelRect,
              elementRect,
              contentAreaRect,
              ['bc-tc', 'bl-tl', 'br-tr'],
            );

            if (relPos) {
              relRect = Rect.relativePosition(panelRect, elementRect, relPos);
              movePanelTo(
                panel,
                userConstrain(
                  handler,
                  relRect.x,
                  relRect.y,
                  elementRect,
                  contentAreaRect,
                  panelRect,
                ),
              );
            } else {
              movePanelTo(
                panel,
                userConstrain(
                  handler,
                  elementRect.x,
                  elementRect.y,
                  elementRect,
                  contentAreaRect,
                  panelRect,
                ),
              );
            }
          } else {
            panel.hide();
          }
        }

        togglePositionClass(panel, relPos, function(pos1, pos2) {
          return pos1 === pos2;
        });

        //drawRect(contentAreaRect, 'blue');
        //drawRect(elementRect, 'red');
        //drawRect(panelRect, 'green');
      };

      const repositionHandler = function(show) {
        return function() {
          const execute = function() {
            if (editor.selection) {
              reposition(findFrontMostMatch(editor.selection.getNode()), show);
            }
          };

          Delay.requestAnimationFrame(execute);
        };
      };

      const bindScrollEvent = function() {
        if (!scrollContainer) {
          scrollContainer =
            editor.selection.getScrollContainer() || editor.getWin();
          DOM.bind(scrollContainer, 'scroll', repositionHandler(true));

          editor.on('remove', function() {
            DOM.unbind(scrollContainer, 'scroll');
          });
        }
      };

      const showContextToolbar = function(match) {
        let panel;

        if (match.toolbar.panel) {
          match.toolbar.panel.show();
          reposition(match);
          return;
        }

        bindScrollEvent();

        panel = Factory.create({
          type: 'floatpanel',
          role: 'dialog',
          classes: 'tinymce tinymce-inline arrow',
          ariaLabel: 'Inline toolbar',
          layout: 'flex',
          direction: 'column',
          align: 'stretch',
          autohide: false,
          autofix: true,
          fixed: true,
          border: 1,
          items: Toolbar.createToolbar(editor, match.toolbar.items),
          oncancel: function() {
            editor.focus();
          },
        });

        match.toolbar.panel = panel;
        panel.renderTo(document.body).reflow();
        reposition(match);
      };

      const hideAllContextToolbars = function() {
        Tools.each(getContextToolbars(), function(toolbar) {
          if (toolbar.panel) {
            toolbar.panel.hide();
          }
        });
      };

      var findFrontMostMatch = function(targetElm) {
        let i,
          y,
          parentsAndSelf,
          toolbars = getContextToolbars();

        parentsAndSelf = editor
          .$(targetElm)
          .parents()
          .add(targetElm);
        for (i = parentsAndSelf.length - 1; i >= 0; i--) {
          for (y = toolbars.length - 1; y >= 0; y--) {
            if (toolbars[y].predicate(parentsAndSelf[i])) {
              return {
                toolbar: toolbars[y],
                element: parentsAndSelf[i],
              };
            }
          }
        }

        return null;
      };

      editor.on('click keyup setContent ObjectResized', function(e) {
        // Only act on partial inserts
        if (e.type === 'setcontent' && !e.selection) {
          return;
        }

        // Needs to be delayed to avoid Chrome img focus out bug
        Delay.setEditorTimeout(editor, function() {
          let match;

          match = findFrontMostMatch(editor.selection.getNode());
          if (match) {
            hideAllContextToolbars();
            showContextToolbar(match);
          } else {
            hideAllContextToolbars();
          }
        });
      });

      editor.on('blur hide contextmenu', hideAllContextToolbars);

      editor.on('ObjectResizeStart', function() {
        const match = findFrontMostMatch(editor.selection.getNode());

        if (match && match.toolbar.panel) {
          match.toolbar.panel.hide();
        }
      });

      editor.on('ResizeEditor ResizeWindow', repositionHandler(true));
      editor.on('nodeChange', repositionHandler(false));

      editor.on('remove', function() {
        Tools.each(getContextToolbars(), function(toolbar) {
          if (toolbar.panel) {
            toolbar.panel.remove();
          }
        });

        editor.contextToolbars = {};
      });

      editor.shortcuts.add('ctrl+F9', '', function() {
        const match = findFrontMostMatch(editor.selection.getNode());
        if (match && match.toolbar.panel) {
          match.toolbar.panel.items()[0].focus();
        }
      });
    };

    return {
      addContextualToolbars: addContextualToolbars,
    };
  });

  /**
   * A11y.js
   *
   * Released under LGPL License.
   * Copyright (c) 1999-2016 Ephox Corp. All rights reserved
   *
   * License: http://www.tinymce.com/license
   * Contributing: http://www.tinymce.com/contributing
   */

  define('tinymce.modern.ui.A11y', [], function() {
    const focus = function(panel, type) {
      return function() {
        const item = panel.find(type)[0];

        if (item) {
          item.focus(true);
        }
      };
    };

    const addKeys = function(editor, panel) {
      editor.shortcuts.add('Alt+F9', '', focus(panel, 'menubar'));
      editor.shortcuts.add('Alt+F10,F10', '', focus(panel, 'toolbar'));
      editor.shortcuts.add('Alt+F11', '', focus(panel, 'elementpath'));
      panel.on('cancel', function() {
        editor.focus();
      });
    };

    return {
      addKeys: addKeys,
    };
  });

  /**
   * Sidebar.js
   *
   * Released under LGPL License.
   * Copyright (c) 1999-2016 Ephox Corp. All rights reserved
   *
   * License: http://www.tinymce.com/license
   * Contributing: http://www.tinymce.com/contributing
   */

  define('tinymce.modern.ui.Sidebar', [
    'global!tinymce.util.Tools',
    'global!tinymce.ui.Factory',
    'global!tinymce.Env',
  ], function(Tools, Factory, Env) {
    const api = function(elm) {
      return {
        element: function() {
          return elm;
        },
      };
    };

    const trigger = function(sidebar, panel, callbackName) {
      const callback = sidebar.settings[callbackName];
      if (callback) {
        callback(api(panel.getEl('body')));
      }
    };

    const hidePanels = function(name, container, sidebars) {
      Tools.each(sidebars, function(sidebar) {
        const panel = container.items().filter('#' + sidebar.name)[0];

        if (panel && panel.visible() && sidebar.name !== name) {
          trigger(sidebar, panel, 'onhide');
          panel.visible(false);
        }
      });
    };

    const deactivateButtons = function(toolbar) {
      toolbar.items().each(function(ctrl) {
        ctrl.active(false);
      });
    };

    const findSidebar = function(sidebars, name) {
      return Tools.grep(sidebars, function(sidebar) {
        return sidebar.name === name;
      })[0];
    };

    const showPanel = function(editor, name, sidebars) {
      return function(e) {
        const btnCtrl = e.control;
        const container = btnCtrl.parents().filter('panel')[0];
        let panel = container.find('#' + name)[0];
        const sidebar = findSidebar(sidebars, name);

        hidePanels(name, container, sidebars);
        deactivateButtons(btnCtrl.parent());

        if (panel && panel.visible()) {
          trigger(sidebar, panel, 'onhide');
          panel.hide();
          btnCtrl.active(false);
        } else {
          if (panel) {
            panel.show();
            trigger(sidebar, panel, 'onshow');
          } else {
            panel = Factory.create({
              type: 'container',
              name: name,
              layout: 'stack',
              classes: 'sidebar-panel',
              html: '',
            });

            container.prepend(panel);
            trigger(sidebar, panel, 'onrender');
            trigger(sidebar, panel, 'onshow');
          }

          btnCtrl.active(true);
        }

        editor.fire('ResizeEditor');
      };
    };

    const isModernBrowser = function() {
      return !Env.ie || Env.ie >= 11;
    };

    const hasSidebar = function(editor) {
      return isModernBrowser() && editor.sidebars
        ? editor.sidebars.length > 0
        : false;
    };

    const createSidebar = function(editor) {
      const buttons = Tools.map(editor.sidebars, function(sidebar) {
        const settings = sidebar.settings;

        return {
          type: 'button',
          icon: settings.icon,
          image: settings.image,
          tooltip: settings.tooltip,
          onclick: showPanel(editor, sidebar.name, editor.sidebars),
        };
      });

      return {
        type: 'panel',
        name: 'sidebar',
        layout: 'stack',
        classes: 'sidebar',
        items: [
          {
            type: 'toolbar',
            layout: 'stack',
            classes: 'sidebar-toolbar',
            items: buttons,
          },
        ],
      };
    };

    return {
      hasSidebar: hasSidebar,
      createSidebar: createSidebar,
    };
  });
  /**
   * SkinLoaded.js
   *
   * Released under LGPL License.
   * Copyright (c) 1999-2016 Ephox Corp. All rights reserved
   *
   * License: http://www.tinymce.com/license
   * Contributing: http://www.tinymce.com/contributing
   */

  define('tinymce.modern.ui.SkinLoaded', [], function() {
    const fireSkinLoaded = function(editor) {
      const done = function() {
        editor._skinLoaded = true;
        editor.fire('SkinLoaded');
      };

      return function() {
        if (editor.initialized) {
          done();
        } else {
          editor.on('init', done);
        }
      };
    };

    return {
      fireSkinLoaded: fireSkinLoaded,
    };
  });

  /**
   * Resize.js
   *
   * Released under LGPL License.
   * Copyright (c) 1999-2016 Ephox Corp. All rights reserved
   *
   * License: http://www.tinymce.com/license
   * Contributing: http://www.tinymce.com/contributing
   */

  define('tinymce.modern.ui.Resize', ['global!tinymce.DOM'], function(DOM) {
    const getSize = function(elm) {
      return {
        width: elm.clientWidth,
        height: elm.clientHeight,
      };
    };

    const resizeTo = function(editor, width, height) {
      let containerElm,
        iframeElm,
        containerSize,
        iframeSize,
        settings = editor.settings;

      containerElm = editor.getContainer();
      iframeElm = editor.getContentAreaContainer().firstChild;
      containerSize = getSize(containerElm);
      iframeSize = getSize(iframeElm);

      if (width !== null) {
        width = Math.max(settings.min_width || 100, width);
        width = Math.min(settings.max_width || 0xffff, width);

        DOM.setStyle(
          containerElm,
          'width',
          width + (containerSize.width - iframeSize.width),
        );
        DOM.setStyle(iframeElm, 'width', width);
      }

      height = Math.max(settings.min_height || 100, height);
      height = Math.min(settings.max_height || 0xffff, height);
      DOM.setStyle(iframeElm, 'height', height);

      editor.fire('ResizeEditor');
    };

    const resizeBy = function(editor, dw, dh) {
      const elm = editor.getContentAreaContainer();
      resizeTo(editor, elm.clientWidth + dw, elm.clientHeight + dh);
    };

    return {
      resizeTo: resizeTo,
      resizeBy: resizeBy,
    };
  });

  /**
   * Iframe.js
   *
   * Released under LGPL License.
   * Copyright (c) 1999-2016 Ephox Corp. All rights reserved
   *
   * License: http://www.tinymce.com/license
   * Contributing: http://www.tinymce.com/contributing
   */

  define('tinymce.modern.modes.Iframe', [
    'global!tinymce.util.Tools',
    'global!tinymce.ui.Factory',
    'global!tinymce.DOM',
    'tinymce.modern.ui.Toolbar',
    'tinymce.modern.ui.Menubar',
    'tinymce.modern.ui.ContextToolbars',
    'tinymce.modern.ui.A11y',
    'tinymce.modern.ui.Sidebar',
    'tinymce.modern.ui.SkinLoaded',
    'tinymce.modern.ui.Resize',
  ], function(
    Tools,
    Factory,
    DOM,
    Toolbar,
    Menubar,
    ContextToolbars,
    A11y,
    Sidebar,
    SkinLoaded,
    Resize,
  ) {
    const switchMode = function(panel) {
      return function(e) {
        panel.find('*').disabled(e.mode === 'readonly');
      };
    };

    const editArea = function(border) {
      return {
        type: 'panel',
        name: 'iframe',
        layout: 'stack',
        classes: 'edit-area',
        border: border,
        html: '',
      };
    };

    const editAreaContainer = function(editor) {
      return {
        type: 'panel',
        layout: 'stack',
        classes: 'edit-aria-container',
        border: '1 0 0 0',
        items: [editArea('0'), Sidebar.createSidebar(editor)],
      };
    };

    const render = function(editor, theme, args) {
      let panel,
        resizeHandleCtrl,
        startSize,
        settings = editor.settings;

      if (args.skinUiCss) {
        DOM.styleSheetLoader.load(
          args.skinUiCss,
          SkinLoaded.fireSkinLoaded(editor),
        );
      }

      panel = theme.panel = Factory.create({
        type: 'panel',
        role: 'application',
        classes: 'tinymce',
        style: 'visibility: hidden',
        layout: 'stack',
        border: 1,
        items: [
          settings.menubar === false
            ? null
            : {
                type: 'menubar',
                border: '0 0 1 0',
                items: Menubar.createMenuButtons(editor),
              },
          Toolbar.createToolbars(editor, settings.toolbar_items_size),
          Sidebar.hasSidebar(editor)
            ? editAreaContainer(editor)
            : editArea('1 0 0 0'),
        ],
      });

      if (settings.resize !== false) {
        resizeHandleCtrl = {
          type: 'resizehandle',
          direction: settings.resize,

          onResizeStart: function() {
            const elm = editor.getContentAreaContainer().firstChild;

            startSize = {
              width: elm.clientWidth,
              height: elm.clientHeight,
            };
          },

          onResize: function(e) {
            if (settings.resize === 'both') {
              Resize.resizeTo(
                editor,
                startSize.width + e.deltaX,
                startSize.height + e.deltaY,
              );
            } else {
              Resize.resizeTo(editor, null, startSize.height + e.deltaY);
            }
          },
        };
      }

      // Add statusbar if needed
      if (settings.statusbar !== false) {
        panel.add({
          type: 'panel',
          name: 'statusbar',
          classes: 'statusbar',
          layout: 'flow',
          border: '1 0 0 0',
          ariaRoot: true,
          items: [{type: 'elementpath', editor: editor}, resizeHandleCtrl],
        });
      }

      editor.fire('BeforeRenderUI');
      editor.on('SwitchMode', switchMode(panel));
      panel.renderBefore(args.targetNode).reflow();

      if (settings.readonly) {
        editor.setMode('readonly');
      }

      if (settings.width) {
        DOM.setStyle(panel.getEl(), 'width', settings.width);
      }

      // Remove the panel when the editor is removed
      editor.on('remove', function() {
        panel.remove();
        panel = null;
      });

      // Add accesibility shortcuts
      A11y.addKeys(editor, panel);
      ContextToolbars.addContextualToolbars(editor);

      return {
        iframeContainer: panel.find('#iframe')[0].getEl(),
        editorContainer: panel.getEl(),
      };
    };

    return {
      render: render,
    };
  });

  defineGlobal('global!tinymce.ui.FloatPanel', tinymce.ui.FloatPanel);
  /**
   * Inline.js
   *
   * Released under LGPL License.
   * Copyright (c) 1999-2016 Ephox Corp. All rights reserved
   *
   * License: http://www.tinymce.com/license
   * Contributing: http://www.tinymce.com/contributing
   */

  define('tinymce.modern.modes.Inline', [
    'global!tinymce.util.Tools',
    'global!tinymce.ui.Factory',
    'global!tinymce.DOM',
    'global!tinymce.ui.FloatPanel',
    'tinymce.modern.ui.Toolbar',
    'tinymce.modern.ui.Menubar',
    'tinymce.modern.ui.ContextToolbars',
    'tinymce.modern.ui.A11y',
    'tinymce.modern.ui.SkinLoaded',
  ], function(
    Tools,
    Factory,
    DOM,
    FloatPanel,
    Toolbar,
    Menubar,
    ContextToolbars,
    A11y,
    SkinLoaded,
  ) {
    const render = function(editor, theme, args) {
      let panel,
        inlineToolbarContainer,
        settings = editor.settings;

      if (settings.fixed_toolbar_container) {
        inlineToolbarContainer = DOM.select(
          settings.fixed_toolbar_container,
        )[0];
      }

      const reposition = function() {
        if (panel && panel.moveRel && panel.visible() && !panel._fixed) {
          // TODO: This is kind of ugly and doesn't handle multiple scrollable elements
          const scrollContainer = editor.selection.getScrollContainer(),
            body = editor.getBody();
          let deltaX = 0,
            deltaY = 0;

          if (scrollContainer) {
            const bodyPos = DOM.getPos(body),
              scrollContainerPos = DOM.getPos(scrollContainer);

            deltaX = Math.max(0, scrollContainerPos.x - bodyPos.x);
            deltaY = Math.max(0, scrollContainerPos.y - bodyPos.y);
          }

          panel
            .fixed(false)
            .moveRel(
              body,
              editor.rtl ? ['tr-br', 'br-tr'] : ['tl-bl', 'bl-tl', 'tr-br'],
            )
            .moveBy(deltaX, deltaY);
        }
      };

      const show = function() {
        if (panel) {
          panel.show();
          reposition();
          DOM.addClass(editor.getBody(), 'mce-edit-focus');
        }
      };

      const hide = function() {
        if (panel) {
          // We require two events as the inline float panel based toolbar does not have autohide=true
          panel.hide();

          // All other autohidden float panels will be closed below.
          FloatPanel.hideAll();

          DOM.removeClass(editor.getBody(), 'mce-edit-focus');
        }
      };

      const render = function() {
        if (panel) {
          if (!panel.visible()) {
            show();
          }

          return;
        }

        // Render a plain panel inside the inlineToolbarContainer if it's defined
        panel = theme.panel = Factory.create({
          type: inlineToolbarContainer ? 'panel' : 'floatpanel',
          role: 'application',
          classes: 'tinymce tinymce-inline',
          layout: 'flex',
          direction: 'column',
          align: 'stretch',
          autohide: false,
          autofix: true,
          fixed: !!inlineToolbarContainer,
          border: 1,
          items: [
            settings.menubar === false
              ? null
              : {
                  type: 'menubar',
                  border: '0 0 1 0',
                  items: Menubar.createMenuButtons(editor),
                },
            Toolbar.createToolbars(editor, settings.toolbar_items_size),
          ],
        });

        // Add statusbar
        /*if (settings.statusbar !== false) {
				panel.add({type: 'panel', classes: 'statusbar', layout: 'flow', border: '1 0 0 0', items: [
					{type: 'elementpath'}
				]});
			}*/

        editor.fire('BeforeRenderUI');
        panel.renderTo(inlineToolbarContainer || document.body).reflow();

        A11y.addKeys(editor, panel);
        show();
        ContextToolbars.addContextualToolbars(editor);

        editor.on('nodeChange', reposition);
        editor.on('activate', show);
        editor.on('deactivate', hide);

        editor.nodeChanged();
      };

      settings.content_editable = true;

      editor.on('focus', function() {
        // Render only when the CSS file has been loaded
        if (args.skinUiCss) {
          DOM.styleSheetLoader.load(args.skinUiCss, render, render);
        } else {
          render();
        }
      });

      editor.on('blur hide', hide);

      // Remove the panel when the editor is removed
      editor.on('remove', function() {
        if (panel) {
          panel.remove();
          panel = null;
        }
      });

      // Preload skin css
      if (args.skinUiCss) {
        DOM.styleSheetLoader.load(
          args.skinUiCss,
          SkinLoaded.fireSkinLoaded(editor),
        );
      }

      return {};
    };

    return {
      render: render,
    };
  });

  defineGlobal('global!tinymce.ui.Throbber', tinymce.ui.Throbber);
  /**
   * ProgressState.js
   *
   * Released under LGPL License.
   * Copyright (c) 1999-2016 Ephox Corp. All rights reserved
   *
   * License: http://www.tinymce.com/license
   * Contributing: http://www.tinymce.com/contributing
   */

  define('tinymce.modern.ui.ProgressState', [
    'global!tinymce.ui.Throbber',
  ], function(Throbber) {
    const setup = function(editor, theme) {
      let throbber;

      editor.on('ProgressState', function(e) {
        throbber = throbber || new Throbber(theme.panel.getEl('body'));

        if (e.state) {
          throbber.show(e.time);
        } else {
          throbber.hide();
        }
      });
    };

    return {
      setup: setup,
    };
  });

  /**
   * Theme.js
   *
   * Released under LGPL License.
   * Copyright (c) 1999-2016 Ephox Corp. All rights reserved
   *
   * License: http://www.tinymce.com/license
   * Contributing: http://www.tinymce.com/contributing
   */

  define('tinymce.modern.Theme', [
    'global!tinymce.Env',
    'global!tinymce.EditorManager',
    'global!tinymce.ThemeManager',
    'tinymce.modern.modes.Iframe',
    'tinymce.modern.modes.Inline',
    'tinymce.modern.ui.Resize',
    'tinymce.modern.ui.ProgressState',
  ], function(
    Env,
    EditorManager,
    ThemeManager,
    Iframe,
    Inline,
    Resize,
    ProgressState,
  ) {
    const renderUI = function(editor, theme, args) {
      const settings = editor.settings;
      const skin =
        settings.skin !== false ? settings.skin || 'lightgray' : false;

      if (skin) {
        let skinUrl = settings.skin_url;

        if (skinUrl) {
          skinUrl = editor.documentBaseURI.toAbsolute(skinUrl);
        } else {
          skinUrl = EditorManager.baseURL + '/skins/' + skin;
        }

        // Load special skin for IE7
        // TODO: Remove this when we drop IE7 support
        if (Env.documentMode <= 7) {
          args.skinUiCss = skinUrl + '/skin.ie7.min.css';
        } else {
          args.skinUiCss = skinUrl + '/skin.min.css';
        }

        // Load content.min.css or content.inline.min.css
        editor.contentCSS.push(
          skinUrl + '/content' + (editor.inline ? '.inline' : '') + '.min.css',
        );
      }

      ProgressState.setup(editor, theme);

      if (settings.inline) {
        return Inline.render(editor, theme, args);
      }

      return Iframe.render(editor, theme, args);
    };

    ThemeManager.add('modern', function(editor) {
      return {
        renderUI: function(args) {
          return renderUI(editor, this, args);
        },
        resizeTo: function(w, h) {
          return Resize.resizeTo(editor, w, h);
        },
        resizeBy: function(dw, dh) {
          return Resize.resizeBy(editor, dw, dh);
        },
      };
    });

    return function() {};
  });

  dem('tinymce.modern.Theme')();
})();
