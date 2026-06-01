import { Component, createElement, forwardRef } from 'react'

import './SlideDown.css'

class SlideDownContent extends Component {
  static defaultProps = {
    transitionOnAppear: true,
    closed: false,
  }

  constructor(props) {
    super(props)
    this.state = {
      children: props.children,
      childrenLeaving: false,
    }
  }

  handleRef = (ref) => {
    this.outerRef = ref

    const { forwardedRef } = this.props
    if (!forwardedRef) return

    if (typeof forwardedRef === 'function') {
      forwardedRef(ref)
    } else {
      forwardedRef.current = ref
    }
  }

  componentDidMount() {
    if (!this.outerRef) return

    if (this.props.closed || !this.props.children) {
      this.outerRef.classList.add('closed')
      this.outerRef.style.height = '0px'
    } else if (this.props.transitionOnAppear) {
      this.startTransition('0px')
    } else {
      this.outerRef.style.height = 'auto'
    }
  }

  getSnapshotBeforeUpdate() {
    return this.outerRef ? `${this.outerRef.getBoundingClientRect().height}px` : null
  }

  static getDerivedStateFromProps(props, state) {
    if (props.children) {
      return { children: props.children, childrenLeaving: false }
    }
    if (state.children) {
      return { children: state.children, childrenLeaving: true }
    }
    return null
  }

  componentDidUpdate(_prevProps, _prevState, snapshot) {
    if (this.outerRef) {
      this.startTransition(snapshot)
    }
  }

  startTransition(prevHeight) {
    let endHeight = '0px'

    if (!this.props.closed && !this.state.childrenLeaving && this.state.children) {
      this.outerRef.classList.remove('closed')
      this.outerRef.style.height = 'auto'
      endHeight = getComputedStyle(this.outerRef).height
    }

    if (parseFloat(endHeight).toFixed(2) !== parseFloat(prevHeight).toFixed(2)) {
      this.outerRef.classList.add('transitioning')
      this.outerRef.style.height = prevHeight
      this.outerRef.offsetHeight
      this.outerRef.style.transitionProperty = 'height'
      this.outerRef.style.height = endHeight
    }
  }

  endTransition() {
    this.outerRef.classList.remove('transitioning')
    this.outerRef.style.transitionProperty = 'none'
    this.outerRef.style.height = this.props.closed ? '0px' : 'auto'

    if (this.props.closed || !this.state.children) {
      this.outerRef.classList.add('closed')
    }
  }

  handleTransitionEnd = (evt) => {
    if (evt.target !== this.outerRef || evt.propertyName !== 'height') return

    if (this.state.childrenLeaving) {
      this.setState({ children: null, childrenLeaving: false }, () => this.endTransition())
    } else {
      this.endTransition()
    }
  }

  render() {
    const { as = 'div', children: _children, className, closed: _closed, transitionOnAppear: _transitionOnAppear, forwardedRef: _forwardedRef, ...rest } = this.props
    const containerClassName = className ? `react-slidedown ${className}` : 'react-slidedown'

    return createElement(as, {
      ref: this.handleRef,
      className: containerClassName,
      onTransitionEnd: this.handleTransitionEnd,
      ...rest,
    }, this.state.children)
  }
}

const SlideDown = forwardRef((props, ref) => (
  <SlideDownContent {...props} forwardedRef={ref} />
))

export default SlideDown
