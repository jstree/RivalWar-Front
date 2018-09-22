
var React = require('react')
var cx = require('classnames')
var PT = React.PropTypes
var ensureInView = require('../../util/ensure-in-view')
var SimpleBody = require('../body/simple')

var Listener = require('../../listener')

var TreeItem = React.createClass({
  mixins: [
    Listener({
      storeAttrs: function (getters, props) {
        return {
          node: getters.getNode(props.id),
        }
      },

      shouldGetNew: function (nextProps) {
        return nextProps.id !== this.props.id || nextProps.store !== this.props.store
      },

      getListeners: function (props, events) {
        return [events.nodeChanged(props.id), events.nodeViewChanged(props.id)]
      },
    })
  ],

  componentWillMount: function () {
    // get plugin update functions
    this._plugin_updates = null
    this.props.plugins.forEach((plugin) => {
      if (!plugin.componentDidUpdate) return
      if (!this._plugin_updates) {
        this._plugin_updates = [plugin.componentDidUpdate]
      } else {
        this._plugin_updates.push(plugin.componentDidUpdate)
      }
    })
  },

  propTypes: {
    id: PT.string.isRequired,
    plugins: PT.array,
    bodies: PT.object,
    keys: PT.func,
    isRoot: PT.bool,
  },

  shouldComponentUpdate: function (nextProps, nextState) {
    return (
      nextState !== this.state ||
      (nextProps.index !== this.props.index && nextState.isActive)
    )
  },

  componentDidMount: function () {
    if (this.state.isActive && this.state.isActiveView) {
      ensureInView(this.refs.body)
    }
  },

  /** Use to check what things are updating when */
  componentDidUpdate: function (prevProps, prevState) {
    if (this._plugin_updates) {
      this._plugin_updates.map((fn) => fn.call(this, prevProps, prevState))
    }
    if (this.state.isActive && this.state.isActiveView && !prevState.isActive) {
      ensureInView(this.refs.body)
    }
    if (window.DEBUG_UPDATE) {
      // DEBUG STUFF
      var n = this._node
      n.style.outline = '1px solid red'
      setTimeout(function () {
        n.style.outline = ''
      }, 200)
    }
  },
  // **/

  fromMix: function (part) {
    if (!this.props.plugins) return
    var items = []
    for (var i=0; i<this.props.plugins.length; i++) {
      var plugin = this.props.plugins[i].blocks
      if (!plugin || !plugin[part]) continue;
      items.push(plugin[part](this.state.node, this.props.store.actions, this.state, this.props.store))
    }
    if (!items.length) return null
    return items
  },

  body: function () {
    var body = this.props.bodies[this.state.node.type] || this.props.bodies['default']
    var abovebody = this.fromMix('abovebody')
    var belowbody = this.fromMix('belowbody')
    return <div ref='body' className='TreeItem_body'>
      {abovebody}
      {SimpleBody({
        editor: body.editor,
        renderer: body.renderer,
        node: this.state.node,
        keys: this.props.keys,
        isActive: this.state.isActive, // do we need this?
        editState: this.state.editState,
        actions: this.props.store.actions,
        store: this.props.store,
      })}
      {belowbody}
    </div>
  },

  render: function () {
    var className = cx({
      'pdf_item': true,
      'TreeItem': true,
      'pdf_item-root': this.props.isRoot,
    })
    className += ' TreeItem-type-' + this.state.node.type
    if (this.props.plugins) {
      this.props.plugins.forEach((plugin) => {
        if (!plugin.classes) return
        var classes = plugin.classes(this.state.node, this.state)
        if (classes) className += ' ' + classes
      })
    }
    return <div ref={n => this._node = n} className={className}>
      <div className='TreeItem_head'>
        {this.state.node.children.length ?
          <a name={this.state.node.id}/> : null}
        {this.body()}
      </div>
      {this.state.node.children.length ?
      <div className='TreeItem_children' ref='children'>
        {this.state.node.children.map((id, i) => 
          TreeItem({
            plugins: this.props.plugins,
            store: this.props.store,
            bodies: this.props.bodies,
            keys: this.props.keys,
            index: i,
            key: id,
            id: id,
          })
        )}
      </div> : null}
    </div>
  }
})

module.exports = TreeItem


